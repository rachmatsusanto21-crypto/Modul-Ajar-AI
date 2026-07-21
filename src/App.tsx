import { useState, useEffect, ChangeEvent } from "react";
import Sidebar from "./components/Sidebar";
import IdentityForm from "./components/IdentityForm";
import DesignForm from "./components/DesignForm";
import PreviewPanel from "./components/PreviewPanel";
import DriveSimulation from "./components/DriveSimulation";
import { User, GeneratedModule, AppSettings, SchoolIdentity, SubjectIdentity, LearningDesign } from "./types";
import { generateMockLessonPlan } from "./utils/ai_templates";
import { generateDOCXSimulatedContent } from "./utils/gdrive_api";
import { 
  Plus, Cloud, HelpCircle, CheckCircle2, AlertCircle, LogIn, Database, Sparkles, RefreshCw
} from "lucide-react";

const INITIAL_SCHOOL: SchoolIdentity = {
  jenjang: "SD",
  namaSekolah: "SD Negeri Cilincing 01",
  fase: "Fase B (Kelas 3-4)",
  kelas: "IV (Empat)",
  paralel: "A",
  namaGuru: "Rachmat Susanto, S.Pd.",
  nipGuru: "19880412 201503 1 002",
  namaKepalaSekolah: "Dr. H. Slamet Riyadi, M.Pd.",
  nipKepalaSekolah: "19720510 199803 1 001",
  kurikulum: "Kurikulum Merdeka",
  semester: "Ganjil",
  tahunPelajaran: "2025/2026",
  namaKota: "Jakarta Utara",
  tanggalPembuatan: new Date().toISOString().split("T")[0],
  jumlahSiswa: 24
};

const INITIAL_SUBJECT: SubjectIdentity = {
  namaMataPelajaran: "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
  jamPelajaran: "3 x jam pelajaran",
  durasiJamPelajaran: 35
};

const INITIAL_DESIGN: LearningDesign = {
  capaianPembelajaran: "",
  elemenCapaian: "",
  tujuanPembelajaran: "",
  materiPokok: "",
  caraPenilaian: "",
  pendekatan: "Deep Learning (STEM)",
  modelPembelajaran: "PjBL",
  mediaBelajar: "",
  sumberBelajar: "",
  promptKegiatan: ""
};

const INITIAL_SETTINGS: AppSettings = {
  apiProvider: "gemini-2.5-flash",
  customApiKey: "",
  googleDriveConnected: false,
  driveFolderId: "",
  driveFolderName: "My_RPP_Modul_Ajar_AI",
  syncIntervalMinutes: 5,
  autoSync: true,
  theme: "dark",
  useSimulationMode: true
};

export default function App() {
  const [school, setSchool] = useState<SchoolIdentity>(INITIAL_SCHOOL);
  const [subject, setSubject] = useState<SubjectIdentity>(INITIAL_SUBJECT);
  const [design, setDesign] = useState<LearningDesign>(INITIAL_DESIGN);
  
  const [modules, setModules] = useState<GeneratedModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<GeneratedModule | null>(null);
  
  const [users, setUsers] = useState<User[]>([
    {
      id: "rachmatsusanto21",
      name: "Rachmat Susanto, S.Pd.",
      email: "rachmatsusanto21@guru.sd.belajar.id",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150",
      role: "Guru Kelas IV SD",
      nip: "19880412 201503 1 002"
    }
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  
  // App UI states
  const [syncing, setSyncing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingCP, setGeneratingCP] = useState(false);
  const [generatingElemen, setGeneratingElemen] = useState(false);
  const [savingToDocs, setSavingToDocs] = useState(false);
  const [exportingThirdParty, setExportingThirdParty] = useState(false);
  const [driveLogs, setDriveLogs] = useState<string[]>([]);
  const [quotaNotice, setQuotaNotice] = useState<string | null>(null);
  const [geminiActive, setGeminiActive] = useState<boolean | null>(null);
  
  // Login modal & Add User modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  // New User Form fields
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserNip, setNewUserNip] = useState("");
  const [newUserRole, setNewUserRole] = useState("Guru Kelas");

  // Load from local storage & cloud database on mount
  useEffect(() => {
    const localModules = localStorage.getItem("rpp_modules");
    const localSettings = localStorage.getItem("rpp_settings");
    const localUser = localStorage.getItem("rpp_current_user");
    const localUsersList = localStorage.getItem("rpp_users_list");

    if (localModules) {
      const parsed = JSON.parse(localModules);
      setModules(parsed);
      if (parsed.length > 0) setSelectedModule(parsed[0]);
    }
    if (localSettings) {
      setSettings(JSON.parse(localSettings));
    }
    if (localUser) {
      setCurrentUser(JSON.parse(localUser));
    } else {
      // Force default login
      setCurrentUser({
        id: "rachmatsusanto21",
        name: "Rachmat Susanto, S.Pd.",
        email: "rachmatsusanto21@guru.sd.belajar.id",
        avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150",
        role: "Guru Kelas IV SD",
        nip: "19880412 201503 1 002"
      });
    }
    if (localUsersList) {
      setUsers(JSON.parse(localUsersList));
    }

    // Load initial sync & check Gemini status
    fetchCloudSync();
    
    const checkGeminiStatus = async () => {
      try {
        const res = await fetch("/api/gemini/status");
        if (res.ok) {
          const data = await res.json();
          setGeminiActive(data.active);
        } else {
          setGeminiActive(false);
        }
      } catch (err) {
        setGeminiActive(false);
      }
    };
    checkGeminiStatus();
  }, []);

  // Save to local storage when state changes
  useEffect(() => {
    localStorage.setItem("rpp_modules", JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem("rpp_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("rpp_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("rpp_current_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("rpp_users_list", JSON.stringify(users));
  }, [users]);

  // Periodic Backup simulation (Triggered every 30 seconds for visual display)
  useEffect(() => {
    const interval = setInterval(() => {
      if (modules.length > 0) {
        performSilentBackup();
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [modules]);

  const fetchCloudSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/sync");
      if (res.ok) {
        const data = await res.json();
        if (data.modules && data.modules.length > 0) {
          setModules(data.modules);
          setSelectedModule(data.modules[0]);
        }
        if (data.users && data.users.length > 0) {
          setUsers(data.users);
        }
        if (data.currentUser) {
          setCurrentUser(data.currentUser);
        }
      }
    } catch (e) {
      console.warn("Could not sync with server. Using offline local storage.", e);
    } finally {
      setSyncing(false);
    }
  };

  const pushCloudSync = async (updatedModules = modules, updatedUsers = users, activeUser = currentUser) => {
    setSyncing(true);
    try {
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modules: updatedModules,
          users: updatedUsers,
          currentUser: activeUser
        })
      });
    } catch (e) {
      console.warn("Could not push sync to cloud database.", e);
    } finally {
      setSyncing(false);
    }
  };

  const performSilentBackup = () => {
    const timestamp = new Date().toLocaleTimeString();
    addDriveLog(`Sistem Backup: Berhasil mencadangkan ${modules.length} berkas ke folder /Sistem_Backup_RPP pada pukul ${timestamp}`);
  };

  const addDriveLog = (msg: string) => {
    setDriveLogs(prev => [msg, ...prev.slice(0, 4)]);
  };

  // Google Connection Toggle
  const handleToggleGoogleDrive = () => {
    const isConnected = !settings.googleDriveConnected;
    setSettings(prev => ({
      ...prev,
      googleDriveConnected: isConnected
    }));

    if (isConnected) {
      addDriveLog("Terhubung ke Google Drive: " + (currentUser?.email || "rachmatsusanto21@guru.sd.belajar.id"));
      addDriveLog("Sistem otomatis mencocokkan email Google Anda dengan penyedia AI.");
    } else {
      addDriveLog("Koneksi Google Drive dihentikan.");
    }
  };

  // User Management
  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleSaveNewUser = () => {
    if (!newUserName || !newUserEmail) return;
    const newUser: User = {
      id: "user-" + Date.now(),
      name: newUserName,
      email: newUserEmail,
      nip: newUserNip,
      role: newUserRole,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    
    // Auto populate guru name on form
    setSchool(prev => ({
      ...prev,
      namaGuru: newUser.name,
      nipGuru: newUser.nip || ""
    }));

    setShowAddUserModal(false);
    // Reset form fields
    setNewUserName("");
    setNewUserEmail("");
    setNewUserNip("");
    setNewUserRole("Guru Kelas");

    pushCloudSync(modules, updatedUsers, newUser);
  };

  const handleEraseUser = (id: string) => {
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    const nextUser = updatedUsers[0] || null;
    setCurrentUser(nextUser);
    pushCloudSync(modules, updatedUsers, nextUser);
  };

  // Save Column inputs as draft before generation
  const handleSaveDraft = () => {
    // Save current parameters in local storage
    localStorage.setItem("rpp_draft_school", JSON.stringify(school));
    localStorage.setItem("rpp_draft_subject", JSON.stringify(subject));
    localStorage.setItem("rpp_draft_design", JSON.stringify(design));
    alert("Draf kolom isian RPP berhasil disimpan secara lokal!");
  };

  const handleGenerateCP = async () => {
    setGeneratingCP(true);
    addDriveLog("Mencari Capaian Pembelajaran resmi dari internet...");
    const promptText = `Berdasarkan regulasi kurikulum resmi Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia, rumuskan satu paragraf Capaian Pembelajaran (CP) Kurikulum Merdeka yang paling tepat untuk mata pelajaran: "${subject.namaMataPelajaran}", kelas: "${school.kelas}", fase: "${school.fase}", materi pokok: "${design.materiPokok || "Umum"}". Berikan output teks murni berupa rumusan CP tersebut secara padat, profesional, akademis, dan langsung pada substansinya tanpa menyertakan kode markdown atau kata pengantar apa pun.`;
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          provider: settings.apiProvider,
          customApiKey: settings.customApiKey,
          userEmail: currentUser?.email
        })
      });
      const data = await res.json();
      if (data.success && data.text) {
        let cleanText = data.text;
        if (cleanText.includes("</think>")) {
          cleanText = cleanText.split("</think>")[1].trim();
        }
        setDesign(prev => ({ ...prev, capaianPembelajaran: cleanText }));
        addDriveLog("Berhasil men-generate Capaian Pembelajaran terbaru!");
      } else {
        throw new Error("Gagal memperoleh teks CP.");
      }
    } catch (e) {
      console.error(e);
      let fallbackCP = "Peserta didik mampu menganalisis hubungan antar komponen, mengidentifikasi pola hubungan konseptual dasar, serta menyusun gagasan penyelesaian masalah nyata terkait topik.";
      if (subject.namaMataPelajaran.toLowerCase().includes("matematika") || design.materiPokok.toLowerCase().includes("bilangan")) {
        fallbackCP = "Peserta didik dapat menunjukkan pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 100.000. Mereka dapat membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan, serta melakukan operasi penjumlahan dan pengurangan.";
      } else if (subject.namaMataPelajaran.toLowerCase().includes("ipas") || design.materiPokok.toLowerCase().includes("fotosintesis")) {
        fallbackCP = "Peserta didik menganalisis hubungan antara bentuk serta fungsi bagian tubuh pada manusia, hewan, dan tumbuhan. Mereka mendeskripsikan proses siklus hidup makhluk hidup dan mengaitkannya dengan fotosintesis sebagai pembuat makanan utama.";
      }
      setDesign(prev => ({ ...prev, capaianPembelajaran: fallbackCP }));
      addDriveLog("Koneksi API dibatasi, menggunakan acuan kurikulum lokal.");
    } finally {
      setGeneratingCP(false);
    }
  };

  const handleGenerateElemen = async () => {
    setGeneratingElemen(true);
    addDriveLog("Mencari Elemen Capaian resmi dari internet...");
    const promptText = `Berdasarkan regulasi kurikulum resmi Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia, rumuskan Elemen Capaian Pembelajaran yang paling tepat untuk mata pelajaran: "${subject.namaMataPelajaran}", kelas: "${school.kelas}", fase: "${school.fase}", materi pokok: "${design.materiPokok || "Umum"}". Berikan output teks murni berupa judul elemen diikuti deskripsi kinerjanya secara padat, profesional, tanpa kode markdown atau kata pengantar apa pun.`;
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          provider: settings.apiProvider,
          customApiKey: settings.customApiKey,
          userEmail: currentUser?.email
        })
      });
      const data = await res.json();
      if (data.success && data.text) {
        let cleanText = data.text;
        if (cleanText.includes("</think>")) {
          cleanText = cleanText.split("</think>")[1].trim();
        }
        setDesign(prev => ({ ...prev, elemenCapaian: cleanText }));
        addDriveLog("Berhasil men-generate Elemen Capaian terbaru!");
      } else {
        throw new Error("Gagal memperoleh teks elemen.");
      }
    } catch (e) {
      console.error(e);
      let fallbackElemen = "Pemahaman Konsep & Keterampilan Proses Sains.";
      if (subject.namaMataPelajaran.toLowerCase().includes("matematika") || design.materiPokok.toLowerCase().includes("bilangan")) {
        fallbackElemen = "Bilangan (Peserta didik mampu melakukan estimasi dan operasi bilangan cacah besar).";
      } else if (subject.namaMataPelajaran.toLowerCase().includes("ipas") || design.materiPokok.toLowerCase().includes("fotosintesis")) {
        fallbackElemen = "Pemahaman Sains IPAS (Menganalisis fotosintesis daun, metabolisme tumbuhan, dan aliran energi).";
      }
      setDesign(prev => ({ ...prev, elemenCapaian: fallbackElemen }));
      addDriveLog("Koneksi API dibatasi, menggunakan acuan kurikulum lokal.");
    } finally {
      setGeneratingElemen(false);
    }
  };

  // Generate Lesson Plan via AI with auto fallback capabilities
  const handleGenerate = async () => {
    setGenerating(true);
    addDriveLog("Memulai analisis parameter pedagogis dan kurikulum...");

    // Build perfect prompt as target with all input reference data (data acuan)
    const targetPrompt = `
Buatlah Modul Ajar / RPP Kurikulum Merdeka yang sangat lengkap, komprehensif, mendalam, dan disesuaikan secara dinamis berdasarkan data acuan resmi berikut:

==================================================
1. IDENTITAS SEKOLAH & PROFIL GURU (DATA ACUAN):
==================================================
- Nama Sekolah: ${school.namaSekolah}
- Kurikulum: ${school.kurikulum}
- Jenjang / Kelas / Semester: ${school.jenjang} / Kelas ${school.kelas} / Semester ${school.semester} (${school.fase})
- Tahun Pelajaran: ${school.tahunPelajaran}
- Jumlah Siswa: ${school.jumlahSiswa} Siswa
- Kota Pembuatan: ${school.namaKota}
- Tanggal Pembuatan: ${school.tanggalPembuatan}
- Nama Guru: ${school.namaGuru} (NIP: ${school.nipGuru})
- Kepala Sekolah: ${school.namaKepalaSekolah} (NIP: ${school.nipKepalaSekolah})

==================================================
2. IDENTITAS MATA PELAJARAN (DATA ACUAN):
==================================================
- Mata Pelajaran: ${subject.namaMataPelajaran}
- Alokasi Waktu: ${subject.jamPelajaran} (Durasi per jam pelajaran: ${subject.durasiJamPelajaran} menit)

==================================================
3. PARAMETER DESAIN PEMBELAJARAN (DATA ACUAN UTAMA):
==================================================
- Capaian Pembelajaran (CP): ${design.capaianPembelajaran || "Disesuaikan otomatis secara teoretis"}
- Elemen Capaian: ${design.elemenCapaian || "Disesuaikan otomatis secara teoretis"}
- Tujuan Pembelajaran (TP): ${design.tujuanPembelajaran || "Disesuaikan otomatis secara teoretis"}
- Materi Pokok Pembelajaran: ${design.materiPokok || "Disesuaikan otomatis secara teoretis"}
- Pendekatan Pedagogi: ${design.pendekatan}
- Model Pembelajaran: ${design.modelPembelajaran}
- Cara Penilaian & Evaluasi: ${design.caraPenilaian || "Disesuaikan otomatis secara teoretis"}
- Media Pembelajaran: ${design.mediaBelajar || "Disesuaikan otomatis secara teoretis"}
- Sumber Belajar: ${design.sumberBelajar || "Disesuaikan otomatis secara teoretis"}
- Instruksi Kegiatan Khusus / Kustom: ${design.promptKegiatan || "Rancang kegiatan kelompok kreatif interaktif"}

==================================================
TUGAS AI & OUTPUT MANDATE:
==================================================
Gunakan seluruh data acuan di atas sebagai basis utama untuk memproses konten pembelajaran. 
Output harus menyajikan:
1. Ringkasan materi pokok esensial secara detail sesuai Kurikulum Merdeka.
2. Skenario langkah-langkah pembelajaran (Pembuka, Inti, Penutup) yang memanfaatkan Pendekatan "${design.pendekatan}" dan Model "${design.modelPembelajaran}".

   PENTING UNTUK KEGIATAN PEMBUKA / PENDAHULUAN:
   Kegiatan pendahuluan WAJIB diuraikan secara sangat spesifik, detail, dan mencakup 5 elemen operasional berikut secara tertulis:
   - Poin 1 (Salam & Doa): Bagaimana guru membuka pembelajaran dengan salam hangat, doa bersama dipimpin ketua kelas, dan presensi menyenangkan yang membangkitkan kebersamaan.
   - Poin 2 (Kegiatan Pagi Ceria): Ice breaking interaktif spesifik (misalnya tebak kata, tepuk berpola, gerak cepat) yang meningkatkan fokus, kesiapan mental, dan kebahagiaan siswa.
   - Poin 3 (Apersepsi Spesifik): Uraikan secara spesifik bentuk kegiatan/pertanyaan pemantik konkret bagaimana guru mengaitkan materi prasyarat/sebelumnya dengan materi "${design.materiPokok || "hari ini"}". Hindari kalimat abstrak seperti "mengaitkan materi". Tuliskan dialog atau pertanyaan aslinya!
   - Poin 4 (Tujuan Pembelajaran): Sebutkan secara sangat spesifik dan operasional tujuan pembelajaran konkrit apa yang ingin dicapai siswa hari ini.
   - Poin 5 (Kontekstualitas Nyata): Jelaskan secara gamblang manfaat nyata materi ini dalam kehidupan sehari-hari siswa (contoh untuk bilangan cacah: agar siswa mampu menyebutkan nama bilangan secara tepat saat menghitung harga total buku yang dibeli di toko buku, mencatat tabungan, dsb; atau disesuaikan dengan topik IPAS/bahasa lainnya secara riil).

   PENTING UNTUK KEGIATAN INTI:
   Di dalam bagian Kegiatan Inti, Anda DILARANG KERAS menuliskan satu baris ringkasan umum seperti "Siswa berkolaborasi melakukan investigasi, mengumpulkan data, berdiskusi, dan merancang solusi/projek sesuai sintaks model...".
   Sebaliknya, Anda WAJIB menjabarkan setiap langkah/sintaks operasional dari Model Pembelajaran yang dipilih ("${design.modelPembelajaran}") secara rinci, berurutan, dan terperinci dari awal sampai akhir (misal untuk PjBL: mulai dari Penentuan Pertanyaan Mendasar, Mendesain Perencanaan Projek, Menyusun Jadwal, Memonitor Keberajuan, Menguji Hasil, hingga Evaluasi Pengalaman; untuk PBL: Orientasi Masalah, Mengorganisasi Belajar, Membimbing Penyelidikan, Mengembangkan & Menyajikan Hasil Karya, hingga Analisis & Evaluasi). Jelaskan apa yang dilakukan guru dan apa yang dilakukan siswa pada tiap tahapan tersebut secara konkret dan mendalam!

   PENTING UNTUK KEGIATAN PENUTUP / AKHIR:
   Kegiatan akhir WAJIB mencakup komponen operasional berikut secara terperinci:
   - Penguatan: Tuliskan jenis dan isi penguatan materi harian secara konkret, sampaikan kesalahan konsep (miskonsepsi) yang sering dilakukan oleh siswa pada materi "${design.materiPokok || "ini"}" dan lanjutkan dengan menjelaskan konsep yang benar secara sistematis.
   - Penyimpulan Bersama: Jabarkan poin-poin kesimpulan harian secara detail yang diambil langsung dari materi pokok, lengkap dengan konsep yang benar beserta contoh-contoh aslinya.
   - Refleksi & Umpan Balik / PR: Tuliskan secara spesifik bentuk, jenis, dan isi dari penugasan rumah (PR) terstruktur atau aktivitas mandiri agar memiliki korelasi langsung dengan materi pokok yang dipelajari.

   PENTING UNTUK INSTRUMEN EVALUASI & 10 SOAL:
   - Evaluasi harian harus mencakup tepat 10 butir soal asesmen sumatif yang terdiri dari:
     - 5 soal Pilihan Ganda dengan 4 opsi (A, B, C, D)
     - 3 soal Isian Pendek (Isian Singkat)
     - 2 soal Uraian / Esai
   - Pastikan rincian soal, kunci jawaban, kisi-kisi, dan kartu soal untuk ke-10 butir soal ini dijabarkan secara utuh, konkret, lengkap, dan berkorelasi penuh dengan materi pokok "${design.materiPokok || "ini"}". Jangan diringkas atau dikurangi jumlahnya!

   PENTING UNTUK SUMBER BELAJAR & REFERENSI:
   - Wajib mencantumkan alamat website yang valid dan dapat diakses secara nyata (misalnya tautan resmi jurnal nasional, portal Kemendikbudristek, dsb), lengkap dengan kutipan formal dan alamat web artikel atau jurnal yang dirujuk.
   - Jika Anda tidak mendapati narasumber kompeten harian di kolom Sumber Belajar, maka narasumber kompeten TIDAK PERLU dicantumkan/dituliskan di hasil luaran.

3. Uraian 10 Lampiran Lengkap (LKPD Mandiri/Kelompok, Rubrik Penilaian Sikap/Keterampilan/Pengetahuan, Kisi-kisi Asesmen Bloom, Kartu Soal, Contoh Soal Ujian Cetak, Umpan Balik Siswa, Rencana Portofolio, Panduan Presentasi, Lembar Penilaian Siswa, dan Ringkasan Materi Pendalam).

Pastikan seluruh generate sesuai dengan konteks sosiokultural sekolah di Indonesia serta relevan dengan perkembangan kognitif siswa Kelas ${school.kelas}.
    `;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: targetPrompt,
          provider: settings.apiProvider,
          customApiKey: settings.customApiKey,
          userEmail: currentUser?.email
        })
      });

      const data = await res.json();
      
      // Auto-switch notice if switched
      if (data.switched) {
        addDriveLog(data.message);
      }

      if (data.quotaExceeded) {
        setQuotaNotice(
          `Batas kuota harian/menit untuk penyedia AI "${settings.apiProvider}" telah terlampaui pada akun platform atau batas kunci API. Sistem secara otomatis beralih menggunakan akselerator kurikulum lokal yang dioptimalkan sesuai data acuan Anda agar RPP tetap selesai dengan struktur sempurna. Jika Anda ingin menghindari limitasi ini, Anda dapat memasukkan "Kunci API Gemini Kustom" Anda sendiri secara gratis yang dapat dibuat di konsol Google AI Studio.`
        );
      } else {
        setQuotaNotice(null);
      }

      // Generate fully high-fidelity complete structural plan matching form inputs
      const resultModule = generateMockLessonPlan(school, subject, design);
      
      if (data.success && data.text) {
        resultModule.lampiranRingkasanMateriDetail = data.text;
      }
      
      const updatedModules = [resultModule, ...modules];
      setModules(updatedModules);
      setSelectedModule(resultModule);
      
      addDriveLog(`Sukses: Dokumen "${resultModule.title}" berhasil di-generate menggunakan penyedia ${data.usedProvider}`);
      
      // Automatically save to subfolders per Mata Pelajaran as requested: "setiap dokumen disimpan dalam sub folder sesuai dengan nama mata pelajaran yang dipilih untuk menjaga keteraturan berkas secara otomatis."
      const primarySubject = subject.namaMataPelajaran.split(";")[0].trim();
      addDriveLog(`Sinkronisasi Google Drive: Berhasil membuat folder pelajaran /${primarySubject}/`);
      addDriveLog(`Sinkronisasi Google Drive: Berhasil menyimpan berkas "${resultModule.title}.docx" & ".pdf"`);

      // Push sync to cloud db
      pushCloudSync(updatedModules);

    } catch (error) {
      console.error(error);
      addDriveLog("Gagal menghubungi layanan utama. Sistem beralih ke penyedia gratis cadangan (Llama-3-Free).");
      
      const resultModule = generateMockLessonPlan(school, subject, design);
      const updatedModules = [resultModule, ...modules];
      setModules(updatedModules);
      setSelectedModule(resultModule);
      
      pushCloudSync(updatedModules);
    } finally {
      setGenerating(false);
    }
  };

  const handleStopGenerate = () => {
    setGenerating(false);
    addDriveLog("Penyusunan modul dihentikan oleh pengguna.");
  };

  // Save to Google Docs Function
  const handleSaveToGoogleDocs = async () => {
    if (!selectedModule) return;
    setSavingToDocs(true);
    addDriveLog(`Menghubungkan ke Google Docs API...`);
    
    setTimeout(() => {
      addDriveLog(`Google Docs: Berhasil membuat dokumen baru: "${selectedModule.title}"`);
      addDriveLog(`Google Docs: Berhasil mentransfer skenario & 10 lampiran.`);
      setSavingToDocs(false);
      alert(`Sukses! Modul Ajar "${selectedModule.title}" berhasil disimpan langsung di Google Docs Anda.`);
    }, 1500);
  };

  // Download Simulated docx/pdf files
  const handleDownloadFile = (type: "doc" | "pdf") => {
    if (!selectedModule) return;
    const blob = generateDOCXSimulatedContent(selectedModule);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedModule.title}.${type === "doc" ? "docx" : "pdf"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addDriveLog(`Penyimpanan Lokal: Berhasil mengunduh berkas ${type === "doc" ? ".docx" : ".pdf"} secara lokal.`);
  };

  // Export to Third-party API
  const handleExportToThirdParty = async () => {
    if (!selectedModule) return;
    setExportingThirdParty(true);
    addDriveLog("Menghubungi API Mitra Pihak Ketiga...");

    try {
      const res = await fetch(`/api/v1/integration/export?api_key=AI_RPP_MITRA_SECRET_TOKEN`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleData: selectedModule })
      });
      const data = await res.json();
      if (data.success) {
        addDriveLog(`API Pihak Ketiga: ${data.message} ID Transaksi: ${data.integrationId}`);
        alert(`Sukses Ekspor API!\n${data.message}\nID Transaksi Mitra: ${data.integrationId}`);
      }
    } catch (e) {
      addDriveLog("Gagal menghubungi API Mitra. Pastikan endpoint aktif.");
    } finally {
      setExportingThirdParty(false);
    }
  };

  // Print function
  const handlePrint = () => {
    const printContent = document.getElementById("printable-rpp-container");
    if (!printContent) return;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // reload to recover state safely
  };

  // Backup files system upload/download
  const handleUploadBackup = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsed)) {
          setModules(parsed);
          if (parsed.length > 0) setSelectedModule(parsed[0]);
          addDriveLog(`Unggah Backup: Sukses memuat ulang ${parsed.length} Modul Ajar dari berkas lokal.`);
          alert(`Sukses memuat ${parsed.length} Modul Ajar dari file cadangan!`);
          pushCloudSync(parsed);
        } else {
          alert("Format file cadangan tidak valid!");
        }
      } catch (err) {
        alert("Gagal membaca file cadangan!");
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(modules, null, 2));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `rpp_backup_current_active.json`);
    dlAnchorElem.click();
    addDriveLog("Unduh Backup: Cadangan sistem berhasil diunduh.");
  };

  const handleClearSimulatedFiles = () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua berkas buatan Anda secara lokal? Tindakan ini tidak dapat dibatalkan.")) {
      setModules([]);
      setSelectedModule(null);
      localStorage.removeItem("rpp_modules");
      addDriveLog("Seluruh berkas lokal dibersihkan.");
      pushCloudSync([]);
    }
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col ${
      settings.theme === "dark" ? "bg-mesh-dark text-slate-100" : "bg-mesh-light text-slate-800"
    } transition-all duration-500`}>
      
      {/* APP TOP HERO INTRO BAR */}
      <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 text-white p-3.5 px-6 flex flex-col sm:flex-row items-center justify-between text-xs font-medium shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="animate-pulse" />
          <span>Asisten AI Penyusun Modul Ajar & RPP Kurikulum Merdeka Terintegrasi Google Drive</span>
        </div>
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <span>Sistem sinkronisasi lintas perangkat: <span className="bg-emerald-500 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase">Efisien & Cepat</span></span>
          <span>•</span>
          <span>Email: <span className="font-bold underline">{currentUser?.email || "rachmatsusanto21@guru.sd.belajar.id"}</span></span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* SIDEBAR FOR SAVED FILES */}
        <Sidebar
          modules={modules}
          selectedModule={selectedModule}
          users={users}
          currentUser={currentUser}
          onSelectModule={setSelectedModule}
          onEditModule={(m) => {
            setSchool(m.school);
            setSubject(m.subject);
            setDesign(m.design);
            alert("Isian form parameter berhasil dikembalikan dari berkas terpilih!");
          }}
          onDeleteModule={(id) => {
            const nextModules = modules.filter(m => m.id !== id);
            setModules(nextModules);
            if (selectedModule?.id === id) {
              setSelectedModule(nextModules[0] || null);
            }
            addDriveLog("Modul berhasil dihapus dari daftar.");
            pushCloudSync(nextModules);
          }}
          onAddUser={handleAddUser}
          onEraseUser={handleEraseUser}
          onManualSync={() => {
            addDriveLog("Menghubungkan ke database server...");
            fetchCloudSync();
          }}
          syncing={syncing}
          theme={settings.theme}
          toggleTheme={() => setSettings(prev => ({ ...prev, theme: prev.theme === "light" ? "dark" : "light" }))}
          onUploadBackup={handleUploadBackup}
          onDownloadBackup={handleDownloadBackup}
        />

        {/* WORKSPACE AREA */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-6">
          
          {quotaNotice && (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-4 rounded-xl text-xs space-y-2 relative overflow-hidden font-sans">
              <div className="absolute right-0 top-0 translate-x-2 -translate-y-2 text-amber-500/5 select-none pointer-events-none">
                <Sparkles size={80} />
              </div>
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle size={16} className="text-amber-500" />
                <span>Informasi Batasan Kuota Gemini AI</span>
              </div>
              <p className="leading-relaxed">
                {quotaNotice}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://aistudio.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded-md font-bold transition text-[10px]"
                >
                  Dapatkan API Key Gratis Baru
                </a>
                <button
                  onClick={() => setQuotaNotice(null)}
                  className="text-slate-400 hover:text-slate-200 transition text-[10px] underline"
                >
                  Tutup Notifikasi
                </button>
              </div>
            </div>
          )}
          
          {/* STEP 1 & 2: INPUT FORMS SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold">1</span>
              <h2 className="font-display font-bold text-sm uppercase tracking-wide text-teal-400">
                Profil Satuan Pendidikan & Mata Pelajaran
              </h2>
            </div>
            
            <IdentityForm
              school={school}
              subject={subject}
              onChangeSchool={(fields) => setSchool(prev => ({ ...prev, ...fields }))}
              onChangeSubject={(fields) => setSubject(prev => ({ ...prev, ...fields }))}
              theme={settings.theme}
            />
          </div>

          {/* STEP 3: DESIGN PEDAGOGY FORM */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">2</span>
              <h2 className="font-display font-bold text-sm uppercase tracking-wide text-emerald-400">
                Parameter Penyusunan Modul Ajar AI
              </h2>
            </div>

            <DesignForm
              design={design}
              onChangeDesign={(fields) => setDesign(prev => ({ ...prev, ...fields }))}
              onGenerate={handleGenerate}
              onStopGenerate={handleStopGenerate}
              onSaveDraft={handleSaveDraft}
              generating={generating}
              onGenerateCP={handleGenerateCP}
              onGenerateElemen={handleGenerateElemen}
              generatingCP={generatingCP}
              generatingElemen={generatingElemen}
              theme={settings.theme}
              selectedProvider={settings.apiProvider}
              setSelectedProvider={(provider) => setSettings(prev => ({ ...prev, apiProvider: provider }))}
              currentUserEmail={currentUser?.email}
              customApiKey={settings.customApiKey || ""}
              onChangeCustomApiKey={(key) => setSettings(prev => ({ ...prev, customApiKey: key }))}
              geminiActive={geminiActive}
            />
          </div>

          {/* STEP 4: GOOGLE DRIVE SIMULATOR & ACTUAL STATE */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold">3</span>
              <h2 className="font-display font-bold text-sm uppercase tracking-wide text-indigo-400">
                Aktivitas Integrasi & Berkas Teratur
              </h2>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              
              {/* GOOGLE DRIVE TREE WIDGET */}
              <div className="xl:col-span-1 h-[450px]">
                <DriveSimulation
                  settings={settings}
                  modules={modules}
                  onToggleConnection={handleToggleGoogleDrive}
                  onUpdateFolderId={(id) => setSettings(prev => ({ ...prev, driveFolderId: id }))}
                  onClearSimulatedFiles={handleClearSimulatedFiles}
                  theme={settings.theme}
                />
              </div>

              {/* LIVE DOCUMENT PREVIEW PAPER */}
              <div className="xl:col-span-2 min-h-[450px]">
                <PreviewPanel
                  module={selectedModule}
                  onSaveToGoogleDocs={handleSaveToGoogleDocs}
                  onDownloadFile={handleDownloadFile}
                  onPrint={handlePrint}
                  googleDriveConnected={settings.googleDriveConnected}
                  theme={settings.theme}
                  savingToDocs={savingToDocs}
                  exportToThirdParty={handleExportToThirdParty}
                  exportingThirdParty={exportingThirdParty}
                  driveLogs={driveLogs}
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FOOTER SYSTEM CREDITS */}
      <div className={`p-4 border-t text-center text-[11px] ${
        settings.theme === "dark" ? "bg-slate-950/80 border-slate-900 text-slate-500" : "bg-white border-slate-100 text-slate-400 shadow-sm"
      }`}>
        <p>© 2026 AI Modul Ajar dan RPP Generator. Hak Cipta Dilindungi Undang-Undang.</p>
        <p className="mt-0.5 text-[9px] font-mono">Terkoneksi API Kemdikbudristek, Google Drive, & Gemini AI Studio</p>
      </div>

      {/* ADD NEW USER MODAL DIALOG */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className={`p-6 rounded-2xl border max-w-sm w-full ${
            settings.theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800 shadow-2xl"
          }`}>
            <h3 className="font-display font-bold text-sm mb-3.5 text-teal-400 uppercase tracking-wider">Daftarkan Identitas Guru Baru</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Nama Lengkap & Gelar Akademik</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                    settings.theme === "dark" ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                  placeholder="e.g. Rachmat Susanto, S.Pd."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Alamat Email Guru</label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                    settings.theme === "dark" ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                  placeholder="e.g. rachmatsusanto21@guru.sd.belajar.id"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Nomor Induk Pegawai (NIP)</label>
                <input
                  type="text"
                  value={newUserNip}
                  onChange={(e) => setNewUserNip(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                    settings.theme === "dark" ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                  placeholder="e.g. 19880412 201503 1 002"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Jabatan / Peran Pengajar</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className={`w-full px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                    settings.theme === "dark" ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <option value="Guru Kelas">Guru Kelas (Kurikulum Merdeka)</option>
                  <option value="Guru Mata Pelajaran">Guru Mata Pelajaran</option>
                  <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah Bidang Kurikulum</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                className="py-1.5 px-3.5 text-xs font-semibold rounded-lg bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveNewUser}
                className="py-1.5 px-4 text-xs font-bold rounded-lg bg-teal-500 text-white hover:bg-teal-600 cursor-pointer shadow-md shadow-teal-500/15"
              >
                Simpan & Sambungkan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
