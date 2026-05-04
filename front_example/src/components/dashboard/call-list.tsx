import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const calls = [
  {
    id: "CALL-001",
    customer: "김민수",
    phone: "010-****-1234",
    issue: "환불 처리 지연 불만",
    priority: "Critical",
    time: "2분 전",
    sentiment: "부정",
  },
  {
    id: "CALL-002",
    customer: "이영희",
    phone: "010-****-5678",
    issue: "결제 오류 반복 발생",
    priority: "Critical",
    time: "5분 전",
    sentiment: "부정",
  },
  {
    id: "CALL-003",
    customer: "박준호",
    phone: "010-****-9012",
    issue: "배송 분실 신고",
    priority: "High",
    time: "8분 전",
    sentiment: "부정",
  },
  {
    id: "CALL-004",
    customer: "최서연",
    phone: "010-****-3456",
    issue: "제품 하자 교환 요청",
    priority: "High",
    time: "12분 전",
    sentiment: "중립",
  },
  {
    id: "CALL-005",
    customer: "정현우",
    phone: "010-****-7890",
    issue: "AS 접수 문의",
    priority: "High",
    time: "15분 전",
    sentiment: "중립",
  },
]

function PriorityBadge({ priority }: { priority: string }) {
  if (priority === "Critical") {
    return (
      <Badge className="border-red-200 bg-red-100 text-red-700 hover:bg-red-100">
        Critical
      </Badge>
    )
  }
  return (
    <Badge className="border-amber-200 bg-amber-100 text-amber-700 hover:bg-amber-100">
      High
    </Badge>
  )
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  if (sentiment === "부정") {
    return (
      <span className="inline-flex items-center text-xs text-red-600">
        <span className="mr-1 h-2 w-2 rounded-full bg-red-500" />
        부정
      </span>
    )
  }
  return (
    <span className="inline-flex items-center text-xs text-gray-500">
      <span className="mr-1 h-2 w-2 rounded-full bg-gray-400" />
      중립
    </span>
  )
}

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.05,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function CallList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">후속 조치 필요 콜 리스트</CardTitle>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" size="sm" className="transition-all duration-200 hover:shadow-sm">
              전체 보기
            </Button>
          </motion.div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>고객명</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>문의 내용</TableHead>
                <TableHead>우선순위</TableHead>
                <TableHead>감정</TableHead>
                <TableHead>경과 시간</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call, idx) => (
                <motion.tr
                  key={call.id}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                  whileHover={{ backgroundColor: "rgba(13, 148, 136, 0.03)" }}
                  className="border-b transition-colors"
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {call.id}
                  </TableCell>
                  <TableCell className="font-medium">{call.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{call.phone}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{call.issue}</TableCell>
                  <TableCell>
                    <PriorityBadge priority={call.priority} />
                  </TableCell>
                  <TableCell>
                    <SentimentBadge sentiment={call.sentiment} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{call.time}</TableCell>
                  <TableCell className="text-right">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        className="gap-1 transition-all duration-200 hover:shadow-md hover:shadow-primary/20"
                      >
                        <Phone className="h-3 w-3" />
                        연결
                      </Button>
                    </motion.div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
