"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function InputFormDialog({ isOpen, setIsOpen, setResults }) {
  const [formData, setFormData] = useState({
    numberPlate: "",
    size: "",
    co2: "",
    nox: "",
    pm25: "",
    co: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Process form data and set results
    setResults({ ...formData, flag: Math.random() > 0.5 ? "green" : "red" })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Car Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="numberPlate">Number Plate</Label>
            <Input
              id="numberPlate"
              value={formData.numberPlate}
              onChange={(e) => setFormData({ ...formData, numberPlate: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="size">Size of Vehicle</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, size: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="co2">CO₂ Emission</Label>
            <Input
              id="co2"
              type="number"
              value={formData.co2}
              onChange={(e) => setFormData({ ...formData, co2: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="nox">NOx Emission</Label>
            <Input
              id="nox"
              type="number"
              value={formData.nox}
              onChange={(e) => setFormData({ ...formData, nox: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="pm25">PM2.5 Emission</Label>
            <Input
              id="pm25"
              type="number"
              value={formData.pm25}
              onChange={(e) => setFormData({ ...formData, pm25: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="co">CO Emission</Label>
            <Input
              id="co"
              type="number"
              value={formData.co}
              onChange={(e) => setFormData({ ...formData, co: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">
            Process & Show Result
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

