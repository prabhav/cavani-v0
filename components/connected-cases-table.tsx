import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

export function ConnectedCasesTable() {
  const connectedCases = [
    {
      id: 1,
      title: "Ram Singh Bail Application",
      type: "Bail Application",
      status: "Closed",
    },
    {
      id: 2,
      title: "Ram Singh vs State - Evidence Submission",
      type: "Evidence Filing",
      status: "Open",
    },
    {
      id: 3,
      title: "Ram Singh Property Dispute",
      type: "Property Case",
      status: "Open",
    },
  ]

  return (
    <Card className="mt-6 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        <h2 className="text-lg font-medium mb-4">Connected Cases</h2>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left font-medium text-gray-500 pb-3 px-4 md:px-3">Title</th>
                <th className="text-left font-medium text-gray-500 pb-3 px-4 md:px-3 hidden sm:table-cell">Type</th>
                <th className="text-left font-medium text-gray-500 pb-3 px-4 md:px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {connectedCases.map((caseItem) => (
                <tr
                  key={caseItem.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 md:px-3">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="font-medium truncate">{caseItem.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 md:px-3 text-gray-600 hidden sm:table-cell">{caseItem.type}</td>
                  <td className="py-3 px-4 md:px-3">
                    <Badge
                      className={
                        caseItem.status === "Open"
                          ? "bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                      }
                    >
                      {caseItem.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
