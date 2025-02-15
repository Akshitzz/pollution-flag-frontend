"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface CarResult {
  numberPlate: string;
  size: string;
  co2: number;
  nox: number;
  pm25: number;
  co: number;
  flag: number;
}

interface ResultsDisplayProps {
  results: CarResult | CarResult[] | string;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const isMultiple = Array.isArray(results);
  const isImage = typeof results === "string" && results.startsWith("blob:");

  const downloadResults = () => {
    if (isImage) {
      const link = document.createElement("a");
      link.href = results;
      link.download = "pollution_results.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 p-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Results</h2>
      {isImage ? (
        <Card>
          <CardHeader>
            <CardTitle>Pollution Analysis</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img src={results} alt="Pollution Analysis" className="max-w-full h-auto rounded-lg" />
          </CardContent>
        </Card>
      ) : isMultiple ? (
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
                {results.map((car: CarResult, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{car.numberPlate}</TableCell>
                    <TableCell>{car.size}</TableCell>
                    <TableCell>{car.co2}</TableCell>
                    <TableCell>{car.nox}</TableCell>
                    <TableCell>{car.pm25}</TableCell>
                    <TableCell>{car.co}</TableCell>
                    <TableCell>
                      {car.flag === 0 ? (
                        <span className="text-green-500">✅ Green Flag</span>
                      ) : car.flag === 1 ? (
                        <span className="text-yellow-500">Yellow Flag</span>
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
                <p>{(results as CarResult).numberPlate}</p>
              </div>
              <div>
                <p className="font-semibold">Size:</p>
                <p>{(results as CarResult).size}</p>
              </div>
              <div>
                <p className="font-semibold">CO₂ Emission:</p>
                <p>{(results as CarResult).co2}</p>
              </div>
              <div>
                <p className="font-semibold">NOx Emission:</p>
                <p>{(results as CarResult).nox}</p>
              </div>
              <div>
                <p className="font-semibold">PM2.5 Emission:</p>
                <p>{(results as CarResult).pm25}</p>
              </div>
              <div>
                <p className="font-semibold">CO Emission:</p>
                <p>{(results as CarResult).co}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Status:</p>
              {(results as CarResult).flag === 0 ? (
                <p className="text-green-500">✅ Green Flag - Eco-friendly car</p>
              ) : (results as CarResult).flag === 1 ? (
                <p className="text-yellow-500">Yellow Flag - You can use it freely</p>
              ) : (
                <p className="text-red-500">🚨 Red Flag - Non-compliant car</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      <div className="flex flex-col items-center justify-center mt-4">
        <Button onClick={downloadResults} disabled={!isImage}>
          <Download className=" mr-2 h-4 w-4" /> Download Results
        </Button>
      </div>
    </motion.section>
  );
}
