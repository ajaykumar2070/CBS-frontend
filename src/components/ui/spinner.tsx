import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

interface SpinnerProps {
  className?: string
}

function Spinner({ className }: SpinnerProps) {
  return (
    <HugeiconsIcon icon={Loading03Icon} size={16} role="status" aria-label="Loading" className={cn("animate-spin", className)} />
  )
}

export { Spinner }
