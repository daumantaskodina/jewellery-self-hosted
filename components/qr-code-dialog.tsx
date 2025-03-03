import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import Image from "next/image"

interface QRCodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function QRCodeDialog({ open, onOpenChange }: QRCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="sticky top-0 inset-x-0 bg-background/80 backdrop-blur-sm border-b">
          <div className="relative p-6 pb-4">
            <DialogHeader>
              <DialogTitle>Share via QR Code</DialogTitle>
              <DialogDescription>Scan to open this page on another device</DialogDescription>
            </DialogHeader>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-2 -m-2">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </div>
        <div className="p-6 pt-4">
          <div className="flex items-center justify-center">
            <Image
              src="https://pr6jindruf6ikbp6.public.blob.vercel-storage.com/QR%20Code%20Metal%20Alloys-VSOldHe52HNppoFBiWJV8KPOPZY5aW.webp"
              alt="QR Code to share this page"
              width={280}
              height={280}
              className="aspect-square"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

