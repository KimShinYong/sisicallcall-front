import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { LayoutDashboard, Phone, MessageSquareText, FileUp, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const logoSrc =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F73u93gxOEnKoM0ShWO9oUBWEHDlnw.png"

const menuItems = [
  {
    label: "대시보드",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "통화 이력",
    href: "/dashboard/calls",
    icon: Phone,
  },
  {
    label: "VOC 분석",
    href: "/dashboard/voc",
    icon: MessageSquareText,
  },
  {
    label: "지식 업로드",
    href: "/dashboard/knowledge",
    icon: FileUp,
  },
]

const sidebarVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const menuItemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export function DashboardSidebar() {
  const { pathname } = useLocation()

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="flex h-screen w-64 flex-col border-r border-border bg-card"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex h-16 items-center gap-2 border-b border-border px-6"
      >
        <img
          src={logoSrc}
          alt="시시콜콜 로고"
          width={40}
          height={40}
          className="max-w-[40px]"
          style={{ mixBlendMode: "multiply" }}
        />
        <span className="text-lg font-bold text-foreground">시시콜콜</span>
      </motion.div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.href
            return (
              <motion.li
                key={item.href}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.span>
                  {item.label}
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-auto"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.span>
                  )}
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </nav>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="border-t border-border p-4"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
            &larr;
          </motion.span>
          <span>홈으로 돌아가기</span>
        </Link>
      </motion.div>
    </motion.aside>
  )
}
