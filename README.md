# Clinical Trials Explorer

A modern web application for exploring and filtering clinical trials data with advanced search capabilities.

## Features

- **Advanced Search**: Complex search queries with AND/OR operators
  - Add multiple search terms
  - Combine terms using AND/OR logic
  - Real-time search results
  - Edit operators between terms after adding them

- **Comprehensive Filtering**:
  - Filter by trial status
  - Filter by study type
  - Search by sponsor
  - Combine multiple filter types

- **Interactive Data Table**:
  - Sortable columns
  - Pagination
  - Adjustable rows per page
  - Direct links to trial details

- **Responsive Design**:
  - Works on desktop and mobile devices
  - Mobile-friendly filter panel
  - Adaptive layout

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
cd clinical-trials-explorer
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage Guide

### Search Functionality

1. **Basic Search**:
   - Type your search term in the search bar
   - Press Enter or click the + icon to add it to your search

2. **Complex Search**:
   - Add multiple search terms
   - Use the dropdown between terms to select AND/OR operators
   - Edit operators at any time by clicking on them
   - Remove terms by clicking the X icon

3. **Filter Panel**:
   - Use the left sidebar to filter by status or study type
   - Search for specific sponsors
   - View active filters at the bottom of the panel
   - Clear all filters with one click

### Data Table

- Click column headers to sort
- Use the pagination controls at the bottom
- Adjust the number of rows displayed
- Click on NCT numbers to view full trial details

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- TanStack Table

## Local Development

The application has hot reloading enabled. Any changes you make to the source files will be immediately reflected in the browser.

To modify the source code:

1. Pages are in `app/`
2. Components are in `components/`
3. Hooks and utilities are in `lib/`
4. Common types are in `types/`
