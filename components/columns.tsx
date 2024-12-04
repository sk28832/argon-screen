// components/columns.tsx
import { ColumnDef } from "@tanstack/react-table"
import { ClinicalTrial } from "@/types"
import { Badge } from "@/components/ui/badge"
import { formatStatus, getStatusColor, formatStudyType, getStudyTypeColor } from "@/lib/format"
import { Tooltip } from "@/components/ui/tooltip"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const columns: ColumnDef<ClinicalTrial>[] = [
  {
    accessorKey: "nct_number",
    header: "NCT Number",
    cell: ({ row }) => (
      <a 
        href={row.original.study_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {row.getValue("nct_number")}
      </a>
    ),
    size: 120,
  },
  {
    accessorKey: "study_title",
    header: "Study Title",
    cell: ({ row }) => {
      const title = row.getValue("study_title") as string
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[300px] truncate">
                {title}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[400px]">
              <p className="text-sm">{title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    size: 300,
  },
  {
    accessorKey: "study_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("study_status") as string
      const { background, text } = getStatusColor(status)
      return (
        <Badge className={`${background} ${text} whitespace-normal text-center h-auto py-1`} variant="secondary">
          {formatStatus(status)}
        </Badge>
      )
    },
    size: 160,
  },
  {
    accessorKey: "conditions",
    header: "Conditions",
    cell: ({ row }) => {
      const conditions = row.getValue("conditions") as string
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[200px] truncate">
                {conditions}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[400px]">
              <p className="text-sm">{conditions}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    size: 200,
  },
  {
    accessorKey: "sponsor",
    header: "Sponsor",
    cell: ({ row }) => {
      const sponsor = row.getValue("sponsor") as string
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[200px] truncate">
                {sponsor}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm">{sponsor}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    size: 200,
  },
  {
    accessorKey: "study_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("study_type") as string
      const { background, text } = getStudyTypeColor(type)
      return (
        <Badge className={`${background} ${text}`} variant="secondary">
          {formatStudyType(type)}
        </Badge>
      )
    },
    size: 120,
  }
]