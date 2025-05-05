import { Card, CardContent } from "@/components/ui/card"

export function PartiesInvolved() {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-md font-medium mb-4">Parties Involved</h3>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-0.5">Petitioner</p>
            <p className="font-medium">Ram Singh</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-0.5">Respondent</p>
            <p className="font-medium">State of Delhi</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-0.5">Advocate</p>
            <p className="font-medium">Priya Sharma</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-0.5">Client</p>
            <p className="font-medium">Ram Singh</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-0.5">Filed By</p>
            <p className="font-medium">Priya Sharma</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
