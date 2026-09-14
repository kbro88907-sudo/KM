import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Users,
  DollarSign,
  Settings,
  CheckCircle2,
  Clock,
  MessageSquare,
  Search,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Sparkles,
  Download,
  Phone,
  Tag,
  ShieldAlert,
  Eye,
  EyeOff,
  FileDown,
  LayoutGrid,
  Table as TableIcon,
  RefreshCw,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SavedOrder } from './OrderTracker';
import { getAgencyPricing, saveAgencyPricing, AgencyPricingData, ServicePriceConfig, DEFAULT_PRICING, calcUsd } from '../data/pricingStore';
import { AGENCY_CONFIG, getAgencyWhatsAppNumber } from '../config';
import { getVisitorStats, resetVisitorCount, VisitorStats } from '../utils/visitorTracker';
import { AdminProjectsManager } from './AdminProjectsManager';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPricingUpdated?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose, onPricingUpdated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'pricing' | 'agency' | 'projects'>('orders');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Orders State
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Reset Client Counter State (Passcode: kb9382)
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetCodeInput, setResetCodeInput] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  // New Client Form
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientService, setNewClientService] = useState('موشن جرافيك 🎬');
  const [newClientNotes, setNewClientNotes] = useState('');

  // Pricing State
  const [pricingData, setPricingData] = useState<AgencyPricingData>(DEFAULT_PRICING);
  const [savedSuccessAlert, setSavedSuccessAlert] = useState(false);

  // Agency Config Editable State
  const [agencyPhone, setAgencyPhone] = useState(AGENCY_CONFIG.whatsappRaw);
  const [agencyEmail, setAgencyEmail] = useState(AGENCY_CONFIG.email);
  const [instagramUrl, setInstagramUrl] = useState(AGENCY_CONFIG.instagramUrl);
  const [tiktokUrl, setTiktokUrl] = useState(AGENCY_CONFIG.tiktokUrl);
  const [facebookUrl, setFacebookUrl] = useState(AGENCY_CONFIG.facebookUrl);

  // Visitor Stats State
  const [visitorStats, setVisitorStats] = useState<VisitorStats>(getVisitorStats());

  // Load stored orders & pricing & visitor stats
  useEffect(() => {
    if (isOpen) {
      loadOrders();
      setPricingData(getAgencyPricing());
      setVisitorStats(getVisitorStats());

      try {
        const customPhone = localStorage.getItem('zenith_agency_phone');
        if (customPhone) setAgencyPhone(customPhone);
        const customEmail = localStorage.getItem('zenith_agency_email');
        if (customEmail) setAgencyEmail(customEmail);
        const customInsta = localStorage.getItem('zenith_agency_insta');
        if (customInsta) setInstagramUrl(customInsta);
        const customTiktok = localStorage.getItem('zenith_agency_tiktok');
        if (customTiktok) setTiktokUrl(customTiktok);
        const customFb = localStorage.getItem('zenith_agency_fb');
        if (customFb) setFacebookUrl(customFb);
      } catch {
        // fallback
      }
    }
  }, [isOpen]);

  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('zenith_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        const initialMock: SavedOrder[] = [
          {
            id: 'ZEN-9821',
            clientName: 'أحمد محمود',
            phone: '01123456789',
            brandName: 'مطعم الكابتن',
            serviceTitle: 'تصميم منيوهات 🍽️',
            serviceId: 'menu',
            timeframe: '⏱️ عادي (3-5 أيام)',
            notes: 'منيو مطعم وجبات سريعة وجهين ديجيتال ومطبوع',
            createdAt: new Date().toLocaleDateString(),
            status: 'in_progress',
            progress: 60,
          },
          {
            id: 'ZEN-4412',
            clientName: 'سارة خالد',
            phone: '01098765432',
            brandName: 'Glow Beauty Store',
            serviceTitle: 'موشن جرافيك 🎬',
            serviceId: 'motion',
            timeframe: '⚡ عاجل جداً',
            notes: 'فيديو موشن 15 ثانية ريلز لمستحضرات التجميل',
            createdAt: new Date().toLocaleDateString(),
            status: 'review',
            progress: 85,
          },
        ];
        setOrders(initialMock);
        localStorage.setItem('zenith_orders', JSON.stringify(initialMock));
      }
    } catch {
      // fallback
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '311200' || password === 'admin' || password === 'kb9382') {
      setIsAuthenticated(true);
      setLoginError(false);
      confetti({ particleCount: 40, spread: 50 });
    } else {
      setLoginError(true);
    }
  };

  const handleUpdateOrderStatus = (id: string, newStatus: SavedOrder['status'], progress: number) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus, progress } : o));
    setOrders(updated);
    localStorage.setItem('zenith_orders', JSON.stringify(updated));
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      const filtered = orders.filter((o) => o.id !== id);
      setOrders(filtered);
      localStorage.setItem('zenith_orders', JSON.stringify(filtered));
    }
  };

  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientPhone) return;

    const newOrder: SavedOrder = {
      id: `ZEN-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: newClientName,
      phone: newClientPhone,
      brandName: 'مشروع جديد',
      serviceTitle: newClientService,
      serviceId: 'custom',
      timeframe: '⏱️ عادي',
      notes: newClientNotes || 'تمت إضافته يدوياً بواسطة الأدمن',
      createdAt: new Date().toLocaleDateString(),
      status: 'in_progress',
      progress: 10,
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('zenith_orders', JSON.stringify(updated));

    setNewClientName('');
    setNewClientPhone('');
    setNewClientNotes('');
    setShowAddModal(false);
    confetti({ particleCount: 30, spread: 60 });
  };

  // Reset Client/Visitor Counter with specific security code `kb9382`
  const handleConfirmResetCounter = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetCodeInput.trim() === 'kb9382') {
      const freshStats = resetVisitorCount();
      setVisitorStats(freshStats);
      setResetSuccessMsg('✅ تم تصفير عداد الزوار والعملاء بنجاح وربطه بالعداد الخارجي!');
      setResetError('');
      setResetCodeInput('');
      confetti({ particleCount: 50, spread: 60 });
      setTimeout(() => {
        setResetSuccessMsg('');
        setShowResetModal(false);
      }, 2000);
    } else {
      setResetError('❌ رمز المرور الأمني غير صحيح! يرجى التأكد من الرمز المصرح به.');
    }
  };

  // Download PDF Statistics Report
  const handleDownloadPDFReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('يرجى السماح بالنوافذ المنبثقة لتحميل التقرير PDF');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>تقرير إحصائيات وطلبات وكالة صمملي (Sammemly)</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 28px; color: #0f172a; background: #fff; line-height: 1.5; }
          .header { border-bottom: 3px solid #f59e0b; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 24px; font-weight: 900; color: #0f172a; margin: 0; }
          .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; font-weight: 600; }
          .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
          .stat-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; text-align: center; }
          .stat-num { font-size: 20px; font-weight: 900; color: #b45309; }
          .stat-label { font-size: 11px; color: #475569; font-weight: 700; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
          th { background: #0f172a; color: #fff; padding: 10px; text-align: right; font-weight: 800; border: 1px solid #334155; }
          td { padding: 10px; border: 1px solid #cbd5e1; font-weight: 600; }
          tr:nth-child(even) { background: #f8fafc; }
          .badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; }
          .badge-progress { background: #fef3c7; color: #92400e; }
          .badge-completed { background: #dcfce7; color: #166534; }
          .footer-note { margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 11px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">⚡ وكالة صمملي — تقرير الإحصائيات وجدول العملاء</h1>
            <p class="subtitle">تاريخ التقرير: ${new Date().toLocaleString('ar-EG')} | بوابة الإدارة المعتمدة</p>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-num">${visitorStats.totalVisits.toLocaleString()}</div>
            <div class="stat-label">إجمالي زيارات الموقع</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">${orders.length}</div>
            <div class="stat-label">إجمالي طلبات العملاء</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">${orders.filter(o => o.status === 'in_progress').length}</div>
            <div class="stat-label">مشاريع قيد التنفيذ</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">${orders.filter(o => o.status === 'completed').length}</div>
            <div class="stat-label">مشاريع مكتملة ومسلمة</div>
          </div>
        </div>

        <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 8px;">📋 جدول بيانات العملاء والطلبات المنظم:</h3>
        <table>
          <thead>
            <tr>
              <th>كود الطلب</th>
              <th>اسم العميل</th>
              <th>الهاتف</th>
              <th>البراند / المشروع</th>
              <th>الخدمة المطلوبة</th>
              <th>تاريخ الطلب</th>
              <th>نسبة الإنجاز والحالة</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td style="font-family: monospace; font-weight: 900; color: #b45309;">${o.id}</td>
                <td>${o.clientName}</td>
                <td dir="ltr" style="text-align: right;">${o.phone}</td>
                <td>${o.brandName || '-'}</td>
                <td>${o.serviceTitle}</td>
                <td>${o.createdAt}</td>
                <td>
                  <span class="badge ${o.status === 'completed' ? 'badge-completed' : 'badge-progress'}">
                    ${o.status === 'completed' ? 'تم التسليم' : 'جاري التنفيذ'} (${o.progress}%)
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer-note">
          تم إنشاء هذا التقرير آلياً عبر لوحة تحكم وكالة صمملي الرسمية • جميع الحقوق محفوظة © ${new Date().getFullYear()}
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleSavePricing = () => {
    saveAgencyPricing(pricingData);
    if (onPricingUpdated) onPricingUpdated();
    setSavedSuccessAlert(true);
    confetti({ particleCount: 40, spread: 60 });
    setTimeout(() => setSavedSuccessAlert(false), 3000);
  };

  const handleResetPricingToDefaults = () => {
    if (confirm('هل تريد إعادة تعيين كافة الأسعار للقيم الافتراضية؟')) {
      setPricingData(DEFAULT_PRICING);
      saveAgencyPricing(DEFAULT_PRICING);
      if (onPricingUpdated) onPricingUpdated();
    }
  };

  const handleSaveAgencySettings = () => {
    try {
      localStorage.setItem('zenith_agency_phone', agencyPhone);
      localStorage.setItem('zenith_agency_email', agencyEmail);
      localStorage.setItem('zenith_agency_insta', instagramUrl);
      localStorage.setItem('zenith_agency_tiktok', tiktokUrl);
      localStorage.setItem('zenith_agency_fb', facebookUrl);
      setSavedSuccessAlert(true);
      confetti({ particleCount: 40, spread: 60 });
      setTimeout(() => setSavedSuccessAlert(false), 3000);
    } catch {
      // fallback
    }
  };

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border-2 border-cyan-500/30 text-white shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-b border-cyan-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden bg-slate-950 border-2 border-amber-400 shadow-md flex items-center justify-center shrink-0">
              <img src={AGENCY_CONFIG.logo} alt="صمملي Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base sm:text-lg text-white">لوحة تحكم الإدارة | صمملي Admin</h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-[10px]">
                  VIP Portal
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-semibold">إدارة العملاء والطلبات، تصفير العداد، وتحديد الأسعار</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Guard Screen */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-10 text-center space-y-6 my-auto max-w-md mx-auto w-full">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">تسجيل دخول المسؤول</h3>
              <p className="text-xs text-slate-400 font-medium">أدخل كلمة المرور الخاصة بلوحة الإدارة للتحكم في كافة الإعدادات</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="أدخل كلمة المرور السرية..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 text-center font-bold tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-3.5 text-slate-400 hover:text-white"
                  title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>كلمة المرور غير صحيحة! يرجى إعادة المحاولة.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-98"
              >
                دخول لوحة التحكم 🚀
              </button>
            </form>
          </div>
        ) : (
          /* Main Authenticated Dashboard Body */
          <div className="flex-1 overflow-hidden flex flex-col">
            
            {/* Tabs Bar */}
            <div className="bg-slate-950 px-4 sm:px-6 py-2.5 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>إدارة وجدول العملاء ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'pricing'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>تحديد وتعديل الأسعار 💰</span>
              </button>

              <button
                onClick={() => setActiveTab('agency')}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'agency'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>بيانات التواصل والوكالة ⚙️</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>إضافة وإدارة المشاريع الجديدة 🎨</span>
              </button>
            </div>

            {/* Success Banner */}
            {savedSuccessAlert && (
              <div className="p-3 bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>تم حفظ التعديلات بنجاح وتحديث الموقع فوراً! 🎉</span>
              </div>
            )}

            {/* Tab 1: Clients & Orders Management with Organized Table */}
            {activeTab === 'orders' && (
              <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-5">
                
                {/* 👁️ Live Visitor Stats Bar & Reset Button */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-cyan-500/30">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 relative">
                    <span className="text-[10px] text-slate-400 font-bold block">👁️ إجمالي زيارات الموقع:</span>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-amber-400 dir-ltr text-right">
                        {visitorStats.totalVisits.toLocaleString()}
                      </span>
                      {/* Reset Button (Code: kb9382) */}
                      <button
                        onClick={() => {
                          setResetError('');
                          setResetSuccessMsg('');
                          setShowResetModal(true);
                        }}
                        className="px-2 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-[10px] font-bold flex items-center gap-1 transition-all"
                        title="تصفير عداد الزوار والعملاء برمز المرور"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>تصفير</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold block">👥 زوار فريدين:</span>
                    <span className="text-lg font-black text-cyan-400 dir-ltr text-right block">
                      {visitorStats.uniqueVisits.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold block">📈 زيارات اليوم:</span>
                    <span className="text-lg font-black text-emerald-400 dir-ltr text-right block">
                      +{visitorStats.todayVisits}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold block">🕒 آخر دخول للموقع:</span>
                    <span className="text-xs font-bold text-slate-200 truncate block">
                      {visitorStats.lastVisitTime}
                    </span>
                  </div>
                </div>

                {/* Search & Actions Bar (Organized Table Tools + PDF Export) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث باسم العميل، كود الطلب، أو الهاتف..."
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold focus:outline-none"
                    >
                      <option value="all">كل الحالات</option>
                      <option value="in_progress">جاري التنفيذ ⏳</option>
                      <option value="review">مراجعة العميل 🔍</option>
                      <option value="completed">تم التسليم النهائي ✅</option>
                    </select>

                    {/* View Switcher (Table vs Cards) */}
                    <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700">
                      <button
                        onClick={() => setViewMode('table')}
                        className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                          viewMode === 'table' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                        title="عرض كجدول منظم"
                      >
                        <TableIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">جدول منظم</span>
                      </button>
                      <button
                        onClick={() => setViewMode('cards')}
                        className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                          viewMode === 'cards' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                        title="عرض كبطاقات"
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">بطاقات</span>
                      </button>
                    </div>

                    {/* Add Client Button */}
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة عميل</span>
                    </button>

                    {/* Download PDF Statistics Button */}
                    <button
                      onClick={handleDownloadPDFReport}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm"
                      title="تنزيل وطباعة تقرير الإحصائيات PDF"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>تنزيل PDF</span>
                    </button>
                  </div>
                </div>

                {/* 1. Organized Table View */}
                {viewMode === 'table' && (
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-12 space-y-2">
                        <Users className="w-10 h-10 text-slate-600 mx-auto" />
                        <p className="text-sm font-bold text-slate-400">لا توجد طلبات مطابقة للبحث</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-right text-xs">
                          <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-extrabold text-[11px]">
                            <tr>
                              <th className="p-3.5">الكود</th>
                              <th className="p-3.5">اسم العميل والبراند</th>
                              <th className="p-3.5">الهاتف</th>
                              <th className="p-3.5">الخدمة المطلوبة</th>
                              <th className="p-3.5">التاريخ</th>
                              <th className="p-3.5">الحالة والإنجاز</th>
                              <th className="p-3.5 text-center">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 font-semibold">
                            {filteredOrders.map((order) => {
                              const waLink = `https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `أهلاً بك أ/ ${order.clientName} 👋 معك وكالة ${AGENCY_CONFIG.agencyName}.\nبخصوص طلبك رقم (${order.id}) لجودة ${order.serviceTitle}:\nنسبة الإنجاز الحالية: ${order.progress}%\nالحالة: ${
                                  order.status === 'completed'
                                    ? 'جاهز للتسليم'
                                    : order.status === 'review'
                                    ? 'في مرحلة المراجعة والمعاينة'
                                    : 'جاري العمل والتنفيذ'
                                }`
                              )}`;

                              return (
                                <tr key={order.id} className="hover:bg-slate-900/60 transition-colors">
                                  <td className="p-3.5 font-mono font-bold text-amber-400">
                                    {order.id}
                                  </td>
                                  <td className="p-3.5">
                                    <div className="font-bold text-white text-xs">{order.clientName}</div>
                                    {order.brandName && (
                                      <div className="text-[10px] text-slate-400">{order.brandName}</div>
                                    )}
                                  </td>
                                  <td className="p-3.5 font-mono text-slate-300 dir-ltr text-right">
                                    {order.phone}
                                  </td>
                                  <td className="p-3.5 text-slate-200">
                                    {order.serviceTitle}
                                  </td>
                                  <td className="p-3.5 text-slate-400 text-[11px]">
                                    {order.createdAt}
                                  </td>
                                  <td className="p-3.5">
                                    <div className="flex items-center gap-2">
                                      <select
                                        value={order.status}
                                        onChange={(e) => {
                                          const val = e.target.value as SavedOrder['status'];
                                          const prog = val === 'completed' ? 100 : val === 'review' ? 85 : val === 'in_progress' ? 50 : 0;
                                          handleUpdateOrderStatus(order.id, val, prog);
                                        }}
                                        className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-bold text-white focus:outline-none"
                                      >
                                        <option value="in_progress">جاري التنفيذ (50%)</option>
                                        <option value="review">مراجعة المعاينة (85%)</option>
                                        <option value="completed">تم التسليم (100%)</option>
                                      </select>
                                      <span className="text-[10px] font-bold text-amber-400">{order.progress}%</span>
                                    </div>
                                  </td>
                                  <td className="p-3.5 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                      <a
                                        href={waLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                                        title="مراسلة العميل واتساب"
                                      >
                                        <MessageSquare className="w-3.5 h-3.5" />
                                      </a>
                                      <button
                                        onClick={() => handleDeleteOrder(order.id)}
                                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                                        title="حذف الطلب"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Cards View */}
                {viewMode === 'cards' && (
                  <div className="space-y-3">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-400">
                              {order.id}
                            </span>
                            <div>
                              <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                                <span>{order.clientName}</span>
                                {order.brandName && (
                                  <span className="text-xs font-normal text-slate-400">({order.brandName})</span>
                                )}
                              </h4>
                              <p className="text-xs text-slate-400 font-semibold dir-ltr text-right">{order.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={order.status}
                              onChange={(e) => {
                                const val = e.target.value as SavedOrder['status'];
                                const prog = val === 'completed' ? 100 : val === 'review' ? 85 : val === 'in_progress' ? 50 : 0;
                                handleUpdateOrderStatus(order.id, val, prog);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none"
                            >
                              <option value="in_progress">جاري التنفيذ (50%)</option>
                              <option value="review">مراجعة المعاينة (85%)</option>
                              <option value="completed">تم التسليم (100%)</option>
                            </select>

                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                          <div>
                            <strong className="text-amber-400">الخدمة: </strong>
                            <span>{order.serviceTitle}</span>
                          </div>
                          <div>
                            <strong className="text-amber-400">التوقيت والتاريخ: </strong>
                            <span>{order.timeframe} — {order.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* Tab 2: Pricing Manager */}
            {activeTab === 'pricing' && (
              <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-6">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <h3 className="font-black text-white text-base">تحديد وتعديل أرقام وقيم الأسعار والعملة المزدوجة 🏷️</h3>
                    <p className="text-xs text-slate-400 font-semibold">تُحدد الأسعار بالجنيه المصري (EGP) ويتم احتساب المكون بالدولار (USD) لبايبال تلقائياً بناءً على سعر الصرف</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleResetPricingToDefaults}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إعادة ضبط</span>
                    </button>

                    <button
                      onClick={handleSavePricing}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>حفظ الأسعار 🚀</span>
                    </button>
                  </div>
                </div>

                {/* Exchange Rate Controller (1 USD = X EGP) */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                      💵 معامل تحويل الدولار مقابل الجنيه (PayPal):
                    </span>
                    <p className="text-[11px] text-slate-300">
                      يُستخدم هذا السعر لحساب قيمة التحويل بالدولار $ للعملاء الذين يدفعون عن طريق بايبال PayPal تلقائياً.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 bg-slate-900 p-2 rounded-xl border border-emerald-500/40">
                    <span className="text-xs font-black text-emerald-400 dir-ltr">1 USD =</span>
                    <input
                      type="number"
                      min="1"
                      step="0.5"
                      value={pricingData.usdRate || 50}
                      onChange={(e) => {
                        const val = Math.max(1, Number(e.target.value));
                        setPricingData({ ...pricingData, usdRate: val });
                      }}
                      className="w-20 px-2 py-1.5 rounded-lg bg-slate-950 border border-emerald-500/50 text-emerald-400 font-mono font-black text-sm text-center focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-300">ج.م</span>
                  </div>
                </div>

                {/* Services Pricing Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Object.entries(pricingData.services) as [string, ServicePriceConfig][]).map(([key, service]) => {
                    const currentRate = pricingData.usdRate || 50;
                    const usdPrice = calcUsd(service.basePrice, currentRate);
                    const usdDeposit = calcUsd(service.basePrice / 2, currentRate);

                    return (
                      <div
                        key={key}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <span className="font-black text-amber-400 text-sm">{service.serviceTitle}</span>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={service.isActive}
                              onChange={(e) => {
                                const updated = {
                                  ...pricingData,
                                  services: {
                                    ...pricingData.services,
                                    [key]: { ...service, isActive: e.target.checked },
                                  },
                                };
                                setPricingData(updated);
                              }}
                              className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-0"
                            />
                            <span className="text-xs font-bold text-slate-300">مُفعلة</span>
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-slate-400">السعر الأساسي ({pricingData.currencySymbol}):</label>
                            <input
                              type="number"
                              value={service.basePrice}
                              onChange={(e) => {
                                const updated = {
                                  ...pricingData,
                                  services: {
                                    ...pricingData.services,
                                    [key]: { ...service, basePrice: Number(e.target.value) },
                                  },
                                };
                                setPricingData(updated);
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-slate-400">رسوم التسليم العاجل ({pricingData.currencySymbol}):</label>
                            <input
                              type="number"
                              value={service.expressDeliveryFee}
                              onChange={(e) => {
                                const updated = {
                                  ...pricingData,
                                  services: {
                                    ...pricingData.services,
                                    [key]: { ...service, expressDeliveryFee: Number(e.target.value) },
                                  },
                                };
                                setPricingData(updated);
                              }}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        </div>

                        {/* Dual Currency Live Preview for Admin */}
                        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-[11px] font-bold flex items-center justify-between text-slate-300 dir-rtl">
                          <span className="text-emerald-400">💵 المكافئ بالدولار:</span>
                          <span className="font-mono text-emerald-300">
                            الإجمالي: ${usdPrice} USD | العربون 50%: ${usdDeposit} USD
                          </span>
                        </div>

                        {/* Sub-options / Variants Pricing Table */}
                        <div className="space-y-3 pt-3 border-t border-slate-800">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                              ⚙️ أسعار الخيارات والمواصفات الفرعية ({service.variants?.length || 0}):
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const newVar = {
                                  id: `v_${Date.now()}`,
                                  label: 'خيار جديد',
                                  price: 500,
                                };
                                setPricingData({
                                  ...pricingData,
                                  services: {
                                    ...pricingData.services,
                                    [key]: {
                                      ...service,
                                      variants: [...(service.variants || []), newVar],
                                    },
                                  },
                                });
                              }}
                              className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-cyan-500/30 flex items-center gap-1 transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>إضافة خيار</span>
                            </button>
                          </div>

                          {service.variants && service.variants.length > 0 && (
                            <div className="space-y-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                              {service.variants.map((v, vIdx) => {
                                const vUsd = calcUsd(v.price, currentRate);
                                return (
                                  <div
                                    key={v.id || vIdx}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all"
                                  >
                                    <input
                                      type="text"
                                      value={v.label}
                                      onChange={(e) => {
                                        const newVariants = [...service.variants!];
                                        newVariants[vIdx] = { ...v, label: e.target.value };
                                        setPricingData({
                                          ...pricingData,
                                          services: {
                                            ...pricingData.services,
                                            [key]: { ...service, variants: newVariants },
                                          },
                                        });
                                      }}
                                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-semibold text-xs focus:outline-none focus:border-amber-400"
                                      placeholder="اسم الخيار (مثال: 15 ثانية / باقة 10)"
                                    />

                                    <div className="flex items-center gap-2 shrink-0">
                                      <div className="flex items-center gap-1">
                                        <input
                                          type="number"
                                          value={v.price}
                                          onChange={(e) => {
                                            const newVariants = [...service.variants!];
                                            newVariants[vIdx] = { ...v, price: Number(e.target.value) };
                                            setPricingData({
                                              ...pricingData,
                                              services: {
                                                ...pricingData.services,
                                                [key]: { ...service, variants: newVariants },
                                              },
                                            });
                                          }}
                                          className="w-24 px-2 py-1.5 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-400 font-mono font-black text-xs text-center focus:outline-none focus:border-amber-400"
                                        />
                                        <span className="text-[10px] font-bold text-slate-400">ج.م</span>
                                      </div>

                                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded-md border border-emerald-500/30 dir-ltr">
                                        (${vUsd} USD)
                                      </span>

                                      {service.variants!.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newVariants = service.variants!.filter((_, idx) => idx !== vIdx);
                                            setPricingData({
                                              ...pricingData,
                                              services: {
                                                ...pricingData.services,
                                                [key]: { ...service, variants: newVariants },
                                              },
                                            });
                                          }}
                                          className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 transition-all"
                                          title="حذف الخيار"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={handleSavePricing}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 active:scale-98"
                  >
                    حفظ واعتماد قائمة الأسعار للموقع 🚀
                  </button>
                </div>

              </div>
            )}

            {/* Tab 3: Agency Settings */}
            {activeTab === 'agency' && (
              <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="font-black text-white text-base">تحديث بيانات وتواصل الوكالة ⚙️</h3>
                  <p className="text-xs text-slate-400 font-semibold">تعديل أرقام الهواتف والواتساب والروابط المسجلة في أزرار الموقع فورياً</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-bold text-amber-400">رقم الواتساب الرسمي (بدون +):</label>
                      <input
                        type="text"
                        value={agencyPhone}
                        onChange={(e) => setAgencyPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-amber-400">البريد الإلكتروني للوكالة:</label>
                      <input
                        type="email"
                        value={agencyEmail}
                        onChange={(e) => setAgencyEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-300">رابط انستجرام Instagram:</label>
                      <input
                        type="text"
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-300">رابط تيك توك TikTok:</label>
                      <input
                        type="text"
                        value={tiktokUrl}
                        onChange={(e) => setTiktokUrl(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="font-bold text-slate-300">رابط فيسبوك Facebook:</label>
                      <input
                        type="text"
                        value={facebookUrl}
                        onChange={(e) => setFacebookUrl(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveAgencySettings}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md transition-all active:scale-98"
                  >
                    حفظ وتطبيـق إعدادات الوكالة الجديدة 🚀
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Projects Management */}
            {activeTab === 'projects' && <AdminProjectsManager />}

          </div>
        )}

        {/* Modal for Resetting Visitor Counter (Security Passcode: kb9382) */}
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border-2 border-rose-500/40 p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <ShieldAlert className="w-5 h-5" />
                  <h4 className="font-black text-white text-base">تصفير عداد الزوار والعملاء</h4>
                </div>
                <button onClick={() => setShowResetModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                  لحماية البيانات، يتطلب تصفير العداد إدخال رمز المرور الأمني المصرح به لإدارة الوكالة:
                </p>
              </div>

              {resetSuccessMsg ? (
                <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center">
                  {resetSuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleConfirmResetCounter} className="space-y-4">
                  <div className="space-y-1">
                    <input
                      type="text"
                      required
                      value={resetCodeInput}
                      onChange={(e) => {
                        setResetCodeInput(e.target.value);
                        setResetError('');
                      }}
                      placeholder="أدخل رمز التصفير (kb9382)..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-center text-sm focus:outline-none focus:border-rose-400"
                    />
                  </div>

                  {resetError && (
                    <p className="text-xs font-bold text-rose-400 text-center">{resetError}</p>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowResetModal(false)}
                      className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md transition-all active:scale-98"
                    >
                      تأكيد التصفير 🔄
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Modal For Adding Manual Client */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-black text-white text-base">إضافة عميل / طلب يدوي جديد</h4>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddClientSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">اسم العميل:</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="اسم العميل"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">رقم الهاتف / الواتساب:</label>
                  <input
                    type="tel"
                    required
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    placeholder="011XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">الخدمة المطلوبة:</label>
                  <select
                    value={newClientService}
                    onChange={(e) => setNewClientService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                  >
                    <option value="موشن جرافيك 🎬">موشن جرافيك 🎬</option>
                    <option value="تصميم منيوهات 🍽️">تصميم منيوهات 🍽️</option>
                    <option value="هوية بصرية متكاملة 🏷️">هوية بصرية متكاملة 🏷️</option>
                    <option value="إدارة سوشيال ميديا 📲">إدارة سوشيال ميديا 📲</option>
                    <option value="بوسترات إعلانية 🖼️">بوسترات إعلانية 🖼️</option>
                    <option value="كيو آر كود مخصص 📱">كيو آر كود مخصص 📱</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">ملاحظات / اتفاقات (اختياري):</label>
                  <textarea
                    rows={2}
                    value={newClientNotes}
                    onChange={(e) => setNewClientNotes(e.target.value)}
                    placeholder="ملاحظات العميل أو الاتفاق اليدوي..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md"
                >
                  إضافة الطلب لقائمة العملاء 🚀
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

