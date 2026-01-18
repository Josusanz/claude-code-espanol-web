import {
  lemonSqueezySetup,
  createCheckout,
  getCustomer,
  listOrders,
} from '@lemonsqueezy/lemonsqueezy.js'

// Inicializar Lemon Squeezy
export function initLemonSqueezy() {
  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY!,
    onError: (error) => console.error('Lemon Squeezy error:', error),
  })
}

// Crear checkout para el curso
export async function createCourseCheckout(email: string, successUrl: string) {
  initLemonSqueezy()

  const storeId = process.env.LEMONSQUEEZY_STORE_ID!
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID!

  const checkout = await createCheckout(storeId, variantId, {
    checkoutData: {
      email,
      custom: {
        user_email: email,
      },
    },
    checkoutOptions: {
      embed: false,
      media: true,
      logo: true,
    },
    productOptions: {
      redirectUrl: successUrl,
      receiptButtonText: 'Acceder al curso',
      receiptLinkUrl: successUrl,
    },
  })

  return checkout.data?.data.attributes.url
}

// Verificar si un email ha comprado el curso
export async function hasUserPurchased(email: string): Promise<boolean> {
  initLemonSqueezy()

  try {
    const orders = await listOrders({
      filter: {
        userEmail: email,
        storeId: process.env.LEMONSQUEEZY_STORE_ID!,
      },
    })

    // Filtrar por producto específico y estado pagado
    const productId = process.env.LEMONSQUEEZY_PRODUCT_ID
    const completedOrders = orders.data?.data.filter(
      (order) => {
        const isPaid = order.attributes.status === 'paid'
        // Si hay productId configurado, filtrar por él
        if (productId) {
          return isPaid && String(order.attributes.first_order_item?.product_id) === productId
        }
        return isPaid
      }
    )

    return completedOrders && completedOrders.length > 0
  } catch (error) {
    console.error('Error checking purchase:', error)
    return false
  }
}

// Tipos para el webhook
export interface LemonSqueezyWebhookPayload {
  meta: {
    event_name: string
    custom_data?: {
      user_email?: string
    }
  }
  data: {
    id: string
    type: string
    attributes: {
      status: string
      user_email: string
      total: number
      currency: string
      created_at: string
      product_id: number
      variant_id: number
    }
  }
}
