import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}

async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // refreshing the auth token
  await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const url = request.nextUrl.clone()

  if (path.includes(routes.LOGIN) || path.includes(routes.SIGNUP)) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      url.pathname = routes.HOME
      return NextResponse.redirect(url)
    }

    return response
  }

  if (path.includes(routes.LIST) || path.includes(routes.HOME)) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      return response
    }

    url.pathname = routes.LOGIN
    return NextResponse.redirect(url)
  }

  return response
}

const routes = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  LIST: '/list',
  HOME: '/',
}
