"use client";
import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import Navbar from '@/components/Header';
import { Star, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.maSP === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  
  // Quản lý index ảnh đang hiển thị
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  if (!product) return <div className="p-20 text-center font-mono uppercase">Product not found...</div>;

  // Lấy danh sách ảnh (nếu không có mảng images thì dùng ảnh mặc định)
  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-[1600px] mx-auto pt-32 px-6 lg:px-12 pb-20">
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          
          {/* LEFT COLUMN: SLIDER */}
          <div className="flex-1">
            <div className="relative group">
              {/* Main Image View */}
              <div className="rounded-2xl overflow-hidden bg-[#f2f2f2] aspect-[4/5] relative">
                <img 
                  src={allImages[currentImgIndex]} 
                  alt={product.tenSP} 
                  className="w-full h-full object-cover transition-all duration-500" 
                />
                
                {/* Navigation Buttons */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-4 mt-6 overflow-x-auto pb-2 no-scrollbar">
                {allImages.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImgIndex(index)}
                    className={`relative w-20 aspect-[4/5] rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      currentImgIndex === index ? 'border-black' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`thumb-${index}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT INFO */}
          <div className="flex-1 max-w-[600px]">
            <h1 className="text-4xl font-bold tracking-tighter uppercase mb-4">{product.tenSP}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-xs font-mono text-gray-500 underline">{product.reviewsCount} đánh giá</span>
            </div>

            <p className="text-2xl font-mono font-bold mb-8">{product.giaSP.toLocaleString('vi-VN')} VND</p>

            {/* Size selection */}
            <div className="mb-8">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-4">Kích cỡ</p>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border text-xs font-bold transition-all ${
                      selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-4">Số lượng</p>
              <div className="flex items-center border border-gray-200 rounded-lg w-max px-2 py-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-50 rounded-md transition"><Minus size={16}/></button>
                <input type="text" value={quantity} readOnly className="w-12 text-center font-mono font-bold outline-none" />
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-50 rounded-md transition"><Plus size={16}/></button>
              </div>
            </div>

            <button className="w-full bg-[#D65050] text-white py-5 font-bold tracking-widest uppercase hover:brightness-110 transition-all mb-8 shadow-lg shadow-red-100">
              THÊM VÀO GIỎ HÀNG
            </button>

            <div className="space-y-4 mb-12 border-t border-gray-100 pt-8">
              {product.moTaChiTiet.map((item, i) => (
                <li key={i} className="font-mono text-sm text-gray-600 flex gap-2">
                  <span className="text-black">•</span> {item}
                </li>
              ))}
            </div>
          </div>
        </div>

        {/* Section Feedback */}
        <section className="pt-20 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-16 tracking-tighter uppercase font-mono">Đánh giá khách hàng</h2>
          <div className="text-center font-mono text-gray-400">Chưa có đánh giá nào cho sản phẩm này.</div>
        </section>
      </main>
    </div>
  );
}