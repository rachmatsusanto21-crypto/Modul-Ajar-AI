import { SchoolIdentity, SubjectIdentity } from "../types";
import { 
  School, GraduationCap, Calendar, Clock, MapPin, Users, BookOpen
} from "lucide-react";

interface IdentityFormProps {
  school: SchoolIdentity;
  subject: SubjectIdentity;
  onChangeSchool: (fields: Partial<SchoolIdentity>) => void;
  onChangeSubject: (fields: Partial<SubjectIdentity>) => void;
  theme: "light" | "dark";
}

export default function IdentityForm({
  school,
  subject,
  onChangeSchool,
  onChangeSubject,
  theme
}: IdentityFormProps) {
  const cardBg = theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200/80 shadow-sm";
  const labelColor = theme === "dark" ? "text-slate-300" : "text-slate-600";
  const inputBg = theme === "dark" ? "bg-slate-950/40 border-slate-800 text-slate-100" : "bg-slate-50/50 border-slate-200 text-slate-800";

  const phases = ["Fase A (Kelas 1-2)", "Fase B (Kelas 3-4)", "Fase C (Kelas 5-6)", "Fase D (Kelas 7-9)", "Fase E (Kelas 10)", "Fase F (Kelas 11-12)"];
  const classes = ["I (Satu)", "II (Dua)", "III (Tiga)", "IV (Empat)", "V (Lima)", "VI (Enam)", "VII (Tujuh)", "VIII (Delapan)", "IX (Sembilan)", "X (Sepuluh)", "XI (Sebelas)", "XII (Duabelas)"];
  const curriculums = ["K-13", "Kurikulum Merdeka", "Kombinasi"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* 1. IDENTITAS SEKOLAH & PROFIL GURU */}
      <div className={`p-5 rounded-2xl border ${cardBg} backdrop-blur-sm transition-all`}>
        <div className="flex items-center gap-2 mb-4 border-b pb-3 border-blue-500/10">
          <div className="p-1.5 bg-blue-500/10 text-blue-600 rounded-lg">
            <School size={16} />
          </div>
          <h3 className="font-display font-bold text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Profil Sekolah & Guru
          </h3>
        </div>

        <div className="space-y-3.5">
          {/* Jenjang */}
          <div>
            <label className={`block text-[11px] font-bold ${labelColor} mb-1.5`}>Jenjang Sekolah</label>
            <div className="grid grid-cols-3 gap-2">
              {(["SD", "SMP", "SMA"] as const).map((j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => onChangeSchool({ jenjang: j })}
                  className={`py-1.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    school.jenjang === j
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/15"
                      : `${inputBg} border-slate-200 hover:border-blue-500/40`
                  }`}
                >
                  {j}
                </button>
              ))}
            </div>
          </div>

          {/* Nama Sekolah */}
          <div>
            <label className={`block text-[11px] font-bold ${labelColor} mb-1`}>Nama Sekolah</label>
            <input
              type="text"
              value={school.namaSekolah}
              onChange={(e) => onChangeSchool({ namaSekolah: e.target.value })}
              className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
              placeholder="e.g. SD Negeri Cilincing 01"
            />
          </div>

          {/* Fase, Kelas, Paralel */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className={`block text-[10px] font-bold ${labelColor} mb-1`}>Fase</label>
              <select
                value={school.fase}
                onChange={(e) => onChangeSchool({ fase: e.target.value })}
                className={`w-full px-2 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
              >
                {phases.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-[10px] font-bold ${labelColor} mb-1`}>Kelas</label>
              <select
                value={school.kelas}
                onChange={(e) => onChangeSchool({ kelas: e.target.value })}
                className={`w-full px-2 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
              >
                {classes.map(c => <option key={c} value={c}>Kelas {c}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-[10px] font-bold ${labelColor} mb-1`}>Paralel</label>
              <input
                type="text"
                maxLength={2}
                value={school.paralel}
                onChange={(e) => onChangeSchool({ paralel: e.target.value.toUpperCase() })}
                className={`w-full px-3 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border text-center ${inputBg}`}
                placeholder="A / B / C"
              />
            </div>
          </div>

          {/* Guru & NIP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className={`block text-[11px] font-bold ${labelColor} mb-1`}>Nama Guru</label>
              <input
                type="text"
                value={school.namaGuru}
                onChange={(e) => onChangeSchool({ namaGuru: e.target.value })}
                className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
                placeholder="e.g. Rachmat Susanto, S.Pd."
              />
            </div>
            <div>
              <label className={`block text-[11px] font-bold ${labelColor} mb-1`}>NIP Guru</label>
              <input
                type="text"
                value={school.nipGuru}
                onChange={(e) => onChangeSchool({ nipGuru: e.target.value })}
                className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
                placeholder="e.g. 19880412 201503 1 002"
              />
            </div>
          </div>

          {/* Kepala Sekolah & NIP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className={`block text-[11px] font-bold ${labelColor} mb-1`}>Kepala Sekolah</label>
              <input
                type="text"
                value={school.namaKepalaSekolah}
                onChange={(e) => onChangeSchool({ namaKepalaSekolah: e.target.value })}
                className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
                placeholder="e.g. Dr. H. Slamet Riyadi, M.Pd."
              />
            </div>
            <div>
              <label className={`block text-[11px] font-bold ${labelColor} mb-1`}>NIP Kepala Sekolah</label>
              <input
                type="text"
                value={school.nipKepalaSekolah}
                onChange={(e) => onChangeSchool({ nipKepalaSekolah: e.target.value })}
                className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
                placeholder="e.g. 19720510 199803 1 001"
              />
            </div>
          </div>

          {/* Kota Pembuatan & Tanggal */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className={`block text-[10px] font-bold ${labelColor} mb-1`}>Kota Pembuatan</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400">
                  <MapPin size={12} />
                </span>
                <input
                  type="text"
                  value={school.namaKota}
                  onChange={(e) => onChangeSchool({ namaKota: e.target.value })}
                  className={`w-full pl-7 pr-3 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
                  placeholder="e.g. Jakarta"
                />
              </div>
            </div>
            <div>
              <label className={`block text-[10px] font-bold ${labelColor} mb-1`}>Tanggal Terbit</label>
              <input
                type="date"
                value={school.tanggalPembuatan}
                onChange={(e) => onChangeSchool({ tanggalPembuatan: e.target.value })}
                className={`w-full px-3 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. IDENTITAS MATA PELAJARAN & ADMINISTRASI SEKOLAH */}
      <div className={`p-5 rounded-2xl border ${cardBg} backdrop-blur-sm transition-all`}>
        <div className="flex items-center gap-2 mb-4 border-b pb-3 border-blue-500/10">
          <div className="p-1.5 bg-blue-500/10 text-blue-600 rounded-lg">
            <GraduationCap size={16} />
          </div>
          <h3 className="font-display font-bold text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Administrasi Akademik
          </h3>
        </div>

        <div className="space-y-4">
          {/* Kurikulum, Semester, TP */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className={`block text-[10px] font-bold ${labelColor} mb-1`}>Kurikulum</label>
              <select
                value={school.kurikulum}
                onChange={(e) => onChangeSchool({ kurikulum: e.target.value as any })}
                className={`w-full px-2 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
              >
                {curriculums.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-[10px] font-bold ${labelColor} mb-1`}>Semester</label>
              <select
                value={school.semester}
                onChange={(e) => onChangeSchool({ semester: e.target.value as any })}
                className={`w-full px-2 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
              >
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>
            <div>
              <label className={`block text-[10px] font-bold ${labelColor} mb-1`}>Thn Pelajaran</label>
              <input
                type="text"
                value={school.tahunPelajaran}
                onChange={(e) => onChangeSchool({ tahunPelajaran: e.target.value })}
                className={`w-full px-3 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border text-center ${inputBg}`}
                placeholder="2025/2026"
              />
            </div>
          </div>

          {/* Jumlah Siswa */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mb-1">
              <Users size={12} />
              <span>Jumlah Siswa di Kelas</span>
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={school.jumlahSiswa}
              onChange={(e) => onChangeSchool({ jumlahSiswa: Math.max(1, parseInt(e.target.value) || 20) })}
              className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
              placeholder="Contoh: 24"
            />
          </div>

          {/* Nama Mata Pelajaran */}
          <div>
            <label className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <BookOpen size={12} />
                <span>Nama Mata Pelajaran</span>
              </span>
              <span className="text-[9px] text-blue-500 italic font-medium">Pisahkan ";" jika integratif/kokurikuler</span>
            </label>
            <input
              type="text"
              value={subject.namaMataPelajaran}
              onChange={(e) => onChangeSubject({ namaMataPelajaran: e.target.value })}
              className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border font-semibold ${inputBg}`}
              placeholder="e.g. IPA; IPS (Sains Sosial Integratif)"
            />
          </div>

          {/* Jam Pelajaran (Manual) */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mb-1">
              <Calendar size={12} />
              <span>Alokasi Jam Pelajaran</span>
            </label>
            <input
              type="text"
              value={subject.jamPelajaran}
              onChange={(e) => onChangeSubject({ jamPelajaran: e.target.value })}
              className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
              placeholder="e.g. 3 x jam pelajaran"
            />
          </div>

          {/* Durasi Jam Pelajaran */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mb-1">
              <Clock size={12} />
              <span>Durasi 1 Jam Pelajaran (menit)</span>
            </label>
            <select
              value={subject.durasiJamPelajaran}
              onChange={(e) => onChangeSubject({ durasiJamPelajaran: parseInt(e.target.value) })}
              className={`w-full px-3 py-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border ${inputBg}`}
            >
              <option value={30}>30 Menit (SD Kecil)</option>
              <option value={35}>35 Menit (SD Standar)</option>
              <option value={40}>40 Menit (SMP)</option>
              <option value={45}>45 Menit (SMA)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
