import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone } from "lucide-react"

export function RightSidebar() {
  const timelineEvents = [
    { id: 1, title: "Case Filed", date: "23 Jan 2023" },
    { id: 2, title: "Interim Order Granted", date: "23 Jan 2023" },
    { id: 3, title: "Bail Granted", date: "23 Jan 2023" },
    { id: 4, title: "Evidence Submitted", date: "23 Jan 2023" },
    { id: 5, title: "Hearing Scheduled", date: "23 Jan 2023" },
  ]

  return (
    <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-medium mb-4">Case Summary</h3>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500 mb-0.5">Court</p>
            <p className="font-medium">Delhi High Court</p>
          </div>

          <div>
            <p className="text-gray-500 mb-0.5">Type</p>
            <p className="font-medium">Civil Suit</p>
          </div>

          <div>
            <p className="text-gray-500 mb-0.5">Filing Date</p>
            <p className="font-medium">15 Jan 2023</p>
          </div>

          <div>
            <p className="text-gray-500 mb-0.5">Next Hearing</p>
            <p className="font-medium text-amber-600">05 Feb 2023</p>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <h3 className="font-medium mb-4">Client Information</h3>

        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/abstract-rs.png" alt="Ram Singh" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">Ram Singh</p>
            <p className="text-sm text-gray-500">+91 98765 43210</p>
          </div>
        </div>

        <Button className="w-full gap-2 hover:bg-blue-700 transition-colors">
          <Phone className="h-4 w-4" />
          <span>Contact Client</span>
        </Button>
      </div>

      <div className="p-6">
        <h3 className="font-medium mb-4">Timeline</h3>

        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute left-2 top-1 bottom-0 w-0.5 bg-gray-200"></div>

          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              className="mb-4 relative hover:bg-gray-50 -ml-2 p-2 rounded-md transition-colors cursor-pointer"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-14px] top-3 h-4 w-4 rounded-full bg-white border-2 border-amber-500"></div>

              <p className="font-medium text-sm">{event.title}</p>
              <p className="text-xs text-gray-500">{event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
