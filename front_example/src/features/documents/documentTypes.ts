export type TenantDocument = {
  id: string
  tenant_id: string
  file_name: string
  file_type: "pdf" | "faq" | string
  chunk_count: number | null
  status: "processing" | "ready" | "failed" | string
  chroma_collection: string | null
  uploaded_at: string
  indexed_at: string | null
}

export type TenantDocumentsData = {
  items: TenantDocument[]
  total: number
  offset: number
  limit: number
}

export type TenantDocumentsParams = {
  offset?: number
  limit?: number
}

export type ApiResponse<T> = {
  data: T
  request_id: string
}

export type UploadTenantDocumentData = {
  document_id: string
  status: string
}

export type DeleteTenantDocumentData = {
  document_id: string
  deleted: boolean
}
