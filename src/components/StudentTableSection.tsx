import React, { useState } from "react";
import { Student } from "../types";
import * as XLSX from "xlsx";
import { 
  Users, Plus, Trash2, Edit2, Upload, Download, Copy, Check, FileSpreadsheet, Search, RefreshCw, X, AlertCircle
} from "lucide-react";

interface StudentTableProps {
  students: Student[];
  onUpdateStudents: (updatedStudents: Student[]) => void;
  jumlahSiswa: number;
  onUpdateJumlahSiswa: (num: number) => void;
  kelas: string;
  namaSekolah: string;
}

export const DEFAULT_STUDENT_ROSTER: Student[] = [
  { id: "s-1", nis: "2026001", namaSiswa: "Achmad Fauzi", jenisKelamin: "L", catatan: "Siswa Aktif, Sangat Baik di Numerasi" },
  { id: "s-2", nis: "2026002", namaSiswa: "Aisyah Putri Perkasa", jenisKelamin: "P", catatan: "Siswa Aktif, Teliti & Rapi" },
  { id: "s-3", nis: "2026003", namaSiswa: "Anindya Lestari", jenisKelamin: "P", catatan: "Siswa Aktif, Gemar Membaca" },
  { id: "s-4", nis: "2026004", namaSiswa: "Bagus Tri Prasetyo", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-5", nis: "2026005", namaSiswa: "Citra Kirana Devi", jenisKelamin: "P", catatan: "Siswa Aktif, Kreatif" },
  { id: "s-6", nis: "2026006", namaSiswa: "Dewi Lestari", jenisKelamin: "P", catatan: "Siswa Aktif" },
  { id: "s-7", nis: "2026007", namaSiswa: "Eko Prasetyo", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-8", nis: "2026008", namaSiswa: "Fajar Hidayatullah", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-9", nis: "2026009", namaSiswa: "Gita Gutawa Rahayu", jenisKelamin: "P", catatan: "Siswa Aktif" },
  { id: "s-10", nis: "2026010", namaSiswa: "Hadi Wijaya", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-11", nis: "2026011", namaSiswa: "Indah Permata Sari", jenisKelamin: "P", catatan: "Siswa Aktif" },
  { id: "s-12", nis: "2026012", namaSiswa: "Joko Susilo", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-13", nis: "2026013", namaSiswa: "Kartika Sari Dewi", jenisKelamin: "P", catatan: "Siswa Aktif" },
  { id: "s-14", nis: "2026014", namaSiswa: "Lukman Hakim", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-15", nis: "2026015", namaSiswa: "Megawati Sukarno", jenisKelamin: "P", catatan: "Siswa Aktif" },
  { id: "s-16", nis: "2026016", namaSiswa: "Naufal Abdi Rabbani", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-17", nis: "2026017", namaSiswa: "Putu Gede Arya", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-18", nis: "2026018", namaSiswa: "Rina Marlina", jenisKelamin: "P", catatan: "Siswa Aktif" },
  { id: "s-19", nis: "2026019", namaSiswa: "Siti Aminah", jenisKelamin: "P", catatan: "Siswa Aktif" },
  { id: "s-20", nis: "2026020", namaSiswa: "Taufik Hidayat", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-21", nis: "2026021", namaSiswa: "Umar Faruq", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-22", nis: "2026022", namaSiswa: "Vina Panduwinata", jenisKelamin: "P", catatan: "Siswa Aktif" },
  { id: "s-23", nis: "2026023", namaSiswa: "Wawan Setiawan", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-24", nis: "2026024", namaSiswa: "Yusuf Habibie", jenisKelamin: "L", catatan: "Siswa Aktif" },
  { id: "s-25", nis: "2026025", namaSiswa: "Zaskia Adya Mecca", jenisKelamin: "P", catatan: "Siswa Aktif" }
];

export default function StudentTableSection({
  students,
  onUpdateStudents,
  jumlahSiswa,
  onUpdateJumlahSiswa,
  kelas,
  namaSekolah
}: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [importText, setImportText] = useState("");
  const [importNotification, setImportNotification] = useState<string | null>(null);

  // Form for new student
  const [newNis, setNewNis] = useState("");
  const [newNama, setNewNama] = useState("");
  const [newGender, setNewGender] = useState<"L" | "P">("L");
  const [newCatatan, setNewCatatan] = useState("");

  // Editing row buffer
  const [editBuffer, setEditBuffer] = useState<Partial<Student>>({});

  const listToRender = students.length > 0 ? students : DEFAULT_STUDENT_ROSTER;

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNama.trim()) return;

    const newStudent: Student = {
      id: "s-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      nis: newNis.trim() || `${2026000 + listToRender.length + 1}`,
      namaSiswa: newNama.trim(),
      jenisKelamin: newGender,
      catatan: newCatatan.trim() || "Siswa Aktif"
    };

    const updated = [...listToRender, newStudent];
    onUpdateStudents(updated);
    onUpdateJumlahSiswa(updated.length);

    // Reset form
    setNewNis("");
    setNewNama("");
    setNewGender("L");
    setNewCatatan("");
    setShowAddModal(false);
  };

  const handleDeleteStudent = (id: string) => {
    const updated = listToRender.filter(s => s.id !== id);
    onUpdateStudents(updated);
    onUpdateJumlahSiswa(updated.length);
  };

  const handleStartEdit = (student: Student) => {
    setEditingId(student.id);
    setEditBuffer({ ...student });
  };

  const handleSaveEdit = (id: string) => {
    const updated = listToRender.map(s => {
      if (s.id === id) {
        return {
          ...s,
          ...editBuffer,
          namaSiswa: editBuffer.namaSiswa || s.namaSiswa
        } as Student;
      }
      return s;
    });
    onUpdateStudents(updated);
    setEditingId(null);
    setEditBuffer({});
  };

  const handleResetDefault = () => {
    if (confirm("Reset daftar siswa ke data default 25 siswa?")) {
      onUpdateStudents(DEFAULT_STUDENT_ROSTER);
      onUpdateJumlahSiswa(DEFAULT_STUDENT_ROSTER.length);
    }
  };

  // EXPORT TO EXCEL (.xlsx)
  const handleExportExcel = () => {
    const exportData = listToRender.map((s, index) => ({
      "No": index + 1,
      "NIS/NISN": s.nis || "-",
      "Nama Siswa": s.namaSiswa,
      "Jenis Kelamin": s.jenisKelamin === "L" ? "Laki-laki" : "Perempuan",
      "Catatan Belajar": s.catatan || "Siswa Aktif"
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daftar Siswa");

    const fileName = `Daftar_Siswa_${namaSekolah.replace(/\s+/g, "_")}_Kelas_${kelas.replace(/\s+/g, "_")}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  // EXPORT TO GOOGLE SHEETS / CLIPBOARD (TSV)
  const handleCopyForGoogleSheets = () => {
    let tsv = "NO\tNIS/NISN\tNAMA SISWA\tJENIS KELAMIN\tCATATAN BELAJAR\n";
    listToRender.forEach((s, idx) => {
      tsv += `${idx + 1}\t${s.nis || ""}\t${s.namaSiswa}\t${s.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}\t${s.catatan || ""}\n`;
    });

    navigator.clipboard.writeText(tsv).then(() => {
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2500);
    });
  };

  // IMPORT FILE (.xlsx / .csv)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheet = workbook.SheetNames[0];
        const rows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { header: 1 });

        if (rows.length < 2) {
          alert("File Excel/CSV tidak memiliki data baris yang cukup.");
          return;
        }

        const parsedStudents: Student[] = [];
        // Skip header or check header row
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length === 0) continue;

          // Try identifying columns
          // Col 0: No/NIS, Col 1: NIS/Nama, Col 2: Nama/Gender, etc.
          let nisVal = "";
          let namaVal = "";
          let genderVal: "L" | "P" = "L";
          let catatanVal = "Siswa Aktif";

          // Intelligently parse based on row items
          const stringItems = row.map((cell: any) => String(cell || "").trim());
          if (stringItems.length >= 2) {
            if (/^\d+$/.test(stringItems[0]) && stringItems[1].length > 2) {
              // Row: [No, Nama, Gender, ...] or [No, NIS, Nama, ...]
              if (stringItems.length >= 3 && (stringItems[2].toUpperCase() === "L" || stringItems[2].toUpperCase() === "P" || stringItems[2].toLowerCase().includes("laki") || stringItems[2].toLowerCase().includes("perem"))) {
                nisVal = stringItems[0];
                namaVal = stringItems[1];
                genderVal = stringItems[2].toUpperCase().startsWith("P") ? "P" : "L";
                catatanVal = stringItems[3] || "Siswa Aktif";
              } else if (stringItems.length >= 3) {
                nisVal = stringItems[1];
                namaVal = stringItems[2];
                if (stringItems[3]) {
                  genderVal = stringItems[3].toUpperCase().startsWith("P") ? "P" : "L";
                }
                catatanVal = stringItems[4] || "Siswa Aktif";
              } else {
                namaVal = stringItems[1];
              }
            } else {
              namaVal = stringItems[0] || stringItems[1];
              if (stringItems[1] && (stringItems[1].toUpperCase() === "L" || stringItems[1].toUpperCase() === "P")) {
                genderVal = stringItems[1].toUpperCase() as "L" | "P";
              }
            }
          }

          if (namaVal && namaVal.toLowerCase() !== "nama" && namaVal.toLowerCase() !== "nama siswa") {
            parsedStudents.push({
              id: "s-imp-" + i + "-" + Date.now(),
              nis: nisVal || `${2026000 + i}`,
              namaSiswa: namaVal,
              jenisKelamin: genderVal,
              catatan: catatanVal
            });
          }
        }

        if (parsedStudents.length > 0) {
          onUpdateStudents(parsedStudents);
          onUpdateJumlahSiswa(parsedStudents.length);
          setImportNotification(`Berhasil mengimpor ${parsedStudents.length} siswa dari file!`);
          setTimeout(() => setImportNotification(null), 4000);
        } else {
          alert("Tidak ditemukan data siswa yang valid dalam file Excel/CSV.");
        }
      } catch (err) {
        console.error("Error reading excel file:", err);
        alert("Gagal membaca file Excel/CSV. Pastikan format file sesuai.");
      }
    };
    reader.readAsBinaryString(file);
  };

  // IMPORT FROM PASTE TEXT (Google Sheets / TSV / CSV text area)
  const handleImportPastedText = () => {
    if (!importText.trim()) return;

    const lines = importText.trim().split("\n");
    const parsedStudents: Student[] = [];

    lines.forEach((line, index) => {
      const parts = line.split(/[\t,;]/).map(p => p.trim().replace(/^["']|["']$/g, ""));
      if (parts.length === 0 || !parts[0]) return;

      // Skip header line if present
      if (parts[0].toLowerCase() === "no" || parts[0].toLowerCase().includes("nama") || parts[1]?.toLowerCase().includes("nama")) {
        return;
      }

      let nisVal = "";
      let namaVal = "";
      let genderVal: "L" | "P" = "L";
      let catatanVal = "Siswa Aktif";

      if (parts.length >= 3) {
        if (/^\d+$/.test(parts[0]) && parts[1].length > 2) {
          nisVal = parts[0];
          namaVal = parts[1];
          genderVal = parts[2].toUpperCase().startsWith("P") ? "P" : "L";
          catatanVal = parts[3] || "Siswa Aktif";
        } else {
          nisVal = parts[0];
          namaVal = parts[1];
          genderVal = parts[2]?.toUpperCase().startsWith("P") ? "P" : "L";
          catatanVal = parts[3] || "Siswa Aktif";
        }
      } else if (parts.length === 2) {
        namaVal = parts[0];
        genderVal = parts[1].toUpperCase().startsWith("P") ? "P" : "L";
      } else {
        namaVal = parts[0];
      }

      if (namaVal) {
        parsedStudents.push({
          id: "s-paste-" + index + "-" + Date.now(),
          nis: nisVal || `${2026000 + index + 1}`,
          namaSiswa: namaVal,
          jenisKelamin: genderVal,
          catatan: catatanVal
        });
      }
    });

    if (parsedStudents.length > 0) {
      onUpdateStudents(parsedStudents);
      onUpdateJumlahSiswa(parsedStudents.length);
      setShowImportModal(false);
      setImportText("");
      setImportNotification(`Berhasil mengimpor ${parsedStudents.length} data siswa dari Google Sheets!`);
      setTimeout(() => setImportNotification(null), 4000);
    } else {
      alert("Format teks tidak dapat diproses. Pastikan Anda menyalin kolom dari Google Sheets dengan benar.");
    }
  };

  const filteredStudents = listToRender.filter(s => 
    s.namaSiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.nis && s.nis.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-slate-100">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Tabel Data Nama Siswa</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {listToRender.length} Siswa Terdaftar
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Data nama siswa di bawah ini otomatis digunakan pada Lampiran Penilaian & Asesmen Modul Ajar RPP AI.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition shadow-md"
          >
            <Plus className="w-4 h-4" />
            Tambah Siswa
          </button>

          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition shadow-md"
          >
            <Upload className="w-4 h-4" />
            Impor Excel / Google Sheets
          </button>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-lg text-xs font-medium transition"
            title="Ekspor ke File Excel .xlsx"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Ekspor Excel
          </button>

          <button
            onClick={handleCopyForGoogleSheets}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 rounded-lg text-xs font-medium transition"
            title="Salin tabel untuk di-paste langsung ke Google Sheets"
          >
            {copiedStatus ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copiedStatus ? "Tersalin!" : "Salin ke Google Sheets"}
          </button>

          <button
            onClick={handleResetDefault}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 rounded-lg transition"
            title="Reset ke 25 Siswa Default"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {importNotification && (
        <div className="mt-3 p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{importNotification}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="my-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Cari nama atau NIS siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-xs text-slate-400">
          Siswa Laki-laki: <span className="text-blue-400 font-semibold">{listToRender.filter(s => s.jenisKelamin === "L").length}</span> | 
          Perempuan: <span className="text-pink-400 font-semibold">{listToRender.filter(s => s.jenisKelamin === "P").length}</span>
        </div>
      </div>

      {/* Main Student Data Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-lg max-h-[420px] overflow-y-auto">
        <table className="w-full text-xs text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 border-b border-slate-800 z-10">
            <tr>
              <th className="px-3 py-2.5 text-center w-12">No</th>
              <th className="px-3 py-2.5 w-28">NIS / NISN</th>
              <th className="px-3 py-2.5">Nama Lengkap Siswa</th>
              <th className="px-3 py-2.5 text-center w-24">L / P</th>
              <th className="px-3 py-2.5">Catatan Belajar</th>
              <th className="px-3 py-2.5 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  Tidak ada data siswa yang cocok dengan pencarian.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => {
                const isEditing = editingId === student.id;

                return (
                  <tr key={student.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-3 py-2 text-center text-slate-500 font-mono">
                      {index + 1}
                    </td>

                    <td className="px-3 py-2 font-mono text-slate-400">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editBuffer.nis || ""}
                          onChange={(e) => setEditBuffer({ ...editBuffer, nis: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 px-2 py-1 rounded text-xs text-slate-200"
                        />
                      ) : (
                        student.nis || "-"
                      )}
                    </td>

                    <td className="px-3 py-2 font-medium text-slate-100">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editBuffer.namaSiswa || ""}
                          onChange={(e) => setEditBuffer({ ...editBuffer, namaSiswa: e.target.value })}
                          className="w-full bg-slate-950 border border-blue-500 px-2 py-1 rounded text-xs text-white"
                        />
                      ) : (
                        student.namaSiswa
                      )}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {isEditing ? (
                        <select
                          value={editBuffer.jenisKelamin || "L"}
                          onChange={(e) => setEditBuffer({ ...editBuffer, jenisKelamin: e.target.value as "L" | "P" })}
                          className="bg-slate-950 border border-slate-700 px-1 py-1 rounded text-xs text-slate-200"
                        >
                          <option value="L">L</option>
                          <option value="P">P</option>
                        </select>
                      ) : (
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          student.jenisKelamin === "L" 
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                            : "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                        }`}>
                          {student.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                        </span>
                      )}
                    </td>

                    <td className="px-3 py-2 text-slate-400">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editBuffer.catatan || ""}
                          onChange={(e) => setEditBuffer({ ...editBuffer, catatan: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 px-2 py-1 rounded text-xs text-slate-200"
                        />
                      ) : (
                        student.catatan || "Siswa Aktif"
                      )}
                    </td>

                    <td className="px-3 py-2 text-center">
                      {isEditing ? (
                        <button
                          onClick={() => handleSaveEdit(student.id)}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-medium"
                        >
                          Simpan
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleStartEdit(student)}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-blue-400 rounded transition"
                            title="Edit Siswa"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-1 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded transition"
                            title="Hapus Siswa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                Tambah Siswa Baru
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">NIS / NISN (Opsional):</label>
                <input
                  type="text"
                  placeholder="Contoh: 2026026"
                  value={newNis}
                  onChange={(e) => setNewNis(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Nama Lengkap Siswa *:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ahmad Rizky Ramadhan"
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Jenis Kelamin *:</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="L"
                      checked={newGender === "L"}
                      onChange={() => setNewGender("L")}
                      className="text-blue-600 focus:ring-0"
                    />
                    <span className="text-slate-300">Laki-laki (L)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="P"
                      checked={newGender === "P"}
                      onChange={() => setNewGender("P")}
                      className="text-pink-600 focus:ring-0"
                    />
                    <span className="text-slate-300">Perempuan (P)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Catatan Belajar (Opsional):</label>
                <input
                  type="text"
                  placeholder="Contoh: Sangat aktif dalam diskusi"
                  value={newCatatan}
                  onChange={(e) => setNewCatatan(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 font-medium"
                >
                  Tambahkan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                Impor Data Siswa dari Excel / Google Sheets
              </h3>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Option 1: File Upload */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <label className="block text-slate-300 font-semibold mb-1">
                  Metode 1: Unggah File Excel (.xlsx) / CSV (.csv)
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Pilih file spreadsheet dari komputer Anda (Format kolom: No, NIS, Nama Siswa, L/P).
                </p>
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                />
              </div>

              {/* Option 2: Copy Paste Google Sheets */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <label className="block text-slate-300 font-semibold mb-1">
                  Metode 2: Tempelkan (Paste) dari Google Sheets / Excel
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Blok/Salin (Ctrl+C) kolom siswa di Google Sheets Anda, lalu tempelkan (Ctrl+V) di bawah ini:
                </p>
                <textarea
                  rows={5}
                  placeholder={`Contoh tempelan:\n1\t2026001\tAhmad Rizky\tL\n2\t2026002\tBunga Lestari\tP`}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleImportPastedText}
                  className="mt-2 w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-medium transition"
                >
                  Proses & Impor Teks Tandingan
                </button>
              </div>

              <div className="p-2.5 bg-blue-950/40 border border-blue-800/40 rounded-lg text-[11px] text-blue-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Catatan: Data siswa yang diimpor akan langsung menggantikan daftar siswa aktif saat ini dan memperbarui jumlah siswa di form identitas secara otomatis.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
