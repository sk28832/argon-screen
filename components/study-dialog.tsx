import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog"
  import { Badge } from "@/components/ui/badge"
  import { ClinicalTrial } from "@/types"
  import { formatStatus, getStatusColor, formatStudyType, getStudyTypeColor } from "@/lib/format"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { ExternalLink } from "lucide-react"
  import { Separator } from "@/components/ui/separator"
  import { cn } from "@/lib/utils"
  
  interface StudyDialogProps {
    study: ClinicalTrial | null
    open: boolean
    onOpenChange: (open: boolean) => void
  }
  
  export function StudyDialog({ study, open, onOpenChange }: StudyDialogProps) {
    if (!study) return null
  
    const statusColors = getStatusColor(study.study_status)
    const typeColors = getStudyTypeColor(study.study_type)
  
    const InfoSection = ({ title, content }: { title: string; content: string }) => (
      <div className="space-y-1.5">
        <h3 className="text-sm font-medium leading-none">{title}</h3>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    )
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col gap-0">
          <DialogHeader className="gap-1.5">
            <div className="flex items-center gap-2">
              <a 
                href={study.study_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {study.nct_number}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <DialogTitle className="text-xl leading-tight">
              {study.study_title}
            </DialogTitle>
          </DialogHeader>
  
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 py-4">
              <div className="flex flex-wrap gap-2">
                <Badge 
                  className={cn(
                    statusColors.background,
                    statusColors.text,
                    `hover:${statusColors.background}`,
                    "border-0"
                  )}
                >
                  {formatStatus(study.study_status)}
                </Badge>
                <Badge 
                  className={cn(
                    typeColors.background,
                    typeColors.text,
                    `hover:${typeColors.background}`,
                    "border-0"
                  )}
                >
                  {formatStudyType(study.study_type)}
                </Badge>
              </div>
  
              <Separator />
  
              <div className="grid gap-6">
                <InfoSection 
                  title="Sponsor" 
                  content={study.sponsor}
                />
  
                <InfoSection 
                  title="Conditions" 
                  content={study.conditions}
                />
              </div>
  
              <Separator />
  
              <div className="text-xs text-muted-foreground">
                <p>
                  View full study details at{" "}
                  <a 
                    href={study.study_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ClinicalTrials.gov
                  </a>
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }