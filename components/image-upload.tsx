"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"

export function ImageUpload({ onImageSelect }: { onImageSelect: (file: File) => void }) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageSelect(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative">
      {preview ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gold-light/30">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover animate-fade-in" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white border border-gold-light/20"
            onClick={() => setPreview(null)}
          >
            <X className="h-4 w-4 text-gold-dark" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gold-light/30 rounded-xl cursor-pointer hover:border-gold-light/50 transition-colors bg-white/50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImagePlus className="h-8 w-8 text-gold-dark/60 mb-2" />
            <p className="text-sm text-gold-dark/80 font-cormorant">Click to upload a photo</p>
          </div>
          <input type="file" className="hidden" onChange={handleImageSelect} accept="image/*" />
        </label>
      )}
    </div>
  )
}

