import { useState } from "react"
import { motion } from "framer-motion"
import { AlertBanner } from "@/components/dashboard/alert-banner"
import { CallList } from "@/components/dashboard/call-list"
import { IntentChart } from "@/components/dashboard/intent-chart"
import { PdfUpload } from "@/components/dashboard/pdf-upload"
import { SentimentChart } from "@/components/dashboard/sentiment-chart"

export function DashboardHomePage() {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between"
      >
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
      </motion.div>

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
