"use client";
import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import Link from 'next/link';
import { Star, Plus, Minus, ChevronLeft, ChevronRight, Truck, RefreshCw, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
 
export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.maSP === id);
 
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState({});
 
  useEffect(() => {
    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
 
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="p-20 text-center font-mono uppercase">Product not found...</p>
    </div>
  );
 
  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const relatedProducts = products.filter(p => p.maSP !== id).slice(0, 4);
 
  return (
    <div className="min-h-screen bg-white text-black flex flex-col relative">
      {/* Top promo bar */}
      <div className="bg-black text-white text-[10px] py-2 text-center font-mono tracking-widest uppercase border-b border-white/10">
        Tìm hiểu thêm về các sản phẩm bán chạy nhất
      </div>
 
      {/* Header Layout mới đồng bộ với trang chủ */}
      <header className="bg-black text-white sticky top-0 z-[100]">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Nhóm 1: Logo */}
          <div className="flex justify-start">
            <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center cursor-pointer">
              OFF<span className="text-red-500 mx-0.5">x</span>SCRIPT
            </Link>
          </div>
          
          {/* Nhóm 2: Menu căn giữa */}
          <nav className="hidden lg:flex items-center justify-center gap-10 text-[10px] font-mono tracking-widest uppercase">
            <Link href="/new-arrivals" className="hover:text-gray-400 transition-colors">Sản phẩm mới</Link>
            <Link href="/" className="hover:text-gray-400 flex items-center gap-1">
              TẤT CẢ CÁC MẶT HÀNG ᕦ(ò_óˇ)ᕤ
            </Link>
            <Link href="/help" className="hover:text-gray-400 transition-colors">Trung tâm trợ giúp</Link>
          </nav>

          {/* Nhóm 3: Icon sát phải */}
          <div className="flex items-center justify-end gap-6">
            <Link href="/cart" className="relative cursor-pointer hover:text-gray-400">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full text-white">0</span>
            </Link>
          </div>
        </div>
      </header>
 
      {/* Main Content */}
      <main className="max-w-[1500px] mx-auto px-4 md:px-12 py-8 w-full flex-1">
        
        {/* NÚT QUAY VỀ TRANG CHỦ */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
            Quay về trang chủ
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 relative">
 
          {/* Image Gallery */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            {/* Main large image */}
            <div className="relative group rounded-2xl overflow-hidden bg-[#f2f2f2] aspect-[4/5]">
              <img
                src={allImages[currentImgIndex]}
                alt={product.tenSP}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <button
                onClick={() => setCurrentImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setCurrentImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImgIndex(i)}
                  className={`relative w-20 aspect-[4/5] rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${currentImgIndex === i ? 'border-black' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`thumb-${i}`} />
                </button>
              ))}
            </div>
          </div>
 
          {/* Product Info */}
          <div className="w-full lg:w-[45%]">
            <div className="sticky top-32 reveal-on-scroll">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3 leading-tight text-gray-800 uppercase">
                {product.tenSP}
              </h1>
 
              {/* Stars */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-xs font-mono text-gray-600 underline">{product.reviewsCount} đánh giá</span>
              </div>
 
              {/* Price */}
              <div className="flex items-center gap-4 font-mono mb-6 pb-4">
                <span className="text-xl md:text-2xl font-bold">{product.giaSP.toLocaleString('vi-VN')} ₫</span>
                <span className="bg-[#d93b3b] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest">Sale</span>
              </div>
 
              <p className="text-[11px] font-mono text-gray-500 mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span>
                Thanh toán bảo mật
              </p>
 
              {/* Size */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Kích cỡ</label>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full border text-xs font-bold transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-[11px] font-mono text-gray-800 mb-2">Số lượng</label>
                <div className="flex items-center border border-black w-32 rounded-full overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition">-</button>
                  <input type="text" value={quantity} readOnly className="w-12 h-10 text-center border-x border-black outline-none font-mono text-sm bg-[#333] text-white" />
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition">+</button>
                </div>
              </div>
 
              <button className="w-full bg-[#df4a4a] hover:bg-[#c93e3e] text-white py-4 font-bold tracking-[0.2em] uppercase transition-colors mb-6 text-sm rounded shadow-lg shadow-red-500/30">
                THÊM VÀO GIỎ HÀNG
              </button>
 
              {/* Shipping info */}
              <div className="space-y-4 mb-10 text-[11px] font-bold uppercase tracking-widest text-black mt-8">
                <div className="flex items-center gap-4"><Truck size={20} /> <span>Miễn phí vận chuyển cho đơn hàng trên 150 USD</span></div>
                <div className="flex items-center gap-4"><RefreshCw size={20} /> <span>Đổi trả miễn phí 30 ngày trên toàn cầu</span></div>
                <div className="flex items-center gap-4"><Star size={20} fill="black" /> <span>4.8 Sao đánh giá cửa hàng</span></div>
              </div>
 
              {/* Description */}
              <div className="text-sm font-mono text-gray-600 leading-relaxed pt-6 border-t border-gray-100">
                <ul className="space-y-2">
                  {product.moTaChiTiet.map((item, i) => (
                    <li key={i} className="flex gap-2"><span className="text-black">•</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
 
      {/* More Info Accordion */}
      <section className="max-w-[1500px] mx-auto px-4 md:px-12 py-16 w-full">
        <div className="flex flex-col md:flex-row gap-12 reveal-on-scroll">
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold font-mono uppercase tracking-widest">THÔNG TIN THÊM</h2>
          </div>
          <div className="w-full md:w-3/4 flex flex-col">
            {[
              { t: 'Vận chuyển', d: 'MIỄN PHÍ VẬN CHUYỂN CHO MỌI ĐƠN HÀNG TRÊN 150 USD' },
              { t: 'Chính sách đổi trả', d: 'Đổi trả miễn phí trong 30 ngày đối với sản phẩm nguyên tem mác.' },
            ].map(({ t, d }, i) => (
              <div key={i} className="border-b border-gray-200">
                <button onClick={() => setFaqOpen(prev => ({ ...prev, [i]: !prev[i] }))} className="w-full py-5 flex justify-between items-center outline-none font-mono text-sm font-bold">
                  <span>{t}</span>
                  <span className={`text-xl transition-transform ${faqOpen[i] ? 'rotate-45' : ''}`}>+</span>
                </button>
                {faqOpen[i] && <div className="pb-5 font-mono text-xs text-gray-600 leading-relaxed">{d}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Marquee */}
      <div className="marquee-wrapper w-full bg-black text-white py-4 overflow-hidden border-y border-white/20 mt-10 flex">
        {[0, 1].map(i => (
          <div key={i} className="animate-marquee font-mono text-[11px] uppercase tracking-[0.2em] w-max flex" aria-hidden={i === 1}>
            <div className="marquee-content px-5 w-max">
              <span>Free Shipping with Orders Over $150 USD</span>
              <span>Free Shipping with Orders Over $150 USD</span>
            </div>
          </div>
        ))}
      </div>
 
      {/* Related Products */}
      <section className="bg-[#f9f9f9] py-20 w-full">
        <div className="max-w-[1500px] mx-auto px-4 md:px-12">
          <h2 className="text-2xl font-bold mb-12 reveal-on-scroll text-center font-mono">Có thể bạn cũng thích</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Link key={p.maSP} href={`/product/${p.maSP}`} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f2f2f2] mb-3">
                  <img src={p.image} className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" alt={p.tenSP} />
                  <img src={p.hover || p.image} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100" alt={p.tenSP} />
                </div>
                <p className="text-xs font-bold uppercase tracking-tight line-clamp-1">{p.tenSP}</p>
                <p className="text-xs font-mono text-gray-500 mt-1">{p.giaSP?.toLocaleString('vi-VN')} ₫</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
 
      {/* Reviews */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-12 py-24 w-full reveal-on-scroll">
        <div className="bg-white border border-gray-100 rounded-3xl p-10 md:p-14 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-center font-mono mb-10">Đánh giá từ khách hàng</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-6">
            <div className="text-center md:text-left">
              <div className="flex text-black justify-center md:justify-start mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="font-mono text-sm">4.58 out of 5<br /><span>Dựa trên 12 đánh giá</span></p>
            </div>
          </div>
        </div>
        <div className="text-center font-mono text-gray-400">Chưa có đánh giá nào cho sản phẩm này.</div>
      </section>
 
      {/* Newsletter */}
      <section className="max-w-3xl mx-auto text-center px-6 py-20 border-t border-gray-100 reveal-on-scroll">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 font-mono tracking-tighter">Hãy là người đầu tiên biết về bộ sưu tập mới! ^^</h2>
        <div className="relative max-w-xl mx-auto mt-8 border border-black rounded-full overflow-hidden flex">
          <input type="email" placeholder="Email" className="w-full px-6 py-4 outline-none text-sm font-mono bg-transparent" />
          <button className="bg-[#333] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black transition">ĐĂNG KÝ</button>
        </div>
      </section>
 
      {/* Footer */}
      <footer className="bg-white text-black pt-20 md:pt-28 pb-16 px-6 lg:px-24 border-t border-gray-200 relative z-10 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">
            <div>
              <div className="mb-6 text-lg font-mono font-bold">☆〜（ゝ。∂）</div>
              <div className="flex gap-5 text-gray-600">
                {['instagram','youtube','music-2','twitter','share-2'].map(icon => (
                  <span key={icon} className="w-5 h-5 hover:text-black cursor-pointer transition text-gray-400">◻</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-10 text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-600">
              <ul className="space-y-4">
                {['Theo dõi đơn hàng của bạn', 'Trung tâm trợ giúp', 'Về chúng tôi', 'Chính sách bảo mật', 'Chính sách hoàn tiền'].map(l => (
                  <li key={l}><a href="#" className="hover:text-black transition">{l}</a></li>
                ))}
              </ul>
              <ul className="space-y-4">
                {['Chính sách vận chuyển', 'Điều khoản dịch vụ', 'Chương trình Đại sứ', 'Sự hợp tác'].map(l => (
                  <li key={l}><a href="#" className="hover:text-black transition">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-10 gap-6">
            <div className="flex gap-4">
              <div className="border border-gray-300 px-4 py-2 text-[10px] font-mono cursor-pointer hover:bg-gray-50 transition rounded bg-white">
                Vietnam (VND ₫) ▲
              </div>
              <div className="border border-gray-300 px-4 py-2 text-[10px] font-mono cursor-pointer hover:bg-gray-50 transition rounded bg-white">
                Tiếng Việt ▲
              </div>
            </div>
            <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400 text-center md:text-right mt-4 md:mt-0">
              © 2026, OFF SCRIPT
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}