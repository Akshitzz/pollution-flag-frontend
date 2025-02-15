"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InputFormDialog } from "@/components/input-form-dialog";
import { CsvUploadDialog } from "@/components/csv-upload-dialog";
import { BackgroundLines } from "@/components/ui/background-lines";
import Image from "next/image";

interface HeroSectionProps {
  setResults: (results: string | object) => void;
}

export function HeroSection({ setResults }: HeroSectionProps) {
  const [isInputFormOpen, setIsInputFormOpen] = useState(false);
  const [isCsvUploadOpen, setIsCsvUploadOpen] = useState(false);

  return (
    <motion.section
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen text-center p-4"
    >
      <div className="flex flex-row items-center justify-center w-full bg-[#FFFFFF]">
        <BackgroundLines className="flex flex-col items-center justify-center w-full px-4 bg-[222.2 84% 4.9%]">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Drive Clean</h1>
          <p className="text-xl md:text-3xl mb-12 font-sans max-w-2xl">
            Is your car a green flag or red flag?
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 z-10">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsCsvUploadOpen(true)}
              className="text-lg px-8 py-6"
            >
              Upload CSV
            </Button>
            <Button
              size="lg"
              onClick={() => setIsInputFormOpen(true)}
              className="text-lg px-8 py-6"
            >
              Enter Manually
            </Button>
          </div>
        </BackgroundLines>

        <Image src="/images/hero-image.png" alt="car with a green flag" className="h-screen" layout="fill" objectFit="cover" />
      </div>

      <InputFormDialog
        isOpen={isInputFormOpen}
        setIsOpen={setIsInputFormOpen}
        setResults={setResults}
      />
      <CsvUploadDialog
        isOpen={isCsvUploadOpen}
        setIsOpen={setIsCsvUploadOpen}
        setResults={setResults}
      />
    </motion.section>
  );
}
