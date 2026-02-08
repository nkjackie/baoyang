import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Heart } from 'lucide-react';
import { db } from '../lib/db';
import { Model } from '../types';

// Matching the categories from Admin.tsx
const categories = ['全部', '少萝', '御姐', '辣妹', '二次元', '纯欲', '猫系', '轻熟女', '字母'];

const Roster: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setModels(db.getAll());
  }, []);

  const filteredModels = models.filter((model) => {
    // Check if category array includes the active category
    const matchesCategory = activeCategory === '全部' || model.category.includes(activeCategory);
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          model.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          model.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-12 gap-4">
          <div>
             <h1 className="text-3xl md:text-5xl font-black mb-2">精选 <span className="text-neon-pink">宝贝</span></h1>
             <p className="text-electric-blue text-sm md:text-base">找到您的心动宝贝</p>
          </div>
          <div className="text-left md:text-right">
             <span className="text-2xl md:text-3xl font-bold text-white">{filteredModels.length}</span>
             <span className="text-gray-500 ml-2 uppercase font-bold tracking-widest text-xs md:text-sm">在线宝贝</span>
          </div>
        </div>

        {/* Filters & Search - Sticky */}
        <div className="glass-panel p-3 md:p-4 rounded-2xl md:rounded-3xl mb-6 md:mb-8 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 md:top-24 z-30 shadow-2xl backdrop-blur-xl">
           {/* Category Pills */}
           <div className="flex flex-wrap gap-2 w-full md:w-auto md:flex-nowrap md:overflow-x-auto md:no-scrollbar justify-start">
             {categories.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm whitespace-nowrap transition-all flex-grow md:flex-grow-0 ${
                   activeCategory === cat 
                   ? 'bg-neon-pink text-white shadow-[0_0_15px_rgba(255,20,147,0.4)]' 
                   : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>

           {/* Search */}
           <div className="relative w-full md:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input 
               type="text" 
               placeholder="搜索名字、地区..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-black/40 border border-white/10 rounded-full py-2.5 md:py-3 pl-10 pr-4 text-xs md:text-sm text-white focus:outline-none focus:border-neon-pink transition-colors"
             />
           </div>
        </div>

        {/* Grid - Changed to 2 columns on mobile (grid-cols-2) */}
        {filteredModels.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredModels.map((model) => (
              <Link to={`/model/${model.id}`} key={model.id} className="group glass-panel rounded-2xl md:rounded-[2rem] p-2 md:p-4 hover:border-neon-pink/50 transition-all duration-300 hover:-translate-y-2">
                 {/* Image Container */}
                 <div className="aspect-[3/4] rounded-xl md:rounded-[1.5rem] overflow-hidden mb-3 relative">
                    <img src={model.image} alt={model.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    
                    {model.isNew && (
                      <span className="absolute top-2 left-2 bg-sunny-yellow text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase">NEW</span>
                    )}
                    
                    <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 pr-2">
                         {/* Show first two categories max to avoid clutter */}
                         {model.category.slice(0, 2).map(cat => (
                             <span key={cat} className="bg-neon-pink/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">{cat}</span>
                         ))}
                         {model.category.length > 2 && <span className="bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">+{model.category.length - 2}</span>}
                    </div>
                 </div>
                 
                 {/* Content */}
                 <div className="px-1 md:px-2 pb-1">
                    <div className="mb-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm md:text-xl font-bold text-white group-hover:text-neon-pink transition-colors truncate">{model.name}</h3>
                            {model.age && <span className="text-[10px] md:text-xs bg-white/10 px-1.5 rounded text-gray-300">{model.age}岁</span>}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] md:text-sm text-gray-400 mt-1">
                           <MapPin size={10} className="md:w-3 md:h-3" /> 
                           <span className="truncate">{model.location.split(' ')[0]}</span>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-1 py-2 border-t border-white/10 mt-2">
                       <div className="text-center">
                          <p className="text-[8px] md:text-[10px] text-gray-500 uppercase font-bold">身高</p>
                          <p className="text-white font-bold text-[10px] md:text-sm">{model.height ? model.height.replace('cm','') : '-'}</p>
                       </div>
                       <div className="text-center border-l border-white/10">
                          <p className="text-[8px] md:text-[10px] text-gray-500 uppercase font-bold">罩杯</p>
                          <p className="text-white font-bold text-[10px] md:text-sm">{model.cup || '-'}</p>
                       </div>
                       <div className="text-center border-l border-white/10">
                          <p className="text-[8px] md:text-[10px] text-gray-500 uppercase font-bold">费用</p>
                          <p className="text-neon-pink font-bold text-[10px] md:text-sm">{model.pricing?.allowance ? '💰' : '-'}</p>
                       </div>
                    </div>
                 </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-panel rounded-3xl">
             <div className="inline-block p-4 md:p-6 rounded-full bg-white/5 mb-4">
               <Filter size={32} className="text-gray-500" />
             </div>
             <h3 className="text-xl md:text-2xl font-bold text-gray-400">未找到相关宝贝</h3>
             <p className="text-sm text-gray-600 mt-2">该分类下暂无数据，请尝试其他选项</p>
             <button onClick={() => setActiveCategory('全部')} className="mt-6 px-6 py-2 bg-neon-pink text-white rounded-full text-sm font-bold">清除筛选</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roster;