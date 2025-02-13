"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function CsvUploadDialog({ isOpen, setIsOpen, setResults }) {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Process CSV file and set results
    setResults([
      { numberPlate: "ABC123", size: "medium", co2: "120", nox: "0.06", pm25: "0.005", co: "1.0", flag: "green" },
      { numberPlate: "XYZ789", size: "large", co2: "180", nox: "0.08", pm25: "0.007", co: "1.2", flag: "red" },
    ])
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload CSV</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="csvFile">Choose CSV file</Label>
            <Input id="csvFile" type="file" accept=".csv" onChange={handleFileChange} />
          </div>
          <Button type="submit" className="w-full" disabled={!file}>
            Upload & Process
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

