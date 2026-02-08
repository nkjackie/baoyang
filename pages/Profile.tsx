import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Instagram, Twitter, Youtube, Mail, MapPin, CheckCircle, Flame, ShieldAlert, Heart, Calendar, DollarSign, Clock, Shield, Share2 } from 'lucide-react';
import { db } from '../lib/db';
import { Model } from '../types';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<Model | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      setModel(db.getById(id));
    }
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  if (!model) {
    return <div className="min-h-screen pt-24 pb-20 flex items-center justify-center text-2xl font-bold">模特未找到或数据加载中</div>;
  }

  const InfoTag = ({ label, value }: { label: string, value: string | undefined }) => (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center text-center">
        <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">{label}</p>
        <p className="text-base md:text-xl font-black text-white">{value || '-'}</p>
    </div>
  );

  const ServiceItem = ({ label, value, good }: { label: string, value: string | boolean | undefined, good?: boolean }) => {
     let display = value;
     if (typeof value === 'boolean') display = value ? '是' : '否';
     if (!value) display = '-';
     
     return (
        <div className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
            <span className="text-gray-400 font-medium">{label}</span>
            <span className={`font-bold ${good ? 'text-green-400' : 'text-white'}`}>{display}</span>
        </div>
     );
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
       <div className="max-w-7xl mx-auto px-6">
          <Link to="/roster" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
             <ArrowLeft size={20} /> 返回列表
          </Link>

          {/* Header Card */}
          <div className="glass-panel rounded-[2rem] md:rounded-[3rem] p-5 md:p-12 mb-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue opacity-10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
             
             <div className="flex flex-col lg:flex-row gap-8 md:gap-12 relative z-10">
                {/* Main Image */}
                <div className="w-full lg:w-1/3 aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl relative group">
                   <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                   <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                      <p className="text-xs font-bold uppercase text-gray-200">Category</p>
                      <p className="font-bold text-white">{model.category.join(' / ')}</p>
                   </div>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center">
                   <div className="flex items-center gap-3 mb-4">
                      <span className="bg-neon-pink/20 text-neon-pink border border-neon-pink/30 px-3 py-1 rounded-full text-xs font-bold uppercase">Top Creator</span>
                      {model.isTrending && <span className="bg-sunny-yellow/20 text-sunny-yellow border border-sunny-yellow/30 px-3 py-1 rounded-full text-xs font-bold uppercase">Trending</span>}
                   </div>
                   
                   <h1 className="text-4xl md:text-7xl font-black text-white mb-2">{model.name}</h1>
                   <p className="text-xl md:text-2xl text-electric-blue font-bold mb-6 flex items-center gap-2">
                     {model.handle} <CheckCircle size={24} className="fill-electric-blue text-dark-bg" />
                   </p>

                   <div className="flex items-center gap-2 text-gray-400 mb-6 md:mb-8">
                      <MapPin size={20} />
                      <span className="text-base md:text-lg">{model.location}</span>
                   </div>

                   {/* Main Stats */}
                   <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                      <InfoTag label="年龄" value={model.age ? `${model.age}岁` : undefined} />
                      <InfoTag label="身高" value={model.height ? `${model.height}cm` : undefined} />
                      <InfoTag label="体重" value={model.weight ? `${model.weight}斤` : undefined} />
                      <InfoTag label="罩杯" value={model.cup} />
                      <InfoTag label="纹身" value={model.attributes?.tattoo ? '有' : '无'} />
                      <InfoTag label="抽烟" value={model.attributes?.smoking ? '是' : '否'} />
                   </div>

                   <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 md:mb-10 max-w-2xl bg-black/20 p-6 rounded-2xl border-l-4 border-neon-pink">
                      {model.bio}
                   </p>

                   <div className="flex flex-wrap gap-4">
                      <Link to="/service" className="flex-1 md:flex-none bg-white text-dark-bg px-6 py-3 rounded-xl font-black text-sm md:text-base hover:bg-neon-pink hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/10">
                         <Mail size={18} /> 预约合作
                      </Link>
                      <Link to="/service" className="flex-1 md:flex-none border border-white/20 px-6 py-3 rounded-xl font-bold text-sm md:text-base hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                         <DollarSign size={18} /> 查看价目
                      </Link>
                      <button onClick={handleShare} className="flex-none md:w-auto w-full border border-white/20 px-6 py-3 rounded-xl font-bold text-sm md:text-base hover:bg-neon-pink hover:border-neon-pink hover:text-white transition-all flex items-center justify-center gap-2">
                         <Share2 size={18} /> {copied ? '已复制' : '分享'}
                      </button>
                   </div>
                </div>
             </div>
          </div>

          {/* Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
             {/* Services */}
             <div className="glass-panel rounded-3xl p-6 md:p-8">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-electric-blue">
                   <Flame /> 服务尺度
                </h3>
                <div className="space-y-1">
                   <ServiceItem label="欲望大小" value={model.desire} />
                   <ServiceItem label="能否口" value={model.services?.oral} />
                   <ServiceItem label="能否无套" value={model.services?.noCondom} good={model.services?.noCondom === '能'} />
                   <ServiceItem label="能否内射" value={model.services?.creampie} />
                   <ServiceItem label="能否SM" value={model.services?.sm} />
                </div>
             </div>

             {/* Availability */}
             <div className="glass-panel rounded-3xl p-6 md:p-8">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-sunny-yellow">
                   <Clock /> 时间与安排
                </h3>
                <div className="space-y-1">
                   <ServiceItem label="能否过夜" value={model.availability?.overnight} />
                   <ServiceItem label="能否同居" value={model.availability?.cohabitation} />
                   <ServiceItem label="能否外地" value={model.availability?.travel} />
                   <ServiceItem label="见面天数" value={model.availability?.meetingDays} />
                   <ServiceItem label="见面时间" value={model.availability?.meetingTime} />
                   <ServiceItem label="姨妈时间" value={model.attributes?.period} />
                </div>
             </div>

             {/* Limits & Pricing */}
             <div className="glass-panel rounded-3xl p-6 md:p-8">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-red-500">
                   <ShieldAlert /> 雷点与要求
                </h3>
                <p className="text-gray-300 leading-relaxed">
                   {model.limits || '暂无特殊雷点'}
                </p>
             </div>

             <div className="glass-panel rounded-3xl p-6 md:p-8 border-neon-pink/30">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2 text-neon-pink">
                   <DollarSign /> 预算预期
                </h3>
                <div className="flex items-center justify-between mb-4">
                   <span className="text-gray-400">零花预期</span>
                   <span className="text-3xl font-black text-white">{model.pricing?.allowance}</span>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-gray-400">支付次数</span>
                   <span className="text-xl font-bold text-white">{model.pricing?.paymentFreq}</span>
                </div>
             </div>
          </div>

          {/* Video Section */}
          {model.video && (
             <div className="mb-16">
                 <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-neon-pink rounded-full"></span> 动态视频展示
                 </h2>
                 <div className="w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-black relative group shadow-2xl">
                     <video 
                        controls 
                        poster={model.image}
                        className="w-full h-full object-cover"
                     >
                        <source src={model.video} type="video/mp4" />
                        您的浏览器不支持视频播放。
                     </video>
                 </div>
             </div>
          )}

          {/* Gallery Section */}
          <h2 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 flex items-center gap-3">
             <span className="w-8 h-1 bg-neon-pink rounded-full"></span> 作品集
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20">
             {model.gallery.map((img, idx) => (
                <div key={idx} className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden group relative border border-white/5">
                   <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
             ))}
             {model.gallery.length === 0 && (
                <div className="col-span-full py-10 text-center text-gray-500">
                    暂无图片作品
                </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default Profile;