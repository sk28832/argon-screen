// components/columns.tsx
import { ColumnDef } from "@tanstack/react-table"
import { ClinicalTrial } from "@/types"
import { Badge } from "@/components/ui/badge"
import { formatStatus, getStatusColor, formatStudyType, getStudyTypeColor } from "@/lib/format"

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
      >
        {row.getValue("nct_number")}
      </a>
    )
  },
  {
    accessorKey: "study_title",
    header: "Study Title",
  },
  {
    accessorKey: "study_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("study_status") as string
      const { background, text } = getStatusColor(status)
      return (
        <Badge 
          className={`${background} ${text} hover:${background} border-0`}
        >
          {formatStatus(status)}
        </Badge>
      )
    }
  },
  {
    accessorKey: "conditions",
    header: "Conditions",
  },
  {
    accessorKey: "sponsor",
    header: "Sponsor",
  },
  {
    accessorKey: "study_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("study_type") as string
      const { background, text } = getStudyTypeColor(type)
      return (
        <Badge 
          className={`${background} ${text} hover:${background} border-0`}
        >
          {formatStudyType(type)}
        </Badge>
      )
    }
  }
]