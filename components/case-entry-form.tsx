"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function CaseEntryForm({ onClose }: { onClose?: () => void }) {
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [parties, setParties] = useState<{ role: string; name: string; contact?: string }[]>([
    { role: "Petitioner", name: "" },
    { role: "Respondent", name: "" },
  ])

  const legalSections = [
    { code: "IPC 307", name: "Attempt to murder" },
    { code: "CrPC 437", name: "Bail provisions" },
    { code: "IPC 420", name: "Cheating" },
    { code: "CrPC 164", name: "Recording of confessions" },
    { code: "IPC 376", name: "Punishment for rape" },
  ]

  const handleAddSection = (code: string) => {
    if (!selectedSections.includes(code)) {
      setSelectedSections([...selectedSections, code])
    }
  }

  const handleRemoveSection = (code: string) => {
    setSelectedSections(selectedSections.filter((section) => section !== code))
  }

  const handleAddParty = () => {
    setParties([...parties, { role: "", name: "" }])
  }

  const handleRemoveParty = (index: number) => {
    const newParties = [...parties]
    newParties.splice(index, 1)
    setParties(newParties)
  }

  const handlePartyChange = (index: number, field: string, value: string) => {
    const newParties = [...parties]
    newParties[index] = { ...newParties[index], [field]: value }
    setParties(newParties)
  }

  return (
    <div className="bg-[#f8f7f4] min-h-screen">
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl md:text-2xl font-semibold">New Case Entry</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button className="gap-1">
              <Save className="h-4 w-4" />
              <span>Save Case</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl py-6 px-4">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="details">Case Details</TabsTrigger>
            <TabsTrigger value="parties">Parties</TabsTrigger>
            <TabsTrigger value="sections">Legal Sections</TabsTrigger>
            <TabsTrigger value="dates">Important Dates</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="case-title">Case Title</Label>
                      <Input id="case-title" placeholder="e.g. Ram Singh vs State of Delhi" />
                    </div>

                    <div>
                      <Label htmlFor="case-number">Case Number</Label>
                      <Input id="case-number" placeholder="e.g. CS/12345/2023" />
                    </div>

                    <div>
                      <Label htmlFor="court-name">Court Name</Label>
                      <Select>
                        <SelectTrigger id="court-name">
                          <SelectValue placeholder="Select court" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi-high">Delhi High Court</SelectItem>
                          <SelectItem value="delhi-district">Delhi District Court</SelectItem>
                          <SelectItem value="supreme">Supreme Court</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="case-type">Case Type</Label>
                      <Select>
                        <SelectTrigger id="case-type">
                          <SelectValue placeholder="Select case type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="civil">Civil Suit</SelectItem>
                          <SelectItem value="criminal">Criminal Case</SelectItem>
                          <SelectItem value="writ">Writ Petition</SelectItem>
                          <SelectItem value="appeal">Appeal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bench-name">Bench Name</Label>
                      <Input id="bench-name" placeholder="e.g. Justice Sharma" />
                    </div>

                    <div>
                      <Label htmlFor="stage">Current Stage</Label>
                      <Select>
                        <SelectTrigger id="stage">
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="filing">Filing</SelectItem>
                          <SelectItem value="arguments">Arguments</SelectItem>
                          <SelectItem value="evidence">Evidence</SelectItem>
                          <SelectItem value="judgment">Judgment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Case Description</Label>
                      <Textarea id="description" placeholder="Brief description of the case" className="resize-none" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parties">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {parties.map((party, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-100">
                      <div>
                        <Label htmlFor={`party-role-${index}`}>Role</Label>
                        <Select value={party.role} onValueChange={(value) => handlePartyChange(index, "role", value)}>
                          <SelectTrigger id={`party-role-${index}`}>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Petitioner">Petitioner</SelectItem>
                            <SelectItem value="Respondent">Respondent</SelectItem>
                            <SelectItem value="Advocate">Advocate</SelectItem>
                            <SelectItem value="Client">Client</SelectItem>
                            <SelectItem value="Witness">Witness</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`party-name-${index}`}>Name</Label>
                        <Input
                          id={`party-name-${index}`}
                          value={party.name}
                          onChange={(e) => handlePartyChange(index, "name", e.target.value)}
                          placeholder="Full name"
                        />
                      </div>

                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Label htmlFor={`party-contact-${index}`}>Contact</Label>
                          <Input
                            id={`party-contact-${index}`}
                            value={party.contact || ""}
                            onChange={(e) => handlePartyChange(index, "contact", e.target.value)}
                            placeholder="Phone or email"
                          />
                        </div>
                        {parties.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveParty(index)}
                          >
                            <X className="h-5 w-5" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="gap-1" onClick={handleAddParty}>
                    <Plus className="h-4 w-4" />
                    <span>Add Party</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sections">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block">Selected Sections</Label>
                    <div className="flex flex-wrap gap-2 min-h-10">
                      {selectedSections.length === 0 ? (
                        <p className="text-sm text-gray-500">No sections selected</p>
                      ) : (
                        selectedSections.map((code) => (
                          <Badge
                            key={code}
                            variant="outline"
                            className="bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200 py-1.5 px-2.5 gap-1"
                          >
                            {code}
                            <button
                              onClick={() => handleRemoveSection(code)}
                              className="ml-1 text-gray-400 hover:text-gray-700"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Available Sections</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {legalSections.map((section) => (
                        <div
                          key={section.code}
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${
                            selectedSections.includes(section.code)
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            selectedSections.includes(section.code)
                              ? handleRemoveSection(section.code)
                              : handleAddSection(section.code)
                          }}
                        >
                          <div className="font-medium">{section.code}</div>
                          <div className="text-sm text-gray-600">{section.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="custom-section">Add Custom Section</Label>
                    <div className="flex gap-2">
                      <Input id="custom-section" placeholder="e.g. IPC 302" />
                      <Button variant="outline" className="gap-1 shrink-0">
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dates">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="filing-date">Filing Date</Label>
                      <DatePicker />
                    </div>

                    <div>
                      <Label htmlFor="registration-date">Registration Date</Label>
                      <DatePicker />
                    </div>

                    <div>
                      <Label htmlFor="first-hearing">First Hearing Date</Label>
                      <DatePicker />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="next-hearing">Next Hearing Date</Label>
                      <DatePicker />
                    </div>

                    <div>
                      <Label htmlFor="judgment-date">Expected Judgment Date</Label>
                      <DatePicker />
                    </div>

                    <div>
                      <Label htmlFor="limitation-date">Limitation Date</Label>
                      <DatePicker />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
