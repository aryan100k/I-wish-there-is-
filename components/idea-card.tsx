'use client'

import { Idea } from '@/types/idea'
import { useIdeaContext } from './providers'
import { Button } from '@/components/ui/button'
import confetti from 'canvas-confetti'
import { supabase } from '@/lib/supabaseClient'

interface IdeaCardProps {
  idea: Idea
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const { categories, setIdeas } = useIdeaContext()

  const handleVote = async () => {
    // Update in Supabase
    const { data, error } = await supabase
      .from('ideas')
      .update({ votes: idea.votes + 1 })
      .eq('id', idea.id)
      .select()

    if (error) {
      console.error('Error updating vote:', error)
      return
    }

    // Update local state
    if (data) {
      setIdeas(prevIdeas =>
        prevIdeas.map(prevIdea =>
          prevIdea.id === idea.id ? data[0] : prevIdea
        )
      )
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#808080', '#404040']
      })
    }
  }

  return (
    <div className="bg-white/5 p-7 rounded-2xl relative group hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-white/10">
      <h2 className="text-2xl font-bold mb-4 text-white">"{idea.title}"</h2>
      <div className="flex flex-wrap gap-3 mb-4">
        {idea.categories.map(category => {
          const categoryInfo = categories.find(c => c.name === category)
          return (
            <span
              key={category}
              className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-white/20 text-white"
            >
              {categoryInfo?.emoji} {category}
            </span>
          )
        })}
      </div>
      <Button 
        onClick={handleVote}
        variant="ghost"
        className="absolute bottom-4 right-4 text-white/60 hover:text-white transition-colors duration-300"
      >
        <svg
          className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7 7 7M5 19l7-7 7 7"
          />
        </svg>
        <span>{idea.votes}</span>
      </Button>
    </div>
  )
}

