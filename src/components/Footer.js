"use client";
import { Instagram, Youtube, Twitter, Music2, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 pt-20 pb-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[650px] mx-auto text-center mb-32">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 uppercase">
            Get 5% OFF and The Latest Updates
          </h2>
          <p className="text-xs text-gray-500 mb-10">Sign up to receive a 5% off your first order and exclusive access to our best offers.</p>
          <div className="relative mb-6 text-left">
            <label className="absolute -top-3 left-0 text-[10px] font-mono text-gray-400 uppercase tracking-widest">Email</label>
            <input type="email" className="w-full border-b border-black py-4 outline-none font-mono text-sm focus:border-red-500 transition-colors bg-transparent"  />
          </div>
          <button className="w-full bg-black text-white py-4 rounded-full font-bold tracking-[0.2em] text-xs uppercase mb-6 hover:brightness-110 transition-all">
            SIGN ME UP!
          </button>
          <button className="text-[10px] font-mono text-gray-400 uppercase tracking-widest hover:text-black transition-colors">
            NO, THANKS
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24 items-start">
          <div className="space-y-12">
            <div className="text-xl font-mono text-gray-400">☆〜（ゝ。∂）</div>
            <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-black shrink-0" />
                <span>36 Đường Thái Hùng Mo, Triệu Sơn, Triệu Thành, Thanh Hóa</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-black shrink-0" />
                <span>0902 NGÀY MAI NÓI TIẾP</span>
              </div>
              <div className="flex items-center gap-3 lowercase">
                <Mail size={14} className="text-black shrink-0" />
                <span className="normal-case">contact@offscript.store</span>
              </div>
            </div>
            <div className="flex gap-6 text-gray-400">
              <Instagram size={18} className="hover:text-black cursor-pointer transition-colors" />
              <Youtube size={18} className="hover:text-black cursor-pointer transition-colors" />
              <Music2 size={18} className="hover:text-black cursor-pointer transition-colors" />
              <Twitter size={18} className="hover:text-black cursor-pointer transition-colors" />
              <span className="font-bold text-sm hover:text-black cursor-pointer transition-colors">t</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-16 lg:pt-[76px]"> 
            <div className="flex flex-col gap-3">
              {["Track Your Order", "Help Center", "About Us", "Privacy Policy"].map(l => (
                <a key={l} href="#" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {["Refund Policy", "Shipping Policy", "Terms of Service", "Our Ambassador Program", "Collaboration"].map(l => (
                <a key={l} href="#" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div className="w-full h-[200px] rounded-2xl overflow-hidden border border-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.46023242831!2d106.66477147573562!3d10.776019359203362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed974054db9%3A0xc395f8841753177!2zMTIzIMSQxrDhu51uZyBUaMOhaSBIxrBuZyBNaW5oLCBRdeG6rW4gMSwgSFAuIEhDTSA3MDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1711234567890!5m2!1svi!2s&q=123+Đường+Thái+Hưng+Minh+Quận+1+TP.HCM" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 relative">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded text-[10px] font-mono cursor-pointer hover:border-black transition-colors">
              Vietnam (VND ₫) <ChevronDown size={12} />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded text-[10px] font-mono cursor-pointer hover:border-black transition-colors">
              English <ChevronDown size={12} />
            </div>
          </div>
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            OFF SCRIPT 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
