import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const logoSrc =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F73u93gxOEnKoM0ShWO9oUBWEHDlnw.png"

const navItems = [
  {
    label: "제품 소개",
    href: "#features",
    submenu: [
      { label: "AI 전화 상담", href: "#features", description: "자연스러운 AI 음성 상담" },
      { label: "실시간 분석", href: "#analytics", description: "VOC 및 감정 분석" },
      { label: "멀티채널 지원", href: "#multichannel", description: "전화, 메시지, 문자 통합" },
    ],
  },
  {
    label: "솔루션",
    href: "#solutions",
    submenu: [
      { label: "고객센터", href: "#contact-center", description: "대용량 콜센터 자동화" },
      { label: "예약 관리", href: "#booking", description: "자동 예약 및 확인" },
      { label: "주문 접수", href: "#orders", description: "음성 주문 처리" },
    ],
  },
  { label: "요금제", href: "#pricing" },
  { label: "라이브 데모", href: "#demo" },
]

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center"
          >
            <img
              src={logoSrc}
              alt="시시콜콜 로고"
              width={44}
              height={44}
              className="max-w-[44px]"
              style={{ mixBlendMode: "multiply" }}
            />
          </motion.div>
          <span className="text-[18px] font-semibold tracking-tight text-[#0f172a]">
            시시콜콜
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.submenu && setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-[15px] font-medium text-[#475569] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
              >
                {item.label}
                {item.submenu && (
                  <motion.span
                    animate={{ rotate: activeMenu === item.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                )}
              </a>

              <AnimatePresence>
                {item.submenu && activeMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-full z-50 mt-1 w-64 origin-top rounded-xl border border-[#e2e8f0] bg-white p-2 shadow-lg"
                  >
                    {item.submenu.map((subItem, idx) => (
                      <motion.div
                        key={subItem.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <a
                          href={subItem.href}
                          className="block rounded-lg px-4 py-3 transition-colors hover:bg-[#f1f5f9]"
                        >
                          <span className="block text-[14px] font-medium text-[#0f172a]">
                            {subItem.label}
                          </span>
                          <span className="block text-[13px] text-[#64748b]">
                            {subItem.description}
                          </span>
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="hidden text-[15px] font-medium text-[#0f172a] transition-colors hover:text-[#475569] lg:block"
          >
            대시보드
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              className="h-10 rounded-full bg-[#0D9488] px-6 text-[14px] font-semibold text-white shadow-none transition-all duration-300 hover:bg-[#0f766e] hover:shadow-lg hover:shadow-[#0D9488]/25"
            >
              <Link to="/dashboard">시작하기</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
