'use client'

import { useState } from 'react'
import { AddIdeaModal } from './add-idea-modal'
import { Button } from '@/components/ui/button'

export default function AddIdeaButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-white text-black hover:bg-gray-200 shadow-lg"
        size="icon"
      >
        <span className="text-4xl">💡</span>
      </Button>
      <AddIdeaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
