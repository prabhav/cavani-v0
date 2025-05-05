import type React from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cavani - Legal Case Management",
  description: "Manage your legal cases efficiently",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex flex-col lg:flex-row h-screen bg-[#f8f7f4] text-gray-800 overflow-hidden">
            <MainSidebar />
            <main className="flex-1 flex flex-col overflow-hidden w-full">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
