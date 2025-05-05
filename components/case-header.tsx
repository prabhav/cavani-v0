"use client"

import { ChevronRight, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function CaseHeader({ onRightSidebarToggle }) {
  return (
    <div className="border-b border-gray-200 bg-white px-4 md:px-8 py-4">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <SidebarTrigger className="mr-2 hover:bg-gray-100 transition-colors" />
        <span className="hidden sm:inline">Cases</span>
        <ChevronRight className="h-4 w-4 mx-1 hidden sm:inline" />
        <span className="hidden md:inline">Civil Suits</span>
        <ChevronRight className="h-4 w-4 mx-1 hidden md:inline" />
        <span className="text-gray-900 truncate">Ram Singh vs State of Delhi</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold truncate">Ram Singh vs State of Delhi</h1>

        <div className="flex items-center gap-2 md:gap-3">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors px-2 md:px-3 py-1">
            Active
          </Badge>

          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Priority</span>
          </Button>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onRightSidebarToggle}>
            <Info className="h-5 w-5" />
            <span className="sr-only">Toggle info panel</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
