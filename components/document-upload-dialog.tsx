"use client"

import React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, X, FileText, FileImage, FileSpreadsheet, FileArchive } from "lucide-react"

interface DocumentUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  categories: Array<{
    id: string
    name: string
    icon: any
    color: string
  }>
  onUpload: (document: any) => void
}

export function DocumentUploadDialog({ isOpen, onClose, categories, onUpload }: DocumentUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file || !category) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      // Create a new document object
      const newDocument = {
        id: Math.floor(Math.random() * 1000),
        name: file.name,
        type: getFileType(file.name),
        date: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
        category,
        description,
        size: formatFileSize(file.size),
      }

      onUpload(newDocument)
      setIsUploading(false)
      resetForm()
      onClose()
    }, 1500)
  }

  const resetForm = () => {
    setFile(null)
    setCategory("")
    setDescription("")
  }

  const getFileType = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase()

    if (["pdf"].includes(extension || "")) return "PDF"
    if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) return "IMAGE"
    if (["xls", "xlsx", "csv"].includes(extension || "")) return "SPREADSHEET"
    if (["doc", "docx", "txt"].includes(extension || "")) return "DOC"

    return "DOC"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const getFileIcon = (filename: string) => {
    const type = getFileType(filename)

    switch (type) {
      case "PDF":
        return <FileText className="h-12 w-12 text-blue-500" />
      case "IMAGE":
        return <FileImage className="h-12 w-12 text-green-500" />
      case "SPREADSHEET":
        return <FileSpreadsheet className="h-12 w-12 text-amber-500" />
      default:
        return <FileArchive className="h-12 w-12 text-purple-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileUp className="h-10 w-10 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop your file here, or click to browse</p>
              <p className="text-xs text-gray-400 mb-4">Supports PDF, Word, Excel, and image files up to 10MB</p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              />
              <Button asChild variant="outline" size="sm">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Browse Files
                </label>
              </Button>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-4">
                {getFileIcon(file.name)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="category">Document Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((c) => c.id !== "all")
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        {React.createElement(category.icon, { className: `h-4 w-4 ${category.color}` })}
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a description for this document"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline" disabled={isUploading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleUpload} disabled={!file || !category || isUploading} className="gap-2">
            {isUploading ? "Uploading..." : "Upload Document"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
