import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <motion.section
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Drive Clean</h1>
      <p className="text-xl md:text-2xl mb-8 parkinsans">Is your car a green flag or red flag?</p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline">Upload CSV</Button>
        <Button>Enter Manually</Button>
      </div>
    </motion.section>
  )
}

