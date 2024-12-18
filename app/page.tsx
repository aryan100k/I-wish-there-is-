import IdeasGrid from '@/components/ideas-grid'
import SearchAndFilters from '@/components/search-and-filters'
import AddIdeaButton from '@/components/add-idea-button'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-black tracking-tighter">
            I WISH THERE<br />IS...
          </h1>
        </header>

        <SearchAndFilters />
        <IdeasGrid />
        <AddIdeaButton />
      </div>
    </div>
  )
}
