"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu, ChevronDown, X } from 'lucide-react';
 
const megaMenuCategories = [
  { label: 'Bán chạy nhất', img: '/images/26.jpg', href: '/?cat=best-sellers' },
  { label: 'Áo Hoodie', img: '/images/27.jpg', href: '/?cat=hoodies' },
  { label: 'Áo Sơ Mi, Áo Len & Áo Thun', img: '/images/28.jpg', href: '/?cat=shirts-sweaters' },
  { label: 'Phụ Kiện & Khác', img: '/images/29.jpg', href: '/?cat=accessories' },
];
 
export default function Navbar({ isHero = false }) {
  const [menuImg, setMenuImg] = useState('/images/26.jpg');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);
 
  return (
    <>
      {/* Video Transition Overlay */}
      <div id="video-transition" className="fixed inset-0 z-[9999] opacity-0 pointer-events-none transition-opacity duration-1000 flex items-center justify-center overflow-hidden">
        <img id="transition-bg-image" src="/back.jpg" className="absolute inset-0 w-full h-full object-cover" alt="bg" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 w-40 md:w-48 aspect-video overflow-hidden border-[5px] border-white transform scale-95 opacity-0 transition-all duration-1000 ease-in-out" id="transition-box">
          <video id="loader-video" muted playsInline className="w-full h-full object-cover">
            <source src="/transition.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
 
      {/* Header Layout */}
      <header className={`w-full z-[100] transition-colors ${isHero ? 'relative text-white' : 'relative text-white bg-black'}`}>
        {/* Sử dụng Grid 3 cột (1fr auto 1fr) để Menu luôn nằm chính giữa */}
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          
          {/* Nhóm 1: Logo (Nằm sát trái) */}
          <div className="flex justify-start">
            <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center cursor-pointer">
              OFF<span className="text-red-500 mx-0.5">x</span>SCRIPT
            </Link>
          </div>

          {/* Nhóm 2: Nav (Nằm chính giữa) */}
          <nav className="hidden lg:flex items-center justify-center gap-10 text-[10px] font-mono tracking-widest uppercase">
            <Link href="/new-arrivals" className="hover:text-gray-400 transition-colors">Sản phẩm mới</Link>
 
            {/* Mega Menu */}
            <div className="relative group">
              <div className="cursor-pointer hover:text-gray-400 flex items-center gap-1">
                TẤT CẢ CÁC MẶT HÀNG ᕦ(ò_óˇ)ᕤ
                <ChevronDown size={12} />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 w-[700px] bg-black text-white opacity-0 invisible translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 shadow-2xl">
                <div className="grid grid-cols-2 gap-10 p-10">
                  <div>
                    <p className="font-semibold mb-4 border-b border-white/10 pb-2">Thể loại</p>
                    <ul className="space-y-3 text-sm">
                      {megaMenuCategories.map((cat) => (
                        <li key={cat.label}>
                          <Link
                              href={cat.href}
                              className="hover:text-gray-400 cursor-pointer transition-colors font-bold uppercase block"
                              onMouseEnter={() => setMenuImg(cat.img)}
                          >
                            {cat.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative overflow-hidden rounded-xl h-64 bg-gray-900">
                    <img src={menuImg} className="w-full h-full object-cover transition-all duration-500" alt="category" />
                  </div>
                </div>
              </div>
            </div>
 
            <Link href="/help" className="hover:text-gray-400 transition-colors">Trung tâm trợ giúp</Link>
          </nav>
 
          {/* Nhóm 3: Right Icons (Nằm sát phải) */}
          <div className="flex items-center justify-end gap-3 xl:gap-5 flex-shrink-0">
            <button className="lg:hidden cursor-pointer hover:text-gray-400" onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </button>

            {/* Currency - only xl+ */}
            <div className="relative group hidden xl:block">
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest cursor-pointer whitespace-nowrap">
                <span>Vietnam (VND ₫)</span>
                <ChevronDown size={11} />
              </div>
              <div className="absolute right-0 top-full mt-4 w-[260px] bg-black text-white opacity-0 invisible translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 max-h-60 overflow-y-auto">
                <ul className="py-2 text-[10px]">
                  {[['ALL', 'Albania (ALL L)'],['USD','United States (USD $)'],['AUD','Australia (AUD $)'],['EUR','Belgium (EUR €)'],['CAD','Canada (CAD $)'],['JPY','Japan (JPY ¥)'],['VND','Vietnam (VND ₫)']].map(([code, label]) => (
                    <li key={code} className="px-4 py-2 hover:bg-white/10 cursor-pointer">{label}</li>
                  ))}
                </ul>
              </div>
            </div>
 
            {/* Language */}
            <div className="relative group hidden xl:block">
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest cursor-pointer">
                <span>VN</span>
                <ChevronDown size={12} />
              </div>
              <div className="absolute right-0 top-full mt-4 w-[140px] bg-black text-white opacity-0 invisible translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50">
                <ul className="py-2 text-[10px]">
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Tiếng Việt</li>
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">English</li>
                  <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">日本語</li>
                </ul>
              </div>
            </div>
 
            <button className="cursor-pointer hover:text-gray-400"><Search size={20} /></button>
            <button className="cursor-pointer hover:text-gray-400"><User size={20} /></button>
            <Link href="/cart" className="relative cursor-pointer hover:text-gray-400">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full text-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>
 
      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm transition-opacity duration-300 flex justify-start ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`w-[80%] max-w-sm h-full bg-white text-black transform transition-transform duration-300 flex flex-col shadow-2xl ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
            <h1 className="text-xl font-bold tracking-tighter">OFF<span className="text-red-500 mx-0.5">x</span>SCRIPT</h1>
            <button onClick={() => setMobileOpen(false)}><X size={24} /></button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-6 text-sm font-mono uppercase tracking-widest">
            <Link href="/new-arrivals" className="block hover:text-gray-400">Sản phẩm mới</Link>
            <div className="pb-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-4 text-gray-400">Tất cả các mặt hàng</div>
              <ul className="space-y-3 text-sm">
                {megaMenuCategories.map(cat => (
                  <li key={cat.label}>
                    <Link href={cat.href} className="font-bold hover:text-gray-400 block">{cat.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/help" className="block hover:text-gray-500">Trung tâm trợ giúp</Link>
          </div>
        </div>
      </div>
    </>
  );
}