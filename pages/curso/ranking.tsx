import Head from 'next/head'
import { useState, useEffect } from 'react'
import type { ReactElement } from 'react'
import CursoLayout from '../../components/CursoLayout'
import type { NextPageWithLayout } from '../_app'
import { getLevel } from '../../lib/curso-puntos'

interface RankingEntry {
  email: string
  total: number
  nivel: { nivel: number; nombre: string; emoji: string }
}

function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem('precurso-access')
    if (saved) {
      const data = JSON.parse(saved)
      return data.email ? data.email.toLowerCase().trim() : null
    }
  } catch { /* ignore */ }
  return null
}

function RankingPage() {
  const [entries, setEntries] = useState<RankingEntry[]>([])
  const [loading, setLoading] = useState(true)
  const userEmail = getUserEmail()

  useEffect(() => {
    fetch('/api/curso/puntos?ranking=true')
      .then(r => r.ok ? r.json() : { entries: [] })
      .then(data => setEntries(data.entries || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const MEDAL = ['🥇', '🥈', '🥉']

  return (
    <div style={{ padding: '32px 40px' }}>
      <Head><title>Ranking | Curso</title></Head>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>
          Ranking
        </h2>
        <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>
          Los alumnos más activos de la primera promoción
        </p>
      </div>

      {/* Points legend */}
      <div style={{
        background: 'linear-gradient(135deg, #eef2ff, #e8e0ff)',
        borderRadius: '14px', padding: '20px 24px', marginBottom: '24px',
        border: '1px solid rgba(94,106,210,0.12)',
      }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 700, color: '#5e6ad2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Cómo ganar puntos
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '13px', color: '#475569' }}>
          <span>Lección Módulo 0: +10</span>
          <span>Pre-clase: +15</span>
          <span>Clase: +15</span>
          <span>Entregable: +20</span>
          <span>Responder duda: +10</span>
          <span>Crear proyecto: +20</span>
          <span>Añadir hito: +10</span>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Cargando ranking...</div>
      ) : entries.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px', background: 'white',
          borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
          <p style={{ color: '#64748b', fontSize: '15px' }}>
            El ranking se llenará cuando los alumnos empiecen a ganar puntos.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {entries.map((entry, i) => {
            const isMe = entry.email === userEmail
            const nivel = getLevel(entry.total)
            return (
              <div key={entry.email} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 20px', borderRadius: '12px',
                background: isMe ? 'linear-gradient(135deg, #eef2ff, #f5f3ff)' : 'white',
                border: `1px solid ${isMe ? 'rgba(94,106,210,0.2)' : 'rgba(0,0,0,0.06)'}`,
                boxShadow: isMe ? '0 2px 8px rgba(94,106,210,0.1)' : '0 1px 2px rgba(0,0,0,0.03)',
              }}>
                {/* Position */}
                <div style={{
                  width: '36px', textAlign: 'center', fontSize: i < 3 ? '22px' : '16px',
                  fontWeight: 700, color: i < 3 ? undefined : '#94a3b8',
                }}>
                  {i < 3 ? MEDAL[i] : i + 1}
                </div>

                {/* Avatar */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: isMe ? 'linear-gradient(135deg, #5e6ad2, #8b5cf6)' : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 600,
                  color: isMe ? 'white' : '#64748b', flexShrink: 0,
                }}>
                  {entry.email[0].toUpperCase()}
                </div>

                {/* Name + level */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '15px', fontWeight: isMe ? 700 : 500,
                    color: isMe ? '#5e6ad2' : '#1e293b',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {entry.email.split('@')[0]}{isMe ? ' (tú)' : ''}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {nivel.emoji} Nivel {nivel.nivel}: {nivel.nombre}
                  </div>
                </div>

                {/* Points */}
                <div style={{
                  fontSize: '18px', fontWeight: 700,
                  color: isMe ? '#5e6ad2' : '#0f172a',
                  flexShrink: 0,
                }}>
                  {entry.total}
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginLeft: '4px' }}>pts</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const Page: NextPageWithLayout = () => <RankingPage />

Page.getLayout = (page: ReactElement) => (
  <CursoLayout activeNav="ranking">{page}</CursoLayout>
)

export default Page
