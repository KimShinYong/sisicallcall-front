import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionCard } from "@/components/ui/motion-card"

const data = [
  { name: "결제 문의", value: 128 },
  { name: "배송 조회", value: 95 },
  { name: "환불 요청", value: 72 },
  { name: "제품 문의", value: 65 },
  { name: "기타", value: 40 },
]

export function IntentChart() {
  return (
    <MotionCard className="h-full p-0 py-6" transition={{ duration: 0.22, delay: 0.1 }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">주요 문의 의도</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                width={80}
              />
              <Tooltip
                formatter={(value) => [`${value}건`, "문의 수"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="value"
                radius={[0, 4, 4, 0]}
                barSize={24}
                animationBegin={300}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={index === 0 ? "#14b8a6" : "#99f6e4"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </MotionCard>
  )
}
