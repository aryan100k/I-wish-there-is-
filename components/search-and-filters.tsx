'use client'

import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIdeaContext } from './providers'
import { cn } from "@/lib/utils"

export default function SearchAndFilters() {
  const { categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useIdeaContext()

  return (
    <div className="mb-8 space-y-6">
      <div className="relative w-full max-w-sm">
        <Input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
        />
        <Search className="absolute left-3 top-3 h-5 w-5 text-white/50" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "rounded-full transition-colors",
            selectedCategory === null 
              ? "bg-white text-black hover:bg-white/90"
              : "bg-black/20 text-white border border-white/20 hover:bg-white/10"
          )}
        >
          🌟 All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="secondary"
            onClick={() => setSelectedCategory(category.name)}
            className={cn(
              "rounded-full transition-colors",
              selectedCategory === category.name 
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black/20 text-white border border-white/20 hover:bg-white/10"
            )}
          >
            {category.emoji} {category.name}
          </Button>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="rounded-full ml-auto transition-all duration-300 transform hover:scale-110 bg-white/10 text-white hover:bg-white/20">
              Top 🔥
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 text-white border border-white/20">
            <DropdownMenuItem className="hover:bg-gray-800">Most Recent</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800">Most Voted</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800">Trending</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

