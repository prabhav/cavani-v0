import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

export function ImportantDates() {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-md font-medium mb-4">Important Dates</h3>

        <div className="space-y-3">
          <div className="flex items-start">
            <CalendarDays className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
            <div>
              <p className="text-sm text-gray-500 mb-0.5">Filing Date</p>
              <p className="font-medium">15 Jan 2023</p>
            </div>
          </div>

          <div className="flex items-start">
            <CalendarDays className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
            <div>
              <p className="text-sm text-gray-500 mb-0.5">Registration Date</p>
              <p className="font-medium">18 Jan 2023</p>
            </div>
          </div>

          <div className="flex items-start">
            <CalendarDays className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
            <div>
              <p className="text-sm text-gray-500 mb-0.5">Next Hearing Date</p>
              <p className="font-medium text-amber-600">05 Feb 2023</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
