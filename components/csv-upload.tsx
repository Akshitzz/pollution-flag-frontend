"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CsvUploadProps {
  setResults: (results: Result[]) => void;
}

interface Result {
  numberPlate: string;
  size: string;
  co2: string;
  nox: string;
  pm25: string;
  co: string;
  flag: string;
}

export function CsvUpload({ setResults }: CsvUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process CSV file and set results
    setResults([
      { numberPlate: "ABC123", size: "medium", co2: "120", nox: "0.06", pm25: "0.005", co: "1.0", flag: "green" },
      { numberPlate: "XYZ789", size: "large", co2: "180", nox: "0.08", pm25: "0.007", co: "1.2", flag: "red" },
    ]);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">Upload CSV</h2>
      <div>
        <Label htmlFor="csvFile">Choose CSV file</Label>
        <Input id="csvFile" type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <Button type="submit" className="w-full" disabled={!file}>
        Upload & Process
      </Button>
    </motion.form>
  );
}