"use client"

import { motion } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { ResultsDisplay } from "@/components/results-display"
import { useState } from "react"

export default function Home() {
  const [results, setResults] = useState(null)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen inknut-antiqua"
    >
      <HeroSection setResults={setResults} />
      {results && <ResultsDisplay results={results} />}
    </motion.main>
  )
}

