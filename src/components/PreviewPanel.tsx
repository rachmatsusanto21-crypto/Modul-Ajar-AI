import { GeneratedModule } from "../types";
import { 
  Printer, FileText, Download, Share2, Cloud, Check, CheckCircle2, Award, Calendar, BookOpen
} from "lucide-react";

interface PreviewPanelProps {
  module: GeneratedModule | null;
  onSaveToGoogleDocs: () => void;
  onDownloadFile: (type: "doc" | "pdf") => void;
  onPrint: () => void;
  googleDriveConnected: boolean;
  theme: "light" | "dark";
  savingToDocs: boolean;
  exportToThirdParty: () => void;
  exportingThirdParty: boolean;
  driveLogs: string[];
}

export default function PreviewPanel({
  module,
  onSaveToGoogleDocs,
  onDownloadFile,
  onPrint,
  googleDriveConnected,
  theme,
  savingToDocs,
  exportToThirdParty,
  exportingThirdParty,
  driveLogs
}: PreviewPanelProps) {
  if (!module) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-8 text-center rounded-2xl border ${
        theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-500 shadow-sm"
      }`}>
        <div className="w-16 h-16 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
          <BookOpen size={28} />
        </div>
        <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
          Belum Ada Modul Ajar Dibuat
        </h4>
        <p className="text-xs text-slate-400 max-w-sm">
          Isi profil sekolah, isi administrasi mata pelajaran, lalu klik tombol <span className="font-bold text-blue-600">Generate Modul AI</span> untuk melihat tampilan draf dokumen secara langsung di panel ini.
        </p>
      </div>
    );
  }

  const badgeStyle = "px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
  const sectionTitleStyle = "font-display font-bold text-xs text-blue-700 dark:text-blue-400 border-b border-blue-200 dark:border-slate-800 pb-1 mb-2 mt-4 uppercase tracking-wide";
  const subSectionTitleStyle = "font-sans font-bold text-xs text-slate-800 dark:text-slate-200 mb-1.5 mt-3.5 block";

  return (
    <div className="flex flex-col h-full space-y-4">
      
      {/* 1. TOP EXPORT ACTIONS BAR */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
        theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/80 shadow-sm"
      }`}>
        <div className="flex items-center gap-2">
          <div className="p-1 px-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-500/20 uppercase">
            Live Preview
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-xs">{module.title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Print */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
            title="Cetak langsung menggunakan printer"
          >
            <Printer size={13} />
            Cetak
          </button>

          {/* Download docx */}
          <button
            onClick={() => onDownloadFile("doc")}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 hover:bg-blue-100/50 dark:hover:bg-blue-900/50 transition-all cursor-pointer"
            title="Unduh dalam format .doc/.docx"
          >
            <Download size={13} />
            Unduh .docx
          </button>

          {/* Google Docs */}
          <button
            onClick={onSaveToGoogleDocs}
            disabled={savingToDocs}
            className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50"
            title="Simpan otomatis ke berkas Google Docs"
          >
            <Cloud size={13} className={savingToDocs ? "animate-spin" : ""} />
            {savingToDocs ? "Menyimpan..." : "Simpan di Google Docs"}
          </button>

          {/* Third party Integration API */}
          <button
            onClick={exportToThirdParty}
            disabled={exportingThirdParty}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer disabled:opacity-50"
            title="Integrasikan dengan API Layanan Pihak Ketiga"
          >
            <Share2 size={13} className={exportingThirdParty ? "animate-spin" : ""} />
            Integrasi API Mitra
          </button>
        </div>
      </div>

      {/* 2. REAL-TIME GOOGLE DRIVE LOGS SUB-SECTION */}
      {driveLogs.length > 0 && (
        <div className={`p-3 rounded-xl border text-[11px] font-mono space-y-1 max-h-24 overflow-y-auto ${
          theme === "dark" ? "bg-slate-950/80 border-slate-800 text-blue-400" : "bg-blue-50/50 border-blue-100 text-blue-800"
        }`}>
          <div className="font-bold flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
            <CheckCircle2 size={12} /> Status Sinkronisasi Google Drive:
          </div>
          {driveLogs.map((log, index) => (
            <div key={index} className="pl-3.5">• {log}</div>
          ))}
        </div>
      )}

      {/* 3. SCROLLABLE GENERATED RPP PREVIEW PAPER */}
      <div className={`flex-1 overflow-y-auto p-6 md:p-8 rounded-2xl border transition-all ${
        theme === "dark" 
          ? "bg-slate-950/90 border-slate-800 text-slate-200" 
          : "bg-white border-slate-200 text-slate-800 shadow-lg"
      }`} id="printable-rpp-container" style={{ fontFamily: "Inter, sans-serif" }}>
        
        {/* Document Border Frame */}
        <div className="border border-slate-300 dark:border-slate-800 p-6 rounded-xl space-y-5">
          
          {/* School Identity Header Box */}
          <div className="border-b-4 border-double border-slate-400 dark:border-slate-700 pb-4 text-center">
            <h2 className="font-display font-bold text-base md:text-lg uppercase tracking-wide">
              RENCANA PELAKSANAAN PEMBELAJARAN (RPP) / MODUL AJAR
            </h2>
            <h3 className="font-display font-semibold text-xs md:text-sm text-slate-400 mt-0.5">
              {module.school.namaSekolah} | KURIKULUM: {module.school.kurikulum}
            </h3>

            {/* Structured Table for Profile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-left mt-4 text-[11px] border-t pt-3 border-slate-200 dark:border-slate-800 font-sans">
              <div><span className="font-bold">Jenjang:</span> {module.school.jenjang}</div>
              <div><span className="font-bold">Fase:</span> {module.school.fase}</div>
              <div><span className="font-bold">Kelas/Paralel:</span> {module.school.kelas} - {module.school.paralel}</div>
              <div><span className="font-bold">Semester:</span> {module.school.semester}</div>
              <div><span className="font-bold">Nama Guru:</span> {module.school.namaGuru}</div>
              <div><span className="font-bold">NIP:</span> {module.school.nipGuru}</div>
              <div><span className="font-bold">Thn Pelajaran:</span> {module.school.tahunPelajaran}</div>
              <div><span className="font-bold">Siswa:</span> {module.school.jumlahSiswa} Peserta Didik</div>
            </div>
          </div>

          {/* A. IDENTIFIKASI KARAKTERISTIK PESERTA DIDIK (Optional) */}
          <div>
            <h4 className={sectionTitleStyle}>
              A. Identifikasi Karakteristik Peserta Didik & Analisis Materi
            </h4>
            
            {module.karakteristikSiswa && (
              <div className="mb-3.5 pl-3.5 border-l-2 border-emerald-500">
                <span className={subSectionTitleStyle}>Karakteristik & Gaya Belajar Siswa (Kebutuhan Khusus):</span>
                <p className="text-xs leading-relaxed text-slate-400 mt-1">{module.karakteristikSiswa}</p>
              </div>
            )}

            {module.analisisMateri && (
              <div className="pl-3.5 border-l-2 border-indigo-500">
                <span className={subSectionTitleStyle}>Analisis Materi Pelajaran & Prasyarat Kognitif:</span>
                <p className="text-xs leading-relaxed text-slate-400 mt-1">{module.analisisMateri}</p>
              </div>
            )}

            {/* Dimensi Profil Lulusan */}
            <div className="mt-4">
              <span className={subSectionTitleStyle}>Dimensi Profil Pelajar Pancasila:</span>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 mt-1 pl-1">
                {module.dimensiProfilLulusan.map((ppp, i) => (
                  <li key={i}>{ppp}</li>
                ))}
              </ul>
            </div>

            {/* 7 KAIH for Co-curricular/Integrative */}
            {module.kaih7 && (
              <div className="mt-4 p-3 rounded-xl bg-teal-500/5 border border-teal-500/15">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wide block mb-1">
                  7 Karakter Akhlakul Karimah & Nilai Keutamaan (KAIH) Kokurikuler:
                </span>
                <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-1">
                  {module.kaih7.map((kaih, i) => (
                    <li key={i} className="text-slate-300">{kaih}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* B. DESAIN PEMBELAJARAN */}
          <div>
            <h4 className={sectionTitleStyle}>B. Desain Pembelajaran</h4>
            
            <div className="space-y-3 text-xs leading-relaxed text-slate-400 pl-2">
              <div>
                <span className="font-bold text-indigo-400 block mb-0.5">Tujuan Pembelajaran:</span>
                <p>{module.design.tujuanPembelajaran}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <span className="font-bold text-indigo-400 block mb-0.5">Praktik Pedagogis (Pendekatan):</span>
                  <p className="capitalize">{module.design.pendekatan} ({module.design.modelPembelajaran})</p>
                </div>
                <div>
                  <span className="font-bold text-indigo-400 block mb-0.5">Lingkungan Belajar:</span>
                  <p>Ruang Kelas, Blended, & Kolaborasi Lapangan</p>
                </div>
                <div>
                  <span className="font-bold text-indigo-400 block mb-0.5">Pemanfaatan Digital:</span>
                  <p>Phet Simulation, Geogebra, Slide Presentation Canva</p>
                </div>
              </div>
            </div>
          </div>

          {/* C. TABEL KEGIATAN BELAJAR */}
          <div>
            <h4 className={sectionTitleStyle}>C. Skenario & Langkah-Langkah Pembelajaran</h4>
            
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-[11px] border-collapse border border-slate-300 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900 font-bold">
                    <th className="border border-slate-300 dark:border-slate-800 p-2 w-20">Tahapan</th>
                    <th className="border border-slate-300 dark:border-slate-800 p-2 w-36">Sintaks Pembelajaran</th>
                    <th className="border border-slate-300 dark:border-slate-800 p-2">Rincian Kegiatan Guru & Murid</th>
                    <th className="border border-slate-300 dark:border-slate-800 p-2 w-20 text-center">Waktu</th>
                    <th className="border border-slate-300 dark:border-slate-800 p-2 w-28">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {module.kegiatanBelajar.map((kb, i) => (
                    <tr key={i} className="align-top">
                      <td className="border border-slate-300 dark:border-slate-800 p-2 font-bold text-indigo-400">{kb.tahapan}</td>
                      <td className="border border-slate-300 dark:border-slate-800 p-2 font-semibold text-slate-300">{kb.sintaks}</td>
                      <td className="border border-slate-300 dark:border-slate-800 p-2 text-slate-400 whitespace-pre-line leading-relaxed">{kb.kegiatan}</td>
                      <td className="border border-slate-300 dark:border-slate-800 p-2 text-center font-mono text-slate-300">{kb.alokasiWaktu}</td>
                      <td className="border border-slate-300 dark:border-slate-800 p-2 text-slate-400 italic">{kb.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* D. ASESMEN & MEDIA BELAJAR */}
          <div>
            <h4 className={sectionTitleStyle}>D. Media, Sumber Belajar, & Rubrik Asesmen</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-400">
              {/* Media & Sumber */}
              <div className="space-y-3">
                <div>
                  <span className="font-bold text-indigo-400 block mb-1">Media Hasil AI:</span>
                  <ul className="list-decimal list-inside pl-1 space-y-1">
                    {module.mediaDihasilkan.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-indigo-400 block mb-1">Sumber Belajar:</span>
                  <ul className="list-decimal list-inside pl-1 space-y-1">
                    {module.sumberDihasilkan.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              </div>

              {/* Asesmen */}
              <div className="space-y-3">
                <div>
                  <span className="font-bold text-indigo-400 block mb-0.5">Asesmen Formatif (Proses):</span>
                  <p>{module.asesmenFormatif}</p>
                </div>
                <div>
                  <span className="font-bold text-indigo-400 block mb-0.5">Asesmen Sumatif (Hasil):</span>
                  <p>{module.asesmenSumatif}</p>
                </div>
              </div>
            </div>

            {/* Glosarium */}
            <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-300 block mb-1 uppercase tracking-wider">Glosarium (Rujukan KBBI Resmi):</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-400">
                {module.glosarium.map((g, i) => (
                  <div key={i}>
                    <span className="font-bold text-teal-400">{g.istilah}: </span>
                    <span>{g.arti}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* E. KOLOM TANDA TANGAN */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <p>Mengetahui,</p>
                <p className="font-bold mt-1">Kepala Sekolah {module.school.namaSekolah},</p>
                <div className="h-16"></div>
                <p className="font-bold text-slate-200underline">{module.school.namaKepalaSekolah}</p>
                <p className="text-[10px] text-slate-400">NIP. {module.school.nipKepalaSekolah}</p>
              </div>

              <div className="text-right">
                <p>{module.school.namaKota}, {module.createdAt}</p>
                <p className="font-bold mt-1">Guru Kelas {module.school.kelas},</p>
                <div className="h-16"></div>
                <p className="font-bold text-slate-200 underline">{module.school.namaGuru}</p>
                <p className="text-[10px] text-slate-400">NIP. {module.school.nipGuru}</p>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* F. APPENDICES (LAMPIRAN 1 SAMPAI 10) */}
          {/* ======================================================= */}
          <div className="border-t-2 border-dashed border-slate-400 dark:border-slate-700 pt-6 mt-8 space-y-6">
            <h3 className="font-display font-bold text-base text-center text-teal-400 uppercase tracking-wide border-b-2 border-teal-500/10 pb-2">
              Daftar Lampiran Pengayaan Modul Ajar (10 Bagian)
            </h3>

            {/* Lampiran 1: LKPD */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 1: Lembar Kerja Peserta Didik (LKPD) Kelompok & Individu
              </span>
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <h5 className="font-bold text-teal-400 mb-1">Aktivitas Kelompok:</h5>
                <pre className="whitespace-pre-wrap font-sans pl-2 border-l border-slate-700">{module.lampiranLKPD.kegiatanKelompok}</pre>
                
                <h5 className="font-bold text-teal-400 mt-3 mb-1">Aktivitas Individu:</h5>
                <pre className="whitespace-pre-wrap font-sans pl-2 border-l border-slate-700">{module.lampiranLKPD.kegiatanIndividu}</pre>

                {module.lampiranLKPD.visualSuggestion && (
                  <div className="mt-4 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-[10px]">
                    <span className="font-bold text-emerald-400 block mb-1">💡 Saran Visualisasi Pendukung Materi:</span>
                    {module.lampiranLKPD.visualSuggestion}
                  </div>
                )}
              </div>
            </div>

            {/* Lampiran 2: Rubrik Penilaian */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 2: Lembar Penilaian Rubrik Penilaian Formatif & Sumatif
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px] border-collapse border border-slate-800">
                  <thead>
                    <tr className="bg-slate-900 font-bold">
                      <th className="border border-slate-800 p-1.5">Kriteria</th>
                      <th className="border border-slate-800 p-1.5">Indikator</th>
                      <th className="border border-slate-800 p-1.5">Sangat Baik (Skor 4)</th>
                      <th className="border border-slate-800 p-1.5">Baik (Skor 3)</th>
                      <th className="border border-slate-800 p-1.5">Cukup (Skor 2)</th>
                      <th className="border border-slate-800 p-1.5">Kurang (Skor 1)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-teal-500/5"><td colSpan={6} className="p-1.5 font-bold text-teal-400">Rubrik Formatif (Proses)</td></tr>
                    {module.lampiranRubrikPenilaian.formatif.map((r, i) => (
                      <tr key={i} className="align-top">
                        <td className="border border-slate-800 p-1.5 font-bold">{r.kriteria}</td>
                        <td className="border border-slate-800 p-1.5">{r.indikator}</td>
                        <td className="border border-slate-800 p-1.5">{r.skor4}</td>
                        <td className="border border-slate-800 p-1.5">{r.skor3}</td>
                        <td className="border border-slate-800 p-1.5">{r.skor2}</td>
                        <td className="border border-slate-800 p-1.5">{r.skor1}</td>
                      </tr>
                    ))}
                    <tr className="bg-indigo-500/5"><td colSpan={6} className="p-1.5 font-bold text-indigo-400">Rubrik Sumatif (Hasil Akhir)</td></tr>
                    {module.lampiranRubrikPenilaian.sumatif.map((r, i) => (
                      <tr key={i} className="align-top">
                        <td className="border border-slate-800 p-1.5 font-bold">{r.kriteria}</td>
                        <td className="border border-slate-800 p-1.5">{r.indikator}</td>
                        <td className="border border-slate-800 p-1.5">{r.skor4}</td>
                        <td className="border border-slate-800 p-1.5">{r.skor3}</td>
                        <td className="border border-slate-800 p-1.5">{r.skor2}</td>
                        <td className="border border-slate-800 p-1.5">{r.skor1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lampiran 3: Kisi-kisi Soal Sumatif */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 3: Kisi-kisi Soal Sumatif Lengkap Bloom-Anderson
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px] border-collapse border border-slate-800">
                  <thead>
                    <tr className="bg-slate-900 font-bold">
                      <th className="border border-slate-800 p-1.5 w-10 text-center">No</th>
                      <th className="border border-slate-800 p-1.5">Indikator Kisi-kisi</th>
                      <th className="border border-slate-800 p-1.5 w-24">Level Kognitif</th>
                      <th className="border border-slate-800 p-1.5 w-20">Jenis Soal</th>
                      <th className="border border-slate-800 p-1.5">Rincian Butir Soal</th>
                      <th className="border border-slate-800 p-1.5">Kunci Jawaban</th>
                      <th className="border border-slate-800 p-1.5 w-12 text-center">Poin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.lampiranKisiKisiSoal.map((k, i) => (
                      <tr key={i} className="align-top">
                        <td className="border border-slate-800 p-1.5 text-center font-bold">{k.nomorSoal}</td>
                        <td className="border border-slate-800 p-1.5">{k.indikator}</td>
                        <td className="border border-slate-800 p-1.5 text-indigo-400 font-medium">{k.levelKognitif}</td>
                        <td className="border border-slate-800 p-1.5">{k.jenisSoal}</td>
                        <td className="border border-slate-800 p-1.5 text-slate-300 font-semibold">{k.rincianSoal}</td>
                        <td className="border border-slate-800 p-1.5 font-mono text-[9px] text-emerald-400">{k.kunciJawaban}</td>
                        <td className="border border-slate-800 p-1.5 text-center font-bold">{k.poin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lampiran 4: Kartu Soal */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 4: Kartu Soal Asli Terbit
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {module.lampiranKartuSoal.map((card, i) => (
                  <div key={i} className="p-3 rounded-xl border border-slate-800 bg-slate-900/30 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                      <span className="font-bold text-teal-400">KARTU SOAL NO. {card.nomorSoal}</span>
                      <span className="text-[10px] text-slate-500">{card.kisiKisiRef}</span>
                    </div>
                    <p className="font-semibold text-slate-200 whitespace-pre-wrap">{card.soal}</p>
                    <div className="mt-3 pt-1.5 border-t border-slate-800/80 text-[11px]">
                      <span className="text-slate-500 font-bold">Kunci/Rubrik: </span>
                      <span className="text-emerald-400 font-mono">{card.kunci}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lampiran 5: Bentuk Cetak Soal */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 5: Bentuk Cetak Soal Siap Pakai
              </span>
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-xs font-mono text-slate-400 whitespace-pre-wrap leading-relaxed shadow-inner">
                {module.lampiranCetakSoal}
              </div>
            </div>

            {/* Lampiran 6: Lembar Umpan Balik */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 6: Lembar Umpan Balik / Refleksi Siswa
              </span>
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-xs text-slate-400 whitespace-pre-wrap leading-relaxed">
                {module.lampiranUmpanBalik}
              </div>
            </div>

            {/* Lampiran 7: Lembar Portofolio */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 7: Lembar Rencana Portofolio Belajar Siswa
              </span>
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-xs text-slate-400 whitespace-pre-wrap leading-relaxed">
                {module.lampiranPortofolio}
              </div>
            </div>

            {/* Lampiran 8: Presentasi Outline */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 8: Lembar Presentasi Outline & Prompt AI Kreatif
              </span>
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-xs text-slate-400 whitespace-pre-wrap leading-relaxed">
                {module.lampiranAIPresentasi}
              </div>
            </div>

            {/* Lampiran 9: Lembar Penilaian Siswa */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 9: Lembar Penilaian Siswa ({module.school.jumlahSiswa} Baris Sesuai Isian)
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px] border-collapse border border-slate-800">
                  <thead>
                    <tr className="bg-slate-900 font-bold">
                      <th className="border border-slate-800 p-1.5 w-10 text-center">No</th>
                      <th className="border border-slate-800 p-1.5">Nama Lengkap Peserta Didik</th>
                      <th className="border border-slate-800 p-1.5 w-32 text-center">Penilaian Sikap (Afektif)</th>
                      <th className="border border-slate-800 p-1.5 w-32 text-center">Penilaian Psikomotor (Keterampilan)</th>
                      <th className="border border-slate-800 p-1.5 w-32 text-center">Penilaian Kognitif (Tes)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.lampiranPenilaianSiswa.map((p, i) => (
                      <tr key={i}>
                        <td className="border border-slate-800 p-1.5 text-center">{i + 1}</td>
                        <td className="border border-slate-800 p-1.5 font-bold text-slate-300">{p.namaSiswa}</td>
                        <td className="border border-slate-800 p-1.5 text-center">{p.nilaiSikap}</td>
                        <td className="border border-slate-800 p-1.5 text-center font-mono text-emerald-400">{p.nilaiKeterampilan}</td>
                        <td className="border border-slate-800 p-1.5 text-center font-mono text-indigo-400">{p.nilaiKognitif}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lampiran 10: In-depth Ringkasan Materi */}
            <div className="space-y-2">
              <span className="font-display font-bold text-xs bg-indigo-500/10 text-indigo-400 py-1 px-2.5 rounded">
                Lampiran 10: Ringkasan Materi Detail Berdasarkan Rujukan Internet (Maksimal 500 Kata)
              </span>
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans whitespace-pre-wrap">
                {module.lampiranRingkasanMateriDetail}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
