import { motion } from "framer-motion"
import { BarChart3, Hash, TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const sentimentTrendData = [
  { date: "1/9", positive: 65, neutral: 25, negative: 10 },
  { date: "1/10", positive: 70, neutral: 20, negative: 10 },
  { date: "1/11", positive: 55, neutral: 30, negative: 15 },
  { date: "1/12", positive: 60, neutral: 25, negative: 15 },
  { date: "1/13", positive: 75, neutral: 18, negative: 7 },
  { date: "1/14", positive: 68, neutral: 22, negative: 10 },
  { date: "1/15", positive: 72, neutral: 20, negative: 8 },
]

const keywordsData = [
  { keyword: "결제 오류", count: 156, trend: "+12%" },
  { keyword: "배송 지연", count: 134, trend: "+8%" },
  { keyword: "환불 요청", count: 98, trend: "-5%" },
  { keyword: "제품 문의", count: 87, trend: "+15%" },
  { keyword: "회원가입", count: 76, trend: "+3%" },
  { keyword: "비밀번호 분실", count: 65, trend: "-2%" },
  { keyword: "이벤트 문의", count: 54, trend: "+20%" },
  { keyword: "AS 접수", count: 43, trend: "+7%" },
]

const priorityDistribution = [
  { priority: "Critical", count: 12, color: "#ef4444" },
  { priority: "High", count: 28, color: "#f97316" },
  { priority: "Medium", count: 85, color: "#eab308" },
  { priority: "Low", count: 142, color: "#22c55e" },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function VocPage() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">VOC 분석</h1>
          <p className="text-sm text-muted-foreground">
            고객 음성 데이터에서 추출한 핵심 인사이트
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BarChart3 className="h-4 w-4" />
          <span>최근 7일 기준</span>
        </div>
      </motion.div>

      <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              일자별 고객 감정 변화 추이
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sentimentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value) => [`${value}%`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="positive"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", strokeWidth: 2 }}
                    name="긍정"
                  />
                  <Line
                    type="monotone"
                    dataKey="neutral"
                    stroke="#6b7280"
                    strokeWidth={2}
                    dot={{ fill: "#6b7280", strokeWidth: 2 }}
                    name="중립"
                  />
                  <Line
                    type="monotone"
                    dataKey="negative"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444", strokeWidth: 2 }}
                    name="부정"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-muted-foreground">긍정</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-500" />
                <span className="text-sm text-muted-foreground">중립</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm text-muted-foreground">부정</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Hash className="h-5 w-5 text-primary" />
                핵심 키워드 랭킹
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keywordsData.map((item, idx) => (
                  <motion.div
                    key={item.keyword}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center justify-between rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium">{item.keyword}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{item.count}건</span>
                      <Badge
                        variant="outline"
                        className={
                          item.trend.startsWith("+")
                            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                            : "border-red-200 bg-red-50 text-red-600"
                        }
                      >
                        {item.trend}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
                우선순위별 콜 누적 분포
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priorityDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="priority"
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      width={70}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value) => [`${value}건`, "콜 수"]}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {priorityDistribution.map((entry) => (
                        <Cell key={entry.priority} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {priorityDistribution.map((item) => (
                  <div
                    key={item.priority}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium">{item.priority}</span>
                    </div>
                    <span className="text-sm font-bold">{item.count}건</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
