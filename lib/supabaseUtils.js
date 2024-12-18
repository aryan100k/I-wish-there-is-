import { supabase } from './supabaseClient'

export async function getIdeas() {
  const { data, error } = await supabase.from('ideas').select('*')
  if (error) console.error('Error fetching ideas:', error)
  return data
}

export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*')
  if (error) console.error('Error fetching categories:', error)
  return data
}
