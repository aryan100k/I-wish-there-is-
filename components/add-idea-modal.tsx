'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useIdeaContext } from './providers'
import { cn } from '@/lib/utils'

interface AddIdeaModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddIdeaModal({ isOpen, onClose }: AddIdeaModalProps) {
  const { categories, setIdeas } = useIdeaContext()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [idea, setIdea] = useState('')

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleSubmit = () => {
    if (idea.trim() && selectedCategories.length > 0) {
      setIdeas(prevIdeas => [
        ...prevIdeas,
        {
          id: prevIdeas.length + 1,
          title: idea,
          categories: selectedCategories,
          votes: 0
        }
      ])
      onClose()
      setIdea('')
      setSelectedCategories([])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 text-white border border-white/20">
        <DialogTitle className="text-2xl font-bold mb-4">Add a New Idea</DialogTitle>
        <div className="flex flex-col gap-6">
          <Input
            placeholder="< your idea 💡 >"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="text-xl font-medium bg-white/10 border-white/20 text-white placeholder-white/50"
          />
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                onClick={() => toggleCategory(category.name)}
                className={cn(
                  "rounded-full transition-colors",
                  selectedCategories.includes(category.name)
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black/20 text-white border border-white/20 hover:bg-white/10"
                )}
              >
                {category.emoji} {category.name}
              </Button>
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-white hover:bg-gray-200 text-black py-6 rounded-lg text-lg font-medium"
          >
            POST
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

