import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MotionCard } from "@/components/ui/motion-card"

const data = [
  { name: "긍정", value: 45, color: "#14b8a6" },
  { name: "중립", value: 35, color: "#94a3b8" },
  { name: "부정", value: 20, color: "#f87171" },
]

export function SentimentChart() {
  return (
    <MotionCard className="h-full bg-card p-0 py-6 text-card-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">고객 감정 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                  animationBegin={200}
                  animationDuration={800}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}건`, "통화 수"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
    </MotionCard>
  )
}
