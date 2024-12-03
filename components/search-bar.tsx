// components/search-bar.tsx
import React from 'react'
import { X, Search, Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface SearchTerm {
  value: string
  nextOperator: 'AND' | 'OR'
}

interface SearchBarProps {
  value: string
  terms: SearchTerm[]
  defaultOperator: 'AND' | 'OR'
  onSearch: (value: string) => void
  onTermsChange: (terms: SearchTerm[]) => void
  onDefaultOperatorChange: (operator: 'AND' | 'OR') => void
  className?: string
}

export function SearchBar({ 
  value, 
  terms,
  defaultOperator,
  onSearch, 
  onTermsChange,
  onDefaultOperatorChange,
  className 
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      addTerm()
    }
  }

  const addTerm = () => {
    if (value.trim()) {
      const newTerm: SearchTerm = {
        value: value.trim(),
        nextOperator: defaultOperator
      }
      if (terms.length > 0) {
        const updatedTerms = [...terms]
        updatedTerms[updatedTerms.length - 1] = {
          ...updatedTerms[updatedTerms.length - 1],
          nextOperator: defaultOperator
        }
        onTermsChange([...updatedTerms, newTerm])
      } else {
        onTermsChange([newTerm])
      }
      onSearch('')
    }
  }

  const removeTerm = (index: number) => {
    const newTerms = terms.filter((_, i) => i !== index)
    onTermsChange(newTerms)
  }

  const updateOperator = (index: number, operator: 'AND' | 'OR') => {
    const newTerms = [...terms]
    newTerms[index] = {
      ...newTerms[index],
      nextOperator: operator
    }
    onTermsChange(newTerms)
  }

  return (
    <div className={className}>
      <div className="flex gap-2 w-full mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Type and press Enter or click + to add term to search..."
            value={value}
            onChange={(e) => onSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
          {value.trim() && (
            <Plus
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              onClick={addTerm}
            />
          )}
        </div>
        {terms.length > 0 && (
          <Select value={defaultOperator} onValueChange={onDefaultOperatorChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {terms.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {terms.map((term, index) => (
            <div key={index} className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 h-7 px-2"
              >
                {term.value}
                <X 
                  className="h-3 w-3 hover:text-destructive cursor-pointer ml-1" 
                  onClick={() => removeTerm(index)}
                />
              </Badge>
              {index < terms.length - 1 && (
                <Select
                  value={term.nextOperator}
                  onValueChange={(value: 'AND' | 'OR') => updateOperator(index, value)}
                >
                  <SelectTrigger className="h-7 text-xs px-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AND">AND</SelectItem>
                    <SelectItem value="OR">OR</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}