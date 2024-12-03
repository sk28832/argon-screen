// types/index.ts
export interface ClinicalTrial {
    nct_number: string
    study_title: string
    study_status: string
    conditions: string
    sponsor: string
    study_type: string
    study_url: string
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

  export interface SearchTerm {
    value: string
    nextOperator: 'AND' | 'OR'
  }
  