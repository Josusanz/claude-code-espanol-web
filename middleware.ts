import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren autenticación
const protectedRoutes = ['/curso']

// Rutas que redirigen a /curso si ya está autenticado
const authRoutes = ['/acceso']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('session')

  // Verificar rutas protegidas
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Si intenta acceder a ruta protegida sin sesión
  if (isProtectedRoute && !sessionCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/acceso'
    return NextResponse.redirect(url)
  }

  // Si intenta acceder a /acceso con sesión activa
  if (isAuthRoute && sessionCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/curso'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/curso/:path*', '/acceso']
}
