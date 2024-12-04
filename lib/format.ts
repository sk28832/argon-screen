// lib/format.ts
export function formatStatus(status: string): string {
    return status
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  export function getStatusColor(status: string): {
    background: string,
    text: string
  } {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return { background: 'bg-green-100', text: 'text-green-800' }
      case 'NOT_YET_RECRUITING':
        return { background: 'bg-gray-100', text: 'text-gray-800' }
      case 'ACTIVE_NOT_RECRUITING':
        return { background: 'bg-blue-100', text: 'text-blue-800' }
      case 'RECRUITING':
        return { background: 'bg-indigo-100', text: 'text-indigo-800' }
      case 'ENROLLING_BY_INVITATION':
        return { background: 'bg-purple-100', text: 'text-purple-800' }
      case 'WITHDRAWN':
        return { background: 'bg-red-100', text: 'text-red-800' }
      case 'WITHHELD':
        return { background: 'bg-orange-100', text: 'text-orange-800' }
      case 'AVAILABLE':
        return { background: 'bg-teal-100', text: 'text-teal-800' }
      case 'TERMINATED':
        return { background: 'bg-rose-100', text: 'text-rose-800' }
      case 'TEMPORARILY_NOT_AVAILABLE':
      case 'SUSPENDED':
        return { background: 'bg-yellow-100', text: 'text-yellow-800' }
      default:
        return { background: 'bg-gray-100', text: 'text-gray-800' }
    }
  }
  
  export function formatStudyType(type: string): string {
    return type
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  export function getStudyTypeColor(type: string): {
    background: string,
    text: string
  } {
    switch (type.toUpperCase()) {
      case 'INTERVENTIONAL':
        return { background: 'bg-sky-100', text: 'text-sky-800' }
      case 'OBSERVATIONAL':
        return { background: 'bg-emerald-100', text: 'text-emerald-800' }
      case 'EXPANDED_ACCESS':
        return { background: 'bg-violet-100', text: 'text-violet-800' }
      default:
        return { background: 'bg-gray-100', text: 'text-gray-800' }
    }
  }