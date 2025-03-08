"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, Download, ExternalLink } from "lucide-react"
import type { Principal } from "@dfinity/principal"
import Link from "next/link"
import { deserializeImage } from "@/lib/utils/Image"

export interface LoanAssurance {
  assuranceId: string
  assuranceType: string
  assuranceFile: Uint8Array | number[]
  debtor: Principal
}

interface AssuranceCardProps {
  assurance: LoanAssurance
}

export function AssuranceCard({ assurance }: AssuranceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Function to truncate Principal ID for display
  const truncatePrincipal = (principal: Principal) => {
    const text = principal.toString()
    return `${text.substring(0, 5)}...${text.substring(text.length - 5)}`
  }

 


  // Get appropriate icon based on assurance type
  const getAssuranceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "collateral":
      case "guarantee":
      case "insurance":
        return <Shield className="h-5 w-5 text-primary" />
      default:
        return <FileText className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            {getAssuranceIcon(assurance.assuranceType)}
            <span className="ml-1">{assurance.assuranceType}</span>
          </Badge>
        </div>
        <CardTitle className="text-xl">Assurance #{assurance.assuranceId.substring(0, 8)}</CardTitle>
      </CardHeader>
      <CardContent>
        
        <div className="h-32 bg-muted rounded-md flex items-center justify-center">
          {/* <FileText className="h-12 w-12 text-muted-foreground opacity-50" /> */}
          <img src={deserializeImage(assurance.assuranceFile)} alt="" />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>File size: {assurance.assuranceFile.length.toLocaleString()} bytes</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {/* <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button> */}
        {/* <Link href={`/assurances/${assurance.assuranceId}`}>
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </Link> */}
      </CardFooter>
    </Card>
  )
}

