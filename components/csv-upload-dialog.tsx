"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CsvUploadDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setResults: (results: string | object) => void;
}

export function CsvUploadDialog({ isOpen, setIsOpen, setResults }: CsvUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/csvupload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process CSV");
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setResults(imageUrl);
      setIsOpen(false);
    } catch (error) {
      console.error("Error processing CSV:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <Button type="submit" className="w-full" disabled={!file || loading}>
            {loading ? "Processing..." : "Upload & Process"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}