import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  X, 
  Download, 
  CheckCircle, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  MapPin, 
  HardDrive, 
  Terminal, 
  ExternalLink,
  HelpCircle,
  Share2
} from 'lucide-react';
import { Capacitor } from '@capacitor/core';

interface AndroidModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt?: any;
}

export const AndroidModal: React.FC<AndroidModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt
}) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'install' | 'apk' | 'features'>('install');
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'installed'>('idle');

  const isNative = Capacitor.isNativePlatform();
  const isAndroid = /Android/i.test(navigator.userAgent);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        setInstallStatus('installing');
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setInstallStatus('installed');
        } else {
          setInstallStatus('idle');
        }
      } catch (err) {
        console.error('Install prompt error:', err);
        setInstallStatus('idle');
      }
    } else {
      alert("لتثبيت التطبيق على جهاز أندرويد:\n1. اضغط على قائمة الخيارات (⋮) أعلى متصفح Chrome.\n2. اختر 'تثبيت التطبيق' أو 'إضافة إلى الشاشة الرئيسية' (Add to Home Screen).");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="android-modal-backdrop"
        className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
        dir="rtl"
      >
        <motion.div 
          id="android-modal-card"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25 }}
          className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden text-neutral-100 flex flex-col my-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-green-900 to-neutral-900 p-4 sm:p-5 border-b border-green-700/40 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
                <Smartphone size={24} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  تطبيق زون للأندرويد (Android)
                  <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Capacitor Native
                  </span>
                </h3>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  معرّف الحزمة: com.zoon.agri.app • الإصدار 1.1
                </p>
              </div>
            </div>

            <button 
              id="android-modal-close-btn"
              onClick={onClose}
              className="p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-800 bg-neutral-950/60 px-4 pt-2 gap-2 text-xs sm:text-sm font-medium">
            <button
              id="tab-install-btn"
              onClick={() => setActiveTab('install')}
              className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'install' 
                  ? 'border-emerald-500 text-emerald-400 font-bold' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Download size={15} />
              <span>التثبيت على الهاتف</span>
            </button>

            <button
              id="tab-apk-btn"
              onClick={() => setActiveTab('apk')}
              className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'apk' 
                  ? 'border-emerald-500 text-emerald-400 font-bold' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Terminal size={15} />
              <span>بناء حزمة APK / AAB</span>
            </button>

            <button
              id="tab-features-btn"
              onClick={() => setActiveTab('features')}
              className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'features' 
                  ? 'border-emerald-500 text-emerald-400 font-bold' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <ShieldCheck size={15} />
              <span>ميزات أندرويد الأصلية</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-sm">
            {/* Tab 1: Install on Mobile */}
            {activeTab === 'install' && (
              <div className="space-y-4">
                {isNative ? (
                  <div className="bg-emerald-950/40 border border-emerald-600/40 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-emerald-300">التطبيق يعمل بالفعل داخل بيئة أندرويد الأصلية!</h4>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                        تطبيق زون مدمج بالكامل مع واجهات النظام البرمجية (Capacitor Android Native Bridge) بما يشمل الكاميرا، الموقع الجغرافي، وزر الرجوع الفعلي.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-emerald-900/30 to-neutral-800/40 border border-emerald-500/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="text-amber-400" size={18} />
                        <span className="font-bold text-white">تثبيت فوري على أجهزة أندرويد (WebAPK)</span>
                      </div>
                      <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
                        {isAndroid ? 'جهاز أندرويد متصل' : 'يدعم جميع أجهزة أندرويد'}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      يمكنك تثبيت تطبيق زون مباشرة كأيقونة مستقلة على شاشة هاتفك مع شاشة البداية الكاملة وعمل التطبيق دون شريط المتصفح، مع دعم العمل في وضع عدم الاتصال.
                    </p>

                    <button
                      id="direct-install-android-btn"
                      onClick={handleInstallClick}
                      className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    >
                      <Download size={18} />
                      <span>{installStatus === 'installed' ? 'تم التثبيت بنجاح!' : 'تثبيت التطبيق على هاتف أندرويد الآن'}</span>
                    </button>
                  </div>
                )}

                {/* Manual Android Chrome Instructions */}
                <div className="bg-neutral-800/50 border border-neutral-700/60 rounded-xl p-4 space-y-2.5">
                  <h4 className="font-semibold text-neutral-200 text-xs flex items-center gap-1.5">
                    <HelpCircle size={15} className="text-emerald-400" />
                    <span>طريقة التثبيت اليدوي عبر متصفح Chrome على الهاتف:</span>
                  </h4>
                  <ol className="text-xs text-neutral-300 space-y-1.5 pr-4 list-decimal marker:text-emerald-400">
                    <li>افتح رابط التطبيق عبر متصفح <strong>Google Chrome</strong> على هاتف أندرويد.</li>
                    <li>اضغط على زر القائمة المكون من 3 نقاط (<strong>⋮</strong>) في أعلى الزاوية.</li>
                    <li>اختر <strong>«تثبيت التطبيق» (Install App)</strong> أو <strong>«إضافة إلى الشاشة الرئيسية»</strong>.</li>
                    <li>سيظهر التطبيق كأيقونة أصلية في قائمة تطبيقات هاتفك مثل أي تطبيق تم تنزيله من Google Play.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Tab 2: Build APK / AAB */}
            {activeTab === 'apk' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  مشروع أندرويد مجهّز بالكامل داخل مجلد <code className="text-emerald-400 font-mono bg-neutral-800 px-1 py-0.5 rounded">/android</code> وجاهز للبناء والتصدير بصيغة APK أو AAB.
                </p>

                {/* Commands */}
                <div className="space-y-2.5">
                  <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono text-neutral-400">1. مزامنة أصول الويب مع مشروع أندرويد:</span>
                      <button 
                        onClick={() => copyToClipboard('npm run android:build', 'sync')}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        {copiedCmd === 'sync' ? <CheckCircle size={13} /> : <Copy size={13} />}
                        <span>{copiedCmd === 'sync' ? 'تم النسخ' : 'نسخ'}</span>
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-emerald-300 bg-neutral-900/90 p-2 rounded border border-neutral-800 overflow-x-auto text-left" dir="ltr">
npm run android:build
                    </pre>
                  </div>

                  <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono text-neutral-400">2. بناء حزمة أندرويد المباشرة (Debug APK):</span>
                      <button 
                        onClick={() => copyToClipboard('cd android && ./gradlew assembleDebug', 'debug')}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        {copiedCmd === 'debug' ? <CheckCircle size={13} /> : <Copy size={13} />}
                        <span>{copiedCmd === 'debug' ? 'تم النسخ' : 'نسخ'}</span>
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-emerald-300 bg-neutral-900/90 p-2 rounded border border-neutral-800 overflow-x-auto text-left" dir="ltr">
cd android && ./gradlew assembleDebug
                    </pre>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      مسار الملف الناتج: <code className="text-neutral-300 font-mono">android/app/build/outputs/apk/debug/app-debug.apk</code>
                    </p>
                  </div>

                  <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono text-neutral-400">3. بناء حزمة متجر جوجل بلاي الموقعة (Release AAB):</span>
                      <button 
                        onClick={() => copyToClipboard('cd android && ./gradlew bundleRelease', 'release')}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        {copiedCmd === 'release' ? <CheckCircle size={13} /> : <Copy size={13} />}
                        <span>{copiedCmd === 'release' ? 'تم النسخ' : 'نسخ'}</span>
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-emerald-300 bg-neutral-900/90 p-2 rounded border border-neutral-800 overflow-x-auto text-left" dir="ltr">
cd android && ./gradlew bundleRelease
                    </pre>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      المفتاح الرقمي مدمج مسبقاً في <code className="text-neutral-300 font-mono">release-key.jks</code> بكلمة مرور <code className="text-neutral-300 font-mono">zone2026</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Native Features */}
            {activeTab === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-neutral-800/60 border border-neutral-700/50 rounded-xl p-3 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Camera size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">كاميرا أندرويد الأصلية</h5>
                    <p className="text-[11px] text-neutral-300 mt-0.5">
                      التقاط فوري للشتول والأوراق للتشخيص المخبري عبر طبيب زون الذكي.
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-800/60 border border-neutral-700/50 rounded-xl p-3 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">نظام تحديد المواقع GPS</h5>
                    <p className="text-[11px] text-neutral-300 mt-0.5">
                      تحديد إحداثيات المشاتل ومواقع تسليم الطلبيات بدقة عبر نظام أندرويد.
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-800/60 border border-neutral-700/50 rounded-xl p-3 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <HardDrive size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">تخزين محلي دون إنترنت</h5>
                    <p className="text-[11px] text-neutral-300 mt-0.5">
                      حفظ السلة وبيانات الأصناف في IndexedDB و Capacitor Storage للعمل دون شبكة.
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-800/60 border border-neutral-700/50 rounded-xl p-3 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">زر الرجوع الفعلي</h5>
                    <p className="text-[11px] text-neutral-300 mt-0.5">
                      استجابة ذكية لزر الرجوع ونوافذ الحوار والتنقل السلس عبر App.addListener.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-neutral-950 p-3 sm:p-4 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">
              زون للخدمات الزراعية • جاهز للعمل على أندرويد
            </span>
            <button
              id="android-modal-done-btn"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
