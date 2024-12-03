// components/filter-panel.tsx
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Checkbox } from "./ui/checkbox"
import { ScrollArea } from "./ui/scroll-area"
import { Input } from "./ui/input"
import { formatStatus, formatStudyType } from "@/lib/format"
import { SearchTerm, TrialFilters } from "@/types"

interface FilterPanelProps {
  filters: TrialFilters
  updateFilters: (filters: Partial<TrialFilters>) => void
  clearFilters: () => void
  stats: {
    totalTrials: number
    byStatus: Record<string, number>
    byType: Record<string, number>
  }
  className?: string
  isMobile?: boolean
}

export function FilterPanel({ 
  filters, 
  updateFilters,
  clearFilters, 
  stats, 
  className,
  isMobile 
}: FilterPanelProps) {
  return (
    <div className={className}>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <Separator />

        {/* Sponsor search */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Sponsor</h3>
          <Input
            placeholder="Search sponsors..."
            value={filters.sponsorSearch}
            onChange={(e) => updateFilters({ sponsorSearch: e.target.value })}
          />
        </div>

        {/* Status filter */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Status</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2 pr-4">
              {Object.entries(stats.byStatus).map(([status, count]) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={filters.status.includes(status)}
                    onCheckedChange={(checked) => {
                      updateFilters({
                        status: checked
                          ? [...filters.status, status]
                          : filters.status.filter(s => s !== status)
                      })
                    }}
                  />
                  <label
                    htmlFor={`status-${status}`}
                    className="text-sm flex-1 cursor-pointer"
                  >
                    {formatStatus(status)}
                  </label>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Study type filter */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Study Type</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2 pr-4">
              {Object.entries(stats.byType).map(([type, count]) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.studyTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      updateFilters({
                        studyTypes: checked
                          ? [...filters.studyTypes, type]
                          : filters.studyTypes.filter(t => t !== type)
                      })
                    }}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm flex-1 cursor-pointer"
                  >
                    {formatStudyType(type)}
                  </label>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        {/* Active filters */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {filters.searchTerms.map((term, index) => (
              <Badge
                key={`term-${index}`}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  const newTerms = filters.searchTerms.filter((_, i) => i !== index)
                  updateFilters({ searchTerms: newTerms })
                }}
              >
                Search: {term.value} ×
              </Badge>
            ))}
            {filters.status.map(status => (
              <Badge
                key={status}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => updateFilters({
                  status: filters.status.filter(s => s !== status)
                })}
              >
                {formatStatus(status)} ×
              </Badge>
            ))}
            {filters.studyTypes.map(type => (
              <Badge
                key={type}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => updateFilters({
                  studyTypes: filters.studyTypes.filter(t => t !== type)
                })}
              >
                {formatStudyType(type)} ×
              </Badge>
            ))}
            {filters.sponsorSearch && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => updateFilters({ sponsorSearch: '' })}
              >
                Sponsor: {filters.sponsorSearch} ×
              </Badge>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}