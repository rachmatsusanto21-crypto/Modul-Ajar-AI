export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  nip?: string;
}

export interface AppSettings {
  apiProvider: string;
  customApiKey: string;
  googleDriveConnected: boolean;
  driveFolderId: string;
  driveFolderName: string;
  syncIntervalMinutes: number;
  autoSync: boolean;
  theme: "light" | "dark";
  useSimulationMode: boolean; // For demo/preview fallback
}

export interface SchoolIdentity {
  jenjang: "SD" | "SMP" | "SMA";
  namaSekolah: string;
  fase: string; // Fase A - Z
  kelas: string; // Kelas I - XII
  paralel: string; // Paralel A - Z
  namaGuru: string;
  nipGuru: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  kurikulum: "K-13" | "Kurikulum Merdeka" | "Kombinasi";
  semester: "Ganjil" | "Genap";
  tahunPelajaran: string;
  namaKota: string;
  tanggalPembuatan: string;
  jumlahSiswa: number;
}

export interface SubjectIdentity {
  namaMataPelajaran: string; // Can be multi-subjects separated by ";"
  jamPelajaran: string; // e.g. "3 x jam pelajaran"
  durasiJamPelajaran: number; // e.g. 30/35/40/45 menit
}

export interface LearningDesign {
  capaianPembelajaran: string;
  elemenCapaian: string;
  tujuanPembelajaran: string;
  materiPokok: string;
  caraPenilaian: string;
  pendekatan: string; // e.g. deep learning, STEM, kombinasi, dll (manual)
  modelPembelajaran: "PjBL" | "PBL" | "Discovery" | "Inquiry";
  mediaBelajar: string;
  sumberBelajar: string;
  promptKegiatan: string;
}

export interface GeneratedModule {
  id: string;
  title: string;
  createdAt: string;
  school: SchoolIdentity;
  subject: SubjectIdentity;
  design: LearningDesign;
  
  // Optional generated details
  karakteristikSiswa?: string;
  analisisMateri?: string;
  dimensiProfilLulusan: string[];
  kaih7?: string[]; // 7 KAIH for co-curricular

  // Learning activities table
  kegiatanBelajar: {
    tahapan: "Awal" | "Inti" | "Akhir";
    sintaks: string;
    kegiatan: string;
    alokasiWaktu: string;
    keterangan: string;
  }[];

  // Bottom parameters
  mediaDihasilkan: string[];
  sumberDihasilkan: string[];
  asesmenSikap: string;
  asesmenKeterampilan: string;
  asesmenKognitif: string;
  asesmenFormatif: string;
  asesmenSumatif: string;
  glosarium: { istilah: string; arti: string }[];

  // Appendices (Lampiran)
  lampiranLKPD: {
    kegiatanKelompok: string;
    kegiatanIndividu: string;
    ringkasanMateri: string;
    visualSuggestion?: string; // suggestion or code to render SVG/Canvas
  };
  lampiranRubrikPenilaian: {
    formatif: { kriteria: string; indikator: string; skor4: string; skor3: string; skor2: string; skor1: string }[];
    sumatif: { kriteria: string; indikator: string; skor4: string; skor3: string; skor2: string; skor1: string }[];
  };
  lampiranKisiKisiSoal: {
    indikator: string;
    levelKognitif: string;
    jenisSoal: string;
    rincianSoal: string;
    kunciJawaban: string;
    poin: number;
    nomorSoal: number;
  }[];
  lampiranKartuSoal: {
    nomorSoal: number;
    kisiKisiRef: string;
    soal: string;
    kunci: string;
  }[];
  lampiranCetakSoal: string;
  lampiranUmpanBalik: string;
  lampiranPortofolio: string;
  lampiranAIPresentasi: string;
  lampiranPenilaianSiswa: { namaSiswa: string; nilaiSikap: string; nilaiKeterampilan: string; nilaiKognitif: string }[];
  lampiranRingkasanMateriDetail: string; // Max 500 words with references
}
