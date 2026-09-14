import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getPortfolioItems } from '../data/portfolio';
import { PortfolioItem } from '../types';
import { Eye, ExternalLink, Sparkles, X, Check, ArrowLeft, Send } from 'lucide-react';

interface PortfolioGalleryProps {
  onOrderSimilarWork: (category: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onOrderSimilarWork }) => {
  const [itemsList, setItemsList] = useState<PortfolioItem[]>(getPortfolioItems());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setItemsList(getPortfolioItems());
    };
    window.addEventListener('portfolioUpdated', handleUpdate);
    return () => window.removeEventListener('portfolioUpdated', handleUpdate);
  }, []);

  const categories = [
    { id: 'all', label: 'الكل ✨' },
    { id: 'motion', label: '🎬 موشن جرافيك' },
    { id: 'menu', label: '🍽️ منيوهات' },
    { id: 'qrcode', label: '📱 QR Code' },
    { id: 'posters', label: '🖼️ بوسترات' },
    { id: 'social', label: '📲 سوشيال ميديا' },
    { id: 'branding', label: '🏷️ هوية بصرية' },
  ];

  const filteredItems = activeCategory === 'all'
    ? itemsList
    : itemsList.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-sm font-bold">
            <span>🎨 معرض الأعمال والمشاريع</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
            نماذج من شغلي <span className="gradient-text">مع العملاء</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-semibold">
            تصاميم مش بس جرافيك حلو... تصاميم جابت نتايج حقيقية وملموسة لأصحاب المشاريع
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-3xl overflow-hidden border-2 border-slate-200 bg-white group hover:border-amber-500 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                  {/* Category Tag */}
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-amber-800 text-xs font-bold shadow-sm">
                    {item.categoryLabel}
                  </span>

                  {/* Quick Preview Button */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75 shadow-xl font-bold"
                    title="تكبير ومعاينة"
                  >
                    <Eye className="w-6 h-6" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Client & Metrics */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-bold">{item.clientName}</span>
                      <span className="text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                        {item.metrics}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Selected Item Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-3xl border-2 border-slate-200 overflow-hidden shadow-2xl relative space-y-6 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 text-slate-700 hover:text-black border border-slate-300 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 text-right">
                <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 shadow-sm">
                  <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-900 px-3 py-1 rounded-full bg-amber-100 border border-amber-300">
                    {selectedItem.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 pt-2">{selectedItem.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">{selectedItem.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs shadow-inner">
                  <div>
                    <span className="text-slate-600 block font-semibold">العميل:</span>
                    <strong className="text-slate-900 text-sm font-bold">{selectedItem.clientName}</strong>
                  </div>
                  <div className="text-left">
                    <span className="text-slate-600 block font-semibold">النتيجة:</span>
                    <strong className="text-emerald-700 text-sm font-bold">{selectedItem.metrics}</strong>
                  </div>
                </div>

                <button
                  id="order-similar-work-btn"
                  onClick={() => {
                    const cat = selectedItem.category;
                    setSelectedItem(null);
                    onOrderSimilarWork(cat);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>اطلب تصميم مماثل لبراندك دلوقتي 🚀</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
