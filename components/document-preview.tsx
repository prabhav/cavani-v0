"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentPreviewProps {
  isOpen: boolean
  onClose: () => void
  document: {
    id: number
    name: string
    type: string
    date: string
    category: string
    description?: string
    url?: string
  } | null
  documents: Array<{
    id: number
    name: string
    type: string
    date: string
    category: string
    description?: string
    url?: string
  }>
  categories: Array<{
    id: string
    name: string
    icon: any
    color: string
  }>
}

export function DocumentPreview({ isOpen, onClose, document, documents, categories }: DocumentPreviewProps) {
  const [currentDocIndex, setCurrentDocIndex] = useState(() => {
    if (!document || !documents.length) return 0
    return documents.findIndex((doc) => doc.id === document.id)
  })

  const [zoomLevel, setZoomLevel] = useState(100)
  const [rotation, setRotation] = useState(0)

  if (!document) return null

  const currentDocument = documents[currentDocIndex]
  const category = categories.find((c) => c.id === currentDocument.category)

  const goToNextDocument = () => {
    setZoomLevel(100)
    setRotation(0)
    setCurrentDocIndex((currentDocIndex + 1) % documents.length)
  }

  const goToPreviousDocument = () => {
    setZoomLevel(100)
    setRotation(0)
    setCurrentDocIndex((currentDocIndex - 1 + documents.length) % documents.length)
  }

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50))
  }

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[90vw] h-[80vh] max-h-[800px] flex flex-col p-0">
        <DialogHeader className="px-4 py-2 border-b flex-shrink-0 flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <DialogTitle className="text-lg">{currentDocument.name}</DialogTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  currentDocument.category === "legal" && "bg-blue-50 text-blue-700 border-blue-200",
                  currentDocument.category === "evidence" && "bg-green-50 text-green-700 border-green-200",
                  currentDocument.category === "financial" && "bg-amber-50 text-amber-700 border-amber-200",
                  currentDocument.category === "correspondence" && "bg-purple-50 text-purple-700 border-purple-200",
                )}
              >
                {currentDocument.type}
              </Badge>
              <span className="text-sm text-gray-500">{currentDocument.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="h-8">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs defaultValue="preview" className="flex-1 flex flex-col">
            <div className="px-4 pt-2 border-b">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="preview" className="flex-1 overflow-auto p-4 relative">
              <div className="absolute top-4 right-4 z-10 flex gap-2 bg-white/80 p-1 rounded-md shadow-sm">
                <Button variant="ghost" size="icon" onClick={zoomOut} className="h-8 w-8">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="flex items-center text-sm">{zoomLevel}%</span>
                <Button variant="ghost" size="icon" onClick={zoomIn} className="h-8 w-8">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={rotate} className="h-8 w-8">
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-center h-full">
                {/* Document preview - in a real app, this would be a PDF viewer or image viewer */}
                <div
                  className="bg-gray-100 border rounded-md flex items-center justify-center overflow-hidden"
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "800px",
                    transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                    transition: "transform 0.2s ease",
                  }}
                >
                  {currentDocument.type === "PDF" ? (
                    <div className="text-center p-8">
                      <div className="w-full h-[400px] bg-white rounded-md shadow-md flex items-center justify-center mb-4">
                        <img src="/pdf-document-preview.png" alt="PDF Preview" className="max-h-full" />
                      </div>
                      <p className="text-gray-500">PDF Preview for {currentDocument.name}</p>
                    </div>
                  ) : currentDocument.type === "IMAGE" ? (
                    <div className="text-center p-8">
                      <div className="w-full h-[400px] bg-white rounded-md shadow-md flex items-center justify-center mb-4">
                        <img src="/placeholder.svg?key=zv4nt" alt="Image Preview" className="max-h-full" />
                      </div>
                      <p className="text-gray-500">Image Preview for {currentDocument.name}</p>
                    </div>
                  ) : currentDocument.type === "SPREADSHEET" ? (
                    <div className="text-center p-8">
                      <div className="w-full h-[400px] bg-white rounded-md shadow-md flex items-center justify-center mb-4">
                        <img src="/placeholder.svg?key=x8sei" alt="Spreadsheet Preview" className="max-h-full" />
                      </div>
                      <p className="text-gray-500">Spreadsheet Preview for {currentDocument.name}</p>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-full h-[400px] bg-white rounded-md shadow-md flex items-center justify-center mb-4">
                        <img src="/document-preview.png" alt="Document Preview" className="max-h-full" />
                      </div>
                      <p className="text-gray-500">Preview for {currentDocument.name}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation buttons */}
              {documents.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToPreviousDocument}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 shadow-sm"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToNextDocument}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 shadow-sm"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </TabsContent>

            <TabsContent value="details" className="flex-1 overflow-auto p-6">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Document Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-md p-4 bg-gray-50">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">File Name</p>
                      <p className="font-medium">{currentDocument.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">File Type</p>
                      <p className="font-medium">{currentDocument.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Category</p>
                      <p className="font-medium flex items-center gap-1">
                        {category?.name || "Uncategorized"}
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            currentDocument.category === "legal" && "bg-blue-50 text-blue-700 border-blue-200",
                            currentDocument.category === "evidence" && "bg-green-50 text-green-700 border-green-200",
                            currentDocument.category === "financial" && "bg-amber-50 text-amber-700 border-amber-200",
                            currentDocument.category === "correspondence" &&
                              "bg-purple-50 text-purple-700 border-purple-200",
                          )}
                        >
                          {currentDocument.type}
                        </Badge>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Upload Date</p>
                      <p className="font-medium">{currentDocument.date}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="font-medium">{currentDocument.description || "No description provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">File Size</p>
                      <p className="font-medium">2.4 MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Related Information</h3>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Related Case</p>
                      <p className="font-medium">Ram Singh vs State of Delhi</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Uploaded By</p>
                      <p className="font-medium">Priya Sharma</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Document History</h3>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-blue-700">PS</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Priya Sharma uploaded this document</p>
                          <p className="text-xs text-gray-500">{currentDocument.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-green-700">RV</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Rahul Verma viewed this document</p>
                          <p className="text-xs text-gray-500">Yesterday, 3:45 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-purple-700">PS</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Priya Sharma categorized this document as {category?.name}
                          </p>
                          <p className="text-xs text-gray-500">Yesterday, 3:50 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
