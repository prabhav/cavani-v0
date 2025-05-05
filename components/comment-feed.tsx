"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Send } from "lucide-react"

export function CommentFeed() {
  const [comment, setComment] = useState("")

  const comments = [
    {
      id: 1,
      user: {
        name: "Priya Sharma",
        avatar: "/playstation-controller.png",
      },
      content:
        "Client has requested an extension for document submission. Need to file a motion for extension by tomorrow.",
      timestamp: "Today, 10:23 AM",
      type: "chat",
    },
    {
      id: 2,
      user: {
        name: "Rahul Verma",
        avatar: "/recreational-vehicle-in-nature.png",
      },
      content: "Opposing counsel has agreed to the settlement terms. Preparing the final draft for review.",
      timestamp: "Yesterday, 4:15 PM",
      type: "voice",
    },
  ]

  return (
    <Card className="mt-6 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        <h2 className="text-lg font-medium mb-4">Comments & Notes</h2>

        <div className="space-y-4 mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                <AvatarFallback>
                  {comment.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      comment.type === "voice" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {comment.type === "voice" ? "Voice" : "Chat"}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src="/abstract-geometric-as.png" alt="Current User" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <Textarea
              placeholder="Add a comment or note..."
              className="mb-2 resize-none focus-visible:ring-1 focus-visible:ring-gray-400"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex flex-col xs:flex-row gap-2 justify-between">
              <Button variant="outline" size="sm" className="gap-1 hover:bg-gray-100 transition-colors">
                <Mic className="h-4 w-4" />
                <span>Record</span>
              </Button>

              <Button size="sm" className="gap-1 hover:bg-blue-700 transition-colors">
                <Send className="h-4 w-4" />
                <span>Send</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
