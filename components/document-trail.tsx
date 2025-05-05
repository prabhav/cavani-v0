import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText, Plus } from "lucide-react"

export function DocumentTrail() {
  const documents = [
    { id: 1, name: "NDA Agreement", type: "PDF", date: "23 Jan 2023" },
    { id: 2, name: "Rent Agreement", type: "PDF", date: "23 Jan 2023" },
    { id: 3, name: "Affidavit", type: "PDF", date: "23 Jan 2023" },
    { id: 4, name: "Property Papers", type: "PDF", date: "23 Jan 2023" },
  ]

  return (
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

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
            >
              <div className="h-24 bg-gray-50 rounded flex items-center justify-center mb-3">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <h4 className="font-medium text-sm mb-1">{doc.name}</h4>
              <p className="text-xs text-gray-500">{doc.date}</p>
            </div>
          ))}

          <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <Plus className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-sm text-gray-600">Upload Document</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
