import { useCallback, useState } from "react"
import type { ChangeEvent, DragEvent, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle2, FileText, FileUp, Loader2, Trash2, Upload } from "lucide-react"
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
import { cn } from "@/lib/utils"

type FileStatus = "parsing" | "chunking" | "embedding" | "completed" | "error"

interface UploadedFile {
  id: string
  name: string
  size: string
  uploadedAt: string
  status: FileStatus
  progress?: number
}

const initialFiles: UploadedFile[] = [
  {
    id: "1",
    name: "고객응대_매뉴얼_v2.3.pdf",
    size: "2.4 MB",
    uploadedAt: "2024-01-15 14:30",
    status: "completed",
  },
  {
    id: "2",
    name: "제품_FAQ_2024.pdf",
    size: "1.8 MB",
    uploadedAt: "2024-01-15 13:15",
    status: "completed",
  },
  {
    id: "3",
    name: "환불정책_가이드.pdf",
    size: "856 KB",
    uploadedAt: "2024-01-15 11:00",
    status: "embedding",
    progress: 75,
  },
  {
    id: "4",
    name: "배송_프로세스_안내.pdf",
    size: "1.2 MB",
    uploadedAt: "2024-01-14 16:45",
    status: "chunking",
    progress: 45,
  },
  {
    id: "5",
    name: "신제품_카탈로그.pdf",
    size: "5.6 MB",
    uploadedAt: "2024-01-14 10:20",
    status: "parsing",
    progress: 20,
  },
]

const statusConfig: Record<FileStatus, { label: string; color: string; icon: ReactNode }> = {
  parsing: {
    label: "Markdown Parsing 중",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
  },
  chunking: {
    label: "Chunking 진행 중",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
  },
  embedding: {
    label: "Embedding 진행 중",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
  },
  completed: {
    label: "Embedding 완료",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  error: {
    label: "오류 발생",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: <AlertCircle className="h-3 w-3" />,
  },
}

export function KnowledgePage() {
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles)
  const [isDragging, setIsDragging] = useState(false)

  const appendPdfFiles = useCallback((pdfFiles: File[]) => {
    if (pdfFiles.length === 0) return

    const newFiles: UploadedFile[] = pdfFiles.map((file, idx) => ({
      id: `new-${Date.now()}-${idx}`,
      name: file.name,
      size: formatFileSize(file.size),
      uploadedAt: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "parsing",
      progress: 0,
    }))

    setFiles((prev) => [...newFiles, ...prev])
  }, [])

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      appendPdfFiles(droppedFiles.filter((file) => file.type === "application/pdf"))
    },
    [appendPdfFiles],
  )

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])
      appendPdfFiles(selectedFiles.filter((file) => file.type === "application/pdf"))
    },
    [appendPdfFiles],
  )

  const handleDelete = useCallback((id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }, [])

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">지식 업로드</h1>
          <p className="text-sm text-muted-foreground">
            AI 에이전트가 참고할 기업 문서를 관리하세요
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>총 {files.length}개 문서</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileUp className="h-5 w-5 text-primary" />
              PDF 문서 업로드
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all duration-300",
                isDragging
                  ? "scale-[1.01] border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/30",
              )}
            >
              <motion.div
                animate={{
                  y: isDragging ? -5 : 0,
                  scale: isDragging ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "mb-4 flex h-16 w-16 items-center justify-center rounded-full",
                  isDragging ? "bg-primary/20" : "bg-muted",
                )}
              >
                <Upload
                  className={cn(
                    "h-8 w-8 transition-colors",
                    isDragging ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </motion.div>

              <p className="mb-1 text-lg font-medium text-foreground">
                {isDragging ? "여기에 파일을 놓으세요" : "PDF 파일을 드래그하여 업로드"}
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                또는 클릭하여 파일을 선택하세요
              </p>

              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileSelect}
                className="absolute inset-0 cursor-pointer opacity-0"
              />

              <Button variant="outline" className="pointer-events-none">
                파일 선택
              </Button>

              <p className="mt-4 text-xs text-muted-foreground">
                PDF 형식만 지원 (최대 50MB)
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              업로드된 문서 목록
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">파일명</TableHead>
                  <TableHead className="font-semibold">크기</TableHead>
                  <TableHead className="font-semibold">업로드 일시</TableHead>
                  <TableHead className="font-semibold">상태</TableHead>
                  <TableHead className="w-[80px] font-semibold">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {files.map((file, idx) => {
                    const status = statusConfig[file.status]
                    return (
                      <motion.tr
                        key={file.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: 0.03 * idx, duration: 0.3 }}
                        className="group transition-colors hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {file.size}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {file.uploadedAt}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={cn("gap-1 border font-normal", status.color)}>
                              {status.icon}
                              {status.label}
                            </Badge>
                            {file.progress !== undefined && file.status !== "completed" && (
                              <span className="text-xs text-muted-foreground">
                                {file.progress}%
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(file.id)}
                            className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>

            {files.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="mb-3 h-12 w-12 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  업로드된 문서가 없습니다
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
