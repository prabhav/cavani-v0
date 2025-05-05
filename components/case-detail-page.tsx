"use client"

import { useState, useEffect } from "react"
import { MainSidebar } from "./main-sidebar"
import { CaseHeader } from "./case-header"
import { CaseDetailsCard } from "./case-details-card"
import { PartiesInvolved } from "./parties-involved"
import { LegalSections } from "./legal-sections"
import { ImportantDates } from "./important-dates"
import { ConnectedCasesTable } from "./connected-cases-table"
import { DocumentTrail } from "./document-trail"
import { CommentFeed } from "./comment-feed"
import { RightSidebar } from "./right-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <SidebarProvider>
      <div className="flex flex-col lg:flex-row h-screen bg-[#f8f7f4] text-gray-800 overflow-hidden">
        {/* Mobile sidebar as a sheet */}
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden absolute top-4 left-4 z-50">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <MainSidebar />
            </SheetContent>
          </Sheet>
        ) : (
          <MainSidebar />
        )}

        <main className="flex-1 flex flex-col overflow-hidden w-full">
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
        </main>
      </div>
    </SidebarProvider>
  )
}
