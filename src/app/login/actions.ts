'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createServerSupabaseClient } from '@/lib/supabase'

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

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  // type-casting here for convenience
  // TODO: in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function anonymousSignup() {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.signInAnonymously()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
