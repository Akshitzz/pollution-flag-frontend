"use client"

import { motion } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { InputForm } from "@/components/input-form"
import { CsvUpload } from "@/components/csv-upload"
import { ResultsDisplay } from "@/components/results-display"
import { useState } from "react"

export default function Home() {
  const [results, setResults] = useState(null)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 md:p-24 inknut-antiqua"
    >
      <HeroSection />
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <InputForm setResults={setResults} />
        <CsvUpload setResults={setResults} />
      </div>
      {results && <ResultsDisplay results={results} />}
    </motion.main>
  )
}

