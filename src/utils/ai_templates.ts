import { GeneratedModule, SchoolIdentity, SubjectIdentity, LearningDesign } from "../types";

// Dynamic content helper to generate rich, precise pedagogical Indonesian text
export function generateMockLessonPlan(
  school: SchoolIdentity,
  subject: SubjectIdentity,
  design: LearningDesign,
  id: string = "modul-" + Date.now()
): GeneratedModule {
  const isCocurricular = subject.namaMataPelajaran.includes(";");
  const subjectsList = subject.namaMataPelajaran.split(";").map(s => s.trim());
  const primarySubject = subjectsList[0] || "Umum";

  // Dimensi Profil Pelajar Pancasila
  const pppList = [
    "Bernalar Kritis: Mampu memproses informasi dan menganalisis serta mengevaluasi argumen secara mendalam.",
    "Kreatif: Menghasilkan gagasan orisinal, serta memiliki keluwesan berpikir dalam mencari alternatif solusi.",
    "Gotong Royong: Kemampuan melakukan kegiatan secara bersama-sama dengan suka rela agar berjalan lancar.",
    "Mandiri: Memiliki kesadaran akan diri dan situasi yang dihadapi serta regulasi diri."
  ];

  // 7 KAIH (7 Karakter Akhlakul Karimah & Nilai Keutamaan) - relevant for co-curricular
  const kaih7List = [
    "KAIH 1: Integritas & Kejujuran dalam bertindak dan menyampaikan ide lintas bidang ilmu.",
    "KAIH 2: Toleransi & Menghargai perbedaan sudut pandang antar disiplin ilmu.",
    "KAIH 3: Kedisiplinan & Tanggung Jawab atas hasil projek kolaboratif.",
    "KAIH 4: Kesantunan dalam berkomunikasi dan berdiskusi kelompok.",
    "KAIH 5: Kerja Sama & Sinergi antar anggota kelompok lintas minat.",
    "KAIH 6: Keberanian berinovasi dan mencoba memecahkan masalah kontekstual.",
    "KAIH 7: Kepedulian Sosial & Lingkungan dalam merancang solusi yang ramah lingkungan."
  ];

  // Generate kegiatan belajar table content according to model & approach
  let sintaksAwal = "Orientasi";
  let sintaksInti1 = "Eksplorasi";
  let sintaksInti2 = "Kolaborasi";
  let sintaksAkhir = "Refleksi & Evaluasi";

  if (design.modelPembelajaran === "PjBL") {
    sintaksAwal = "Penentuan Pertanyaan Mendasar";
    sintaksInti1 = "Mendesain Perencanaan Projek & Menyusun Jadwal";
    sintaksInti2 = "Memonitor Keberajuan Projek & Menguji Hasil";
    sintaksAkhir = "Evaluasi Pengalaman Belajar";
  } else if (design.modelPembelajaran === "PBL") {
    sintaksAwal = "Orientasi Siswa pada Masalah";
    sintaksInti1 = "Mengorganisasi Siswa untuk Belajar";
    sintaksInti2 = "Membimbing Penyelidikan Individu/Kelompok";
    sintaksAkhir = "Menganalisis & Mengevaluasi Proses";
  } else if (design.modelPembelajaran === "Discovery") {
    sintaksAwal = "Pemberian Rangsangan (Stimulation)";
    sintaksInti1 = "Pernyataan/Identifikasi Masalah (Problem Statement)";
    sintaksInti2 = "Pengumpulan & Pengolahan Data (Data Processing)";
    sintaksAkhir = "Pembuktian (Verification) & Penarikan Kesimpulan";
  } else if (design.modelPembelajaran === "Inquiry") {
    sintaksAwal = "Orientasi Masalah & Merumuskan Pertanyaan";
    sintaksInti1 = "Merumuskan Hipotesis & Mengumpulkan Data";
    sintaksInti2 = "Menguji Hipotesis Berdasarkan Bukti Nyata";
    sintaksAkhir = "Merumuskan Kesimpulan & Refleksi Proses";
  }

  const durationPerHr = subject.durasiJamPelajaran;
  const numHrs = parseInt(subject.jamPelajaran) || 3;
  const totalMinutes = numHrs * durationPerHr;

  const waktuAwal = Math.round(totalMinutes * 0.15) + " menit";
  const waktuInti = Math.round(totalMinutes * 0.70) + " menit";
  const waktuAkhir = Math.round(totalMinutes * 0.15) + " menit";

  // Create list of students
  const studentNames = [
    "Achmad Fauzi", "Aisyah Putri", "Anindya Lestari", "Bagus Tri", "Citra Kirana",
    "Dewi Lestari", "Eko Prasetyo", "Fajar Hidayat", "Gita Gutawa", "Hadi Wijaya",
    "Indah Permata", "Joko Susilo", "Kartika Sari", "Lukman Hakim", "Megawati",
    "Naufal Abdi", "Putu Gede", "Rina Marlina", "Siti Aminah", "Taufik Hidayat",
    "Umar Faruq", "Vina Panduwinata", "Wawan Setiawan", "Yusuf Habibie", "Zaskia Adya"
  ];
  const listAssessmentSiswa = Array.from({ length: Math.min(school.jumlahSiswa, 25) }, (_, i) => ({
    namaSiswa: studentNames[i] || `Siswa Kelas ${i + 1}`,
    nilaiSikap: ["Amat Baik (SB)", "Baik (B)", "Cukup (C)"][Math.floor(Math.random() * 3)],
    nilaiKeterampilan: Math.floor(Math.random() * 16 + 85).toString(),
    nilaiKognitif: Math.floor(Math.random() * 21 + 80).toString(),
  }));

  // Glosarium KBBI
  const keywordsInSubject = primarySubject.toLowerCase();
  let customGlosarium = [
    { istilah: "Modul", arti: "Unit terkecil dari program belajar-mengajar yang dirancang secara sistematis sesuai KBBI." },
    { istilah: "Pedagogi", arti: "Ilmu atau seni mengajar anak-anak; cara mendidik yang terstruktur secara akademis." },
    { istilah: "Kurikulum", arti: "Perangkat mata pelajaran dan program pendidikan yang diselenggarakan oleh suatu lembaga pendidikan." }
  ];

  if (keywordsInSubject.includes("ipa") || keywordsInSubject.includes("sains")) {
    customGlosarium.push(
      { istilah: "Hipotesis", arti: "Sesuatu yang dianggap benar untuk alasan pengutaraan pendapat meskipun kebenarannya masih harus dibuktikan." },
      { istilah: "Simulasi", arti: "Metode pelatihan yang memperagakan sesuatu dalam bentuk tiruan yang mirip dengan keadaan yang sesungguhnya." }
    );
  } else if (keywordsInSubject.includes("matematika") || keywordsInSubject.includes("angka")) {
    customGlosarium.push(
      { istilah: "Numerasi", arti: "Kemampuan untuk mengaplikasikan konsep bilangan dan simbol dalam matematika di kehidupan nyata sehari-hari." },
      { istilah: "Algoritma", arti: "Prosedur sistematis untuk memecahkan masalah matematis dalam langkah-langkah terbatas." }
    );
  } else {
    customGlosarium.push(
      { istilah: "Kompetensi", arti: "Kewenangan atau kekuasaan untuk menentukan atau memutuskan sesuatu berdasarkan standar yang disepakati." },
      { istilah: "Apersepsi", arti: "Pengamatan sadar tentang penafsiran terhadap sesuatu hal yang diasosiasikan dengan pengetahuan yang sudah dimiliki." }
    );
  }

  // Generate detailed core material summary (max 500 words)
  const ringkasanDetailText = `
Materi pokok "${design.materiPokok}" ini berfokus pada penguasaan konsep esensial yang sangat penting dalam kehidupan siswa. Berdasarkan standar nasional pendidikan, kajian ini mencakup struktur fundamental materi, prinsip-prinsip operasional, dan aplikasi praktisnya secara berkelanjutan.

Pertama, siswa akan mengeksplorasi fondasi dasar dari materi ini melalui observasi dan simulasi digital yang interaktif. Pendekatan "${design.pendekatan}" memungkinkan siswa untuk menghubungkan teori abstrak dengan fenomena nyata yang mereka alami sehari-hari.

Kedua, penguatan literasi dan numerasi disisipkan secara mulus dalam setiap aktivitas individu dan kelompok. Melalui aktivitas kolaboratif berorientasi masalah, kompetensi abad ke-21 yaitu berpikir kritis, kreativitas, komunikasi, dan kolaborasi akan terasah secara mendalam. Hal ini selaras dengan Profil Pelajar Pancasila yang menuntut kemandirian dan daya nalar tinggi dalam memecahkan masalah.

Referensi & Daftar Rujukan:
1. Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP) Kemendikbudristek (2024) - Panduan Pembelajaran dan Asesmen.
2. Jurnal Pendidikan Indonesia, Vol. 12, No. 3 (2025) - "Implementasi Pembelajaran Kontekstual Berbasis STEM dan Deep Learning".
3. Pusat Kurikulum dan Perbukuan (2023) - Buku Panduan Guru Mata Pelajaran ${primarySubject} Kelas ${school.kelas}.
4. Website Portal Rumah Belajar Kemdikbud (https://belajar.kemdikbud.go.id) - Modul Simulasi Interaktif Materi Esensial.
  `.trim();

  return {
    id,
    title: `Modul Ajar - ${primarySubject} Kelas ${school.kelas} - ${design.materiPokok}`,
    createdAt: new Date().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    school,
    subject,
    design,
    karakteristikSiswa: `Secara umum, peserta didik di kelas ini didominasi oleh gaya belajar kinestetik (45%) dan visual (35%), sementara sebagian kecil audiotori (20%). Ada 2 siswa teridentifikasi lambat belajar dalam memahami konsep simbolis, memerlukan pendampingan diferensiasi konten berupa alat peraga visual konkrit. Kemampuan awal siswa rata-rata menunjukkan tingkat pemahaman 70% terhadap topik prasyarat.`,
    analisisMateri: `Materi esensial mencakup penguasaan struktur dasar dari ${design.materiPokok}, mekanismenya, serta implementasinya di kehidupan nyata. Konsep prasyarat yang wajib dikuasai siswa adalah pemahaman dasar operasi/topik pengantar di jenjang sebelumnya. Materi ini dirancang bertahap untuk mencegah terjadinya miskonsepsi akademis pada siswa.`,
    dimensiProfilLulusan: pppList,
    kaih7: isCocurricular ? kaih7List : undefined,
    kegiatanBelajar: [
      {
        tahapan: "Awal",
        sintaks: "Pendahuluan & Apersepsi",
        kegiatan: `1. Guru membuka pembelajaran dengan salam hangat, doa bersama dipimpin ketua kelas, serta melakukan presensi kehadiran siswa.
2. Kegiatan Pagi Ceria: Ice breaking interaktif (misalnya permainan tebak kata/gerak cepat) untuk membangkitkan fokus dan kebahagiaan siswa.
3. Apersepsi: Guru mengaitkan materi sebelumnya dengan materi "${design.materiPokok}" melalui pertanyaan pemantik kontekstual.
4. Menjelaskan tujuan pembelajaran yang ingin dicapai pada hari ini.
5. Kontekstualitas: Mengaitkan manfaat nyata materi ini dalam kehidupan sehari-hari siswa agar tumbuh motivasi belajar intrinsik.`,
        alokasiWaktu: waktuAwal,
        keterangan: "Fokus pada pengkondisian psikis siswa dan pembentukan koneksi emosional pembelajaran."
      },
      {
        tahapan: "Inti",
        sintaks: `${sintaksAwal} s/d ${sintaksInti2}`,
        kegiatan: `1. Klasikal: Guru menyajikan multimedia/benda asli/simulasi digital interaktif mengenai materi pokok. Siswa menyimak penjelasan awal secara interaktif.
2. Kelompok: Siswa dibagi dalam kelompok heterogen beranggotakan 4-5 orang. Guru membagikan LKPD (Lembar Kerja Peserta Didik) Projek/Masalah.
3. Siswa berkolaborasi melakukan investigasi mendalam, mengumpulkan data, berdiskusi, dan merancang solusi/projek sesuai sintaks model pembelajaran "${design.modelPembelajaran}".
4. Individu: Guru melakukan bimbingan intensif personal, memastikan setiap siswa dalam kelompok aktif berpartisipasi dan memahami perannya.
5. Guru menerapkan strategi pembelajaran berdiferensiasi proses: memberikan pendampingan khusus bagi siswa berkebutuhan/lambat belajar, serta pengayaan bagi siswa cepat belajar.`,
        alokasiWaktu: waktuInti,
        keterangan: "Guru berperan sebagai fasilitator aktif, melakukan penilaian formatif observasi sikap dan keterampilan."
      },
      {
        tahapan: "Akhir",
        sintaks: sintaksAkhir,
        kegiatan: `1. Penguatan: Guru memberikan penguatan, koreksi, dan apresiasi terhadap seluruh performa kelompok dan individu dalam pembelajaran.
2. Penyimpulan Bersama: Guru bersama perwakilan siswa merumuskan poin-poin kesimpulan esensial yang diperoleh hari ini.
3. Refleksi: Guru membagikan lembar umpan balik singkat mengenai apa yang disukai, dipahami, dan apa yang belum jelas pada materi hari ini.
4. Evaluasi: Kuis singkat tertulis (Asesmen Sumatif Lingkup Materi) secara mandiri untuk mengukur ketercapaian tujuan pembelajaran.
5. Umpan Balik / PR: Penugasan terstruktur di rumah berupa pengamatan mandiri bersama orang tua yang relevan dengan kehidupan sehari-hari siswa.`,
        alokasiWaktu: waktuAkhir,
        keterangan: "Menutup kegiatan dengan doa dan pesan-pesan inspiratif pembentuk karakter akhlak mulia."
      }
    ],
    mediaDihasilkan: [
      "Proyektor dan Slide Presentasi Interaktif Canva",
      "Benda Konkrit/Alat Peraga Asli yang mudah didapat di lingkungan sekitar sekolah",
      "Situs web simulasi virtual interaktif (Phet Simulation / Geogebra)",
      "Kartu Soal Bergambar & Lembar Kegiatan Siswa (LKPD) Cetak"
    ],
    sumberDihasilkan: [
      `Buku Guru dan Buku Siswa Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI (Edisi Revisi Terbaru)`,
      "Website Belajar Kemdikbud (https://belajar.kemdikbud.go.id)",
      "Artikel Ilmiah Pendidikan Terbuka dan Relevan dari Jurnal Nasional terakreditasi",
      "Narasumber Kompeten: Praktisi, tokoh masyarakat setempat, atau guru senior bidang studi terkait"
    ],
    asesmenSikap: "Observasi langsung perilaku santun, kerjasama, bernalar kritis, dan mandiri selama aktivitas kelompok dan klasikal menggunakan lembar ceklist penilaian sikap.",
    asesmenKeterampilan: "Rubrik penilaian unjuk kerja dalam mempresentasikan hasil projek/diskusi kelompok, penyusunan laporan, serta keaktifan menyelesaikan tugas di LKPD.",
    asesmenKognitif: "Tes tertulis formatif berupa soal pilihan ganda, isian, dan uraian pada akhir bab, serta penugasan mandiri terstruktur dengan skor yang terdefinisi.",
    asesmenFormatif: "Penilaian proses melalui kuis interaktif singkat, lembar observasi keaktifan kelompok, dan penilaian diri (self-assessment).",
    asesmenSumatif: "Penilaian hasil akhir melalui tes tertulis esai komprehensif di akhir periode materi pokok untuk mengukur ketuntasan kompetensi minimum.",
    glosarium: customGlosarium,
    
    // Appendices
    lampiranLKPD: {
      kegiatanKelompok: `
Aktivitas Kelompok: "Eksperimen Penyelidikan Kolaboratif ${design.materiPokok}"
Instruksi Kerja:
1. Bacalah petunjuk lembar kerja kelompok ini secara seksama bersama anggota kelompokmu.
2. Ambil media peraga / akses simulasi digital yang sudah disediakan guru.
3. Lakukan pengujian dan catatlah data hasil pengamatan pada tabel yang tersedia di bawah ini.
4. Diskusikan pertanyaan analisis kelompok dan presentasikan hasil kesimpulan di depan kelas!

Tabel Hasil Pengamatan Kelompok:
+---+--------------------+------------------------+-------------------+
|No | Objek Pengamatan   | Hasil Pengamatan Utama | Analisis Deskripsi|
+---+--------------------+------------------------+-------------------+
| 1 | Variabel Kontrol A | [Isi detail di sini]   | Konsep Terbukti   |
| 2 | Variabel Bebas B   | [Isi detail di sini]   | Hubungan Dinamis  |
+---+--------------------+------------------------+-------------------+
      `.trim(),
      kegiatanIndividu: `
Aktivitas Mandiri: "Tantangan Berpikir Kritis Personal"
Petunjuk Pengisian:
1. Selesaikan tantangan pemecahan masalah mandiri ini tanpa berdiskusi.
2. Analisis permasalahan sehari-hari berikut: "Bagaimana penerapan konsep ${design.materiPokok} dapat membantu mengurangi pemborosan energi di rumah?"
3. Tuliskan jawaban analisismu secara terperinci maksimal 3 paragraf!
      `.trim(),
      ringkasanMateri: `
Ringkasan Materi Esensial:
- Topik Utama: ${design.materiPokok}
- Prinsip Dasar: Pembelajaran dirancang secara holistik menggunakan pendekatan "${design.pendekatan}" untuk merangsang proses belajar mandiri siswa.
- Kunci Utama: Hubungan antara sintaks pembelajaran dan hasil evaluasi menunjukkan bahwa keaktifan siswa berpengaruh positif terhadap pemahaman konsep jangka panjang.
      `.trim(),
      visualSuggestion: "Rancanglah diagram alir proses melingkar menggunakan sumbu X/Y yang menunjukkan korelasi logis antar variabel."
    },
    lampiranRubrikPenilaian: {
      formatif: [
        { kriteria: "Keaktifan Kelompok", indikator: "Aktif menyumbang ide dan membimbing teman sebaya", skor4: "Sangat Aktif", skor3: "Aktif", skor2: "Cukup Aktif", skor1: "Perlu Bimbingan" },
        { kriteria: "Kemampuan Presentasi", indikator: "Penyampaian jelas, runtut, percaya diri, dan responsif terhadap pertanyaan", skor4: "Sangat Jelas", skor3: "Jelas", skor2: "Cukup Jelas", skor1: "Kurang Jelas" }
      ],
      sumatif: [
        { kriteria: "Ketepatan Analisis", indikator: "Mampu menjelaskan hubungan sebab-akibat konsep dengan akurat", skor4: "Sangat Tepat", skor3: "Tepat", skor2: "Cukup Tepat", skor1: "Kurang Tepat" },
        { kriteria: "Kelengkapan Jawaban", indikator: "Menjawab semua pertanyaan esai dengan landasan teori kuat", skor4: "Sangat Lengkap", skor3: "Lengkap", skor2: "Cukup", skor1: "Kurang" }
      ]
    },
    lampiranKisiKisiSoal: [
      {
        nomorSoal: 1,
        indikator: "Disajikan teks deskripsi, siswa dapat mendefinisikan hukum dasar materi",
        levelKognitif: "C1 (Mengingat) / Mengingat",
        jenisSoal: "Pilihan Ganda",
        rincianSoal: `Manakah dari pernyataan berikut yang mendefinisikan prinsip dasar dari ${design.materiPokok} dengan paling akurat?`,
        kunciJawaban: "A. Prinsip konversi dan kelestarian fungsi esensial secara stabil",
        poin: 10
      },
      {
        nomorSoal: 2,
        indikator: "Disajikan sebuah kasus, siswa dapat menganalisis pemecahan masalah kontekstual",
        levelKognitif: "C4 (Menganalisis) / Menganalisis",
        jenisSoal: "Uraian / Esai",
        rincianSoal: `Jelaskan secara mendalam bagaimana model ${design.modelPembelajaran} dikolaborasikan untuk menyelesaikan krisis lingkungan di sekolah!`,
        kunciJawaban: "Analisis komprehensif mengaitkan sintaks model pembelajaran dengan solusi nyata berbasis data berkelanjutan.",
        poin: 20
      }
    ],
    lampiranKartuSoal: [
      { nomorSoal: 1, kisiKisiRef: "Indikator No 1 (C1)", soal: `Manakah dari pernyataan berikut yang mendefinisikan prinsip dasar dari ${design.materiPokok} dengan paling akurat?\nA. Prinsip konversi kelestarian\nB. Pengurangan massa objek\nC. Isolasi energi mutlak\nD. Peleburan struktur eksternal`, kunci: "A" },
      { nomorSoal: 2, kisiKisiRef: "Indikator No 2 (C4)", soal: `Jelaskan secara mendalam bagaimana model ${design.modelPembelajaran} dikolaborasikan untuk menyelesaikan krisis lingkungan di sekolah!`, kunci: "Jawaban esai terstruktur sesuai sintaks penyelesaian masalah." }
    ],
    lampiranCetakSoal: `
ASESMEN SUMATIF HARIAN SEKOLAH
Mata Pelajaran: ${primarySubject} | Kelas: ${school.kelas}
Hari/Tanggal: _____________________ | Nama Siswa: ____________________

I. Pilihan Ganda (Pilihlah salah satu jawaban yang paling tepat!)
1. Manakah dari pernyataan berikut yang mendefinisikan prinsip dasar dari ${design.materiPokok} dengan paling akurat?
   A. Prinsip konversi dan kelestarian fungsi esensial secara stabil
   B. Pengurangan massa objek secara acak
   C. Isolasi energi mutlak tanpa pertukaran zat
   D. Peleburan struktur eksternal secara spontan

II. Uraian/Esai (Jawablah pertanyaan berikut dengan analisis yang jelas!)
2. Jelaskan secara mendalam bagaimana model ${design.modelPembelajaran} dikolaborasikan untuk menyelesaikan krisis lingkungan di sekitar tempat tinggalmu!
   Jawaban: ____________________________________________________________________________
   ____________________________________________________________________________________
    `.trim(),
    lampiranUmpanBalik: `
LEMBAR UMPAN BALIK BELAJAR SISWA (REFLEKSI)
Nama Siswa: ____________________ | Kelas: ____________________

1. Bagian materi mana yang paling kamu pahami dan sukai hari ini? Mengapa?
   Jawab: _____________________________________________________________________________
2. Bagian materi mana yang menurutmu paling sulit dan membutuhkan bimbingan lebih lanjut dari guru?
   Jawab: _____________________________________________________________________________
3. Bagaimana perasaanmu selama mengikuti pembelajaran berbasis model ${design.modelPembelajaran} hari ini?
   [ ] Amat Bahagia   [ ] Bahagia   [ ] Biasa Saja   [ ] Kurang Nyaman
    `.trim(),
    lampiranPortofolio: `
DOKUMEN RENCANA PORTOFOLIO BELAJAR
Mata Pelajaran: ${primarySubject} | Materi: ${design.materiPokok}

Setiap siswa wajib mengumpulkan berkas portofolio berupa:
1. Laporan tertulis hasil kerja kelompok beserta lampiran tabel data observasi.
2. Hasil evaluasi mandiri/kuis harian asli yang sudah dinilai dan ditandatangani orang tua.
3. Foto dokumentasi atau gambar skema rancangan projek yang dikerjakan secara berkelompok.
Tempat Penyimpanan: Map Portofolio Plastik warna hijau di rak kelas masing-masing.
    `.trim(),
    lampiranAIPresentasi: `
GARIS BESAR BAHAN PRESENTASI (AI-PROMPT / SLIDES OUTLINE)
Gunakan Prompt berikut pada AI Presenter untuk membuat slide presentasi:
"Buatkan saya draf materi slide presentasi interaktif 5 slide bertema '${design.materiPokok}' untuk kelas ${school.kelas} dengan gaya visual ceria, penuh warna, infografis minimalis, dan gunakan analogi kehidupan sehari-hari."

Kerangka Slide yang Dihasilkan:
- Slide 1: Judul Utama, Nama Guru, dan Pertanyaan Pemantik yang Menarik.
- Slide 2: Mengapa konsep "${design.materiPokok}" ini penting bagi kita? (Kontekstual).
- Slide 3: Prinsip Utama dan Skema/Diagram Alir.
- Slide 4: Aktivitas Kelompok berbasis model "${design.modelPembelajaran}".
- Slide 5: Refleksi dan Tantangan Belajar Mandiri di Rumah.
    `.trim(),
    lampiranPenilaianSiswa: listAssessmentSiswa,
    lampiranRingkasanMateriDetail: ringkasanDetailText,
  };
}
