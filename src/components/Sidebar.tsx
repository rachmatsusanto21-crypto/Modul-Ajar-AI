import { useState, ChangeEvent } from "react";
import { 
  Search, Edit2, Trash2, UserPlus, UserMinus, RefreshCw, 
  Database, FileText, Moon, Sun, Upload, Download, CloudLightning, HelpCircle
} from "lucide-react";
import { User, GeneratedModule } from "../types";

interface SidebarProps {
  modules: GeneratedModule[];
  selectedModule: GeneratedModule | null;
  users: User[];
  currentUser: User | null;
  onSelectModule: (module: GeneratedModule) => void;
  onEditModule: (module: GeneratedModule) => void;
  onDeleteModule: (id: string) => void;
  onAddUser: () => void;
  onEraseUser: (id: string) => void;
  onManualSync: () => void;
  syncing: boolean;
  theme: "light" | "dark";
  toggleTheme: () => void;
  onUploadBackup: (event: ChangeEvent<HTMLInputElement>) => void;
  onDownloadBackup: () => void;
}

export default function Sidebar({
  modules,
  selectedModule,
  users,
  currentUser,
  onSelectModule,
  onEditModule,
  onDeleteModule,
  onAddUser,
  onEraseUser,
  onManualSync,
  syncing,
  theme,
  toggleTheme,
  onUploadBackup,
  onDownloadBackup
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModules = modules.filter(m => {
    const titleMatch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    const materialMatch = m.design.materiPokok.toLowerCase().includes(searchTerm.toLowerCase());
    const subjectMatch = m.subject.namaMataPelajaran.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || materialMatch || subjectMatch;
  });

  return (
    <div className={`w-full lg:w-80 flex flex-col h-full border-r ${
      theme === "dark" 
        ? "bg-slate-950 border-slate-800 text-slate-100" 
        : "bg-white border-slate-200 text-slate-800 shadow-sm"
    } transition-colors duration-300`}>
      
      {/* App Header & Branding */}
      <div className={`p-4 flex flex-col justify-between ${
        theme === "dark" ? "bg-slate-900 border-b border-slate-800 text-white" : "bg-slate-900 text-white"
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-base text-white shadow-md shadow-blue-500/20">
              E
            </div>
            <div>
              <h1 className="font-display font-bold text-sm tracking-tight">
                EduAI Planner
              </h1>
              <p className="text-[9px] text-slate-400 font-sans tracking-wider uppercase">Sistem RPP Pintar</p>
            </div>
          </div>

          <button 
            onClick={toggleTheme}
            className={`p-1.5 rounded-lg transition-all ${
              theme === "dark" 
                ? "bg-slate-800 hover:bg-slate-700 text-amber-400" 
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
            title="Ganti Tema Visual"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      {/* User Session Management */}
      <div className={`p-4 border-b flex flex-col gap-3 ${
        theme === "dark" ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-slate-50"
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identitas Pengajar</span>
          <div className="flex gap-1.5">
            <button 
              onClick={onAddUser}
              className="p-1 rounded hover:bg-blue-600 hover:text-white transition-all text-blue-500"
              title="Tambah Pengguna"
            >
              <UserPlus size={14} />
            </button>
            {currentUser && (
              <button 
                onClick={() => onEraseUser(currentUser.id)}
                className="p-1 rounded hover:bg-rose-500 hover:text-white transition-all text-rose-400"
                title="Hapus Pengguna"
              >
                <UserMinus size={14} />
              </button>
            )}
          </div>
        </div>

        {currentUser ? (
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <img 
              src={currentUser.avatar || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150"} 
              alt={currentUser.name} 
              className="w-9 h-9 rounded-full border border-blue-100 dark:border-slate-800 object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{currentUser.name}</h4>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                Terhubung G-Drive
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-3 bg-white dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-850">
            <p className="text-[11px] text-slate-400">Belum ada identitas masuk</p>
            <button 
              onClick={onAddUser}
              className="mt-1 text-[11px] font-bold text-blue-500 hover:underline"
            >
              Masuk / Daftarkan Pengguna
            </button>
          </div>
        )}

        {/* Sync Controls */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className={`w-2 h-2 rounded-full ${syncing ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`}></span>
            <span className="text-slate-400 font-medium">Penyimpanan Cloud</span>
          </div>
          <button 
            onClick={onManualSync}
            disabled={syncing}
            className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-all font-bold ${syncing ? "opacity-50" : ""}`}
          >
            <RefreshCw size={10} className={syncing ? "animate-spin" : ""} />
            Sync Manual
          </button>
        </div>
      </div>

      {/* Published Modules List - Header */}
      <div className="p-4 pb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Daftar Modul Terbit ({filteredModules.length})
        </span>

        {/* Search bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={14} className="text-slate-400" />
          </span>
          <input
            type="text"
            className={`w-full pl-9 pr-4 py-1.5 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 border ${
              theme === "dark" 
                ? "bg-slate-950/60 border-slate-800 text-slate-100 placeholder-slate-500" 
                : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
            }`}
            placeholder="Cari berdasarkan judul / materi pokok..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable list of modules */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {filteredModules.length > 0 ? (
          filteredModules.map((m) => {
            const isActive = selectedModule?.id === m.id;
            return (
              <div 
                key={m.id}
                onClick={() => onSelectModule(m)}
                className={`group flex items-start gap-3 p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  theme === "dark"
                    ? isActive 
                      ? "bg-blue-950/50 border-blue-800 text-blue-100 font-medium"
                      : "bg-slate-900/40 hover:bg-slate-800/80 border-slate-900 hover:border-blue-500/30"
                    : isActive
                      ? "bg-blue-50 border-blue-100 text-blue-900 font-semibold"
                      : "bg-slate-50/50 hover:bg-white border-slate-200 hover:border-blue-500/30 hover:shadow-sm"
                }`}
              >
                <div className={`p-1.5 rounded-lg mt-0.5 ${isActive ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" : "bg-slate-500/10 text-slate-500"}`}>
                  <FileText size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className={`text-[11px] font-bold truncate transition-colors ${
                    isActive 
                      ? "text-blue-800 dark:text-blue-300" 
                      : "text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  }`}>
                    {m.title}
                  </h5>
                  <p className={`text-[10px] truncate ${isActive ? "text-blue-600/80 dark:text-blue-400/80" : "text-slate-400"}`}>
                    Mapel: {m.subject.namaMataPelajaran}
                  </p>
                  <span className={`text-[9px] font-mono px-1 py-0.5 rounded ${
                    isActive 
                      ? "bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300" 
                      : "bg-slate-200/50 dark:bg-slate-800 text-slate-400"
                  }`}>
                    {m.school.kelas} | {m.school.kurikulum}
                  </span>
                </div>
              
                {/* Actions */}
                <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditModule(m);
                    }}
                    className="p-1 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                    title="Edit Isian Modul"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteModule(m.id);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-500 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                    title="Hapus Modul"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-slate-400">
            <p className="text-xs">Tidak ada modul ditemukan</p>
          </div>
        )}
      </div>

      {/* Backup and Restore Controls */}
      <div className={`p-4 border-t flex flex-col gap-2 ${
        theme === "dark" ? "border-slate-800 bg-slate-950/20" : "border-slate-200 bg-slate-100/30"
      }`}>
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Sistem Cadangan data (Folder Khusus)
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onDownloadBackup}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-[10px] font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-all shadow-sm"
            title="Unduh file backup ke penyimpanan lokal"
          >
            <Download size={11} />
            Backup Lokal
          </button>
          
          <label className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-[10px] font-semibold bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer transition-all shadow-sm">
            <Upload size={11} />
            Unggah Backup
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={onUploadBackup}
            />
          </label>
        </div>
        <p className="text-[9px] text-slate-400 text-center font-sans">
          Berkas disimpan dalam folder khusus <span className="font-semibold text-emerald-500">"/Sistem_Backup_RPP/"</span>
        </p>
      </div>
    </div>
  );
}
