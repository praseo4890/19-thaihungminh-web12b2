"use client";
import { Plus } from 'lucide-react';
import Link from 'next/link';
 
export default function ProductCard({ product }) {
  const displayPrice = product.giaSP?.toLocaleString('vi-VN') + " ₫";
 
  return (
    <Link
      href={`/product/${product.maSP}`}
      className="group cursor-pointer flex-shrink-0 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[420px] flex flex-col mb-8"
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

        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform z-10">
          <Plus size={20} className="text-black" />
        </div>
      </div>
 
      <div className="mt-4 text-left">
        <h3 className="text-[14px] font-bold uppercase tracking-tighter line-clamp-1">{product.tenSP}</h3>
        <p className="text-xs text-gray-400 font-mono mt-1 mb-2 line-clamp-1">{product.moTaNgan}</p>
        <p className="text-[13px] font-mono font-semibold text-gray-800">{displayPrice}</p>
      </div>
    </Link>
  );
}
 