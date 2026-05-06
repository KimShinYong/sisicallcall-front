import { useCallback, useState } from "react"
import type { ChangeEvent, DragEvent, ReactNode } from "react"
import {
  motion,
  AnimatePresence,
} from "framer-motion"
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  FileUp,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useDeleteTenantDocument,
  useTenantDocuments,
  useUploadTenantDocument,
} from "@/features/documents/documentQueries"
import type { TenantDocument } from "@/features/documents/documentTypes"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/shared/auth/authStore"

const documentQueryParams = {
  offset: 0,
  limit: 20,
} as const

const statusConfig: Partial<Record<string, { label: string; color: string; icon: ReactNode }>> = {
  processing: {
    label: "처리 중",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
  },
  ready: {
    label: "Embedding 완료",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  failed: {
    label: "오류 발생",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: <AlertCircle className="h-3 w-3" />,
  },
}

function getStatusConfig(status: string) {
  return (
    statusConfig[status] ?? {
      label: status || "상태 확인 중",
      color: "bg-slate-100 text-slate-700 border-slate-200",
      icon: <Loader2 className="h-3 w-3 animate-spin" />,
    }
  )
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
}

function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return "시간 정보 없음"
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString("ko-KR")
}

function DocumentTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: 6 }).map((__, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export function KnowledgePage() {
  const tenantId = useAuthStore((state) => state.tenant?.id)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deletingDocumentId, setDeletingDocumentId] = useState<string | null>(null)

  const documentsQuery = useTenantDocuments(tenantId, documentQueryParams)
  const { mutateAsync: uploadDocument, isPending: isUploading } =
    useUploadTenantDocument(tenantId)
  const { mutateAsync: deleteDocument } = useDeleteTenantDocument(tenantId)

  const documents = documentsQuery.data?.items ?? []
  const totalDocuments = documentsQuery.data?.total ?? documents.length
  const isUploadDisabled = !tenantId || isUploading

  const uploadPdfFiles = useCallback(
    async (files: File[]) => {
      setUploadError(null)

      if (!tenantId) {
        setUploadError("회사 정보를 확인한 뒤 업로드할 수 있습니다.")
        return
      }

      const pdfFiles = files.filter(isPdfFile)
      if (pdfFiles.length === 0) {
        setUploadError("PDF 파일만 업로드할 수 있습니다.")
        return
      }

      if (pdfFiles.length !== files.length) {
        setUploadError("PDF가 아닌 파일은 제외했습니다.")
      }

      try {
        await Promise.all(pdfFiles.map((file) => uploadDocument(file)))
      } catch (error) {
        setUploadError(
          error instanceof Error ? error.message : "문서 업로드에 실패했습니다.",
        )
      }
    },
    [tenantId, uploadDocument],
  )

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!isUploadDisabled) {
      setIsDragging(true)
    }
  }, [isUploadDisabled])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      if (isUploadDisabled) {
        return
      }

      void uploadPdfFiles(Array.from(e.dataTransfer.files))
    },
    [isUploadDisabled, uploadPdfFiles],
  )

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isUploadDisabled) {
        e.target.value = ""
        return
      }

      void uploadPdfFiles(Array.from(e.target.files || []))
      e.target.value = ""
    },
    [isUploadDisabled, uploadPdfFiles],
  )

  const handleDelete = useCallback(
    async (documentId: string) => {
      if (!tenantId) {
        return
      }

      setDeleteError(null)
      setDeletingDocumentId(documentId)

      try {
        await deleteDocument(documentId)
      } catch (error) {
        setDeleteError(
          error instanceof Error ? error.message : "문서를 삭제하지 못했습니다.",
        )
      } finally {
        setDeletingDocumentId(null)
      }
    },
    [deleteDocument, tenantId],
  )

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
          <span>총 {totalDocuments}개 문서</span>
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
                isUploadDisabled ? "cursor-not-allowed opacity-80" : "cursor-pointer",
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
                {isUploading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                  <Upload
                    className={cn(
                      "h-8 w-8 transition-colors",
                      isDragging ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                )}
              </motion.div>

              <p className="mb-1 text-lg font-medium text-foreground">
                {isUploading
                  ? "PDF 문서를 업로드하는 중입니다"
                  : isDragging
                    ? "여기에 파일을 놓으세요"
                    : "PDF 파일을 드래그하여 업로드"}
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                또는 클릭하여 파일을 선택하세요
              </p>

              <input
                type="file"
                accept=".pdf,application/pdf"
                multiple
                disabled={isUploadDisabled}
                onChange={handleFileSelect}
                className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
              />

              <Button variant="outline" className="pointer-events-none">
                {isUploading ? "업로드 중..." : "파일 선택"}
              </Button>

              <p className="mt-4 text-xs text-muted-foreground">
                PDF 형식만 지원 (최대 50MB)
              </p>
            </div>

            {uploadError ? (
              <p className="mt-3 text-sm text-red-600">{uploadError}</p>
            ) : null}
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
            {deleteError ? (
              <p className="mb-3 text-sm text-red-600">{deleteError}</p>
            ) : null}

            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">파일명</TableHead>
                  <TableHead className="font-semibold">청크 수</TableHead>
                  <TableHead className="font-semibold">업로드 일시</TableHead>
                  <TableHead className="font-semibold">인덱싱 일시</TableHead>
                  <TableHead className="font-semibold">상태</TableHead>
                  <TableHead className="w-[80px] font-semibold">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!tenantId ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      회사 정보를 확인하고 있습니다.
                    </TableCell>
                  </TableRow>
                ) : null}

                {tenantId && documentsQuery.isLoading ? <DocumentTableSkeleton /> : null}

                {tenantId && documentsQuery.isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      문서 목록을 불러오지 못했습니다.
                    </TableCell>
                  </TableRow>
                ) : null}

                {tenantId &&
                !documentsQuery.isLoading &&
                !documentsQuery.isError &&
                documents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      등록된 문서가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : null}

                <AnimatePresence mode="popLayout">
                  {documents.map((document, idx) => (
                    <DocumentRow
                      key={document.id}
                      document={document}
                      index={idx}
                      isDeleting={deletingDocumentId === document.id}
                      onDelete={() => void handleDelete(document.id)}
                    />
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function DocumentRow({
  document,
  index,
  isDeleting,
  onDelete,
}: {
  document: TenantDocument
  index: number
  isDeleting: boolean
  onDelete: () => void
}) {
  const status = getStatusConfig(document.status)

  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ delay: 0.03 * index, duration: 0.3 }}
      className="group transition-colors hover:bg-muted/50"
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium">{document.file_name}</span>
        </div>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {document.chunk_count?.toLocaleString("ko-KR") ?? "-"}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {formatDateTime(document.uploaded_at)}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {formatDateTime(document.indexed_at)}
      </TableCell>
      <TableCell>
        <Badge className={cn("gap-1 border font-normal", status.color)}>
          {status.icon}
          {status.label}
        </Badge>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          disabled={isDeleting}
          onClick={onDelete}
          aria-label={`${document.file_name} 삭제`}
          className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity hover:text-red-500 disabled:opacity-60 group-hover:opacity-100"
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </TableCell>
    </motion.tr>
  )
}
