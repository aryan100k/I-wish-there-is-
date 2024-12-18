'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Idea, Category } from '@/types/idea'
import { getIdeas, getCategories } from '@/lib/supabaseUtils'

interface IdeaContextType {
  ideas: Idea[]
  setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>
  categories: Category[]
  selectedCategory: string | null
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const IdeaContext = createContext<IdeaContextType | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchData() {
      const ideasData = await getIdeas()
      const categoriesData = await getCategories()

      if (ideasData) setIdeas(ideasData)
      if (categoriesData) setCategories(categoriesData)
    }

    fetchData()
  }, [])

  return (
    <IdeaContext.Provider value={{
      ideas,
      setIdeas,
      categories,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </IdeaContext.Provider>
  )
}

export function useIdeaContext() {
  const context = useContext(IdeaContext)
  if (context === undefined) {
    throw new Error('useIdeaContext must be used within a Providers component')
  }
  return context
}

