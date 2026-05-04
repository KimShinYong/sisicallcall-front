import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, FileUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UploadedFile {
  name: string
  size: string
}

const fileVariants = {
  initial: { opacity: 0, x: -20, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 20, scale: 0.95 },
}

export function PdfUpload() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: "고객응대_매뉴얼_v2.pdf", size: "2.4 MB" },
    { name: "환불정책_가이드.pdf", size: "1.1 MB" },
  ])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">PDF 매뉴얼 업로드</CardTitle>
          <CardDescription>
            AI 에이전트가 학습할 고객 응대 매뉴얼을 업로드하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            animate={{
              borderColor: isDragOver ? "#0D9488" : "rgba(100, 116, 139, 0.25)",
              backgroundColor: isDragOver ? "rgba(13, 148, 136, 0.05)" : "transparent",
              scale: isDragOver ? 1.01 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors"
          >
            <motion.div
              animate={{ y: isDragOver ? -5 : 0 }}
              transition={{ duration: 0.2 }}
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted"
            >
              <FileUp className="h-6 w-6 text-muted-foreground" />
            </motion.div>
            <p className="mb-1 text-sm font-medium text-foreground">
              PDF 파일을 드래그해서 올려주세요
            </p>
            <p className="mb-4 text-xs text-muted-foreground">
              또는 클릭하여 파일을 선택하세요 (최대 10MB)
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="sm" className="transition-all duration-200 hover:shadow-sm">
                파일 선택
              </Button>
            </motion.div>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <p className="text-sm font-medium text-foreground">업로드된 파일</p>
                {uploadedFiles.map((file, idx) => (
                  <motion.div
                    key={file.name}
                    variants={fileVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: idx * 0.05 }}
                    layout
                    className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div whileHover={{ rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                        <FileText className="h-4 w-4 text-primary" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.name)}
                        className="h-8 w-8 p-0 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
