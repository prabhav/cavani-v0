import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function LegalSections() {
  const sections = [
    { id: 1, code: "IPC 307", name: "Attempt to murder" },
    { id: 2, code: "CrPC 437", name: "Bail provisions" },
    { id: 3, code: "IPC 420", name: "Cheating" },
    { id: 4, code: "CrPC 164", name: "Recording of confessions" },
    { id: 5, code: "IPC 376", name: "Punishment for rape" },
  ]

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-md font-medium mb-4">Legal Sections & Acts</h3>

        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <Badge
              key={section.id}
              variant="outline"
              className="bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200 py-1.5 px-2.5"
            >
              {section.code}
            </Badge>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          {sections.slice(0, 3).map((section) => (
            <div key={section.id} className="flex items-center">
              <span className="font-medium text-sm w-20">{section.code}</span>
              <span className="text-sm text-gray-600">{section.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
