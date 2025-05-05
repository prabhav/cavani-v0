"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Plus, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function TasksView() {
  const [newTask, setNewTask] = useState("")
  const [selectedCase, setSelectedCase] = useState<string | undefined>(undefined)
  const [selectedPriority, setSelectedPriority] = useState<string>("medium")
  const [viewMode, setViewMode] = useState<"all" | "by-case">("all")

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: "Prepare arguments for Ram Singh case",
      dueDate: "Today, 2:00 PM",
      priority: "high",
      case: "Ram Singh vs State of Delhi",
      caseId: "CS/12345/2023",
      completed: false,
    },
    {
      id: 2,
      title: "Review evidence documents",
      dueDate: "Tomorrow, 10:00 AM",
      priority: "medium",
      case: "State vs Mehta",
      caseId: "CR/54321/2023",
      completed: false,
    },
    {
      id: 3,
      title: "Client meeting with Priya Sharma",
      dueDate: "Today, 4:30 PM",
      priority: "high",
      case: "Sharma Property Dispute",
      caseId: "CS/98765/2022",
      completed: false,
    },
    {
      id: 4,
      title: "File motion for extension",
      dueDate: "Tomorrow, 12:00 PM",
      priority: "medium",
      case: "Ram Singh vs State of Delhi",
      caseId: "CS/12345/2023",
      completed: false,
    },
    {
      id: 5,
      title: "Draft settlement agreement",
      dueDate: "Friday, 3:00 PM",
      priority: "low",
      case: "Kumar vs Joshi",
      caseId: "CS/67890/2023",
      completed: false,
    },
    {
      id: 6,
      title: "Submit affidavit",
      dueDate: "Yesterday, 11:30 AM",
      case: "Ram Singh vs State of Delhi",
      caseId: "CS/12345/2023",
      completed: true,
    },
    {
      id: 7,
      title: "Court appearance",
      dueDate: "Yesterday, 2:00 PM",
      case: "State vs Mehta",
      caseId: "CR/54321/2023",
      completed: true,
    },
  ]

  // Get unique cases for filtering
  const cases = Array.from(new Set(tasks.map((task) => task.case))).map((caseName) => {
    const task = tasks.find((t) => t.case === caseName)
    return {
      name: caseName,
      id: task?.caseId || "",
    }
  })

  // Group tasks by case
  const tasksByCase = tasks.reduce(
    (acc, task) => {
      if (!acc[task.case]) {
        acc[task.case] = []
      }
      acc[task.case].push(task)
      return acc
    },
    {} as Record<string, typeof tasks>,
  )

  const handleAddTask = () => {
    if (newTask.trim() && selectedCase) {
      // In a real app, you would add the task to the database
      console.log("Adding task:", {
        title: newTask,
        case: selectedCase,
        priority: selectedPriority,
      })
      setNewTask("")
      setSelectedCase(undefined)
      setSelectedPriority("medium")
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-gray-500">Manage your tasks and deadlines</p>
        </div>
        <div className="flex gap-2">
          <Button variant={viewMode === "all" ? "default" : "outline"} size="sm" onClick={() => setViewMode("all")}>
            All Tasks
          </Button>
          <Button
            variant={viewMode === "by-case" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("by-case")}
          >
            By Case
          </Button>
        </div>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <Input
                placeholder="Enter task description..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div>
              <Select value={selectedCase} onValueChange={setSelectedCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select case" />
                </SelectTrigger>
                <SelectContent>
                  {cases.map((caseItem) => (
                    <SelectItem key={caseItem.id} value={caseItem.name}>
                      {caseItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddTask} disabled={!newTask.trim() || !selectedCase}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "all" ? (
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Task List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="pending" className="w-full">
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="pending" className="m-0">
                <div className="divide-y divide-gray-100">
                  {tasks
                    .filter((task) => !task.completed)
                    .map((task) => (
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
                            <Link href="#" className="truncate hover:text-blue-600 hover:underline">
                              {task.case}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="m-0">
                <div className="divide-y divide-gray-100">
                  {tasks
                    .filter((task) => task.completed)
                    .map((task) => (
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
                            <span>{task.dueDate}</span>
                            <span className="mx-2">•</span>
                            <Link href="#" className="truncate hover:text-blue-600 hover:underline">
                              {task.case}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(tasksByCase).map(([caseName, caseTasks]) => (
            <Card key={caseName} className="border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    <Link href="#" className="hover:text-blue-600 hover:underline">
                      {caseName}
                    </Link>
                  </CardTitle>
                  <Badge className="bg-gray-100 text-gray-800">
                    {caseTasks.filter((task) => !task.completed).length} pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {caseTasks
                    .filter((task) => !task.completed)
                    .map((task) => (
                      <div key={task.id} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors">
                        <Checkbox id={`case-task-${task.id}`} className="mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <label htmlFor={`case-task-${task.id}`} className="font-medium cursor-pointer">
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
                          </div>
                        </div>
                      </div>
                    ))}
                  {caseTasks.filter((task) => !task.completed).length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p>All tasks completed for this case!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
