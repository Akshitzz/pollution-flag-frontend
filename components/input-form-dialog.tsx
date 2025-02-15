"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InputFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setResults: (results: object) => void;
}

interface FormData {
  numberPlate: string;
  size: string;
  co2: string;
  nox: string;
  pm25: string;
  co: string;
}

export function InputFormDialog({ isOpen, setIsOpen, setResults }: InputFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    numberPlate: "",
    size: "",
    co2: "",
    nox: "",
    pm25: "",
    co: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sizeMapping: { [key: string]: number } = {
      small: 1,
      medium: 2,
      large: 3,
    };

    const requestData = {
      size: sizeMapping[formData.size] || 0,
      co2: parseFloat(formData.co2),
      nox: parseFloat(formData.nox),
      pm25: parseFloat(formData.pm25),
      co: parseFloat(formData.co),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Prediction request failed");
      }

      const data = await response.json();
      setResults({ ...formData, flag: data.pollution_flag });
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Car Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(["numberPlate", "co2", "nox", "pm25", "co"] as const).map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field.toUpperCase().replace(/_/g, ' ')}</Label>
              <Input
                id={field}
                type={field === "numberPlate" ? "text" : "number"}
                value={formData[field]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            </div>
          ))}
          <div>
            <Label htmlFor="size">Size of Vehicle</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, size: value })
              }
              value={formData.size}
            >
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
          <Button type="submit" className="w-full">
            Process & Show Result
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}