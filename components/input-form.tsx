"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InputFormProps {
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

export function InputForm({ setResults }: InputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    numberPlate: "",
    size: "",
    co2: "",
    nox: "",
    pm25: "",
    co: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process form data and set results
    setResults({ ...formData, flag: Math.random() > 0.5 ? "green" : "red" });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">Enter Car Details</h2>
      <div>
        <Label htmlFor="numberPlate">Number Plate</Label>
        <Input
          id="numberPlate"
          value={formData.numberPlate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, numberPlate: e.target.value })}
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, co2: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="nox">NOx Emission</Label>
        <Input
          id="nox"
          type="number"
          value={formData.nox}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, nox: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="pm25">PM2.5 Emission</Label>
        <Input
          id="pm25"
          type="number"
          value={formData.pm25}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, pm25: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="co">CO Emission</Label>
        <Input
          id="co"
          type="number"
          value={formData.co}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, co: e.target.value })}
        />
      </div>
      <Button type="submit" className="w-full">
        Process & Show Result
      </Button>
    </motion.form>
  );
}

