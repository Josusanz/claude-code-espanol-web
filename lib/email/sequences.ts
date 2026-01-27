// Email sequence logic using Vercel KV
import { kv } from '@vercel/kv'
import { Resend } from 'resend'
import { emailSequence } from './templates'

const resend = new Resend(process.env.RESEND_API_KEY)

interface UserEmailState {
  email: string
  registeredAt: string
  lastEmailSent: number // Index of last email sent (-1 if none)
  unsubscribed: boolean
}

const USERS_KEY = 'email_sequence:users'

// Add user to email sequence (call this when they register)
export async function addUserToSequence(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase()
  const key = `email_sequence:user:${normalizedEmail}`

  // Check if already exists
  const existing = await kv.get<UserEmailState>(key)
  if (existing) {
    console.log(`User ${normalizedEmail} already in sequence`)
    return
  }

  const userState: UserEmailState = {
    email: normalizedEmail,
    registeredAt: new Date().toISOString(),
    lastEmailSent: -1,
    unsubscribed: false,
  }

  await kv.set(key, userState)

  // Add to set of all users for easy iteration
  await kv.sadd(USERS_KEY, normalizedEmail)

  console.log(`Added ${normalizedEmail} to email sequence`)
}

// Remove user from sequence (unsubscribe)
export async function unsubscribeUser(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase()
  const key = `email_sequence:user:${normalizedEmail}`

  const existing = await kv.get<UserEmailState>(key)
  if (existing) {
    existing.unsubscribed = true
    await kv.set(key, existing)
  }

  console.log(`Unsubscribed ${normalizedEmail}`)
}

// Get user state
export async function getUserState(email: string): Promise<UserEmailState | null> {
  const normalizedEmail = email.toLowerCase()
  const key = `email_sequence:user:${normalizedEmail}`
  return kv.get<UserEmailState>(key)
}

// Calculate which email should be sent based on days since registration
function getNextEmailIndex(registeredAt: string, lastEmailSent: number): number | null {
  const registered = new Date(registeredAt)
  const now = new Date()
  const daysSinceRegistration = Math.floor((now.getTime() - registered.getTime()) / (1000 * 60 * 60 * 24))

  // Find the next email that should be sent
  for (let i = lastEmailSent + 1; i < emailSequence.length; i++) {
    const emailConfig = emailSequence[i]
    if (daysSinceRegistration >= emailConfig.day) {
      return i
    }
  }

  return null // No more emails to send
}

// Send email to a specific user
async function sendEmailToUser(userState: UserEmailState, emailIndex: number): Promise<boolean> {
  const emailConfig = emailSequence[emailIndex]
  const { subject, html } = emailConfig.getEmail()

  // Replace {{email}} placeholder for unsubscribe link
  const finalHtml = html.replace(/\{\{email\}\}/g, encodeURIComponent(userState.email))

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    await resend.emails.send({
      from: `Claude Code en Español <${fromEmail}>`,
      to: userState.email,
      subject,
      html: finalHtml,
    })

    console.log(`Sent ${emailConfig.template} to ${userState.email}`)
    return true
  } catch (error) {
    console.error(`Failed to send email to ${userState.email}:`, error)
    return false
  }
}

// Process all users and send pending emails
export async function processEmailSequence(): Promise<{
  processed: number
  sent: number
  errors: number
}> {
  const stats = { processed: 0, sent: 0, errors: 0 }

  // Get all user emails
  const userEmails = await kv.smembers(USERS_KEY)

  for (const email of userEmails) {
    const userState = await getUserState(email as string)

    if (!userState || userState.unsubscribed) {
      continue
    }

    stats.processed++

    const nextEmailIndex = getNextEmailIndex(userState.registeredAt, userState.lastEmailSent)

    if (nextEmailIndex === null) {
      continue // No email to send
    }

    const success = await sendEmailToUser(userState, nextEmailIndex)

    if (success) {
      stats.sent++
      // Update user state
      const key = `email_sequence:user:${userState.email}`
      userState.lastEmailSent = nextEmailIndex
      await kv.set(key, userState)
    } else {
      stats.errors++
    }
  }

  return stats
}

// Get sequence stats
export async function getSequenceStats(): Promise<{
  totalUsers: number
  unsubscribed: number
  byStage: Record<string, number>
}> {
  const userEmails = await kv.smembers(USERS_KEY)
  const stats = {
    totalUsers: userEmails.length,
    unsubscribed: 0,
    byStage: {} as Record<string, number>,
  }

  for (const email of userEmails) {
    const userState = await getUserState(email as string)
    if (!userState) continue

    if (userState.unsubscribed) {
      stats.unsubscribed++
      continue
    }

    const stage = userState.lastEmailSent === -1
      ? 'pending-first'
      : emailSequence[userState.lastEmailSent]?.template || 'completed'

    stats.byStage[stage] = (stats.byStage[stage] || 0) + 1
  }

  return stats
}
