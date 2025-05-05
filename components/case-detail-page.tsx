"use client"

import { useState, useEffect } from "react"
import { CaseHeader } from "./case-header"
import { CaseDetailsCard } from "./case-details-card"
import { PartiesInvolved } from "./parties-involved"
import { LegalSections } from "./legal-sections"
import { ImportantDates } from "./important-dates"
import { ConnectedCasesTable } from "./connected-cases-table"
import { DocumentTrail } from "./document-trail"
import { CommentFeed } from "./comment-feed"
import { RightSidebar } from "./right-sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export function CaseDetailPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <CaseHeader onRightSidebarToggle={() => setRightSidebarOpen(!rightSidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
          <CaseDetailsCard />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <PartiesInvolved />
            <LegalSections />
            <ImportantDates />
          </div>

          <ConnectedCasesTable />
          <DocumentTrail />
          <CommentFeed />
        </div>

        {/* Mobile right sidebar as a sheet */}
        {isMobile ? (
          <Sheet open={rightSidebarOpen} onOpenChange={setRightSidebarOpen}>
            <SheetContent side="right" className="p-0 w-80">
              <RightSidebar />
            </SheetContent>
          </Sheet>
        ) : (
          <RightSidebar />
        )}
      </div>
    </div>
  )
}
