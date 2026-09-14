import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Sparkles, Download, Copy, Check, Send, Palette, Link as LinkIcon, RefreshCw } from 'lucide-react';

interface InteractiveQrStudioProps {
  onRequestCustomQr: (urlValue: string) => void;
}

export const InteractiveQrStudio: React.FC<InteractiveQrStudioProps> = ({ onRequestCustomQr }) => {
  const [url, setUrl] = useState('https://khaled-bro.com/menu');
  const [fgColor, setFgColor] = useState('#d97706');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [includeLogo, setIncludeLogo] = useState(true);
  const [copied, setCopied] = useState(false);

  const presets = [
    { label: 'ذهبي فاخر (كافيهات ومطاعم)', fg: '#d97706', bg: '#ffffff' },
    { label: 'أزرق عصري (سوشيال ميديا)', fg: '#0284c7', bg: '#ffffff' },
    { label: 'زمردي راقي (محلات وعيادات)', fg: '#059669', bg: '#ffffff' },
    { label: 'أرجواني ملكي (صالونات وموضة)', fg: '#7c3aed', bg: '#ffffff' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSVG = () => {
    const svgElement = document.getElementById('studio-qr-svg');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `KhaledBro-Custom-QR.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <section id="qr-studio" className="py-24 bg-white relative overflow-hidden border-t border-b border-slate-200">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-sm font-bold">
            <QrCode className="w-4 h-4 text-sky-700" />
            <span>📱 استوديو تجربة QR Code المخصص</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
            جرب بنفسك تصاميم <span className="gradient-text-cyan">الكيو آر كود المبتكرة</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-semibold">
            ادخل رابط المنيو أو صفحتك وشوف كيف يتحول الـ QR المعتاد لكود مميز يجذب زباينك لمسحه فورا!
          </p>
        </div>

        {/* Studio Box */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-slate-200 bg-slate-50 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xl">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Input URL */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-sky-600" />
                <span>الرابط أو النص المراد ربطه بالـ QR:</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-menu-or-page.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-sky-500 transition-colors pl-12 shadow-sm font-bold"
                  dir="ltr"
                />
                <button
                  onClick={handleCopyLink}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-900"
                  title="نسخ الرابط"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Presets Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-600" />
                <span>اختر ثيم ألوان جاهز:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setFgColor(preset.fg);
                      setBgColor(preset.bg);
                    }}
                    className="p-3 rounded-xl bg-white border border-slate-300 hover:border-sky-500 text-right space-y-1 text-xs transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: preset.fg }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: preset.bg }} />
                    </div>
                    <div className="text-[11px] font-bold text-slate-900 truncate">{preset.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">لون النقاط (Foreground):</label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-300 shadow-sm">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-900 font-bold uppercase">{fgColor}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">لون الخلفية (Background):</label>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-300 shadow-sm">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-900 font-bold uppercase">{bgColor}</span>
                </div>
              </div>
            </div>

            {/* Logo Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-300 shadow-sm">
              <span className="text-xs font-bold text-slate-900">دمج شعار Khaled Bro في منتصف الكود</span>
              <button
                onClick={() => setIncludeLogo(!includeLogo)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${includeLogo ? 'bg-amber-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${includeLogo ? 'translate-x-0' : '-translate-x-6'}`} />
              </button>
            </div>

            {/* Call To Action */}
            <div className="pt-2">
              <button
                id="request-custom-designer-qr-btn"
                onClick={() => onRequestCustomQr(url)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-base shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <Send className="w-5 h-5" />
                <span>اطلب من خالد تصميمه بهوية براندك الفريدة 🚀</span>
              </button>
            </div>

          </div>

          {/* QR Display Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-md space-y-6">
            <div className="p-6 rounded-2xl shadow-xl transition-transform hover:scale-105 duration-300 border border-slate-200" style={{ backgroundColor: bgColor }}>
              <QRCodeSVG
                id="studio-qr-svg"
                value={url || 'https://khaled-bro.com'}
                size={220}
                fgColor={fgColor}
                bgColor={bgColor}
                level="H"
                imageSettings={
                  includeLogo
                    ? {
                        src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="%23f59e0b"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="20" fill="%230f172a">KB</text></svg>',
                        x: undefined,
                        y: undefined,
                        height: 40,
                        width: 40,
                        excavate: true,
                      }
                    : undefined
                }
              />
            </div>

            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-slate-900">معاينة مباشرة للتفاعل ⚡</div>
              <div className="text-[11px] text-slate-600 font-semibold">جرب امسح الكود بكاميرا الموبايل دلوقتي!</div>
            </div>

            <button
              id="download-preview-qr-btn"
              onClick={downloadSVG}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>تحميل العينة بصيغة SVG</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
