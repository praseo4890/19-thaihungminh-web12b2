"use client";
import { Search, User, ShoppingBag, Menu, ChevronDown } from 'lucide-react';

export default function Navbar({ isHero = false }) {
  return (
    <header className={`absolute top-0 left-0 w-full z-[100] ${isHero ? 'text-white' : 'text-black bg-white/80 backdrop-blur-md border-b border-gray-100'}`}>
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tighter flex items-center cursor-pointer">
          OFF<span className="text-red-500 mx-0.5">x</span>SCRIPT
        </h1>

        <nav className="hidden lg:flex items-center space-x-10 text-[10px] font-mono tracking-widest uppercase">
          <a href="#" className="hover:opacity-50 transition">Sản phẩm mới</a>
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-50 transition">
            TẤT CẢ CÁC MẶT HÀNG <ChevronDown size={12} />
          </div>
          <a href="#" className="hover:opacity-50 transition">Trợ giúp</a>
        </nav>

        <div className="flex items-center gap-6">
          <Menu className="lg:hidden w-6 h-6 cursor-pointer" />
          <Search className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" />
          <div className="relative cursor-pointer">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full text-white">0</span>
          </div>
        </div>
      </div>
    </header>
  );
}