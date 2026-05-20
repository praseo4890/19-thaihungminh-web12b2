"use client";
import { useState } from 'react';
import { Instagram, Youtube, Music2, Twitter, Share2, ChevronUp } from 'lucide-react';
 
function FooterDropdown({ id, trigger, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)} className="border border-gray-300 px-4 py-2 text-[10px] font-mono flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition rounded bg-white min-w-[160px]">
        {trigger}
        <ChevronUp size={12} className={`transition-transform ${open ? '' : 'rotate-180'}`} />
      </div>
      {open && (
        <div id={id} className="absolute left-0 bottom-full mb-1 w-[220px] bg-white border border-gray-200 shadow-xl text-black max-h-60 overflow-y-auto rounded z-50">
          {children}
        </div>
      )}
    </div>
  );
}
 
export default function Footer() {
  return (
    <footer className="bg-white text-black pt-20 pb-10 border-t border-gray-200 relative z-10 w-full mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          <div className="w-full md:w-1/4">
            <div className="mb-6 text-lg font-mono font-bold tracking-widest">☆〜（ゝ。∂）</div>
            <div className="flex gap-5 text-gray-400">
              <Instagram size={18} className="hover:text-black cursor-pointer transition" />
              <Youtube size={18} className="hover:text-black cursor-pointer transition" />
              <Music2 size={18} className="hover:text-black cursor-pointer transition" />
              <Twitter size={18} className="hover:text-black cursor-pointer transition" />
              <Share2 size={18} className="hover:text-black cursor-pointer transition" />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-start md:justify-end">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 w-full max-w-md">
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
        </div>
 
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4 z-50">
            <FooterDropdown
              id="footer-currency"
              trigger={<span className="uppercase">Vietnam (VND ₫)</span>}
            >
              <ul className="py-2 text-[10px] font-mono">
                {[['ALL','Albania (ALL L)'],['USD','United States (USD $)'],['JPY','Japan (JPY ¥)'],['VND','Vietnam (VND ₫)']].map(([code, label]) => (
                  <li key={code} className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0">{label}</li>
                ))}
              </ul>
            </FooterDropdown>
 
            <FooterDropdown
              id="footer-lang"
              trigger={<span className="uppercase">Tiếng Việt</span>}
            >
              <ul className="py-2 text-[10px] font-mono">
                <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100">Tiếng Việt</li>
                <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100">English</li>
                <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">日本語</li>
              </ul>
            </FooterDropdown>
          </div>
 
          <div className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.2em] text-gray-400 uppercase">
            © 2026, OFF SCRIPT STORE
          </div>
        </div>
      </div>
    </footer>
  );
}