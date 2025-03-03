import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

interface AlloyInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  alloy: {
    name: string
    image: string
    description: string
    uses: string
    pricePerGram: number
  } | null
}

export default function AlloyInfoDialog({ open, onOpenChange, alloy }: AlloyInfoDialogProps) {
  if (!alloy) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="sticky top-0 inset-x-0 bg-background/80 backdrop-blur-sm border-b">
          <div className="relative p-6 pb-4">
            <DialogHeader>
              <DialogTitle>{alloy.name}</DialogTitle>
              <DialogDescription>Material Information</DialogDescription>
            </DialogHeader>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-2 -m-2">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </div>
        <div className="p-6 pt-4 space-y-6">
          <div className="w-full overflow-hidden rounded-lg">
            <img src={alloy.image || "/placeholder.svg"} alt={alloy.name} className="h-auto w-full object-contain" />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Description</h4>
              <p className="text-sm text-muted-foreground">{alloy.description}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Common Uses</h4>
              <p className="text-sm text-muted-foreground">{alloy.uses}</p>
            </div>
            <div className="rounded-md bg-muted p-3">
              <div className="text-sm">
                <span className="font-medium">Estimated Alloy Price: </span>
                <span className="text-muted-foreground">€{alloy.pricePerGram.toFixed(2)}/g</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

