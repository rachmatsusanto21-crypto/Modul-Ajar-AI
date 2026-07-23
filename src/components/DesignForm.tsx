import { useState } from "react";
import { LearningDesign } from "../types";
import { 
  Sparkles, Save, CircleStop, RefreshCw, Layers, Crosshair, HelpCircle, CheckCircle2, AlertCircle, Loader2, Wifi
} from "lucide-react";

interface DesignFormProps {
  design: LearningDesign;
  onChangeDesign: (fields: Partial<LearningDesign>) => void;
  onGenerate: () => void;
  onStopGenerate: () => void;
  onSaveDraft: () => void;
  generating: boolean;
  onGenerateCP?: () => void;
  onGenerateElemen?: () => void;
  generatingCP?: boolean;
  generatingElemen?: boolean;
  theme: "light" | "dark";
  selectedProvider: string;
  setSelectedProvider: (provider: string) => void;
  currentUserEmail?: string;
  customApiKey: string;
  onChangeCustomApiKey: (key: string) => void;
  geminiActive?: boolean | null;
}

export default function DesignForm({
  design,
  onChangeDesign,
  onGenerate,
  onStopGenerate,
  onSaveDraft,
  generating,
  onGenerateCP,
  onGenerateElemen,
  generatingCP = false,
  generatingElemen = false,
  theme,
  selectedProvider,
  setSelectedProvider,
  currentUserEmail,
  customApiKey,
  onChangeCustomApiKey,
  geminiActive = null
}: DesignFormProps) {
  const [testingApi, setTestingApi] = useState(false);
  const [testResult, setTestResult] = useState<{
    connected?: boolean;
    hasKey?: boolean;
    reason?: string;
    model?: string;
    message?: string;
    rawError?: string;
  } | null>(null);

  const handleTestConnection = async () => {
    setTestingApi(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/gemini/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customApiKey })
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({
        connected: false,
        message: "Gagal menghubungi endpoint tes server. Pastikan aplikasi berjalan."
      });
    } finally {
      setTestingApi(false);
    }
  };

  const cardBg = theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200/80 shadow-sm";
  const labelColor = theme === "dark" ? "text-slate-300" : "text-slate-600";
  const inputBg = theme === "dark" ? "bg-slate-950/40 border-slate-800 text-slate-100" : "bg-slate-50/50 border-slate-200 text-slate-800";

  // Pre-fill suggestions to save teacher's effort!
  const applyPedagogyTemplate = (subjectName: string) => {
    onChangeDesign({
      capaianPembelajaran: "Peserta didik mampu mengidentifikasi dan merancang pemecahan masalah kontekstual melalui pilar berpikir kritis.",
      elemenCapaian: "Pemahaman Konsep & Keterampilan Proses Berkelanjutan.",
      tujuanPembelajaran: "Siswa secara mandiri dan kelompok dapat menganalisis hubungan sebab-akibat fenomena nyata serta merancang kesimpulan yang logis.",
      materiPokok: "Aplikasi Siklus Keseimbangan Alam dalam Ekosistem.",
      caraPenilaian: "Penilaian Sikap (Observasi), Penilaian Keterampilan (Presentasi Projek Kelompok), dan Penilaian Kognitif (Kuis Pilihan Ganda & Isian).",
      mediaBelajar: "Benda asli sekitar, LCD Proyektor, Kartu Isian Bergambar, Simulasi Interaktif Phet.",
      sumberBelajar: "Buku Paket Kemendikbud, Jurnal Pendidikan Indonesia Terbuka, Portal Pembelajaran Digital.",
      promptKegiatan: "Lakukan demonstrasi interaktif virtual menggunakan Phet, kemudian berikan lembar kerja kelompok (LKPD) kolaboratif berdurasi 30 menit."
    });
  };

  const aiProviders = [
    { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash (Gratis - Rekomendasi Prompt Rumit)" },
    { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet (Gratis - Analisis Kompleks)" },
    { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (Gratis)" },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash (Gratis)" },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro (Berbayar/Quota)" },
    { id: "deepseek-r1-free", name: "DeepSeek R1 (Gratis - Cadangan)" },
    { id: "llama3-free", name: "Meta Llama 3 (Gratis - Cadangan)" }
  ];

  return (
    <div className={`p-5 rounded-2xl border ${cardBg} backdrop-blur-sm transition-all space-y-5`}>
      
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3 border-blue-500/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-500/10 text-blue-600 rounded-lg">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
              Penyusunan Rencana & Parameter AI
            </h3>
            <p className="text-[10px] text-slate-400">Atur kurikulum pembelajaran dan pilih model AI gratis</p>
          </div>
        </div>

        {/* Template Fill Button */}
        <button
          type="button"
          onClick={() => applyPedagogyTemplate("IPA")}
          className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 py-1.5 px-3 rounded-lg border border-blue-500/20 transition-all cursor-pointer"
        >
          Isi Template Contoh Cepat
        </button>
      </div>

      {/* Main Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Capaian Pembelajaran */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`text-[11px] font-bold ${labelColor}`}>Capaian Pembelajaran (CP)</label>
            <button
              type="button"
              onClick={onGenerateCP}
              disabled={generatingCP}
              className={`flex items-center gap-1 text-[10px] font-bold py-0.5 px-2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 active:scale-95 transition-all cursor-pointer border border-blue-500/20 disabled:opacity-50`}
            >
              <Sparkles size={10} className={generatingCP ? "animate-spin" : ""} />
              {generatingCP ? "Mencari CP..." : "Generate CP"}
            </button>
          </div>
          <textarea
            rows={2}
            value={design.capaianPembelajaran}
            onChange={(e) => onChangeDesign({ capaianPembelajaran: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
            placeholder="Ketik capaian kompetensi minimum siswa..."
          />
        </div>

        {/* Elemen Capaian */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`text-[11px] font-bold ${labelColor}`}>Elemen Capaian Pembelajaran</label>
            <button
              type="button"
              onClick={onGenerateElemen}
              disabled={generatingElemen}
              className={`flex items-center gap-1 text-[10px] font-bold py-0.5 px-2 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 active:scale-95 transition-all cursor-pointer border border-teal-500/20 disabled:opacity-50`}
            >
              <Sparkles size={10} className={generatingElemen ? "animate-spin" : ""} />
              {generatingElemen ? "Mencari Elemen..." : "Generate Elemen"}
            </button>
          </div>
          <textarea
            rows={2}
            value={design.elemenCapaian}
            onChange={(e) => onChangeDesign({ elemenCapaian: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
            placeholder="e.g. Pemahaman Sains, Keterampilan Proses, Literasi..."
          />
        </div>

        {/* Tujuan Pembelajaran */}
        <div>
          <label className={`block text-[11px] font-bold ${labelColor} mb-1.5`}>Tujuan Pembelajaran (Spesifik & Terukur)</label>
          <textarea
            rows={2}
            value={design.tujuanPembelajaran}
            onChange={(e) => onChangeDesign({ tujuanPembelajaran: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
            placeholder="e.g. Siswa dapat mendemonstrasikan kelestarian lingkungan hidup..."
          />
        </div>

        {/* Materi Pokok */}
        <div>
          <label className={`block text-[11px] font-bold ${labelColor} mb-1.5`}>Materi Pokok / Bahasan Utama</label>
          <textarea
            rows={2}
            value={design.materiPokok}
            onChange={(e) => onChangeDesign({ materiPokok: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border font-semibold ${inputBg}`}
            placeholder="e.g. Pengenalan ekosistem biotik dan abiotik"
          />
        </div>

        {/* Cara Penilaian & Pendekatan */}
        <div>
          <label className={`block text-[11px] font-bold ${labelColor} mb-1.5`}>Pendekatan Pembelajaran (Manual)</label>
          <input
            type="text"
            value={design.pendekatan}
            onChange={(e) => onChangeDesign({ pendekatan: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
            placeholder="e.g. deep learning, STEM, Kombinasi Tematik..."
          />
        </div>

        {/* Model Pembelajaran */}
        <div>
          <label className={`block text-[11px] font-bold ${labelColor} mb-1.5`}>Model Pembelajaran (Sintaks Otomatis)</label>
          <select
            value={design.modelPembelajaran}
            onChange={(e) => onChangeDesign({ modelPembelajaran: e.target.value as any })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
          >
            <option value="PjBL">Project Based Learning (PjBL) - Kreativitas & Produk</option>
            <option value="PBL">Problem Based Learning (PBL) - Investigasi Kasus</option>
            <option value="Discovery">Discovery Learning - Pembuktian Mandiri</option>
            <option value="Inquiry">Inquiry Learning - Perumusan Hipotesis</option>
          </select>
        </div>

        {/* Media & Sumber Belajar */}
        <div>
          <label className={`block text-[11px] font-bold ${labelColor} mb-1.5`}>Media Belajar</label>
          <input
            type="text"
            value={design.mediaBelajar}
            onChange={(e) => onChangeDesign({ mediaBelajar: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
            placeholder="e.g. Slide PPT, Video Interaktif, Benda Asli, Flashcard..."
          />
        </div>

        <div>
          <label className={`block text-[11px] font-bold ${labelColor} mb-1.5`}>Sumber Belajar & Referensi</label>
          <input
            type="text"
            value={design.sumberBelajar}
            onChange={(e) => onChangeDesign({ sumberBelajar: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
            placeholder="e.g. Buku Siswa Kemdikbud Kelas IV, Jurnal Ilmiah SAGE..."
          />
        </div>

        {/* Cara Penilaian */}
        <div className="md:col-span-2">
          <label className={`block text-[11px] font-bold ${labelColor} mb-1.5`}>Cara Penilaian & Rincian Evaluasi</label>
          <input
            type="text"
            value={design.caraPenilaian}
            onChange={(e) => onChangeDesign({ caraPenilaian: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
            placeholder="e.g. Rubrik unjuk kerja praktikum kelompok, kuis formatif di akhir pembelajaran"
          />
        </div>

        {/* Prompt Kegiatan Belajar */}
        <div className="md:col-span-2">
          <label className={`block text-[11px] font-bold ${labelColor} mb-1.5`}>Prompt Kustom Kegiatan Belajar (Untuk Hasil Presisi)</label>
          <textarea
            rows={2}
            value={design.promptKegiatan}
            onChange={(e) => onChangeDesign({ promptKegiatan: e.target.value })}
            className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
            placeholder="e.g. Rancang kegiatan inti kelompok membuat poster dari bahan daur ulang, dengan sintaks kelompok heterogen..."
          />
        </div>
      </div>

      {/* AI Services & Gen Buttons */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        theme === "dark" ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-200"
      }`}>
        {/* Service Provider selection */}
        <div className="flex-1 w-full sm:w-auto">
          <label className="block text-[10px] font-bold text-slate-400 mb-1">
            Penyedia Layanan AI (Auto-switch Aktif)
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className={`w-full sm:w-60 px-2 py-1.5 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border ${
                theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              {aiProviders.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            
            {currentUserEmail && (
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2.5 py-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Penyimpanan Google Drive Terhubung: <strong>{currentUserEmail}</strong></span>
              </div>
            )}
          </div>

          {/* Gemini API Status Indicator */}
          <div className={`mt-2.5 flex items-center gap-2 text-[10px] p-2 rounded-lg ${
            customApiKey || geminiActive
              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
          }`}>
            <Sparkles size={12} className={customApiKey || geminiActive ? "" : "animate-pulse"} />
            <span>
              <strong>Status Gemini AI:</strong>{" "}
              {customApiKey 
                ? "Aktif (Menggunakan API Key Kustom Anda)" 
                : geminiActive 
                  ? "Aktif (Menggunakan Kunci API Server)" 
                  : "Mode Simulasi Sinkronisasi Aktif (Kunci API Belum Disetel)"
              }
            </span>
          </div>

          {/* Custom Gemini API Key Input */}
          <div className="mt-3.5 max-w-lg">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[9px] font-bold text-slate-400">
                Kunci API Gemini Kustom (Dibutuhkan untuk Gemini AI Asli)
              </label>
              <a 
                href="https://aistudio.google.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[9px] text-blue-500 dark:text-blue-400 hover:underline font-bold"
              >
                Buat API Key Gratis Baru →
              </a>
            </div>
            <div className="relative flex items-center">
              <input
                type="password"
                value={customApiKey}
                onChange={(e) => onChangeCustomApiKey(e.target.value)}
                placeholder="Masukkan API Key Gemini Anda di sini (dimulai dengan AIzaSy...)"
                className={`w-full px-2.5 py-1.5 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 border ${
                  theme === "dark"
                    ? "bg-slate-900/80 border-slate-800 text-slate-100 placeholder-slate-600"
                    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 shadow-sm"
                }`}
              />
              {customApiKey && (
                <span className="absolute right-2.5 text-[9px] font-bold text-teal-500">
                  Kunci Aktif ✓
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testingApi}
                className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {testingApi ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Wifi size={12} />
                )}
                {testingApi ? "Memeriksa Koneksi Google..." : "Uji Koneksi Gemini AI Live"}
              </button>
            </div>

            {testResult && (
              <div className={`mt-2.5 p-3 rounded-xl border text-xs space-y-1.5 ${
                testResult.connected
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                  : testResult.reason === "QUOTA_EXCEEDED"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
              }`}>
                <div className="flex items-start gap-2">
                  {testResult.connected ? (
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className={testResult.reason === "QUOTA_EXCEEDED" ? "text-amber-500 shrink-0 mt-0.5" : "text-rose-500 shrink-0 mt-0.5"} />
                  )}
                  <div className="space-y-1">
                    <p className="font-bold text-[11px] leading-tight">
                      {testResult.message}
                    </p>
                    {testResult.reason === "QUOTA_EXCEEDED" && (
                      <p className="text-[10px] leading-normal opacity-90">
                        <strong>💡 Solusi Kuota Exceeded (HTTP 429):</strong> Kunci API terverifikasi valid, namun kuota gratis Google Gemini untuk kunci/proyek ini telah mencapai batas harian (Requests Per Day = 0). Silakan buat API Key baru gratis di <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="underline font-bold">aistudio.google.com</a> dengan akun Google pribadi/lain, atau tunggu reset kuota harian dari Google.
                      </p>
                    )}
                    {testResult.reason === "INVALID_API_KEY" && (
                      <p className="text-[10px] leading-normal opacity-90">
                        <strong>💡 Solusi API Key Invalid:</strong> Pastikan Anda menyalin Kunci API dari Google AI Studio secara utuh tanpa ada karakter yang terpotong.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <p className="text-[9.5px] text-slate-500 dark:text-slate-400 mt-1.5 font-sans leading-relaxed">
              <strong>💡 Panduan Akses:</strong> Akun email belajar.id ({currentUserEmail || "rachmatsusanto21"}) Anda terhubung untuk sinkronisasi berkas otomatis ke Google Drive & Google Docs Anda. Untuk menggunakan kecerdasan Gemini AI asli (non-simulasi), silakan masukkan <strong>Kunci API Gemini</strong> di atas, atau minta Admin Sekolah Anda untuk menyetel variabel sistem <code>GEMINI_API_KEY</code> di server.
            </p>
          </div>
        </div>

        {/* Generate / Stop / Save Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Save draft */}
          <button
            type="button"
            onClick={onSaveDraft}
            className={`flex items-center justify-center gap-1.5 py-2 px-3.5 text-xs font-bold rounded-xl border hover:scale-102 transition-all cursor-pointer ${
              theme === "dark" 
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200" 
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm"
            }`}
          >
            <Save size={13} />
            Simpan Draft Isian
          </button>

          {/* Action toggle */}
          {generating ? (
            <button
              type="button"
              onClick={onStopGenerate}
              className="flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-bold rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-all hover:scale-102 cursor-pointer shadow-md shadow-rose-500/15"
            >
              <CircleStop size={13} className="animate-spin" />
              Hentikan Generate
            </button>
          ) : (
            <button
              type="button"
              onClick={onGenerate}
              className="flex items-center justify-center gap-1.5 py-2 px-5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all hover:scale-102 cursor-pointer shadow-md shadow-blue-500/20"
            >
              <Sparkles size={13} />
              Generate Modul AI
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
