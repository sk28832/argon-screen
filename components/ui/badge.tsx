import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        completed: "border-transparent bg-green-100 text-green-800",
        "not-yet-recruiting": "border-transparent bg-gray-100 text-gray-800",
        "active-not-recruiting": "border-transparent bg-blue-100 text-blue-800",
        recruiting: "border-transparent bg-indigo-100 text-indigo-800",
        withdrawn: "border-transparent bg-red-100 text-red-800",
        withheld: "border-transparent bg-orange-100 text-orange-800",
        interventional: "border-transparent bg-sky-100 text-sky-800",
        observational: "border-transparent bg-emerald-100 text-emerald-800",
        "expanded-access": "border-transparent bg-violet-100 text-violet-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }