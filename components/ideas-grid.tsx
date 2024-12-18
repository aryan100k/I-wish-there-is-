'use client'

import { useIdeaContext } from './providers'
import IdeaCard from './idea-card'

export default function IdeasGrid() {
  const { ideas, selectedCategory, searchQuery } = useIdeaContext()

  const filteredIdeas = ideas.filter(idea => {
    const matchesCategory = selectedCategory ? idea.categories.includes(selectedCategory) : true
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredIdeas.map(idea => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  )
}

