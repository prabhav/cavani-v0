"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, FileText, Plus, FileArchive, FileImage, FileSpreadsheet } from "lucide-react"
import { DocumentPreview } from "./document-preview"
import { DocumentUploadDialog } from "./document-upload-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Define document categories and their properties
const documentCategories = [
  { id: "all", name: "All Documents", icon: FileText, color: "text-gray-500" },
  { id: "legal", name: "Legal Documents", icon: FileText, color: "text-blue-500" },
  { id: "evidence", name: "Evidence", icon: FileImage, color: "text-green-500" },
  { id: "financial", name: "Financial", icon: FileSpreadsheet, color: "text-amber-500" },
  { id: "correspondence", name: "Correspondence", icon: FileArchive, color: "text-purple-500" },
]

// Document type icons mapping
const documentTypeIcons = {
  PDF: FileText,
  IMAGE: FileImage,
  SPREADSHEET: FileSpreadsheet,
  DOC: FileText,
}

export function DocumentTrail() {
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "NDA Agreement",
      type: "PDF",
      date: "23 Jan 2023",
      category: "legal",
      description: "Non-disclosure agreement between parties",
    },
    {
      id: 2,
      name: "Rent Agreement",
      type: "PDF",
      date: "23 Jan 2023",
      category: "legal",
      description: "Property rental agreement",
    },
    {
      id: 3,
      name: "Affidavit",
      type: "PDF",
      date: "23 Jan 2023",
      category: "legal",
      description: "Sworn statement for court proceedings",
    },
    {
      id: 4,
      name: "Property Photos",
      type: "IMAGE",
      date: "23 Jan 2023",
      category: "evidence",
      description: "Photographic evidence of property condition",
    },
    {
      id: 5,
      name: "Bank Statements",
      type: "SPREADSHEET",
      date: "24 Jan 2023",
      category: "financial",
      description: "Financial records for the past 6 months",
    },
    {
      id: 6,
      name: "Client Email",
      type: "DOC",
      date: "25 Jan 2023",
      category: "correspondence",
      description: "Email communication with client",
    },
    {
      id: 7,
      name: "Court Notice",
      type: "PDF",
      date: "26 Jan 2023",
      category: "legal",
      description: "Official notice from the court",
    },
    {
      id: 8,
      name: "Expense Report",
      type: "SPREADSHEET",
      date: "27 Jan 2023",
      category: "financial",
      description: "Detailed breakdown of case expenses",
    },
  ])

  const openDocumentPreview = (document) => {
    setSelectedDocument(document)
    setPreviewOpen(true)
  }

  const closeDocumentPreview = () => {
    setPreviewOpen(false)
  }

  const openUploadDialog = () => {
    setUploadOpen(true)
  }

  const closeUploadDialog = () => {
    setUploadOpen(false)
  }

  const handleUploadDocument = (newDocument) => {
    setDocuments([newDocument, ...documents])
  }

  // Filter documents based on active category
  const filteredDocuments =
    activeCategory === "all" ? documents : documents.filter((doc) => doc.category === activeCategory)

  // Get count of documents by category
  const documentCounts = documentCategories.reduce((acc, category) => {
    acc[category.id] =
      category.id === "all" ? documents.length : documents.filter((doc) => doc.category === category.id).length
    return acc
  }, {})

  return (
    <>
      <Card className="mt-6 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <h2 className="text-lg font-medium">Document Trail</h2>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 hover:bg-gray-100 transition-colors">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">View</span>
              </Button>

              <Button variant="outline" size="sm" className="gap-1 hover:bg-gray-100 transition-colors">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download All</span>
                <span className="sm:hidden">Download</span>
              </Button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="mb-4 overflow-x-auto pb-1">
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="bg-gray-100 p-1">
                {documentCategories.map((category) => {
                  const CategoryIcon = category.icon
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2 data-[state=active]:bg-white"
                    >
                      <CategoryIcon className={cn("h-4 w-4", category.color)} />
                      <span>{category.name}</span>
                      <Badge variant="outline" className="ml-1 bg-white text-xs">
                        {documentCounts[category.id]}
                      </Badge>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>
          </div>

          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDocuments.map((doc) => {
                const DocIcon = documentTypeIcons[doc.type] || FileText
                const category = documentCategories.find((c) => c.id === doc.category)

                return (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
                    onClick={() => openDocumentPreview(doc)}
                  >
                    <div className="h-24 bg-gray-50 rounded flex items-center justify-center mb-3 relative group">
                      <DocIcon className={cn("h-10 w-10", category?.color || "text-gray-400")} />
                      <div className="absolute inset-0 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="ghost" size="sm" className="text-white gap-1">
                          <Eye className="h-4 w-4" />
                          <span>Preview</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm truncate">{doc.name}</h4>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs ml-1",
                          doc.category === "legal" && "bg-blue-50 text-blue-700 border-blue-200",
                          doc.category === "evidence" && "bg-green-50 text-green-700 border-green-200",
                          doc.category === "financial" && "bg-amber-50 text-amber-700 border-amber-200",
                          doc.category === "correspondence" && "bg-purple-50 text-purple-700 border-purple-200",
                        )}
                      >
                        {doc.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{doc.date}</p>
                  </div>
                )
              })}

              <div
                className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={openUploadDialog}
              >
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <Plus className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600">Upload Document</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No documents found</h3>
              <p className="text-gray-500 mb-4">There are no documents in this category.</p>
              <Button size="sm" className="gap-1" onClick={openUploadDialog}>
                <Plus className="h-4 w-4" />
                <span>Upload Document</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <DocumentPreview
        isOpen={previewOpen}
        onClose={closeDocumentPreview}
        document={selectedDocument}
        documents={filteredDocuments}
        categories={documentCategories}
      />

      <DocumentUploadDialog
        isOpen={uploadOpen}
        onClose={closeUploadDialog}
        categories={documentCategories.filter((c) => c.id !== "all")}
        onUpload={handleUploadDocument}
      />
    </>
  )
}
