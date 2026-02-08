import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Users, Zap, Layers, Heart } from 'lucide-react';
import { db } from '../lib/db';
import { Model } from '../types';
import { stats } from '../data';

const Home: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    setModels(db.getAll());
  }, []);

  // Display all models (slice if too many)
  const trendingModels = models.slice(0, 10); 
  
  const spotlightModel = models.find(m => m.isTrending) || models[0] || {
      id: '0',
      name: 'Loading...',
      image: '',
      bio: '',
      category: []
  } as unknown as Model;
  
  // Specific Categories as requested
  // Using representative images from the models data or generic placeholders if needed
  const getCatImage = (cat: string) => models.find(m => m.category.includes(cat))?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80';

  const categories = [
    { name: '少萝', img: getCatImage('少萝') },
    { name: '御姐', img: getCatImage('御姐') },
    { name: '辣妹', img: getCatImage('辣妹') },
    { name: '二次元', img: getCatImage('二次元') },
    { name: '纯欲', img: getCatImage('纯欲') },
    { name: '猫系', img: getCatImage('猫系') },
    { name: '轻熟女', img: getCatImage('轻熟女') },
    { name: '字母', img: getCatImage('字母') },
  ];

  if (models.length === 0) return <div className="min-h-screen bg-dark-bg"></div>;

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-4 md:pt-20 md:pb-16 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-pink opacity-20 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-electric-blue opacity-10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-3 md:gap-6">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-pink/50 bg-neon-pink/10 backdrop-blur-md self-start">
                <Heart size={12} className="text-neon-pink fill-neon-pink animate-pulse" />
                <span className="text-neon-pink font-bold text-xs tracking-widest uppercase">全网颜值天花板</span>
             </div>
             
             <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9]">
               <span className="block text-white">心动</span>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-electric-blue">包了么</span>
               <span className="block text-white text-3xl sm:text-4xl md:text-6xl mt-1 font-display">PINK CRUSH</span>
             </h1>

             <p className="text-electric-blue text-sm md:text-xl max-w-xl leading-relaxed font-medium mt-1">
               汇聚 <span className="text-white font-bold">{models.length * 100}+ 顶流颜值宝贝</span>。从甜美校花到高冷御姐，一键预约，五年老店，诚信为本，包你满意。
             </p>

             {/* Buttons - Tighter spacing */}
             <div className="flex flex-row gap-3 pt-1 w-full max-w-md">
               <Link to="/roster" className="flex-1 px-4 py-3 md:px-8 md:py-4 bg-neon-pink hover:bg-white hover:text-neon-pink text-white font-black text-sm md:text-lg rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,20,147,0.4)] text-center flex items-center justify-center">
                 浏览宝贝库
               </Link>
               <Link to="/service" className="flex-1 px-4 py-3 md:px-8 md:py-4 border-2 border-white/20 hover:border-electric-blue hover:text-electric-blue text-white font-bold text-sm md:text-lg rounded-full transition-all backdrop-blur-sm whitespace-nowrap flex items-center justify-center">
                 预约档期
               </Link>
             </div>
          </div>

          <div className="relative hidden lg:block h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10 bottom-0 h-40" />
            <img 
              src={spotlightModel.image} 
              alt="Hero Model" 
              className="w-full h-full object-cover rounded-[3rem] border-4 border-neon-pink/20 shadow-2xl shadow-neon-pink/20 rotate-3 hover:rotate-0 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black/20 backdrop-blur-sm border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-1 md:gap-8 text-center">
           {stats.map((stat, idx) => (
             <div key={idx} className="space-y-1">
               <p className="text-xl sm:text-3xl md:text-5xl font-black text-white whitespace-nowrap">{stat.value}</p>
               <p className="text-neon-pink font-bold text-[10px] sm:text-xs md:text-sm">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Trending Section - Show all 10 */}
      <section className="max-w-7xl mx-auto px-4 w-full mt-8">
        <div className="flex justify-between items-end mb-6 md:mb-12">
           <div>
             <h2 className="text-2xl md:text-5xl font-black mb-2">当季 <span className="text-neon-pink">热推</span></h2>
             <p className="text-electric-blue text-xs md:text-base">发现正在定义潮流的面孔</p>
           </div>
           <Link to="/roster" className="flex items-center gap-2 text-neon-pink font-bold hover:text-white transition-colors text-sm md:text-base">
             查看全部 <ArrowRight size={16} />
           </Link>
        </div>

        {/* Grid: Forced 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
           {trendingModels.map((model) => (
             <Link to={`/model/${model.id}`} key={model.id} className="group relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-neon-pink/50 transition-colors">
               <img src={model.image} alt={model.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
               
               <div className="absolute bottom-0 left-0 p-3 md:p-6 w-full transform translate-y-1 group-hover:translate-y-0 transition-transform">
                 <div className="flex flex-wrap gap-1 mb-1">
                   {model.category.slice(0, 2).map((cat, i) => (
                       <span key={i} className="bg-neon-pink text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded text-white">{cat}</span>
                   ))}
                   {model.age && <span className="bg-white/20 backdrop-blur-md text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded text-white">{model.age}岁</span>}
                 </div>
                 <h3 className="text-sm md:text-xl font-bold text-white mb-0.5 truncate">{model.name}</h3>
                 <p className="text-electric-blue text-[10px] md:text-sm truncate">{model.handle}</p>
               </div>
             </Link>
           ))}
        </div>
      </section>

      {/* Categories Showcase - 8 items */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-4xl font-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3">
          <Layers className="text-neon-pink" size={24} />
          探索 <span className="text-white">风格</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {categories.map((cat, idx) => (
                <Link to="/roster" key={idx} className="group relative h-[160px] md:h-[300px] rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 hover:border-neon-pink/50 transition-colors">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" 
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white/50 flex items-center justify-center mb-2 md:mb-4 backdrop-blur-md group-hover:scale-110 transition-transform group-hover:border-neon-pink group-hover:text-neon-pink">
                           <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300 md:w-5 md:h-5" />
                        </div>
                        <h3 className="text-xl md:text-3xl font-black text-white italic">{cat.name}</h3>
                    </div>
                </Link>
            ))}
        </div>
      </section>

      {/* Editorial Spotlight Section */}
      <section className="relative py-12 md:py-24 bg-white/5 my-4 md:my-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-b md:bg-gradient-to-l from-neon-pink/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                 {/* Text Content */}
                 <div className="order-2 lg:order-1 space-y-4 md:space-y-8 relative z-10">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sunny-yellow text-sunny-yellow font-bold uppercase text-xs tracking-widest bg-sunny-yellow/10">
                        <Zap size={14} />
                        本月主推 · ICON
                     </div>
                     
                     <h2 className="text-3xl md:text-7xl font-black leading-none text-white">
                        {spotlightModel.name} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-electric-blue text-xl md:text-5xl mt-2 block font-display">
                          THE IDOL ISSUE
                        </span>
                     </h2>
                     
                     <div className="h-1 w-20 bg-neon-pink" />
                     
                     <p className="text-base md:text-xl text-gray-300 leading-relaxed max-w-lg">
                        {spotlightModel.bio} 从秀场到街头，她正在重新定义新一代的审美标准。
                     </p>
                     
                     <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
                        <Link to={`/model/${spotlightModel.id}`} className="px-8 py-4 bg-white text-dark-bg font-black rounded-xl hover:bg-neon-pink hover:text-white transition-colors shadow-lg shadow-white/10 text-center">
                           查看主页
                        </Link>
                        <Link to="/service" className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-center">
                           预约档期
                        </Link>
                     </div>
                 </div>
                 
                 {/* Large Visual */}
                 <div className="order-1 lg:order-2 h-[350px] md:h-[600px] lg:h-[700px] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group border border-white/10">
                     <img src={spotlightModel.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent" />
                     
                     {/* Floating Quote Card */}
                     <div className="absolute bottom-6 right-6 left-6 md:bottom-10 md:right-10 md:left-10 glass-panel p-4 md:p-6 rounded-2xl backdrop-blur-xl border-l-4 border-neon-pink transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-sm md:text-lg font-medium text-white italic">"不仅是颜值，更是影响力。"</p>
                        <p className="text-xs md:text-sm text-electric-blue mt-2 font-bold uppercase tracking-wider">— {spotlightModel.name}</p>
                     </div>
                 </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;