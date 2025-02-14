"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function ResultsDisplay({ results }) {
  const isMultiple = Array.isArray(results)

  const downloadResults = () => {
    // Implement download functionality
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 p-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Results</h2>
      {isMultiple ? (
        <Card>
          <CardHeader>
            <CardTitle>Multiple Car Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Number Plate</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>CO₂</TableHead>
                  <TableHead>NOx</TableHead>
                  <TableHead>PM2.5</TableHead>
                  <TableHead>CO</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((car, index) => (
                  <TableRow key={index}>
                    <TableCell>{car.numberPlate}</TableCell>
                    <TableCell>{car.size}</TableCell>
                    <TableCell>{car.co2}</TableCell>
                    <TableCell>{car.nox}</TableCell>
                    <TableCell>{car.pm25}</TableCell>
                    <TableCell>{car.co}</TableCell>
                    <TableCell>
                      {car.flag === "green" ? (
                        <span className="text-green-500">✅ Green Flag</span>
                      ) : (
                        <span className="text-red-500">🚨 Red Flag</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Single Car Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Number Plate:</p>
                <p>{results.numberPlate}</p>
              </div>
              <div>
                <p className="font-semibold">Size:</p>
                <p>{results.size}</p>
              </div>
              <div>
                <p className="font-semibold">CO₂ Emission:</p>
                <p>{results.co2}</p>
              </div>
              <div>
                <p className="font-semibold">NOx Emission:</p>
                <p>{results.nox}</p>
              </div>
              <div>
                <p className="font-semibold">PM2.5 Emission:</p>
                <p>{results.pm25}</p>
              </div>
              <div>
                <p className="font-semibold">CO Emission:</p>
                <p>{results.co}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Status:</p>
              {results.flag === 0 ? (
                <p className="text-green-500">✅ Green Flag - Eco-friendly car</p>
              ) : results.flag === 1 ? (
                <p className="text-yellow-500">Yellow Flag - You can use it freely</p>
              )          
              : (
                <p className="text-red-500">🚨 Red Flag - Non-compliant car</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      <div className="mt-4">
        <Button onClick={downloadResults}>
          <Download className="mr-2 h-4 w-4" /> Download Results
        </Button>
      </div>
    </motion.section>
  )
}

