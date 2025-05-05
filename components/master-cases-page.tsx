"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronDown, ChevronUp, Download, MoreHorizontal, Plus, Search, SlidersHorizontal, X } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function MasterCasesPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortColumn, setSortColumn] = useState<string | null>("caseNumber")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  // Mock data for the table
  const cases = [
    {
      id: 1,
      caseNumber: "CS/12345/2023",
      title: "Ram Singh vs State of Delhi",
      court: "Delhi High Court",
      type: "Civil Suit",
      stage: "Arguments",
      status: "Active",
      nextHearing: "05 Feb 2023",
      filingDate: "15 Jan 2023",
      client: "Ram Singh",
      advocate: "Priya Sharma",
    },
    {
      id: 2,
      caseNumber: "CR/54321/2023",
      title: "State vs Mehta",
      court: "Delhi District Court",
      type: "Criminal Case",
      stage: "Evidence",
      status: "Active",
      nextHearing: "07 Feb 2023",
      filingDate: "10 Jan 2023",
      client: "State",
      advocate: "Rahul Verma",
    },
    {
      id: 3,
      caseNumber: "CS/67890/2023",
      title: "Kumar vs Joshi",
      court: "Delhi High Court",
      type: "Civil Suit",
      stage: "Final Hearing",
      status: "Active",
      nextHearing: "10 Feb 2023",
      filingDate: "05 Jan 2023",
      client: "Amit Kumar",
      advocate: "Priya Sharma",
    },
    {
      id: 4,
      caseNumber: "WP/12345/2022",
      title: "Sharma vs Municipal Corporation",
      court: "Supreme Court",
      type: "Writ Petition",
      stage: "Judgment",
      status: "Closed",
      nextHearing: "N/A",
      filingDate: "10 Dec 2022",
      client: "Sharma",
      advocate: "Rahul Verma",
    },
    {
      id: 5,
      caseNumber: "CS/98765/2022",
      title: "Patel Property Dispute",
      court: "Delhi High Court",
      type: "Civil Suit",
      stage: "Arguments",
      status: "Active",
      nextHearing: "15 Feb 2023",
      filingDate: "20 Dec 2022",
      client: "Patel",
      advocate: "Priya Sharma",
    },
    {
      id: 6,
      caseNumber: "CR/45678/2022",
      title: "State vs Gupta",
      court: "Delhi District Court",
      type: "Criminal Case",
      stage: "Evidence",
      status: "On Hold",
      nextHearing: "20 Feb 2023",
      filingDate: "15 Dec 2022",
      client: "State",
      advocate: "Amit Kumar",
    },
    {
      id: 7,
      caseNumber: "CS/23456/2022",
      title: "Singh vs Singh",
      court: "Delhi High Court",
      type: "Civil Suit",
      stage: "Filing",
      status: "Active",
      nextHearing: "25 Feb 2023",
      filingDate: "05 Dec 2022",
      client: "Singh",
      advocate: "Priya Sharma",
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">All Cases</h1>
          <p className="text-sm text-gray-500">Manage and filter all your cases</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button size="sm" className="gap-1" asChild>
            <Link href="/new-case">
              <Plus className="h-4 w-4" />
              <span>New Case</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search cases..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="onhold">On Hold</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Case Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="civil">Civil Suit</SelectItem>
            <SelectItem value="criminal">Criminal Case</SelectItem>
            <SelectItem value="writ">Writ Petition</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showFilters && (
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Advanced Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-gray-500">
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="court-filter">Court</Label>
                <Select>
                  <SelectTrigger id="court-filter">
                    <SelectValue placeholder="Select court" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courts</SelectItem>
                    <SelectItem value="delhi-high">Delhi High Court</SelectItem>
                    <SelectItem value="delhi-district">Delhi District Court</SelectItem>
                    <SelectItem value="supreme">Supreme Court</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="stage-filter">Stage</Label>
                <Select>
                  <SelectTrigger id="stage-filter">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="filing">Filing</SelectItem>
                    <SelectItem value="arguments">Arguments</SelectItem>
                    <SelectItem value="evidence">Evidence</SelectItem>
                    <SelectItem value="judgment">Judgment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="advocate-filter">Advocate</Label>
                <Select>
                  <SelectTrigger id="advocate-filter">
                    <SelectValue placeholder="Select advocate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Advocates</SelectItem>
                    <SelectItem value="priya">Priya Sharma</SelectItem>
                    <SelectItem value="rahul">Rahul Verma</SelectItem>
                    <SelectItem value="amit">Amit Kumar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Filing Date Range</Label>
                <div className="flex gap-2 items-center">
                  <DatePicker placeholder="From" />
                  <span className="text-gray-500">to</span>
                  <DatePicker placeholder="To" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="outline"
                  className="bg-gray-100 gap-1 pl-2 hover:bg-gray-200"
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[120px] cursor-pointer" onClick={() => handleSort("caseNumber")}>
                    <div className="flex items-center gap-1">
                      Case No.
                      {sortColumn === "caseNumber" && (
                        <span>
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                    <div className="flex items-center gap-1">
                      Title
                      {sortColumn === "title" && (
                        <span>
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("court")}>
                    <div className="flex items-center gap-1">
                      Court
                      {sortColumn === "court" && (
                        <span>
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                    <div className="flex items-center gap-1">
                      Type
                      {sortColumn === "type" && (
                        <span>
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("stage")}>
                    <div className="flex items-center gap-1">
                      Stage
                      {sortColumn === "stage" && (
                        <span>
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    <div className="flex items-center gap-1">
                      Status
                      {sortColumn === "status" && (
                        <span>
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("nextHearing")}>
                    <div className="flex items-center gap-1">
                      Next Hearing
                      {sortColumn === "nextHearing" && (
                        <span>
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("client")}>
                    <div className="flex items-center gap-1">
                      Client
                      {sortColumn === "client" && (
                        <span>
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("advocate")}>
                    <div className="flex items-center gap-1">
                      Advocate
                      {sortColumn === "advocate" && (
                        <span>
                          {sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((caseItem, index) => (
                  <TableRow
                    key={caseItem.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      if (index === 0) {
                        window.location.href = "/case-detail"
                      }
                    }}
                  >
                    <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>{caseItem.court}</TableCell>
                    <TableCell>{caseItem.type}</TableCell>
                    <TableCell>{caseItem.stage}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          caseItem.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : caseItem.status === "Closed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-amber-100 text-amber-800"
                        }
                      >
                        {caseItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{caseItem.nextHearing}</TableCell>
                    <TableCell>{caseItem.client}</TableCell>
                    <TableCell>{caseItem.advocate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Case</DropdownMenuItem>
                          <DropdownMenuItem>Add Document</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 border-t border-gray-200">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
