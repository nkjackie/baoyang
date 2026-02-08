import React, { useState, useEffect, useRef } from 'react';
import { Save, Plus, Trash2, Video, Image as ImageIcon, ClipboardPaste, RefreshCw, Check, CloudUpload, X, Lock, User, LogOut, ArrowRight } from 'lucide-react';
import { Model } from '../types';
import { db } from '../lib/db';

const CATEGORIES_OPTIONS = ['少萝', '御姐', '辣妹', '二次元', '纯欲', '猫系', '轻熟女', '字母'];

// --- Cloudinary Configuration ---
// 您需要去 cloudinary.com 注册一个免费账号
// 1. Cloud Name: 您的云名称
// 2. Upload Preset: 在 Settings -> Upload -> Upload presets 中创建一个 unsigned preset
const CLOUDINARY_CLOUD_NAME = 'demo'; // 把 'demo' 换成您的 Cloud Name
const CLOUDINARY_UPLOAD_PRESET = 'docs_upload_example_us_preset'; // 把这个换成您的 Preset

const initialForm: Model = {
    id: '',
    name: '',
    handle: '',
    category: [],
    location: '',
    image: '',
    video: '',
    gallery: [],
    stats: { followers: '10万', engagement: '5%', reach: '20万' },
    age: '', height: '', weight: '', cup: '',
    experience: '', desire: '', 
    attributes: { tattoo: false, smoking: false, period: '' },
    services: { oral: '否', noCondom: '否', creampie: '否', sm: '否' },
    availability: { overnight: false, cohabitation: false, travel: false, meetingDays: '', meetingTime: '' },
    pricing: { allowance: '', paymentFreq: '' },
    limits: '', bio: '',
    isTrending: false, isNew: true
};

declare global {
    interface Window {
        cloudinary: any;
    }
}

const Admin: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin Data State
  const [models, setModels] = useState<Model[]>([]);
  const [formData, setFormData] = useState<Model>(initialForm);
  const [parseText, setParseText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Check session storage for existing login
    const sessionAuth = sessionStorage.getItem('admin_auth');
    if (sessionAuth === 'true') {
        setIsAuthenticated(true);
        loadModels(); // Load data if already logged in
    }

    // Initialize Cloudinary Widget (only needs to happen once)
    if (window.cloudinary) {
        widgetRef.current = window.cloudinary.createUploadWidget({
            cloudName: CLOUDINARY_CLOUD_NAME, 
            uploadPreset: CLOUDINARY_UPLOAD_PRESET,
            sources: ['local', 'url', 'camera'],
            showAdvancedOptions: false,
            cropping: false,
            multiple: true,
            defaultSource: "local",
            styles: {
                palette: {
                    window: "#120205",
                    windowBorder: "#FF1493",
                    tabIcon: "#FF1493",
                    menuIcons: "#FF85C1",
                    textDark: "#000000",
                    textLight: "#FFFFFF",
                    link: "#FF1493",
                    action: "#FF1493",
                    inactiveTabIcon: "#CCCCCC",
                    error: "#F44235",
                    inProgress: "#0078FF",
                    complete: "#20B832",
                    sourceBg: "#26050f"
                }
            }
        }, (error: any, result: any) => { 
            if (!error && result && result.event === "success") {
                handleUploadSuccess(result.info);
            }
        });
    }
  }, []);

  // Effect to load models when auth changes to true
  useEffect(() => {
      if (isAuthenticated) {
          loadModels();
      }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (username === 'admin' && password === 'admin123') {
          setIsAuthenticated(true);
          sessionStorage.setItem('admin_auth', 'true');
          setLoginError('');
      } else {
          setLoginError('用户名或密码错误');
      }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem('admin_auth');
      setUsername('');
      setPassword('');
  };

  const loadModels = () => {
      setModels(db.getAll());
  };

  const handleUploadSuccess = (info: any) => {
      const url = info.secure_url;
      const isVideo = info.resource_type === 'video';

      setFormData(prev => {
          const newData = { ...prev };
          
          if (isVideo) {
              // If it's a video, set it to the video field
              newData.video = url;
          } else {
              // If it's an image
              if (!newData.image) {
                  // If main cover is empty, set as cover
                  newData.image = url;
              } else {
                  // Otherwise add to gallery
                  newData.gallery = [...newData.gallery, url];
              }
          }
          return newData;
      });
  };

  const openUploadWidget = () => {
      if (widgetRef.current) {
          widgetRef.current.open();
      } else {
          alert('上传组件加载失败，请检查网络或 Cloudinary 配置。');
      }
  };

  const handleParse = () => {
      if (!parseText) return;
      
      const getValue = (key: string) => {
          const regex = new RegExp(`${key}[:：]\\s*(.*?)(?:\\n|$)`);
          const match = parseText.match(regex);
          return match ? match[1].trim() : '';
      };
      
      const getCategories = (key: string) => {
          const val = getValue(key);
          if (!val) return [];
          const rawCats = val.split(/[\s,，/、]+/);
          return rawCats.filter(c => c.length > 0);
      };

      const parsedData: Model = {
          ...formData,
          id: getValue('编号') || Date.now().toString(),
          name: getValue('编号'), 
          location: (getValue('省份') + ' ' + getValue('城市')).trim(),
          age: getValue('年龄'),
          height: getValue('身高'),
          weight: getValue('体重'),
          cup: getValue('罩杯'),
          experience: getValue('经验'),
          desire: getValue('欲望大小'),
          category: getCategories('分类'),
          services: {
              oral: getValue('能否口'),
              noCondom: getValue('能否无套'),
              creampie: getValue('能否内射'),
              sm: getValue('能否SM'),
          },
          availability: {
              overnight: getValue('能否过夜').includes('能'),
              cohabitation: getValue('能否同居').includes('能'),
              travel: getValue('能否外地').includes('能'),
              meetingDays: getValue('见面天数'),
              meetingTime: getValue('见面时间'),
          },
          attributes: {
              tattoo: getValue('是否纹身').includes('是'),
              smoking: getValue('是否抽烟').includes('是'),
              period: getValue('姨妈时间')
          },
          pricing: {
              allowance: getValue('零花预期'),
              paymentFreq: getValue('支付次数')
          },
          limits: getValue('雷点要求'),
          bio: getValue('自我评价'),
          handle: '@' + (getValue('编号') || 'user'),
          image: formData.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
      };
      
      setFormData(parsedData);
      alert('解析成功！请确认分类并补充图片链接后保存。');
  };

  const handleSave = () => {
      if (!formData.name) {
          alert('编号/姓名不能为空');
          return;
      }
      
      if (formData.category.length === 0) {
          alert('请至少选择一个分类');
          return;
      }

      if (editMode) {
          db.update(formData.id, formData);
      } else {
          if (models.find(m => m.id === formData.id)) {
             alert('编号已存在，请修改');
             return;
          }
          db.add(formData);
      }
      
      loadModels();
      setFormData(initialForm);
      setEditMode(false);
      setParseText('');
      alert('保存成功！');
  };

  const handleDelete = (id: string) => {
      if (confirm('确定删除吗？')) {
          db.delete(id);
          loadModels();
      }
  };

  const handleEdit = (model: Model) => {
      setFormData(model);
      setEditMode(true);
      window.scrollTo(0, 0);
  };

  const handleReset = () => {
      if(confirm('确定重置所有数据到初始状态吗？所有自定义数据将丢失。')) {
          db.reset();
      }
  };

  const toggleCategory = (cat: string) => {
      setFormData(prev => {
          const exists = prev.category.includes(cat);
          let newCats;
          if (exists) {
              newCats = prev.category.filter(c => c !== cat);
          } else {
              newCats = [...prev.category, cat];
          }
          return { ...prev, category: newCats };
      });
  };

  const updateField = (path: string, value: any) => {
      setFormData(prev => {
          const newData = { ...prev };
          const keys = path.split('.');
          let current: any = newData;
          for (let i = 0; i < keys.length - 1; i++) {
              if (!current[keys[i]]) current[keys[i]] = {};
              current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
          return newData;
      });
  };

  const removeGalleryImage = (index: number) => {
      setFormData(prev => ({
          ...prev,
          gallery: prev.gallery.filter((_, i) => i !== index)
      }));
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
      return (
          <div className="min-h-screen bg-dark-bg pt-24 pb-20 flex items-center justify-center px-4">
              <div className="glass-panel w-full max-w-md p-8 rounded-3xl border border-neon-pink/30 shadow-[0_0_50px_rgba(255,20,147,0.2)]">
                  <div className="text-center mb-8">
                      <div className="inline-flex p-4 rounded-full bg-neon-pink/10 mb-4 border border-neon-pink/50">
                          <Lock size={32} className="text-neon-pink" />
                      </div>
                      <h1 className="text-2xl font-black text-white">管理员登录</h1>
                      <p className="text-gray-400 text-sm mt-2">请输入管理员凭证以访问后台</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-electric-blue uppercase tracking-wider ml-1">用户名</label>
                          <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input 
                                  type="text" 
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-pink transition-colors"
                                  placeholder="请输入用户名"
                              />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-xs font-bold text-electric-blue uppercase tracking-wider ml-1">密码</label>
                          <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                              <input 
                                  type="password" 
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-pink transition-colors"
                                  placeholder="请输入密码"
                              />
                          </div>
                      </div>

                      {loginError && (
                          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                              {loginError}
                          </div>
                      )}

                      <button type="submit" className="w-full bg-neon-pink text-white font-black py-4 rounded-xl hover:bg-white hover:text-neon-pink transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-neon-pink/20">
                          安全登录 <ArrowRight size={18} />
                      </button>
                  </form>
              </div>
          </div>
      );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="pt-24 pb-20 min-h-screen bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
                <span className="text-neon-pink">●</span> 数据库管理
            </h1>
            <div className="flex items-center gap-4">
                <button onClick={handleReset} className="text-xs text-red-500 underline hover:text-red-400">重置数据库</button>
                <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors text-sm font-bold text-gray-300"
                >
                    <LogOut size={16} /> 退出登录
                </button>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <div className="space-y-6">
             {/* 1. Media Uploader Section */}
             <div className="glass-panel p-6 rounded-3xl border-neon-pink/50">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                        <CloudUpload size={20} className="text-neon-pink" /> 媒体中心
                    </h3>
                    <button 
                        onClick={openUploadWidget}
                        className="px-4 py-2 bg-neon-pink text-white rounded-lg font-bold text-xs hover:bg-white hover:text-neon-pink transition-colors flex items-center gap-1"
                    >
                        <Plus size={14} /> 批量上传图片/视频
                    </button>
                </div>
                
                {/* Previews */}
                <div className="space-y-3">
                    {/* Cover Preview */}
                    <div className="flex gap-4 items-start">
                        <div className="w-20 h-24 bg-black/40 rounded-lg flex-shrink-0 overflow-hidden border border-white/10 relative group">
                            {formData.image ? (
                                <>
                                    <img src={formData.image} className="w-full h-full object-cover" />
                                    <button onClick={() => updateField('image', '')} className="absolute top-1 right-1 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={10} className="text-white" />
                                    </button>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600 text-[10px]">封面图</div>
                            )}
                        </div>
                        
                        {/* Video Preview */}
                        <div className="w-32 h-24 bg-black/40 rounded-lg flex-shrink-0 overflow-hidden border border-white/10 relative group">
                             {formData.video ? (
                                <>
                                    <video src={formData.video} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><Video size={20} className="text-white/80" /></div>
                                    <button onClick={() => updateField('video', '')} className="absolute top-1 right-1 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <X size={10} className="text-white" />
                                    </button>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600 text-[10px]">无视频</div>
                            )}
                        </div>
                    </div>

                    {/* Gallery Preview */}
                    {formData.gallery.length > 0 && (
                        <div className="grid grid-cols-5 gap-2 mt-2">
                            {formData.gallery.map((img, idx) => (
                                <div key={idx} className="aspect-square bg-black/40 rounded-lg overflow-hidden relative group">
                                    <img src={img} className="w-full h-full object-cover" />
                                    <button onClick={() => removeGalleryImage(idx)} className="absolute top-1 right-1 bg-red-500 p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={10} className="text-white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="text-[10px] text-gray-500">* 上传的第一张图将自动作为封面，视频自动识别，其余归入相册。</p>
                </div>
             </div>

             {/* 2. Text Parser */}
             <div className="glass-panel p-6 rounded-3xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-electric-blue">
                    <ClipboardPaste size={20} /> 智能文本解析
                </h3>
                <textarea 
                    className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-mono text-white mb-2"
                    placeholder="粘贴如：编号：123... 分类：御姐 辣妹... 省份：上海..."
                    value={parseText}
                    onChange={e => setParseText(e.target.value)}
                />
                <button onClick={handleParse} className="w-full py-2 bg-white/10 hover:bg-electric-blue hover:text-white rounded-lg transition-colors font-bold text-sm">
                    一键填充文本信息
                </button>
             </div>

             {/* 3. Main Form */}
             <div className="glass-panel p-6 rounded-3xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">{editMode ? '编辑资料' : '新增资料'}</h3>
                    {editMode && <button onClick={() => {setEditMode(false); setFormData(initialForm)}} className="text-xs text-electric-blue">取消编辑</button>}
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input className="input-field" placeholder="编号/ID" value={formData.id} onChange={e => updateField('id', e.target.value)} disabled={editMode} />
                        <input className="input-field" placeholder="省份城市" value={formData.location} onChange={e => updateField('location', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <input className="input-field" placeholder="年龄" value={formData.age} onChange={e => updateField('age', e.target.value)} />
                        <input className="input-field" placeholder="身高" value={formData.height} onChange={e => updateField('height', e.target.value)} />
                        <input className="input-field" placeholder="体重" value={formData.weight} onChange={e => updateField('weight', e.target.value)} />
                        <input className="input-field" placeholder="罩杯" value={formData.cup} onChange={e => updateField('cup', e.target.value)} />
                    </div>
                    
                    <div>
                         <label className="text-xs text-gray-400 mb-2 block">分类 (多选)</label>
                         <div className="flex flex-wrap gap-2">
                             {CATEGORIES_OPTIONS.map(cat => (
                                 <button
                                     key={cat}
                                     onClick={() => toggleCategory(cat)}
                                     className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1 ${
                                         formData.category.includes(cat)
                                         ? 'bg-neon-pink border-neon-pink text-white'
                                         : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                                     }`}
                                 >
                                     {formData.category.includes(cat) && <Check size={12} />}
                                     {cat}
                                 </button>
                             ))}
                         </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input className="input-field" placeholder="零花预期" value={formData.pricing?.allowance} onChange={e => updateField('pricing.allowance', e.target.value)} />
                        <input className="input-field" placeholder="支付次数" value={formData.pricing?.paymentFreq} onChange={e => updateField('pricing.paymentFreq', e.target.value)} />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                         <label className="flex items-center gap-2 bg-white/5 p-2 rounded">
                            <input type="checkbox" checked={formData.attributes?.tattoo} onChange={e => updateField('attributes.tattoo', e.target.checked)} /> 纹身
                         </label>
                         <label className="flex items-center gap-2 bg-white/5 p-2 rounded">
                            <input type="checkbox" checked={formData.attributes?.smoking} onChange={e => updateField('attributes.smoking', e.target.checked)} /> 抽烟
                         </label>
                         <label className="flex items-center gap-2 bg-white/5 p-2 rounded">
                            <input type="checkbox" checked={formData.availability?.overnight} onChange={e => updateField('availability.overnight', e.target.checked)} /> 过夜
                         </label>
                    </div>

                    <div className="space-y-2">
                        <input className="input-field text-gray-500" placeholder="封面图片链接 (或使用上方上传)" value={formData.image} onChange={e => updateField('image', e.target.value)} />
                        <input className="input-field text-gray-500" placeholder="视频链接 (或使用上方上传)" value={formData.video} onChange={e => updateField('video', e.target.value)} />
                    </div>

                    <textarea className="input-field h-24" placeholder="自我评价..." value={formData.bio} onChange={e => updateField('bio', e.target.value)} />
                    <textarea className="input-field h-16" placeholder="雷点要求..." value={formData.limits} onChange={e => updateField('limits', e.target.value)} />

                    <button onClick={handleSave} className="w-full py-4 bg-neon-pink hover:bg-white hover:text-neon-pink text-white font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                        <Save size={20} /> {editMode ? '保存修改' : '创建档案'}
                    </button>
                </div>
             </div>
          </div>

          {/* RIGHT: LIST */}
          <div className="space-y-4">
             <h3 className="text-2xl font-black text-white">已存档案 ({models.length})</h3>
             <div className="space-y-3">
                 {models.map(m => (
                     <div key={m.id} className="glass-panel p-4 rounded-xl flex justify-between items-center group">
                         <div className="flex items-center gap-3">
                             <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 relative">
                                 <img src={m.image} className="w-full h-full object-cover" />
                                 {m.video && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><Video size={12} /></div>}
                             </div>
                             <div className="overflow-hidden">
                                 <p className="font-bold text-white text-sm truncate">{m.id} - {m.category.join(' / ')}</p>
                                 <p className="text-xs text-gray-400">{m.location}</p>
                             </div>
                         </div>
                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                             <button onClick={() => handleEdit(m)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white">编辑</button>
                             <button onClick={() => handleDelete(m.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white"><Trash2 size={16} /></button>
                         </div>
                     </div>
                 ))}
             </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .input-field {
            width: 100%;
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 0.75rem;
            padding: 0.75rem;
            color: white;
            font-size: 0.875rem;
            outline: none;
        }
        .input-field:focus {
            border-color: #FF1493;
        }
      `}</style>
    </div>
  );
};

export default Admin;