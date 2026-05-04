import { useState } from "react"
import { motion } from "framer-motion"
import { Bot, Clock, MessageSquare, Phone, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const callHistoryData = [
  {
    id: "CALL-001",
    datetime: "2024-01-15 14:32:05",
    caller: "010-1234-5678",
    intent: "결제 문의",
    sentiment: "Positive",
    status: "Immediate",
    summary: "신용카드 결제 오류 문의 - 즉시 해결됨",
    transcript: [
      { role: "customer", text: "안녕하세요. 결제가 안 되는 것 같아요." },
      { role: "ai", text: "안녕하세요. 결제 관련 문의를 도와드리겠습니다. 어떤 결제 수단을 사용하셨나요?" },
      { role: "customer", text: "신용카드로 결제하려고 했는데 오류가 나네요." },
      { role: "ai", text: "카드 한도와 유효기간을 확인해 보시겠어요? 종종 해당 사유로 오류가 발생합니다." },
      { role: "customer", text: "아, 한도 초과였네요. 감사합니다." },
      { role: "ai", text: "해결되어 다행입니다. 다른 문의 사항이 있으면 말씀해 주세요." },
    ],
  },
  {
    id: "CALL-002",
    datetime: "2024-01-15 13:15:22",
    caller: "010-9876-5432",
    intent: "배송 조회",
    sentiment: "Neutral",
    status: "Callback",
    summary: "배송 지연 관련 문의 - 콜백 예약됨",
    transcript: [
      { role: "customer", text: "제 택배가 언제 오나요? 3일째 지연됐어요." },
      { role: "ai", text: "불편을 드려 죄송합니다. 주문번호를 알려주시면 배송 상태를 확인해 드리겠습니다." },
      { role: "customer", text: "주문번호는 ORD-2024-1234입니다." },
      { role: "ai", text: "현재 물류센터에서 출고 대기 중입니다. 담당자가 상세 내용을 확인 후 콜백드리겠습니다." },
    ],
  },
  {
    id: "CALL-003",
    datetime: "2024-01-15 11:45:10",
    caller: "010-5555-1234",
    intent: "환불 요청",
    sentiment: "Angry",
    status: "Immediate",
    summary: "제품 불량으로 인한 환불 요청 - 상담원 연결",
    transcript: [
      { role: "customer", text: "제품이 불량인데 환불이 왜 이렇게 늦나요?" },
      { role: "ai", text: "불편을 드려 정말 죄송합니다. 어떤 문제가 있었는지 자세히 말씀해 주시겠어요?" },
      { role: "customer", text: "포장을 열었는데 제품이 깨져 있었어요. 환불해 주세요." },
      { role: "ai", text: "즉시 환불 처리를 도와드리기 위해 상담원에게 연결하겠습니다." },
    ],
  },
  {
    id: "CALL-004",
    datetime: "2024-01-15 09:30:45",
    caller: "010-7777-8888",
    intent: "회원가입 문의",
    sentiment: "Positive",
    status: "Off-hours",
    summary: "회원가입 절차 안내 - 영업시간 콜백 예약",
    transcript: [
      { role: "customer", text: "회원가입은 어떻게 하나요?" },
      { role: "ai", text: "회원가입은 홈페이지에서 간단히 진행하실 수 있습니다." },
      { role: "customer", text: "본인 인증이 잘 안 되네요." },
      { role: "ai", text: "현재 영업시간 외라 상세 지원이 어렵습니다. 내일 오전에 콜백드릴까요?" },
    ],
  },
  {
    id: "CALL-005",
    datetime: "2024-01-14 16:20:33",
    caller: "010-3333-4444",
    intent: "제품 문의",
    sentiment: "Neutral",
    status: "Callback",
    summary: "신제품 출시일 문의 - 담당자 콜백 예약",
    transcript: [
      { role: "customer", text: "새로 나오는 제품은 언제 출시되나요?" },
      { role: "ai", text: "어떤 제품에 관심이 있으신가요?" },
      { role: "customer", text: "프리미엄 시리즈요." },
      { role: "ai", text: "프리미엄 시리즈 출시 관련 담당자가 확인 후 연락드리겠습니다." },
    ],
  },
  {
    id: "CALL-006",
    datetime: "2024-01-14 14:10:12",
    caller: "010-2222-3333",
    intent: "해지 문의",
    sentiment: "Negative",
    status: "Immediate",
    summary: "서비스 해지 요청 - 상담원 연결",
    transcript: [
      { role: "customer", text: "서비스를 해지하고 싶어요." },
      { role: "ai", text: "해지를 원하시는 이유를 여쭤봐도 될까요?" },
      { role: "customer", text: "가격이 너무 비싸요." },
      { role: "ai", text: "요금제 조정을 안내해 드릴 수 있는 상담원에게 연결하겠습니다." },
    ],
  },
]

const sentimentColors: Record<string, string> = {
  Positive: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Neutral: "bg-slate-100 text-slate-700 border-slate-200",
  Negative: "bg-amber-100 text-amber-700 border-amber-200",
  Angry: "bg-red-100 text-red-700 border-red-200",
}

const statusColors: Record<string, string> = {
  Immediate: "bg-red-100 text-red-700 border-red-200",
  Callback: "bg-blue-100 text-blue-700 border-blue-200",
  "Off-hours": "bg-purple-100 text-purple-700 border-purple-200",
}

const statusLabels: Record<string, string> = {
  Immediate: "즉시 연결",
  Callback: "콜백 예약",
  "Off-hours": "영업 후 콜백",
}

export function CallsPage() {
  const [selectedCall, setSelectedCall] = useState<(typeof callHistoryData)[0] | null>(null)

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">통화 이력</h1>
          <p className="text-sm text-muted-foreground">
            전체 AI 상담 통화 내역을 조회하고 분석하세요
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>총 {callHistoryData.length}건</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">일시</TableHead>
              <TableHead className="font-semibold">통화 ID</TableHead>
              <TableHead className="font-semibold">발신자 번호</TableHead>
              <TableHead className="font-semibold">주요 의도</TableHead>
              <TableHead className="font-semibold">감정</TableHead>
              <TableHead className="font-semibold">상태</TableHead>
              <TableHead className="font-semibold">요약</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callHistoryData.map((call, idx) => (
              <motion.tr
                key={call.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.3 }}
                onClick={() => setSelectedCall(call)}
                className="group cursor-pointer transition-colors hover:bg-muted/50"
              >
                <TableCell className="text-sm text-muted-foreground">{call.datetime}</TableCell>
                <TableCell className="font-mono text-sm">{call.id}</TableCell>
                <TableCell className="text-sm">{call.caller}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {call.intent}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border font-normal", sentimentColors[call.sentiment])}>
                    {call.sentiment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border font-normal", statusColors[call.status])}>
                    {statusLabels[call.status]}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {call.summary}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Sheet open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              통화 상세 정보
            </SheetTitle>
          </SheetHeader>

          {selectedCall && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">통화 ID</p>
                  <p className="font-mono text-sm font-medium">{selectedCall.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">일시</p>
                  <p className="text-sm font-medium">{selectedCall.datetime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">발신자</p>
                  <p className="text-sm font-medium">{selectedCall.caller}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">주요 의도</p>
                  <Badge variant="outline">{selectedCall.intent}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">감정</p>
                  <Badge className={cn("border", sentimentColors[selectedCall.sentiment])}>
                    {selectedCall.sentiment}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">상태</p>
                  <Badge className={cn("border", statusColors[selectedCall.status])}>
                    {statusLabels[selectedCall.status]}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">통화 요약</h3>
                </div>
                <p className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                  {selectedCall.summary}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">대화 스크립트 (STT)</h3>
                </div>
                <div className="space-y-3">
                  {selectedCall.transcript.map((msg, idx) => (
                    <motion.div
                      key={`${selectedCall.id}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      className={cn(
                        "flex gap-3 rounded-lg p-3",
                        msg.role === "customer" ? "bg-blue-50" : "bg-emerald-50",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          msg.role === "customer" ? "bg-blue-100" : "bg-emerald-100",
                        )}
                      >
                        {msg.role === "customer" ? (
                          <User className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Bot className="h-4 w-4 text-emerald-600" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">
                          {msg.role === "customer" ? "고객" : "AI 에이전트"}
                        </p>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
