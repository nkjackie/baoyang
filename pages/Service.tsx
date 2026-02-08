import React from 'react';
import { MessageCircle, Send, ShieldCheck, Crown, Star } from 'lucide-react';

const Service: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center justify-center relative overflow-hidden">
       {/* Background elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-neon-pink opacity-10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-electric-blue opacity-10 blur-[100px] rounded-full" />
       </div>

       <div className="max-w-4xl w-full mx-auto px-6">
          <div className="text-center mb-12">
             <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">
               <span className="text-neon-pink">VIP</span> 专属客服
             </h1>
             <p className="text-electric-blue text-sm md:text-lg max-w-2xl mx-auto">
               私人定制 · 预约档期 · 商务合作 · 加入我们
             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             {/* Contact Card - WeChat */}
             <div className="glass-panel p-8 rounded-[2rem] text-center border-neon-pink/30 hover:border-neon-pink transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50" />
                
                <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <MessageCircle size={40} className="text-green-400" />
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2">微信咨询</h3>
                <p className="text-gray-400 mb-6">扫描二维码或搜索ID添加</p>
                
                <div className="w-48 h-48 mx-auto bg-white p-2 rounded-xl mb-6">
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeChat-Placeholder" alt="WeChat QR" className="w-full h-full object-cover" />
                </div>
                
                <div className="bg-white/10 py-3 px-6 rounded-xl inline-block">
                   <span className="text-gray-400 text-sm mr-2">微信号:</span>
                   <span className="text-white font-mono font-bold text-lg select-all">BAOLEME_VIP</span>
                </div>
             </div>

             {/* Contact Card - Telegram */}
             <div className="glass-panel p-8 rounded-[2rem] text-center border-blue-500/30 hover:border-blue-500 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

                <div className="w-20 h-20 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Send size={40} className="text-blue-400 ml-1" />
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2">Telegram</h3>
                <p className="text-gray-400 mb-6">加入频道或私聊客服</p>
                
                <div className="w-48 h-48 mx-auto bg-white p-2 rounded-xl mb-6">
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Telegram-Placeholder" alt="Telegram QR" className="w-full h-full object-cover" />
                </div>
                
                <div className="bg-white/10 py-3 px-6 rounded-xl inline-block">
                   <span className="text-gray-400 text-sm mr-2">频道ID:</span>
                   <span className="text-white font-mono font-bold text-lg select-all">@BAOLEME_OFFICIAL</span>
                </div>
             </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
                <div className="bg-sunny-yellow/20 p-3 rounded-full text-sunny-yellow"><Crown size={24} /></div>
                <div>
                   <h4 className="font-bold text-white">高端定制</h4>
                   <p className="text-xs text-gray-400">满足您的所有个性化需求</p>
                </div>
             </div>
             <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
                <div className="bg-neon-pink/20 p-3 rounded-full text-neon-pink"><ShieldCheck size={24} /></div>
                <div>
                   <h4 className="font-bold text-white">隐私保护</h4>
                   <p className="text-xs text-gray-400">严格加密客户资料，安全无忧</p>
                </div>
             </div>
             <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
                <div className="bg-purple-500/20 p-3 rounded-full text-purple-400"><Star size={24} /></div>
                <div>
                   <h4 className="font-bold text-white">模特入驻</h4>
                   <p className="text-xs text-gray-400">欢迎优质女生联系合作</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Service;