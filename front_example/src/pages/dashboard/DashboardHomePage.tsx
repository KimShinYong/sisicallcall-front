import { useState } from "react"
import { motion } from "framer-motion"
import { AlertBanner } from "@/components/dashboard/alert-banner"
import { CallList } from "@/components/dashboard/call-list"
import { IntentChart } from "@/components/dashboard/intent-chart"
import { PdfUpload } from "@/components/dashboard/pdf-upload"
import { SentimentChart } from "@/components/dashboard/sentiment-chart"
import { AnimatedSection } from "@/components/ui/animated-section"

export function DashboardHomePage() {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className="space-y-6 p-6">
      <AnimatedSection className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">대시보드</h1>
          <p className="text-sm text-muted-foreground">
            실시간 AI 상담 현황을 확인하세요
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground"
        >
          마지막 업데이트: {new Date().toLocaleTimeString("ko-KR")}
        </motion.div>
      </AnimatedSection>

      <AlertBanner count={3} onDismiss={() => setShowAlert(false)} isVisible={showAlert} />

      <div className="grid gap-6 md:grid-cols-2">
        <SentimentChart />
        <IntentChart />
      </div>

      <CallList />

      <PdfUpload />
    </div>
  )
}
