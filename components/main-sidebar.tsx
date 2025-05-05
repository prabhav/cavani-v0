import { Archive, FileText, Home, Settings, Users, FileSpreadsheet, User } from "lucide-react"
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

export function MainSidebar() {
  return (
    <Sidebar className="w-64 border-r border-gray-200" collapsible="none">
      <SidebarContent className="bg-[#2d2d2d] text-gray-100 h-full">
        <div className="p-6 mb-2">
          <h1 className="text-xl font-semibold text-white">Cavani</h1>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a]">
              <Home className="mr-3 h-5 w-5" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 bg-[#3a3a3a]" isActive>
              <FileText className="mr-3 h-5 w-5" />
              <span>Cases</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a]">
              <FileSpreadsheet className="mr-3 h-5 w-5" />
              <span>Templates</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a]">
              <Archive className="mr-3 h-5 w-5" />
              <span>Archive</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a]">
              <Users className="mr-3 h-5 w-5" />
              <span>Clients</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a]">
              <Settings className="mr-3 h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="py-3 px-6 transition-colors hover:bg-[#3a3a3a]">
              <User className="mr-3 h-5 w-5" />
              <span>Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
