"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { Plus, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Star, ChevronDown, SlidersHorizontal } from 'lucide-react';

/* ─── ProductCard ─── */
function ProductCard({ product, index }) {
  const priceDisplay = product.giaSP?.toLocaleString('vi-VN') + ' ₫';
  return (
    <Link
      href={`/product/${product.maSP}`}
      className="product-item group cursor-pointer flex flex-col"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#f2f2f2] w-full">
        <img
          src={product.image}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
          alt={product.tenSP}
        />
        <img
          src={product.hover || product.image}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          alt={`${product.tenSP} hover`}
        />
        {/* Cart button */}
        <div className="cart-btn-wrapper">
          <div className="icon-wrapper">
            <Plus size={18} className="text-black" />
          </div>
          <span className="cart-text-span">ADD TO CART</span>
        </div>
      </div>
      <div className="mt-4 text-left">
        <h3 className="text-[14px] font-bold uppercase tracking-tighter line-clamp-1">{product.tenSP}</h3>
        <p className="text-xs text-gray-400 font-mono mt-1 mb-2 line-clamp-1">{product.moTaNgan}</p>
        <p className="text-[13px] font-mono font-semibold text-gray-800">{priceDisplay}</p>
      </div>
    </Link>
  );
}

/* ─── New Releases Slider ─── */
function NewReleasesSlider() {
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const scroll = (dir) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector('a')?.offsetWidth || 280;
      sliderRef.current.scrollBy({ left: dir * (cardWidth + 24) * 2, behavior: 'smooth' });
    }
  };

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = 'grabbing';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = 'grab';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeftStart.current - (x - startX.current) * 1.5;
  };

  return (
    <div id="home-new-releases-section" className="relative z-[20] w-full bg-white flex border-b border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
      <div className="hidden md:flex w-16 bg-[#eaeaea] shrink-0 items-center justify-center border-r border-gray-200">
        <span className="writing-vertical text-xs font-mono font-bold tracking-[0.2em] text-gray-800">New Releases</span>
      </div>
      <div className="flex-1 py-12 md:py-20 overflow-hidden flex flex-col">
        <div className="px-6 md:px-12 flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">New Releases</h2>
          <Link href="/new-arrivals" className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-black hover:text-gray-500 transition-colors">
            View All New Releases
          </Link>
        </div>
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-5 md:gap-6 px-6 md:px-12 pb-8 snap-x snap-mandatory hide-scrollbar select-none"
          style={{ cursor: 'grab' }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {products.map((p) => (
            <Link
              key={p.maSP}
              href={`/product/${p.maSP}`}
              draggable={false}
              className="snap-start flex-shrink-0 group cursor-pointer"
              style={{ width: 'clamp(200px, 22vw, 300px)' }}
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#f2f2f2] mb-3">
                <img src={p.image} draggable={false} className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" alt={p.tenSP} />
                <img src={p.hover || p.image} draggable={false} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100" alt={p.tenSP} />
              </div>
              <p className="text-xs font-bold uppercase tracking-tighter line-clamp-1">{p.tenSP}</p>
              <p className="text-xs font-mono text-gray-500 mt-1">{p.giaSP?.toLocaleString('vi-VN')} ₫</p>
            </Link>
          ))}
        </div>
        <div className="px-6 md:px-12 flex justify-between items-center mt-6">
          <button onClick={() => scroll(-1)} className="w-8 h-8 flex items-center justify-center hover:text-gray-500 transition-transform hover:-translate-x-1">
            <ArrowLeft size={24} />
          </button>
          <p className="text-[9px] font-mono text-gray-400 tracking-widest uppercase md:hidden">← vuốt để xem thêm →</p>
          <button onClick={() => scroll(1)} className="w-8 h-8 flex items-center justify-center hover:text-gray-500 transition-transform hover:translate-x-1">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ['OFF SCRIPT STORE', 'SẢN PHẨM BÁN CHẠY NHẤT', 'HÀNG MỚI VỀ', 'MIỄN PHÍ VẬN CHUYỂN TRÊN $150', 'THAM GIA CÂU LẠC BỘ', 'BỘ SƯU TẬP MÙA HÈ', 'GIẢM GIÁ 50%'];
  const content = items.map((item, j) => (
    <span key={j} className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] px-8 flex items-center gap-8">
      {item}
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0"></span>
    </span>
  ));
  return (
    <div className="w-full bg-black text-white py-3 md:py-4 overflow-hidden relative border-y border-white/20 z-20 flex" style={{display:'flex'}}>
      <div className="flex w-max animate-marquee-run flex-shrink-0">
        {content}{content}
      </div>
      <div className="flex w-max animate-marquee-run flex-shrink-0" aria-hidden="true">
        {content}{content}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [isStore, setIsStore] = useState(false);

  // Khôi phục trang từ sessionStorage khi F5/refresh
  useEffect(() => {
    const saved = sessionStorage.getItem('offscript_page');
    if (saved === 'store') setIsStore(true);
  }, []);
  const [displayedCount, setDisplayedCount] = useState(9);
  const [sortLabel, setSortLabel] = useState('Bán chạy nhất');
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([]);

  // Reveal-on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isStore]);

  // Show products with animation
  useEffect(() => {
    if (isStore) {
      const timer = setTimeout(() => {
        document.querySelectorAll('.product-item').forEach((el, i) => {
          setTimeout(() => el.classList.add('show'), i * 80);
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isStore, displayedCount]);

  const sortOptions = ['Nổi bật', 'Bán chạy nhất', 'Theo thứ tự chữ cái, A-Z', 'Theo thứ tự chữ cái, Z-A', 'Giá, thấp đến cao', 'Giá, cao đến thấp'];

  const getSortedProducts = () => {
    let sorted = [...products];
    if (sortLabel === 'Theo thứ tự chữ cái, A-Z') sorted.sort((a, b) => a.tenSP.localeCompare(b.tenSP));
    else if (sortLabel === 'Theo thứ tự chữ cái, Z-A') sorted.sort((a, b) => b.tenSP.localeCompare(a.tenSP));
    else if (sortLabel === 'Giá, thấp đến cao') sorted.sort((a, b) => a.giaSP - b.giaSP);
    else if (sortLabel === 'Giá, cao đến thấp') sorted.sort((a, b) => b.giaSP - a.giaSP);
    return sorted;
  };

  const bestSellers = products.filter(p => p.rating >= 4.9).slice(0, 4);

  /* ── LANDING PAGE ── */
  if (!isStore) {
    return (
      <div id="intro-wrapper" className="w-full relative">
        {/* Sticky Hero */}
        <div id="landing-page" className="sticky top-0 z-[10] h-screen w-full overflow-hidden flex flex-col" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)'}}>
          <div className="relative z-[60] bg-black text-white text-[10px] py-2 text-center font-mono tracking-widest uppercase border-b border-white/10">
            Tìm hiểu thêm về các sản phẩm bán chạy nhất
          </div>
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <Navbar isHero={true} />
          <div className="relative z-10 flex-1 flex flex-col items-center text-center md:items-start md:text-left justify-center px-6 lg:px-24 w-full h-full">
            <div className="max-w-xl khoi-chu-troi">
              <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight drop-shadow-2xl">
                Khám phá <br /> các sản phẩm bán chạy nhất của <br />chúng tôi
              </h2>
              <button
                onClick={() => { sessionStorage.setItem('offscript_page', 'store'); setIsStore(true); window.scrollTo({ top: 0 }); }}
                className="bg-[#b91c1c] text-white px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#991b1b] transition-transform duration-500 hover:scale-105 hover:-translate-y-1"
              >
                TRANG CHỦ
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 w-full z-10 bg-black text-white text-[10px] py-2 text-center font-mono tracking-widest uppercase border-t border-white/10">
            Tìm hiểu thêm về các sản phẩm bán chạy nhất
          </div>
        </div>

        {/* New Releases Slider */}
        <NewReleasesSlider />

        {/* Interactive Lookbook */}
        <div id="interactive-lookbook" className="relative z-[30] w-full h-[70vh] md:h-[90vh] bg-[#1a1a1a] overflow-hidden flex flex-col justify-end">
          <img
            src="/images/2001.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          {/* Fallback gradient when no image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-600 z-[-1]"></div>
          <h2 className="absolute top-4 md:top-10 w-full text-center text-[18vw] md:text-[15vw] font-black tracking-tighter leading-none text-white/10 z-0 select-none pointer-events-none">
            OFF SCRIPT_
          </h2>
          <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-10">
            <h3 className="text-white text-3xl md:text-[40px] font-bold tracking-tighter mb-4 drop-shadow-md">Our New Releases</h3>
            <button
              onClick={() => { sessionStorage.setItem('offscript_page', 'store'); setIsStore(true); window.scrollTo({ top: 0 }); }}
              className="bg-white text-black px-6 md:px-8 py-3 md:py-4 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg"
            >
              SHOP NEW RELEASES
            </button>
          </div>
        </div>

        <Marquee />

        {/* Dual Banners */}
        <div id="home-dual-banners" className="w-full flex flex-col relative z-[20]">
          {/* Banner 1 - Hoodies */}
          <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden" style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'}}>
            <img
              src="/images/2000.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-10">
              <h2 className="text-white text-4xl md:text-[50px] font-bold tracking-tighter mb-2 drop-shadow-md">Áo Hoodie của chúng tôi</h2>
              <p className="text-white font-mono text-sm md:text-base tracking-widest mb-6 drop-shadow-md">Và Áo Len</p>
              <button onClick={() => { sessionStorage.setItem('offscript_page', 'store'); setIsStore(true); window.scrollTo({ top: 0 }); }} className="bg-white text-black px-6 md:px-8 py-3 md:py-4 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg">
                MUA HOODIE & ÁO LEN
              </button>
            </div>
          </div>
          {/* Banner 2 - Sales */}
          <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden" style={{background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)'}}>
            <img
              src="/images/2002.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-10">
              <h2 className="text-white text-4xl md:text-[50px] font-bold tracking-tighter mb-2 drop-shadow-md">Đang giảm giá</h2>
              <p className="text-white font-mono text-sm md:text-base tracking-widest mb-6 drop-shadow-md">Giảm lên đến 30%</p>
              <button onClick={() => { sessionStorage.setItem('offscript_page', 'store'); setIsStore(true); window.scrollTo({ top: 0 }); }} className="bg-white text-black px-6 md:px-8 py-3 md:py-4 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg">
                MUA HÀNG GIẢM GIÁ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── STORE PAGE ── */
  {/* Black sticky header */}
      <header className="bg-black text-white sticky top-0 z-50">
        {/* Áp dụng lưới 3 cột tương tự Header.js */}
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          
          {/* Nhóm 1: Logo (Nằm sát trái) */}
          <div className="flex justify-start">
            <button onClick={() => { sessionStorage.setItem('offscript_page', 'landing'); setIsStore(false); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="text-2xl font-bold tracking-tighter flex items-center cursor-pointer">
              OFF<span className="text-red-500 mx-0.5">x</span>SCRIPT
            </button>
          </div>
          
          {/* Nhóm 2: Nav (Nằm chính giữa) */}
          <nav className="hidden lg:flex items-center justify-center gap-10 text-[10px] font-mono tracking-widest uppercase">
            <Link href="/new-arrivals" className="hover:text-gray-400 transition-colors">Sản phẩm mới</Link>
            <div className="relative group">
              <div className="cursor-pointer hover:text-gray-400 flex items-center gap-1">
                TẤT CẢ CÁC MẶT HÀNG ᕦ(ò_óˇ)ᕤ <ChevronDown size={12} />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[700px] bg-black text-white opacity-0 invisible translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 shadow-2xl">
                <div className="grid grid-cols-2 gap-10 p-10">
                  <div>
                    <p className="font-semibold mb-4 border-b border-white/10 pb-2">Thể loại</p>
                    <ul className="space-y-3 text-sm">
                      {[['Bán chạy nhất','best-sellers'],['Áo Hoodie','hoodies'],['Áo Sơ Mi, Áo Len & Áo Thun','shirts-sweaters'],['Phụ Kiện & Khác','accessories']].map(([label, cat]) => (
                        <li key={cat} className="hover:text-gray-400 cursor-pointer transition-colors font-bold uppercase">{label}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative overflow-hidden rounded-xl h-64 bg-gray-900">
                    <img src="/images/26.jpg" className="w-full h-full object-cover transition-all duration-500" alt="category" />
                  </div>
                </div>
              </div>
            </div>
            <Link href="/help" className="hover:text-gray-400 transition-colors">Trung tâm trợ giúp</Link>
          </nav>

          {/* Nhóm 3: Icons (Nằm sát phải) */}
          <div className="flex items-center justify-end gap-4 md:gap-6">
            <Link href="/cart" className="relative cursor-pointer hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full text-white">0</span>
            </Link>
          </div>
        </div>
      </header>
  const sorted = getSortedProducts();
  const shown = sorted.slice(0, displayedCount);

  return (
    <div id="main-store" className="min-h-screen flex flex-col bg-white">
      {/* Top promo bar */}
      <div className="bg-black text-white text-[10px] py-2 text-center font-mono tracking-widest uppercase border-b border-white/10">
        Tìm hiểu thêm về các sản phẩm bán chạy nhất
      </div>

      {/* Black sticky header */}
      <header className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => { sessionStorage.setItem('offscript_page', 'landing'); setIsStore(false); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="text-2xl font-bold tracking-tighter flex items-center cursor-pointer">
            OFF<span className="text-red-500 mx-0.5">x</span>SCRIPT
          </button>
          <nav className="hidden lg:flex items-center space-x-10 text-[10px] font-mono tracking-widest uppercase">
            <Link href="/new-arrivals" className="hover:text-gray-400 transition-colors">Sản phẩm mới</Link>
            <div className="relative group">
              <div className="cursor-pointer hover:text-gray-400 flex items-center gap-1">
                TẤT CẢ CÁC MẶT HÀNG ᕦ(ò_óˇ)ᕤ <ChevronDown size={12} />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-[700px] bg-black text-white opacity-0 invisible translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 shadow-2xl">
                <div className="grid grid-cols-2 gap-10 p-10">
                  <div>
                    <p className="font-semibold mb-4 border-b border-white/10 pb-2">Thể loại</p>
                    <ul className="space-y-3 text-sm">
                      {[['Bán chạy nhất','best-sellers'],['Áo Hoodie','hoodies'],['Áo Sơ Mi, Áo Len & Áo Thun','shirts-sweaters'],['Phụ Kiện & Khác','accessories']].map(([label, cat]) => (
                        <li key={cat} className="hover:text-gray-400 cursor-pointer transition-colors font-bold uppercase">{label}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative overflow-hidden rounded-xl h-64 bg-gray-900">
                    <img src="/images/26.jpg" className="w-full h-full object-cover transition-all duration-500" alt="category" />
                  </div>
                </div>
              </div>
            </div>
            <Link href="/help" className="hover:text-gray-400 transition-colors">Trung tâm trợ giúp</Link>
          </nav>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/cart" className="relative cursor-pointer hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full text-white">0</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative w-full">
        {/* Sidebar - fixed position, doesn't push content */}
        <aside className="sidebar-fixed hidden xl:flex flex-col w-[80px]">
          <div onClick={() => { sessionStorage.setItem('offscript_page', 'landing'); setIsStore(false); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="writing-vertical py-8 px-4 text-[10px] font-mono tracking-widest uppercase border-b border-gray-200 bg-gray-100 border-l-2 border-l-black cursor-pointer hover:bg-gray-50 transition-colors">
            TRANG CHỦ
          </div>
          <div className="writing-vertical py-8 px-4 text-[10px] font-mono tracking-widest uppercase border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
            SẢN PHẨM
          </div>
          <div className="writing-vertical py-8 px-4 text-[10px] font-mono tracking-widest uppercase border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
            BEST SELLERS
          </div>
        </aside>
        {/* Spacer in flow so content shifts right on xl screens */}
        <div className="hidden xl:block w-[80px] shrink-0"></div>

        {/* Content area - flex-1 so it fills remaining width */}
        <div className="flex-1 w-full min-w-0 flex flex-col">
          <main className="w-full max-w-[1500px] mx-auto px-4 md:px-12 py-8 md:py-12 flex flex-col">

            {/* Banner */}
            <div className="relative w-full h-[50vh] min-h-[400px] mb-12 md:mb-16 overflow-hidden md:rounded-3xl flex items-center">
              <div className="absolute inset-0 z-0 khung-nen-parallax">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover transform scale-[1.2]">
                  <source src="/video.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute inset-0 bg-black/40 z-[1]"></div>
              <div className="relative z-10 w-full px-6 lg:px-20 text-white text-center xl:text-left">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">TẤT CẢ CÁC MẶT HÀNG ᕦ(ò_óˇ)ᕤ</h1>
                <p className="text-gray-200 font-mono text-xs md:text-sm tracking-wider">Áo hoodie, áo len, áo sơ mi và các loại áo khác</p>
              </div>
            </div>

            {/* Sort Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 border-b border-gray-100 pb-6 gap-4">
              <div className="flex items-center space-x-4 md:space-x-6 w-full md:w-auto">
                <SlidersHorizontal size={24} className="cursor-pointer hover:text-gray-500 transition hidden md:block" />
                <div className="relative inline-block w-full md:w-auto">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="border border-black px-4 md:px-6 py-3 flex items-center justify-between w-full md:min-w-[260px] cursor-pointer bg-white hover:bg-gray-50 transition relative z-20"
                  >
                    <span className="text-[11px] md:text-[12px] font-mono uppercase tracking-widest text-black">{sortLabel}</span>
                    <ChevronDown size={16} className={`ml-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {sortOpen && (
                    <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 shadow-2xl z-[100] font-mono text-[11px] md:text-[13px]">
                      <ul className="py-2">
                        {sortOptions.map(opt => (
                          <li key={opt} onClick={() => { setSortLabel(opt); setSortOpen(false); }}
                            className={`px-4 md:px-6 py-3 hover:bg-gray-100 cursor-pointer transition-colors ${sortLabel === opt ? 'font-semibold bg-gray-200 border-l-2 border-blue-600' : 'text-gray-600'}`}>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
              {shown.map((p, i) => (
                <ProductCard key={p.maSP} product={p} index={i} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-16 md:mt-24 flex justify-center items-center gap-6">
              {displayedCount < products.length && (
                <div className="sweep-wrapper">
                  <div className="sweep-overlay"></div>
                  <button onClick={() => setDisplayedCount(c => c + 6)} className="watercolor-btn px-8 md:px-12 py-3 md:py-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                    <span>TẢI THÊM</span>
                  </button>
                </div>
              )}
              {displayedCount > 9 && (
                <button onClick={() => setDisplayedCount(9)} className="watercolor-btn px-8 md:px-12 py-3 md:py-4 font-mono text-[10px] uppercase tracking-[0.2em] border border-gray-200 bg-gray-50 rounded-full transition-all duration-500">
                  <span>RÚT GỌN LẠI</span>
                </button>
              )}
            </div>

            {/* Intro Section */}
            <div className="khung-gioi-thieu-so-le w-full gap-10 lg:gap-16 mt-10 md:mt-24 flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-4/12 z-20 reveal-on-scroll delay-100">
                <div className="khoi-chu-troi pr-0 lg:pr-8">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-[1.05]">
                    ĐỊNH NGHĨA LẠI SỰ<br />ĐƠN GIẢN.
                  </h2>
                  <p className="text-sm font-mono text-gray-500 mb-10 leading-relaxed">
                    Chúng tôi tin rằng thời trang không chỉ là vẻ bề ngoài, mà là cảm giác khi bạn khoác nó lên người. Tỉ mỉ trong từng đường kim mũi chỉ, phá vỡ mọi quy tắc thông thường.
                  </p>
                  <button className="bg-black text-white px-10 py-5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-gray-800 hover:tracking-[0.3em]">
                    KHÁM PHÁ BỘ SƯU TẬP
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-8/12 flex gap-4 md:gap-8 reveal-on-scroll delay-200">
                {products.slice(0, 3).map((p, i) => (
                  <Link key={p.maSP} href={`/product/${p.maSP}`} className={`flex-1 group cursor-pointer ${i === 1 ? 'mt-12' : ''}`}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f2f2f2]">
                      <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={p.tenSP} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-tight mt-3 line-clamp-1">{p.tenSP}</p>
                    <p className="text-xs font-mono text-gray-500">{p.giaSP?.toLocaleString('vi-VN')} ₫</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Best Sellers Section */}
            <section id="best-sellers-section" className="mt-20 md:mt-32 border-t border-gray-100 pt-16 md:pt-24 pb-16 md:pb-20">
              <div className="flex justify-between items-end mb-8 md:mb-12">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Bán chạy nhất</h2>
                  <p className="text-gray-500 font-mono text-[9px] md:text-[10px] uppercase tracking-widest">Tất cả những thứ đang thịnh hành hiện nay</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
                {bestSellers.map((p, i) => (
                  <ProductCard key={p.maSP} product={p} index={i} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Full-width sections OUTSIDE sidebar wrapper */}
      <Marquee />

      {/* Reviews Section */}
      <section className="py-20 md:py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 reveal-on-scroll text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Khách hàng đang nói</h2>
          <div className="flex justify-center items-center gap-2">
            <div className="flex text-black">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <span className="text-sm font-mono text-gray-600">5.00 ★ (1,162)</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 md:gap-24 items-start">
          <div className="w-full md:w-[300px] shrink-0 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-[0.2em] leading-none">CÂU HỎI THƯỜNG GẶP</h2>
          </div>
          <div className="flex-1 w-full space-y-1">
            {[
              { q: 'Vận chuyển', a: 'Thời gian giao hàng tiêu chuẩn là 3-5 ngày làm việc. Miễn phí vận chuyển cho đơn hàng trên 150 USD.' },
              { q: 'Chính sách hoàn trả', a: 'Chúng tôi chấp nhận đổi trả miễn phí trong vòng 30 ngày đối với sản phẩm còn nguyên tem mác.' },
              { q: 'Hướng dẫn chọn size', a: 'Bạn có thể tham khảo bảng quy đổi kích cỡ ở từng trang sản phẩm.' },
              { q: 'Phương thức thanh toán', a: 'Chúng tôi chấp nhận thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), PayPal, Apple Pay và Google Pay.' },
            ].map((faq, i) => <FaqItem key={i} {...faq} />)}
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/video1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center px-6 text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Nhận ngay ưu đãi giảm giá 5% và những thông tin cập nhật mới nhất!
          </h2>
          <p className="text-xs md:text-base text-gray-300 mb-10">
            Đăng ký để nhận ngay ưu đãi giảm 5% cho đơn hàng đầu tiên và quyền truy cập độc quyền vào các chương trình khuyến mãi tốt nhất của chúng tôi.
          </p>
          <div className="relative w-full mb-8">
            <input type="email" placeholder="Email" className="w-full border-b border-white py-3 md:py-4 outline-none text-center font-mono bg-transparent placeholder-gray-400 text-sm md:text-base transition-colors" />
          </div>
          <button className="w-full bg-white text-black py-4 md:py-5 rounded-full uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-gray-200 transition">
            ĐĂNG KÝ NGAY!
          </button>
          <p className="mt-6 text-[10px] md:text-xs tracking-widest uppercase cursor-pointer hover:opacity-60 text-gray-400">
            KHÔNG, CẢM ƠN
          </p>
        </div>
      </section>

      <Footer />
      <div id="popup-overlay" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out">
        <div id="popup-content" className="bg-white rounded-[32px] max-w-2xl w-full relative overflow-hidden flex flex-col md:flex-row shadow-2xl transform translate-y-10 scale-95 opacity-0 transition-all duration-300 ease-out">
          <div className="w-full md:w-1/2 h-48 md:h-auto bg-gray-100">
            <img src="/popup.jpg" alt="Join the club" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
            <div className="text-center md:text-left py-4">
              <h2 className="text-[28px] font-bold uppercase tracking-tighter mb-2 italic leading-none">Tham gia câu lạc bộ</h2>
              <p className="text-[11px] text-gray-400 font-mono mb-8 uppercase tracking-widest">Đăng ký để được truy cập sớm và nhận thêm nhiều ưu đãi khác.</p>
              <div className="space-y-6">
                <input type="email" placeholder="YOUR EMAIL" className="w-full border-b border-black pb-2 outline-none text-[11px] font-mono tracking-widest bg-transparent placeholder-gray-500 transition-colors" />
                <button className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all">
                  Đăng ký ngay! :DD
                </button>
              </div>
              <p className="mt-8 text-[9px] text-gray-300 uppercase tracking-widest cursor-pointer hover:text-gray-600 transition-colors text-center">
                Không, cảm ơn :(
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full py-5 flex justify-between items-center outline-none font-mono text-sm font-bold text-left">
        <span>{q}</span>
        <span className={`text-xl transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <div className="pb-5 font-mono text-xs text-gray-600 leading-relaxed">{a}</div>}
    </div>
  );
}