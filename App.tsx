import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import Home from './pages/Home';
import Roster from './pages/Roster';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Service from './pages/Service';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '宝贝库', path: '/roster' }, // Changed to Goddess Library
    { name: '私人定制', path: '/service' },
    { name: '加入我们', path: '/service' },
    // Hidden admin link in mobile menu for easy access if needed, or user can type URL
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`max-w-7xl mx-auto px-6 ${scrolled ? 'bg-black/70 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl mx-4 md:mx-auto' : ''}`}>
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-2xl font-display text-white tracking-tighter flex items-center gap-2">
            {/* Logo Update */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neon-pink shadow-[0_0_15px_rgba(255,20,147,0.5)] bg-white p-0.5">
               <img src="https://www.gstatic.com/startups_pilot/v1/img/79d2a13e-1085-488f-a496-6e865448651a.png" alt="包了么 Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-lg text-white">包了么</span>
              <span className="text-[10px] text-electric-blue font-bold tracking-widest">BAO LE ME</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-sm font-bold text-gray-300 hover:text-neon-pink uppercase tracking-widest transition-colors">
                {link.name}
              </Link>
            ))}
            <Link to="/service" className="bg-neon-pink text-white px-6 py-2 rounded-full font-black text-sm uppercase hover:bg-white hover:text-neon-pink transition-colors shadow-lg shadow-neon-pink/20">
              预约档期
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white hover:text-neon-pink transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5 min-h-[50vh]">
           {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-2xl font-black text-white text-center py-2 hover:text-neon-pink transition-colors">
                {link.name}
              </Link>
            ))}
            <Link to="/admin" className="text-sm text-gray-600 text-center uppercase tracking-widest pt-4">Admin Portal</Link>
            <Link to="/service" className="bg-neon-pink text-white w-full py-4 rounded-xl font-black text-lg uppercase mt-4 shadow-lg shadow-neon-pink/30 flex items-center justify-center">
              预约档期
            </Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-white/5 pt-12 md:pt-20 pb-10 backdrop-blur-sm">
       <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
             <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl md:text-3xl font-display mb-6 flex items-center gap-2">
                  <span className="text-neon-pink">♥</span> 包了么
                </h2>
                <p className="text-gray-400 text-base md:text-lg max-w-sm mb-8">
                   全网颜值最高、服务最专业的宝贝包养平台。
                </p>
                <div className="flex gap-4">
                   {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-pink hover:text-white transition-colors">
                         <Icon size={18} />
                      </a>
                   ))}
                </div>
             </div>
             
             <div>
                <h4 className="text-electric-blue font-bold uppercase tracking-widest mb-6 text-sm">平台</h4>
                <ul className="space-y-4 font-medium text-gray-300">
                   <li><Link to="/service" className="hover:text-neon-pink transition-colors">关于包了么</Link></li>
                   <li><Link to="/service" className="hover:text-neon-pink transition-colors">宝贝签约</Link></li>
                   <li><Link to="/service" className="hover:text-neon-pink transition-colors">平台合作</Link></li>
                   <li><Link to="/admin" className="hover:text-neon-pink transition-colors text-xs text-gray-600">管理后台</Link></li>
                </ul>
             </div>

             <div>
                <h4 className="text-electric-blue font-bold uppercase tracking-widest mb-6 text-sm">热门城市</h4>
                <ul className="grid grid-cols-4 md:grid-cols-2 gap-y-3 gap-x-2 font-medium text-gray-300 text-sm">
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 上海</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 杭州</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 成都</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 北京</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 香港</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 深圳</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 武汉</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 南宁</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 郑州</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 石家庄</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 合肥</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 广东</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 东京</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 曼谷</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 纽约</li>
                   <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 伦敦</li>
                </ul>
             </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-600 uppercase tracking-widest text-center md:text-left">
             <p>© 2024 包了么 BAOLEME.CN. 保留所有权利。</p>
             <div className="flex gap-8">
                <Link to="/service" className="hover:text-white">隐私政策</Link>
                <Link to="/service" className="hover:text-white">用户协议</Link>
             </div>
          </div>
       </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-neon-pink selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/model/:id" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/service" element={<Service />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;