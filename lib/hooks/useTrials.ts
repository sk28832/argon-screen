// lib/hooks/useTrials.ts
import { useState, useMemo } from 'react'
import { ClinicalTrial } from '@/types'

interface SearchTerm {
  value: string
  nextOperator: 'AND' | 'OR'
}

export interface TrialFilters {
  status: string[]
  studyTypes: string[]
  conditions: string[]
  sponsorSearch: string
  textSearch: string
  searchTerms: SearchTerm[]
  defaultOperator: 'AND' | 'OR'
}

export function useTrials(initialTrials: ClinicalTrial[]) {
  const [filters, setFilters] = useState<TrialFilters>({
    status: [],
    studyTypes: [],
    conditions: [],
    sponsorSearch: '',
    textSearch: '',
    searchTerms: [],
    defaultOperator: 'AND'
  })

const searchFilteredTrials = useMemo(() => {
  return initialTrials.filter(trial => {
    const searchableText = [
      trial.study_title,
      trial.conditions,
      trial.sponsor,
      trial.nct_number
    ].join(' ').toLowerCase()

    // Search terms with per-term operators
    if (filters.searchTerms.length > 0) {
      let matches = searchableText.includes(filters.searchTerms[0].value.toLowerCase())
      
      for (let i = 0; i < filters.searchTerms.length - 1; i++) {
        const currentTerm = filters.searchTerms[i]
        const nextTerm = filters.searchTerms[i + 1]
        const nextMatches = searchableText.includes(nextTerm.value.toLowerCase())
        
        if (currentTerm.nextOperator === 'AND') {
          matches = matches && nextMatches
        } else {
          matches = matches || nextMatches
        }
      }

      // If there's a current search term, add it to the filter using the current operator
      if (filters.textSearch) {
        const currentMatches = searchableText.includes(filters.textSearch.toLowerCase())
        if (filters.defaultOperator === 'AND') {
          matches = matches && currentMatches
        } else {
          matches = matches || currentMatches
        }
        if (!matches) return false
      }
      
      if (!matches) return false
    } else if (filters.textSearch) {
      // If no terms but there's a current search
      if (!searchableText.includes(filters.textSearch.toLowerCase())) {
        return false
      }
    }

    // Sponsor search remains unchanged
    if (filters.sponsorSearch && !trial.sponsor?.toLowerCase().includes(filters.sponsorSearch.toLowerCase())) {
      return false
    }

    return true
  })
}, [initialTrials, filters.searchTerms, filters.textSearch, filters.sponsorSearch, filters.defaultOperator])

  // Calculate statistics based on trials after search filters
  const stats = useMemo(() => {
    const byStatus: Record<string, number> = {}
    const byType: Record<string, number> = {}
    
    searchFilteredTrials.forEach(trial => {
      if (trial.study_status) {
        byStatus[trial.study_status] = (byStatus[trial.study_status] || 0) + 1
      }
      if (trial.study_type) {
        byType[trial.study_type] = (byType[trial.study_type] || 0) + 1
      }
    })

    return {
      totalTrials: searchFilteredTrials.length,
      byStatus,
      byType
    }
  }, [searchFilteredTrials])

  // Then apply checkbox filters
  const trials = useMemo(() => {
    return searchFilteredTrials.filter(trial => {
      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(trial.study_status)) {
        return false
      }

      // Study type filter
      if (filters.studyTypes.length > 0 && !filters.studyTypes.includes(trial.study_type)) {
        return false
      }

      return true
    })
  }, [searchFilteredTrials, filters.status, filters.studyTypes])

  const updateFilters = (newFilters: Partial<TrialFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }))
  }

  const clearFilters = () => {
    setFilters({
      status: [],
      studyTypes: [],
      conditions: [],
      sponsorSearch: '',
      textSearch: '',
      searchTerms: [],
      defaultOperator: 'AND'
    })
  }

  return {
    trials,
    filters,
    updateFilters,
    clearFilters,
    stats
  }
}