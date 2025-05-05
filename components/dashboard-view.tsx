"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CheckCircle2, Clock, FileText, Plus, Users } from "lucide-react"
import Link from "next/link"

export function DashboardView() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const upcomingTasks = [
    {
      id: 1,
      title: "Prepare arguments for Ram Singh case",
      dueDate: "Today, 2:00 PM",
      priority: "high",
      case: "Ram Singh vs State of Delhi",
    },
    {
      id: 2,
      title: "Review evidence documents",
      dueDate: "Tomorrow, 10:00 AM",
      priority: "medium",
      case: "State vs Mehta",
    },
    {
      id: 3,
      title: "Client meeting with Priya Sharma",
      dueDate: "Today, 4:30 PM",
      priority: "high",
      case: "Sharma Property Dispute",
    },
    {
      id: 4,
      title: "File motion for extension",
      dueDate: "Tomorrow, 12:00 PM",
      priority: "medium",
      case: "Ram Singh vs State of Delhi",
    },
    {
      id: 5,
      title: "Draft settlement agreement",
      dueDate: "Friday, 3:00 PM",
      priority: "low",
      case: "Kumar vs Joshi",
    },
  ]

  const completedTasks = [
    {
      id: 6,
      title: "Submit affidavit",
      completedDate: "Yesterday, 11:30 AM",
      case: "Ram Singh vs State of Delhi",
    },
    {
      id: 7,
      title: "Court appearance",
      completedDate: "Yesterday, 2:00 PM",
      case: "State vs Mehta",
    },
  ]

  const upcomingHearings = [
    {
      id: 1,
      case: "Ram Singh vs State of Delhi",
      court: "Delhi High Court",
      date: "05 Feb 2023",
      time: "10:30 AM",
      type: "Arguments",
    },
    {
      id: 2,
      case: "State vs Mehta",
      court: "Delhi District Court",
      date: "07 Feb 2023",
      time: "11:00 AM",
      type: "Evidence",
    },
    {
      id: 3,
      case: "Kumar vs Joshi",
      court: "Delhi High Court",
      date: "10 Feb 2023",
      time: "2:30 PM",
      type: "Final Hearing",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Document uploaded",
      user: "Priya Sharma",
      time: "10 minutes ago",
      case: "Ram Singh vs State of Delhi",
      avatar: "/playstation-controller.png",
    },
    {
      id: 2,
      action: "Comment added",
      user: "Rahul Verma",
      time: "30 minutes ago",
      case: "State vs Mehta",
      avatar: "/recreational-vehicle-in-nature.png",
    },
    {
      id: 3,
      action: "Case status updated",
      user: "Amit Kumar",
      time: "1 hour ago",
      case: "Kumar vs Joshi",
      avatar: "/abstract-geometric-as.png",
    },
  ]

  const caseStats = [
    { label: "Active Cases", value: 24, icon: FileText, color: "text-blue-500" },
    { label: "Hearings This Week", value: 8, icon: CalendarIcon, color: "text-amber-500" },
    { label: "Pending Tasks", value: 15, icon: Clock, color: "text-red-500" },
    { label: "Clients", value: 32, icon: Users, color: "text-green-500" },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your day-to-day tasks and activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>New Task</span>
          </Button>
          <Button size="sm" className="gap-1" asChild>
            <Link href="/new-case">
              <Plus className="h-4 w-4" />
              <span>New Case</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {caseStats.map((stat, index) => (
          <Card key={index} className="border-gray-200 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-gray-200 shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="upcoming" className="w-full">
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upcoming" className="m-0">
                <div className="divide-y divide-gray-100">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors">
                      <Checkbox id={`task-${task.id}`} className="mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer">
                            {task.title}
                          </label>
                          <Badge
                            className={`text-xs ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "medium"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{task.dueDate}</span>
                          <span className="mx-2">•</span>
                          <span className="truncate">{task.case}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="m-0">
                <div className="divide-y divide-gray-100">
                  {completedTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors">
                      <Checkbox id={`task-${task.id}`} checked={true} className="mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <label
                            htmlFor={`task-${task.id}`}
                            className="font-medium cursor-pointer line-through text-gray-500"
                          >
                            {task.title}
                          </label>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          <span>{task.completedDate}</span>
                          <span className="mx-2">•</span>
                          <span className="truncate">{task.case}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="calendar-wrapper">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
                classNames={{
                  day_today: "bg-amber-50 text-amber-600 font-semibold",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Hearings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {upcomingHearings.map((hearing) => (
                <div key={hearing.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="font-medium mb-1">{hearing.case}</div>
                  <div className="text-sm text-gray-500 mb-2">{hearing.court}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1 text-amber-500" />
                      <span>{hearing.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-3.5 w-3.5 mr-1 text-amber-500" />
                      <span>{hearing.time}</span>
                    </div>
                  </div>
                  <Badge className="mt-2 bg-purple-100 text-purple-800 hover:bg-purple-200">{hearing.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1 mb-1">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-500">{activity.action}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{activity.time}</span>
                      <span className="mx-2">•</span>
                      <span className="truncate">{activity.case}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
