import { Archive, FileText, Home, Settings, Users, FileSpreadsheet, User, CheckSquare, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MainSidebar() {
  return (
    <Sidebar className="w-64 border-r border-gray-200" collapsible="none">
      <SidebarContent className="bg-[#2d2d2d] text-gray-100 h-full flex flex-col">
        <div className="p-6 mb-2">
          <h1 className="text-xl font-semibold text-white">Cavani</h1>
        </div>

        <SidebarMenu className="flex-1">
          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a] flex items-center" asChild>
              <Link href="/dashboard">
                <Home className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a] flex items-center" asChild>
              <Link href="/cases">
                <FileText className="mr-3 h-5 w-5" />
                <span>All Cases</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a] flex items-center" asChild>
              <Link href="/tasks">
                <CheckSquare className="mr-3 h-5 w-5" />
                <span>Tasks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a] flex items-center" asChild>
              <Link href="#">
                <FileSpreadsheet className="mr-3 h-5 w-5" />
                <span>Templates</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a] flex items-center" asChild>
              <Link href="#">
                <Archive className="mr-3 h-5 w-5" />
                <span>Archive</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a] flex items-center" asChild>
              <Link href="#">
                <Users className="mr-3 h-5 w-5" />
                <span>Clients</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a] flex items-center" asChild>
              <Link href="#">
                <Settings className="mr-3 h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a] flex items-center" asChild>
              <Link href="#">
                <User className="mr-3 h-5 w-5" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarFooter className="p-4 mt-auto">
          <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 text-white gap-2 py-5">
            <Link href="/new-case">
              <Plus className="h-5 w-5" />
              <span>New Case</span>
            </Link>
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
