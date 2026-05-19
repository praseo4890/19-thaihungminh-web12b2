"use client";
import { useState } from 'react';
import { products } from '@/data/products';
import Navbar from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

export default function Home() {
  const [isStore, setIsStore] = useState(false);

  if (!isStore) {
    return (
      <div className="h-screen w-full bg-black relative flex flex-col overflow-hidden">
        <Navbar isHero={true} />
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight">
            Khám phá <br /> các sản phẩm bán chạy nhất
          </h2>
          <button onClick={() => setIsStore(true)} className="bg-[#b91c1c] text-white px-10 py-4 font-bold tracking-widest uppercase text-sm hover:scale-105 transition-all">
            SHOP ALL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />  
      
      <div className="flex flex-1 relative w-full pt-20">
        <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-[90] bg-white border-r border-gray-100 border-l-2 border-l-black hidden xl:flex flex-col w-[80px]">
          <div className="writing-vertical py-8 px-4 text-[10px] font-mono tracking-widest uppercase border-b border-gray-200 bg-gray-100 cursor-pointer">
            TRANG CHỦ
          </div>
          <div className="writing-vertical py-8 px-4 text-[10px] font-mono tracking-widest uppercase border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition">
            SẢN PHẨM
          </div>
          <div className="writing-vertical py-8 px-4 text-[10px] font-mono tracking-widest uppercase border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition">
            BEST SELLERS
          </div>
        </aside>

        <main className="flex-1 w-full xl:pl-[80px] flex flex-col"> 
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 flex flex-col items-center w-full">
            <div className="relative h-[45vh] w-full rounded-3xl overflow-hidden mb-16 flex items-center px-10 md:px-20 text-white">
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover brightness-50">
                <source src="/video.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 uppercase">
                  TẤT CẢ CÁC MẶT HÀNG ᕦ(ò_óˇ)ᕤ
                </h1>
                <p className="font-mono text-xs md:text-sm opacity-80 uppercase tracking-widest">
                  Hoodies, sweaters, shirts and more
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-y-12 gap-x-8 justify-center w-full">
              {products.map(p => (
                <ProductCard key={p.maSP} product={p} />
              ))}
            </div>
          </div>
        <div className="marquee-container py-4 border-y border-white/20 mt-12 mb-24">
          <div className="marquee-content">
            <div className="marquee-item">
              <span className="marquee-text">OFF SCRIPT STORE</span>
              <span className="marquee-text">SẢN PHẨM BÁN CHẠY NHẤT</span>
              <span className="marquee-text">HÀNG MỚI VỀ</span>
              <span className="marquee-text">MIỄN PHÍ VẬN CHUYỂN TRÊN $150</span>
            </div>
            <div className="marquee-item">
              <span className="marquee-text">OFF SCRIPT STORE</span>
              <span className="marquee-text">SẢN PHẨM BÁN CHẠY NHẤT</span>
              <span className="marquee-text">HÀNG MỚI VỀ</span>
              <span className="marquee-text">MIỄN PHÍ VẬN CHUYỂN TRÊN $150</span>
            </div>
          </div>
        </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}