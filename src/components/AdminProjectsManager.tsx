import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { getPortfolioItems, savePortfolioItems, PORTFOLIO_ITEMS } from '../data/portfolio';
import {
  Plus,
  Trash2,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  X,
  RotateCcw,
  Tag,
  Eye,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>(getPortfolioItems());
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PortfolioItem['category']>('motion');
  const [client, setClient] = useState('');
  const [metrics, setMetrics] = useState('');
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&fit=crop'
  );
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const sampleImages = [
    { label: 'موشن 3D', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&fit=crop' },
    { label: 'مطاعم ومنيو', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop' },
    { label: 'كيو آر كود', url: 'https://images.unsplash.com/photo-1595079672139-54714f3bcfca?w=800&fit=crop' },
    { label: 'هوية بصرية', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop' },
    { label: 'سوشيال ميديا', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&fit=crop' },
  ];

  const categoryLabelMap: Record<PortfolioItem['category'], string> = {
    motion: 'موشن جرافيك',
    menu: 'تصميم منيوهات',
    qrcode: 'كيو آر كود',
    posters: 'بوسترات',
    social: 'سوشيال ميديا',
    branding: 'هوية بصرية',
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !client.trim()) {
      alert('يرجى كتابة عنوان المشروع واسم العميل');
      return;
    }

    const newProject: PortfolioItem = {
      id: `p-${Date.now()}`,
      title: title.trim(),
      category,
      categoryLabel: categoryLabelMap[category] || 'تصميم احترافي',
      clientName: client.trim(),
      image: image.trim(),
      description: description.trim() || 'مشروع وتصميم احترافي نفذته وكالة صمملي.',
      metrics: metrics.trim() || 'أداء عالي ورضا تام من العميل',
      tags: tagsInput
        ? tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
        : ['صمملي', 'تصميم احترافي'],
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    savePortfolioItems(updated);

    // Reset Form
    setTitle('');
    setClient('');
    setMetrics('');
    setDescription('');
    setTagsInput('');
    setShowAddForm(false);
    setSuccessMsg('🎉 تم إضافة المشروع بنجاح وظهوره فوراً في المعرض!');
    confetti({ particleCount: 50, spread: 70 });
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleDeleteProject = (id: string, projectTitle: string) => {
    if (confirm(`هل أنت متأكد من حذف المشروع "${projectTitle}"؟`)) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      savePortfolioItems(updated);
      setSuccessMsg('🗑️ تم حذف المشروع من المعرض');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('هل تريد إعادة تعيين المشاريع إلى القائمة الافتراضية؟')) {
      setProjects(PORTFOLIO_ITEMS);
      savePortfolioItems(PORTFOLIO_ITEMS);
      setSuccessMsg('🔄 تمت استعادة المشاريع الافتراضية بنجاح');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.clientName && p.clientName.toLowerCase().includes(searchFilter.toLowerCase())) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-6 text-white text-right">
      {/* Top Banner & Actions */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-right w-full sm:w-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معرض الأعمال الحية ({projects.length} مشروع)</span>
          </div>
          <h3 className="text-lg font-black text-white">إضافة وإدارة المشاريع الجديدة 🎨</h3>
          <p className="text-xs text-slate-400 font-semibold">
            أضف مشروعاتك ونماذج أعمالك لترتفع مبيعاتك وتظهر فوراً لزوار الموقع
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{showAddForm ? 'إلغاء النموذج' : '➕ إضافة مشروع جديد'}</span>
          </button>

          <button
            onClick={handleResetToDefaults}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all"
            title="استعادة المشاريع الأصلية"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black rounded-xl text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add New Project Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddProject}
          className="bg-slate-950 p-6 rounded-3xl border-2 border-amber-400/80 shadow-2xl space-y-4 animate-in fade-in"
        >
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h4 className="font-black text-amber-400 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>إدخال بيانات المشروع الجديد</span>
            </h4>
            <span className="text-[11px] text-slate-400">سيتم نشره تلقائياً في المعرض</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-200">عنوان المشروع *:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: فيديو موشن جرافيك لمطعم برجر ريلز 🍔"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-200">القسم / التصنيف *:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PortfolioItem['category'])}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold focus:outline-none focus:border-amber-400"
              >
                <option value="motion">🎬 موشن جرافيك (Motion Graphics)</option>
                <option value="menu">🍽️ تصميم منيوهات مطاعم وكافيهات</option>
                <option value="qrcode">📱 كيو آر كود تفاعلي ذكي</option>
                <option value="posters">🖼️ بوسترات ومطبوعات</option>
                <option value="social">📲 إعلانات وتصميمات سوشيال ميديا</option>
                <option value="branding">🏷️ هوية بصرية كاملة وشعار</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-200">اسم العميل / البراند *:</label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="مثال: سلسلة كافيهات بليند"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-200">الإنجاز أو النتيجة الملموسة (Metrics):</label>
              <input
                type="text"
                value={metrics}
                onChange={(e) => setMetrics(e.target.value)}
                placeholder="مثال: زيادة التفاعل 320% و50 ألف مشاهدة"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Image URL & Presets */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-200">رابط صورة المشروع (Image URL):</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Presets Quick Picker */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-[10px] text-slate-400 font-bold">صور جاهزة للاختيار:</span>
                {sampleImages.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImage(s.url)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                      image === s.url
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-200">تفاصيل ووصف المشروع:</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب شرحاً سريعاً عن الفكرة والهدف من التصميم..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-200">الوسوم / الكلمات الدلالية (مفصولة بفواصل):</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="موشن, إعلان, مطاعم, ريلز"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl active:scale-98 transition-all"
          >
            نشر المشروع الجديد في الموقع فوراً 🚀
          </button>
        </form>
      )}

      {/* Projects Search & Count */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="بحث في المشروعات الحالية..."
          className="w-full max-w-xs px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-amber-400"
        />
        <span className="text-xs text-slate-400 font-bold">
          المعروض: {filteredProjects.length} من {projects.length}
        </span>
      </div>

      {/* Existing Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-amber-400/60 transition-all group"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-900">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-[10px] font-black text-amber-400 border border-amber-400/30">
                {proj.category}
              </span>
            </div>

            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h5 className="font-black text-white text-sm line-clamp-1">{proj.title}</h5>
                <p className="text-xs text-amber-400 font-bold">{proj.clientName || 'عميل معتمد'}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-medium">
                  {proj.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold truncate max-w-[160px]">
                  {proj.metrics}
                </span>

                <button
                  onClick={() => handleDeleteProject(proj.id, proj.title)}
                  className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                  title="حذف المشروع"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
