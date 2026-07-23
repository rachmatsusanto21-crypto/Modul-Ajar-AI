import { useState } from "react";
import { 
  Folder, FolderPlus, FileText, Cloud, HardDrive, RefreshCw, CheckCircle2, AlertCircle, Trash2, Key, HelpCircle
} from "lucide-react";
import { AppSettings, GeneratedModule } from "../types";

interface DriveSimulationProps {
  settings: AppSettings;
  modules: GeneratedModule[];
  onToggleConnection: () => void;
  onUpdateFolderId: (id: string) => void;
  onClearSimulatedFiles: () => void;
  onDeleteModule?: (id: string) => void;
  onDeleteSubfolder?: (subjectName: string) => void;
  theme: "light" | "dark";
}

export default function DriveSimulation({
  settings,
  modules,
  onToggleConnection,
  onUpdateFolderId,
  onClearSimulatedFiles,
  onDeleteModule,
  onDeleteSubfolder,
  theme
}: DriveSimulationProps) {
  const [showConfig, setShowConfig] = useState(false);

  // Derive simulated directory tree from current generated modules
  const mainFolder = settings.driveFolderName || "My_RPP_Modul_Ajar_AI";
  
  // Group modules by Subject name to build virtual subfolders
  const subfolders: { [subject: string]: GeneratedModule[] } = {};
  modules.forEach(m => {
    // Primary subject is the first name before ';'
    const primarySubject = m.subject.namaMataPelajaran.split(";")[0].trim();
    if (!subfolders[primarySubject]) {
      subfolders[primarySubject] = [];
    }
    subfolders[primarySubject].push(m);
  });

  const cardBg = theme === "dark" ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200/80 shadow-sm";
  const labelColor = theme === "dark" ? "text-slate-300" : "text-slate-600";
  const bgTree = theme === "dark" ? "bg-slate-950/60" : "bg-slate-50";

  return (
    <div className={`p-5 rounded-2xl border ${cardBg} backdrop-blur-sm transition-all flex flex-col h-full`}>
      
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b pb-3 border-blue-500/10 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-500/10 text-blue-600 rounded-lg">
            <Cloud size={16} />
          </div>
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
              Sinkronisasi Google Drive
            </h3>
            <p className="text-[10px] text-slate-400">Penyusunan folder otomatis per mata pelajaran</p>
          </div>
        </div>

        {/* Connection Toggle */}
        <button
          type="button"
          onClick={onToggleConnection}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
            settings.googleDriveConnected
              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
              : "bg-blue-500/10 text-blue-600 border border-blue-500/20 animate-pulse"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${settings.googleDriveConnected ? "bg-emerald-500" : "bg-blue-500"}`}></span>
          {settings.googleDriveConnected ? "Terkoneksi Google" : "Hubungkan Drive"}
        </button>
      </div>

      {/* Connection warning or guide */}
      {!settings.googleDriveConnected ? (
        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/15 text-[11px] text-slate-400 mb-4">
          <div className="flex items-center gap-1.5 text-blue-600 font-bold mb-1">
            <AlertCircle size={13} /> Panduan Keamanan Akun
          </div>
          Hubungkan akun Google Drive Anda secara aman. RPP yang di-generate akan langsung disimpan dalam folder khusus di Google Drive Anda. Setiap pelajaran akan dikelompokkan otomatis dalam subfolder khusus pelajaran terkait.
        </div>
      ) : (
        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/15 text-[11px] text-slate-400 mb-4">
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold mb-0.5">
            <CheckCircle2 size={13} /> Sinkronisasi Otomatis Aktif
          </div>
          Setiap dokumen tersimpan langsung ke Google Drive di folder <span className="font-bold text-blue-600">/{mainFolder}</span>.
        </div>
      )}

      {/* Directory Folder Tree Preview */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
          Struktur Folder Google Drive Anda:
        </span>
        {modules.length > 0 && (
          <button
            onClick={onClearSimulatedFiles}
            className="text-[10px] text-rose-500 hover:text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-medium cursor-pointer transition-colors"
            title="Hapus seluruh berkas tersimpan di Google Drive"
          >
            <Trash2 size={11} />
            Hapus Semua File
          </button>
        )}
      </div>

      <div className={`flex-1 rounded-xl p-4 overflow-y-auto ${bgTree} border border-slate-200/50 dark:border-slate-800 font-mono text-[11px] leading-relaxed`}>
        
        {/* Main Root Folder */}
        <div className="flex items-center gap-2 text-blue-500 font-bold mb-2">
          <HardDrive size={14} />
          <span>My Google Drive</span>
        </div>

        {/* System RPP Root Folder */}
        <div className="pl-4 border-l border-slate-300 dark:border-slate-800 space-y-3">
          
          {/* Main App Folder */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-blue-600 font-bold">
              <div className="flex items-center gap-2">
                <Folder size={13} />
                <span>/{mainFolder}</span>
                <span className="text-[9px] bg-blue-500/10 text-blue-600 px-1 rounded">Folder Utama</span>
              </div>
            </div>

            {/* Dynamic Subfolders */}
            <div className="pl-4 border-l border-slate-300 dark:border-slate-800 space-y-2">
              {Object.keys(subfolders).length > 0 ? (
                Object.entries(subfolders).map(([subj, docs]) => (
                  <div key={subj} className="space-y-1 group/folder">
                    <div className="flex items-center justify-between text-blue-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Folder size={12} />
                        <span>{subj}</span>
                        <span className="text-[8px] bg-blue-500/10 text-blue-500 px-1 rounded">({docs.length} Berkas)</span>
                      </div>
                      
                      {/* Subfolder Delete Option */}
                      {onDeleteSubfolder && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Apakah Anda yakin ingin menghapus seluruh berkas (${docs.length}) dalam folder pelajaran "${subj}"?`)) {
                              onDeleteSubfolder(subj);
                            }
                          }}
                          className="opacity-80 group-hover/folder:opacity-100 p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-all cursor-pointer text-[9px] flex items-center gap-1"
                          title={`Hapus folder pelajaran "${subj}" beserta ${docs.length} berkas`}
                        >
                          <Trash2 size={11} />
                          <span className="hidden sm:inline">Hapus Folder</span>
                        </button>
                      )}
                    </div>

                    {/* Files inside subfolder */}
                    <div className="pl-4 border-l border-slate-300 dark:border-slate-800 space-y-1">
                      {docs.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between group/file hover:bg-slate-200/50 dark:hover:bg-slate-800/50 p-1 px-1.5 rounded transition-colors text-slate-700 dark:text-slate-300">
                          <div className="flex items-center gap-1.5 truncate pr-2">
                            <FileText size={11} className="text-blue-500 shrink-0" />
                            <span className="truncate">{doc.title}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[8px] text-slate-400 hidden sm:inline">.docx | .pdf</span>
                            
                            {/* Individual File Delete Option */}
                            {onDeleteModule && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Apakah Anda yakin ingin menghapus berkas "${doc.title}" dari Google Drive?`)) {
                                    onDeleteModule(doc.id);
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                                title={`Hapus berkas "${doc.title}"`}
                              >
                                <Trash2 size={11} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-[10px] text-slate-500 pl-4 py-1 italic">
                  Belum ada subfolder pelajaran dibuat. Mulai generate untuk membuat otomatis.
                </div>
              )}
            </div>
          </div>

          {/* Backup Folder */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Folder size={13} />
              <span>/Sistem_Backup_RPP</span>
              <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-1 rounded font-normal">Sistem Backup</span>
            </div>
            <div className="pl-4 border-l border-slate-300 dark:border-slate-800 text-[10px] text-slate-400 italic">
              {modules.length > 0 ? (
                <div className="flex items-center gap-1.5 text-slate-300 font-sans not-italic">
                  <FileText size={11} className="text-emerald-400" />
                  <span>rpp_backup_current_active.json</span>
                </div>
              ) : (
                "Menunggu backup data berkala..."
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Simulation Tools */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <button
          onClick={onClearSimulatedFiles}
          className="text-slate-400 hover:text-rose-400 transition-colors py-1 flex items-center gap-1 text-[10px]"
          title="Reset simulasi database lokal"
        >
          <Trash2 size={11} />
          Bersihkan Data Lokal
        </button>

        <span className="text-[10px] text-slate-400">
          Folder Rujukan: <span className="font-bold text-emerald-500">"/Sistem_Backup_RPP/"</span>
        </span>
      </div>
    </div>
  );
}
