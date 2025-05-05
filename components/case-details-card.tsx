import { AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CaseDetailsCard() {
  return (
    <Card className="mt-6 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-4">
          <h2 className="text-lg font-medium">Case Details</h2>

          <Badge
            variant="destructive"
            className="flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Missing Documents</span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Court Name</p>
            <p className="font-medium">Delhi High Court</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Case Type</p>
            <p className="font-medium">Civil Suit</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Case No.</p>
            <p className="font-medium">CS/12345/2023</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Bench Name</p>
            <p className="font-medium">Justice Sharma</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Stage</p>
            <p className="font-medium">Arguments</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Current Judgment</p>
            <p className="font-medium">Interim Order</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
