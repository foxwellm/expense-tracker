'use server'

import { redirect } from 'next/navigation'

import { createServerSupabaseClient } from '@/lib/supabase'

const isProd = process.env.NODE_ENV === 'production'

const siteUrl = isProd
  ? 'https://www.foxwellexpensetracker.com'
  : 'http://localhost:3000'

export async function login(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  // type-casting here for convenience
  // TODO: in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  redirect('/chart/bar?sidebar=open')
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  // type-casting here for convenience
  // TODO: in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      // captchaToken: '',
      emailRedirectTo: siteUrl,
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  redirect('/') // after signup - check email (unlock from auth)
}

export async function anonymousSignup() {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.signInAnonymously()

  if (error) {
    redirect('/error')
  }

  redirect('/chart/bar?sidebar=open')
}

export async function logout() {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  redirect('/login')
}
