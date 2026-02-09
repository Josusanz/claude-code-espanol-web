import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren autenticación
const protectedRoutes = ['/fundamentos', '/empezar', '/proyectos']

// Rutas que redirigen a /fundamentos si ya está autenticado
const authRoutes = ['/acceso']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('session')

  // Verificar rutas protegidas
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Si intenta acceder a ruta protegida sin sesión
  if (isProtectedRoute && !sessionCookie?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/acceso'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Si intenta acceder a /acceso con sesión activa
  if (isAuthRoute && sessionCookie?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/empezar/introduccion'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // /curso/* tiene su propio sistema de auth (CursoEmailGate), no usar middleware
  matcher: ['/acceso', '/fundamentos/:path*', '/empezar/:path*', '/proyectos/:path*']
}
