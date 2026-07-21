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

  // Glosarium KBBI yang terkait secara langsung dengan materi pembelajaran
  const matLower = (design.materiPokok || "").toLowerCase();
  const subLower = primarySubject.toLowerCase();
  let customGlosarium: { istilah: string; arti: string }[] = [];

  if (matLower.includes("bilangan") || matLower.includes("cacah") || matLower.includes("angka") || subLower.includes("matematika")) {
    customGlosarium = [
      { istilah: "Bilangan Cacah", arti: "Himpunan bilangan bulat yang tidak negatif, dimulai dari angka nol (0, 1, 2, 3, ...)." },
      { istilah: "Lambang Bilangan", arti: "Tanda atau simbol angka yang digunakan untuk menuliskan nama bilangan." },
      { istilah: "Nama Bilangan", arti: "Suku kata atau cara mengeja sebutan kata-kata untuk suatu lambang bilangan." },
      { istilah: "Numerasi", arti: "Kemampuan untuk mengaplikasikan konsep bilangan dan simbol dalam matematika di kehidupan nyata sehari-hari." },
      { istilah: "Algoritma", arti: "Prosedur sistematis untuk memecahkan masalah matematis dalam langkah-langkah terbatas." }
    ];
  } else if (matLower.includes("fotosintesis") || matLower.includes("daun") || matLower.includes("tumbuhan") || matLower.includes("klorofil")) {
    customGlosarium = [
      { istilah: "Fotosintesis", arti: "Pembuatan makanan oleh tumbuhan berhijau daun dengan bantuan sinar matahari." },
      { istilah: "Klorofil", arti: "Zat hijau daun pada tumbuhan yang berfungsi menyerap energi cahaya matahari untuk proses fotosintesis." },
      { istilah: "Glukosa", arti: "Senyawa organik berupa gula sederhana yang dihasilkan dari proses fotosintesis sebagai cadangan makanan." },
      { istilah: "Oksigen", arti: "Gas tidak berwarna, tidak berasa, dan tidak berbau di udara yang dihasilkan tumbuhan dan dihirup oleh makhluk hidup." }
    ];
  } else if (matLower.includes("ekosistem") || matLower.includes("lingkungan") || matLower.includes("rantai makanan")) {
    customGlosarium = [
      { istilah: "Ekosistem", arti: "Keanekaragaman suatu komunitas dan lingkungannya yang berfungsi sebagai suatu satuan ekologi dalam alam." },
      { istilah: "Biotik", arti: "Komponen makhluk hidup atau segala hal yang bernyawa di dalam suatu lingkungan/ekosistem." },
      { istilah: "Abiotik", arti: "Komponen tak hidup atau benda mati seperti tanah, air, udara, dan cahaya matahari di lingkungan sekitar." },
      { istilah: "Pedagogi", arti: "Ilmu atau seni mengajar anak-anak; cara mendidik yang terstruktur secara akademis." }
    ];
  } else if (matLower.includes("gaya") || matLower.includes("gesek") || matLower.includes("magnet") || matLower.includes("gravitasi")) {
    customGlosarium = [
      { istilah: "Gaya", arti: "Tarikan atau dorongan yang dapat mempengaruhi arah gerak, kecepatan, atau bentuk suatu benda." },
      { istilah: "Gaya Gesek", arti: "Gaya hambatan yang timbul ketika dua permukaan benda saling bersentuhan langsung secara berlawanan." },
      { istilah: "Gravitasi", arti: "Gaya tarik-menarik bumi yang menyebabkan semua benda bermassa jatuh ke arah pusat bumi." },
      { istilah: "Simulasi", arti: "Metode pelatihan yang memperagakan sesuatu dalam bentuk tiruan yang mirip dengan keadaan yang sesungguhnya." }
    ];
  } else {
    // Generik namun tetap relevan dengan materi yang diinput oleh pengguna
    const term1 = design.materiPokok ? design.materiPokok.split(" ")[0] : "Pembelajaran";
    const term2 = design.materiPokok && design.materiPokok.split(" ").length > 1 ? design.materiPokok.split(" ")[1] : "Konseptual";
    customGlosarium = [
      { istilah: term1, arti: `Konsep dasar esensial dari pokok bahasan ${design.materiPokok} yang dipelajari siswa secara komprehensif.` },
      { istilah: term2, arti: `Struktur teoretis/praktis pendukung dalam materi pembelajaran ${design.materiPokok} untuk mengasah daya kritis.` },
      { istilah: "Modul", arti: "Unit terkecil dari program belajar-mengajar yang dirancang secara sistematis sesuai KBBI." },
      { istilah: "Pedagogi", arti: "Ilmu atau seni mengajar anak-anak; cara mendidik yang terstruktur secara akademis." },
      { istilah: "Kurikulum", arti: "Perangkat mata pelajaran dan program pendidikan yang diselenggarakan oleh suatu lembaga pendidikan." }
    ];
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

  // Detail step-by-step syntax implementation based on selected learning model
  let detailedSteps = "";
  if (design.modelPembelajaran === "PjBL") {
    detailedSteps = `   a. Tahap 1 (Penentuan Pertanyaan Mendasar): Guru mengajukan masalah kontekstual mengenai "${design.materiPokok || "materi pokok"}". Siswa menganalisis isu tersebut dan merumuskan pertanyaan mendasar yang memicu rasa ingin tahu untuk dirancang solusinya.
   b. Tahap 2 (Mendesain Perencanaan Projek): Siswa berkolaborasi dalam kelompok heterogen merancang rencana kerja pembuatan projek/solusi. Mereka merencanakan aturan main kelompok, pembagian tugas, alat/bahan pendukung (seperti "${design.mediaBelajar || "alat peraga sederhana"}"), dan langkah-langkah penyelesaian projek.
   c. Tahap 3 (Menyusun Jadwal Pembuatan): Siswa secara kritis berdiskusi menyusun garis waktu (timeline) pengerjaan projek secara detail, menetapkan batas akhir pengerjaan, serta pembagian target capaian harian kelompok di bawah bimbingan guru.
   d. Tahap 4 (Memonitor Keberajuan Projek): Siswa aktif membuat projek atau melaksanakan investigasi mendalam sesuai jadwal yang disepakati. Guru berkeliling melakukan pemantauan intensif, membimbing penyelesaian kendala teknis, serta memastikan semua siswa berpartisipasi aktif.
   e. Tahap 5 (Menguji Hasil): Kelompok melakukan uji coba akhir terhadap projek/karya yang telah diselesaikan untuk mengukur kelayakan fungsinya. Guru memantau unjuk kerja siswa dan mencatat hasil evaluasi produk sebagai dasar penilaian ketercapaian kompetensi.
   f. Tahap 6 (Evaluasi Pengalaman Belajar): Setiap kelompok menyajikan dan mendemonstrasikan hasil karya projek mereka di hadapan kelas secara komunikatif. Siswa kelompok lain menyimak dengan saksama dan memberikan masukan konstruktif. Guru memberikan penguatan konsep esensial serta merefleksikan seluruh proses pembuatan projek bersama siswa.`;
  } else if (design.modelPembelajaran === "PBL") {
    detailedSteps = `   a. Tahap 1 (Orientasi Siswa pada Masalah): Guru mempresentasikan kasus nyata dan menantang (ill-structured problem) yang terjadi di kehidupan sehari-hari terkait "${design.materiPokok || "materi pokok"}". Siswa mengamati, merumuskan pertanyaan kunci, serta menetapkan fokus masalah yang perlu dipecahkan berkelompok.
   b. Tahap 2 (Mengorganisasi Siswa untuk Belajar): Siswa bergabung dalam kelompok heterogen. Guru membagikan LKPD, mendefinisikan tugas belajar secara spesifik, membimbing pembagian peran anggota kelompok, dan menyepakati rujukan pemecahan masalah.
   c. Tahap 3 (Membimbing Penyelidikan Individu/Kelompok): Siswa melakukan investigasi mendalam, mencari informasi rujukan dari "${design.sumberBelajar || "buku pelajaran dan bahan ajar digital"}", mengumpulkan data hasil eksperimen/observasi, dan mendiskusikannya secara kritis dengan anggota kelompok untuk merumuskan draf solusi.
   d. Tahap 4 (Mengembangkan dan Menyajikan Hasil Karya): Siswa menyatukan data hasil penyelidikan untuk merumuskan solusi terbaik. Mereka menuangkannya ke dalam laporan terstruktur, peta konsep, atau poster visual, lalu mempresentasikan hasil karyanya di depan kelas secara percaya diri.
   e. Tahap 5 (Menganalisis & Mengevaluasi Proses): Kelompok lain menanyakan hal baru, menanggapi, atau menyempurnakan solusi yang ditawarkan. Guru mengonfirmasi kebenaran konsep ilmiah, meluruskan miskonsepsi, mereview langkah-langkah pemecahan masalah, dan memberikan umpan balik evaluatif.`;
  } else if (design.modelPembelajaran === "Discovery") {
    detailedSteps = `   a. Tahap 1 (Pemberian Rangsangan / Stimulation): Guru memberikan stimulus visual berupa gambar, demonstrasi eksperimen menarik, atau benda nyata mengenai "${design.materiPokok || "topik materi"}" tanpa penjelasan awal untuk memicu rasa ingin tahu mendalam.
   b. Tahap 2 (Pernyataan/Identifikasi Masalah / Problem Statement): Siswa mengidentifikasi sebanyak mungkin agenda pertanyaan/permasalahan dari stimulus tersebut. Siswa memilih masalah yang paling relevan dengan materi pokok untuk dirumuskan dalam bentuk hipotesis dugaan sementara.
   c. Tahap 3 (Pengumpulan Data / Data Collection): Kelompok siswa melakukan pengumpulan data dengan membaca referensi literatur, melakukan eksperimen praktis, atau mengeksplorasi simulasi virtual untuk membuktikan kebenaran hipotesis mereka.
   d. Tahap 4 (Pengolahan Data / Data Processing): Siswa berdiskusi mengolah data hasil pengamatan, mengklasifikasikan pola, menghitung korelasi, dan menuliskannya ke dalam tabel analisis LKPD yang rapi.
   e. Tahap 5 (Pembuktian / Verification): Siswa melakukan verifikasi hasil olah data dengan mencocokkan teori resmi pada buku teks. Guru memberikan bimbingan untuk memastikan tidak terjadi miskonsepsi ilmiah.
   f. Tahap 6 (Menarik Kesimpulan / Generalization): Siswa bersama kelompok merumuskan kesimpulan umum/prinsip yang terbukti, mempresentasikannya, dan guru menyempurnakan kesimpulan akhir materi pembelajaran hari ini.`;
  } else if (design.modelPembelajaran === "Inquiry") {
    detailedSteps = `   a. Tahap 1 (Orientasi Masalah & Merumuskan Pertanyaan): Guru memandu perhatian siswa pada fenomena alam/sosial yang ganjil terkait "${design.materiPokok || "materi pokok"}". Siswa menanya secara kritis dan merumuskan pertanyaan penyelidikan mandiri kelompok.
   b. Tahap 2 (Merumuskan Hipotesis): Siswa secara cerdas bercurah pendapat untuk merumuskan jawaban sementara (hipotesis) terhadap pertanyaan riset yang telah ditetapkan sebelumnya.
   c. Tahap 3 (Mengumpulkan Data / Eksperimen): Siswa merancang tata cara pengujian, menyiapkan alat peraga, menguji langsung, mencatat angka/kejadian objektif secara teliti dalam lembar observasi.
   d. Tahap 4 (Menguji Hipotesis): Siswa mengomparasi data empiris lapangan dengan draf hipotesis awal. Mereka mendiskusikan keselarasan hasil uji untuk menerima atau menolak hipotesis awal.
   e. Tahap 5 (Merumuskan Kesimpulan & Refleksi): Setiap kelompok menyusun pernyataan ilmiah final, mengekspos hasil temuan di depan kelas, dan berefleksi atas seluruh keterampilan proses ilmiah yang sudah mereka lalui hari ini.`;
  }

  // Parse prompt kustom untuk menentukan jumlah dan bentuk soal pada kisi-kisi
  const promptLower = (design.promptKegiatan || "").toLowerCase();
  let jumlahSoal = 3; // default
  let bentukSoal = "campuran"; // default

  if (promptLower.includes("5 soal") || promptLower.includes("lima soal") || promptLower.includes("5 nomor")) {
    jumlahSoal = 5;
  } else if (promptLower.includes("4 soal") || promptLower.includes("empat soal") || promptLower.includes("4 nomor")) {
    jumlahSoal = 4;
  } else if (promptLower.includes("3 soal") || promptLower.includes("tiga soal") || promptLower.includes("3 nomor")) {
    jumlahSoal = 3;
  } else if (promptLower.includes("2 soal") || promptLower.includes("dua soal") || promptLower.includes("2 nomor")) {
    jumlahSoal = 2;
  } else if (promptLower.includes("1 soal") || promptLower.includes("satu soal") || promptLower.includes("1 nomor")) {
    jumlahSoal = 1;
  }

  if (promptLower.includes("pilihan ganda") && !promptLower.includes("uraian") && !promptLower.includes("essay") && !promptLower.includes("esai")) {
    bentukSoal = "pilihan ganda";
  } else if ((promptLower.includes("uraian") || promptLower.includes("essay") || promptLower.includes("esai")) && !promptLower.includes("pilihan ganda")) {
    bentukSoal = "uraian";
  }

  // Generate dynamic questions based on materiPokok
  interface QuestionItem {
    nomorSoal: number;
    indikator: string;
    levelKognitif: string;
    jenisSoal: string;
    rincianSoal: string;
    kunciJawaban: string;
    poin: number;
  }

  const generatedQuestions: QuestionItem[] = [];
  let qTemplates: { indicator: string; level: string; type: "Pilihan Ganda" | "Uraian / Esai"; question: string; key: string; points: number }[] = [];

  if (matLower.includes("bilangan") || matLower.includes("cacah") || matLower.includes("angka") || subLower.includes("matematika")) {
    qTemplates = [
      {
        indicator: "Siswa dapat menentukan lambang bilangan dari nama bilangan cacah ratusan yang disajikan.",
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: "Lambang bilangan dari 'tiga ratus empat puluh lima' yang tepat di bawah ini adalah...",
        key: "A. 345 (Karena 3 menempati ratusan, 4 puluhan, dan 5 satuan)",
        points: 15
      },
      {
        indicator: "Disajikan angka acak, siswa dapat menganalisis nilai tempat angka nol pada lambang bilangan ratusan.",
        level: "C2 (Memahami)",
        type: "Pilihan Ganda",
        question: "Pada lambang bilangan '708', nilai tempat yang dimiliki oleh angka '0' adalah...",
        key: "B. Puluhan (Angka 7 menempati ratusan, 0 menempati puluhan, dan 8 menempati satuan)",
        points: 15
      },
      {
        indicator: "Siswa dapat menyusun bilangan ratusan terkecil dari tiga angka berbeda yang diberikan.",
        level: "C3 (Mengaplikasikan)",
        type: "Pilihan Ganda",
        question: "Diberikan angka 4, 9, dan 2. Susunan bilangan ratusan terkecil yang dapat dibentuk dari ketiga kartu angka tersebut adalah...",
        key: "C. 249 (Mengurutkan angka dari yang paling kecil ke paling besar)",
        points: 15
      },
      {
        indicator: "Siswa dapat menganalisis peran nilai tempat bilangan cacah dalam merencanakan penghematan energi listrik rumah.",
        level: "C4 (Menganalisis)",
        type: "Uraian / Esai",
        question: "Jelaskan bagaimana pemahaman nilai tempat bilangan cacah membantu Anda membandingkan angka penggunaan kWh meteran listrik bulanan di rumah guna mengidentifikasi pemborosan energi!",
        key: "Jawaban esai terstruktur: Siswa menganalisis nilai tempat ratusan dan puluhan pada kWh meteran bulanan. Dengan membandingkan angka ratusan kWh antar bulan, siswa tahu kapan konsumsi naik tajam (misal dari 340 kWh ke 450 kWh) dan merancang tindakan penghematan secara spesifik.",
        points: 25
      },
      {
        indicator: "Siswa dapat mengevaluasi dan memperbaiki penulisan nama bilangan besar yang tidak sesuai tata bahasa.",
        level: "C5 (Mengevaluasi)",
        type: "Uraian / Esai",
        question: "Ditemukan catatan pembukuan kas kelas tertulis lambang bilangan '2.045' dibaca 'dua ribu empat puluh lima rupiah'. Evaluasilah apakah pembacaan nama bilangan tersebut sudah benar berdasarkan kaidah matematika, serta berikan analisis rincian nilai tempatnya!",
        key: "Jawaban evaluatif: Pembacaan sudah benar. Struktur nilai tempatnya adalah: angka 2 menempati ribuan (2.000), angka 0 menempati ratusan (0), angka 4 menempati puluhan (40), dan angka 5 menempati satuan (5).",
        points: 30
      }
    ];
  } else if (matLower.includes("fotosintesis") || matLower.includes("daun") || matLower.includes("tumbuhan") || matLower.includes("klorofil")) {
    qTemplates = [
      {
        indicator: "Siswa dapat menyebutkan zat hijau daun yang krusial dalam menyerap energi matahari.",
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: "Zat hijau pada daun tumbuhan yang berperan menangkap sinar matahari untuk fotosintesis disebut...",
        key: "B. Klorofil",
        points: 15
      },
      {
        indicator: "Siswa dapat menyimpulkan bahan-bahan baku utama yang diperlukan untuk reaksi fotosintesis.",
        level: "C2 (Memahami)",
        type: "Pilihan Ganda",
        question: "Bahan yang diperlukan tumbuhan untuk melakukan fotosintesis yang diserap melalui akar dan udara adalah...",
        key: "A. Air dan Karbondioksida",
        points: 15
      },
      {
        indicator: "Siswa dapat memprediksi dampak penutupan permukaan daun dengan alumunium foil terhadap produksi amilum.",
        level: "C3 (Mengaplikasikan)",
        type: "Pilihan Ganda",
        question: "Jika selembar daun ditutup kertas timah (alumunium foil) selama beberapa hari lalu ditetesi larutan iodine, bagian daun yang tertutup akan berwarna...",
        key: "C. Pucat / tidak berubah gelap (karena tidak mengalami fotosintesis dan tidak menghasilkan amilum)",
        points: 15
      },
      {
        indicator: "Siswa dapat menguraikan hubungan sebab-akibat fotosintesis terhadap penyediaan suplai oksigen udara pekarangan.",
        level: "C4 (Menganalisis)",
        type: "Uraian / Esai",
        question: "Analisislah mengapa intensitas sinar matahari pagi yang melimpah berkorelasi langsung terhadap kesegaran udara di pekarangan rumah yang dipenuhi pepohonan hijau!",
        key: "Jawaban analitis: Pepohonan hijau menyerap energi matahari pagi secara optimal untuk melangsungkan fotosintesis dengan memecah air dan karbondioksida menjadi glukosa dan oksigen (O2). Kuantitas pelepasan gas oksigen yang tinggi inilah yang membuat udara terasa segar.",
        points: 25
      },
      {
        indicator: "Siswa dapat merancang usulan perbaikan pekarangan rumah gersang berbasis prinsip optimalisasi fotosintesis.",
        level: "C6 (Menciptakan)",
        type: "Uraian / Esai",
        question: "Rancanglah sebuah rencana penataan 3 jenis tumbuhan berdaun lebar di area pekarangan rumah Anda yang gersang agar dapat menyuplai oksigen secara maksimal sepanjang hari!",
        key: "Jawaban kreatif: Siswa menyusun peta tata letak tanaman berdaun lebar di area timur agar mendapat sinar matahari pagi secara maksimal tanpa penghalang, menjamin laju fotosintesis tinggi harian.",
        points: 30
      }
    ];
  } else {
    // Generik fallbacks
    qTemplates = [
      {
        indicator: `Siswa dapat mendefinisikan prinsip dasar materi pokok ${design.materiPokok}.`,
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: `Manakah dari pernyataan berikut yang mendefinisikan konsep utama dari ${design.materiPokok} secara tepat?`,
        key: "A. Definisi operasional teoretis yang selaras dengan standar akademis nasional.",
        points: 15
      },
      {
        indicator: `Siswa dapat memahami komponen pembentuk materi ${design.materiPokok}.`,
        level: "C2 (Memahami)",
        type: "Pilihan Ganda",
        question: `Berikut ini yang merupakan elemen pendukung utama dalam mewujudkan konsep ${design.materiPokok} adalah...`,
        key: "B. Kolaborasi unsur biotik dan interaksi konseptual berkelanjutan.",
        points: 15
      },
      {
        indicator: `Siswa dapat mendemonstrasikan penyelesaian kasus terkait ${design.materiPokok}.`,
        level: "C3 (Mengaplikasikan)",
        type: "Pilihan Ganda",
        question: `Ketika diberikan tantangan praktis mengenai ${design.materiPokok}, langkah pertama yang logis dilakukan adalah...`,
        key: "C. Melakukan observasi karakteristik objek dan menyusun perencanaan tindakan.",
        points: 15
      },
      {
        indicator: `Siswa dapat menganalisis hubungan timbal balik variabel pada materi ${design.materiPokok}.`,
        level: "C4 (Menganalisis)",
        type: "Uraian / Esai",
        question: `Jelaskan analisis hubungan sebab-akibat yang terjadi apabila salah satu komponen penting dalam materi ${design.materiPokok} ditiadakan!`,
        key: "Jawaban analisis mendalam: Siswa menjabarkan runtutan akibat dari hilangnya salah satu variabel terhadap kestabilan sistem konsep secara keseluruhan.",
        points: 25
      },
      {
        indicator: `Siswa dapat mengevaluasi efektivitas solusi yang ditawarkan pada kasus ${design.materiPokok}.`,
        level: "C5 (Mengevaluasi)",
        type: "Uraian / Esai",
        question: `Berikan evaluasi kritis Anda terhadap efektivitas penerapan model ${design.modelPembelajaran} dalam melatih pemahaman konsep ${design.materiPokok}!`,
        key: "Jawaban evaluatif: Siswa merinci kekuatan sintaks model dalam memperjelas transfer pengetahuan materi pokok kepada siswa secara mandiri.",
        points: 30
      }
    ];
  }

  // Filter based on user-requested types
  let filteredTemplates = qTemplates;
  if (bentukSoal === "pilihan ganda") {
    filteredTemplates = qTemplates.filter(q => q.type === "Pilihan Ganda");
  } else if (bentukSoal === "uraian") {
    filteredTemplates = qTemplates.filter(q => q.type === "Uraian / Esai");
  }

  // Take the correct number of questions
  const selectedQs = filteredTemplates.slice(0, jumlahSoal);
  // If we don't have enough, append from general templates
  while (selectedQs.length < jumlahSoal && qTemplates.length > 0) {
    const nextQ = qTemplates.find(q => !selectedQs.some(s => s.question === q.question));
    if (nextQ) {
      selectedQs.push(nextQ);
    } else {
      break;
    }
  }

  // Map to QuestionItem
  selectedQs.forEach((q, index) => {
    generatedQuestions.push({
      nomorSoal: index + 1,
      indikator: q.indicator,
      levelKognitif: q.level,
      jenisSoal: q.type,
      rincianSoal: q.question,
      kunciJawaban: q.key,
      poin: q.points
    });
  });

  // Construct printable exam test sheet
  let cetakSoalText = `
ASESMEN SUMATIF HARIAN SEKOLAH
Mata Pelajaran: ${primarySubject} | Kelas: ${school.kelas}
Hari/Tanggal: _____________________ | Nama Siswa: ____________________

`;

  const pgQs = generatedQuestions.filter(q => q.jenisSoal === "Pilihan Ganda");
  const esaiQs = generatedQuestions.filter(q => q.jenisSoal === "Uraian / Esai");

  if (pgQs.length > 0) {
    cetakSoalText += `I. Pilihan Ganda (Pilihlah salah satu jawaban yang paling tepat!)\n`;
    pgQs.forEach((q, idx) => {
      const correctOptionLetter = q.kunciJawaban.substring(0, 1);
      const optStr = q.kunciJawaban.substring(2);
      let optA = "A. " + (correctOptionLetter === "A" ? optStr : "Opsi pengecoh alternatif A");
      let optB = "B. " + (correctOptionLetter === "B" ? optStr : "Opsi pengecoh alternatif B");
      let optC = "C. " + (correctOptionLetter === "C" ? optStr : "Opsi pengecoh alternatif C");
      let optD = "D. " + (correctOptionLetter === "D" ? optStr : "Opsi pengecoh alternatif D");
      
      cetakSoalText += `${idx + 1}. ${q.rincianSoal}\n   ${optA}\n   ${optB}\n   ${optC}\n   ${optD}\n\n`;
    });
  }

  if (esaiQs.length > 0) {
    cetakSoalText += `II. Uraian/Esai (Jawablah pertanyaan berikut dengan analisis yang jelas dan terperinci!)\n`;
    esaiQs.forEach((q, idx) => {
      cetakSoalText += `${idx + 1}. ${q.rincianSoal}\n   Jawaban: ____________________________________________________________________________\n   ____________________________________________________________________________________\n\n`;
    });
  }
  const lampiranCetakSoal = cetakSoalText.trim();

  const lampiranKisiKisiSoal = generatedQuestions;
  const lampiranKartuSoal = generatedQuestions.map(q => ({
    nomorSoal: q.nomorSoal,
    kisiKisiRef: `Indikator No ${q.nomorSoal} (${q.levelKognitif.split(" ")[0]})`,
    soal: q.rincianSoal,
    kunci: q.jenisSoal === "Pilihan Ganda" ? q.kunciJawaban.substring(0, 1) : q.kunciJawaban
  }));

  // Dynamic values for LKPD Group Activity Table matching the material
  let objekA = "Variabel Kontrol A";
  let hasilA = "[Isi detail di sini]";
  let analisisA = "Konsep Terbukti";
  let objekB = "Variabel Bebas B";
  let hasilB = "[Isi detail di sini]";
  let analisisB = "Hubungan Dinamis";

  if (matLower.includes("bilangan") || matLower.includes("cacah") || matLower.includes("angka") || subLower.includes("matematika")) {
    objekA = "Kumpulan Benda Konkrit / Alat Peraga Blok Dienes (Contoh: 3 ratusan, 4 puluhan, 5 satuan)";
    hasilA = "Siswa menghitung total benda konkrit secara fisik dan memperoleh jumlah sebanyak 345 manik-manik/blok.";
    analisisA = "Membuktikan bahwa jumlah fisik dapat dilambangkan secara tertulis dengan angka '345' dan dinamakan 'tiga ratus empat puluh lima'.";
    objekB = "Kartu Nilai Tempat Angka Acak (Contoh: Menempatkan angka 7 di ratusan, 0 di puluhan, dan 8 di satuan)";
    hasilB = "Terbentuk susunan angka '708'. Siswa membaca angka tersebut sebagai 'tujuh ratus delapan'.";
    analisisB = "Menunjukkan korelasi logis antara posisi angka (nilai tempat) dengan penulisan lambang dan cara pengucapan nama bilangan.";
  } else if (matLower.includes("fotosintesis") || matLower.includes("daun") || matLower.includes("tumbuhan") || matLower.includes("klorofil")) {
    objekA = "Daun Segar Terpapar Sinar Matahari Penuh (Ditetesi Larutan Lugol / Iodine)";
    hasilA = "Warna daun berubah menjadi biru kehitaman yang sangat gelap setelah ditetesi Lugol.";
    analisisA = "Membuktikan adanya kandungan amilum (zat tepung/karbohidrat) sebagai produk hasil fotosintesis yang berhasil.";
    objekB = "Daun Tertutup Alumunium Foil / Terhalang Cahaya (Ditetesi Larutan Lugol / Iodine)";
    hasilB = "Warna daun tetap pucat atau cokelat muda kekuningan, tidak berubah menjadi gelap.";
    analisisB = "Menunjukkan korelasi logis bahwa ketiadaan cahaya menghalangi fotosintesis, membuktikan cahaya adalah variabel kritis.";
  } else if (matLower.includes("ekosistem") || matLower.includes("lingkungan") || matLower.includes("rantai makanan")) {
    objekA = "Rantai Makanan di Sawah (Padi -> Belalang -> Katak -> Ular -> Elang)";
    hasilA = "Siswa menganalisis rantai makanan sawah. Ketika populasi belalang disemprot pestisida kimia hingga punah.";
    analisisA = "Populasi katak menurun drastis karena kelaparan, padi tumbuh subur di awal, namun ekosistem sawah menjadi tidak seimbang.";
    objekB = "Introduksi Predator Alami (Contoh: Pelepasan burung hantu untuk mengendalikan hama tikus)";
    hasilB = "Populasi tikus menurun drastis secara alami tanpa mengotori tanah, tanaman padi terjaga kelestariannya.";
    analisisB = "Membuktikan hubungan sebab-akibat timbal balik antar komponen biotik dalam menjaga keseimbangan ekosistem secara alami.";
  } else {
    objekA = `Komponen Konseptual Dasar ${design.materiPokok || "Materi"}`;
    hasilA = `Hasil pengamatan menunjukkan keterpolaan data sesuai prinsip ilmiah konsep ${design.materiPokok || "Materi"}.`;
    analisisA = `Membuktikan kesesuaian teori dalam buku rujukan dengan keadaan riil objek yang diamati secara empiris.`;
    objekB = `Variabilitas Kondisi Lapangan / Uji Kontekstual ${design.materiPokok || "Materi"}`;
    hasilB = `Siswa mendata dinamika perubahan yang terjadi saat kondisi variabel diubah secara sengaja.`;
    analisisB = `Menunjukkan adanya hubungan sebab-akibat yang logis antar elemen pembentuk konsep pembelajaran harian.`;
  }

  // Dynamic Everyday Problem for Individual Activity matching the material
  let permasalahanSehariHari = `Bagaimana penerapan konsep ${design.materiPokok || "Materi"} dapat membantu mengurangi pemborosan energi di rumah?`;
  if (matLower.includes("bilangan") || matLower.includes("cacah") || matLower.includes("angka") || subLower.includes("matematika")) {
    permasalahanSehariHari = `Bagaimana penerapan konsep "Nama dan lambang bilangan cacah" (seperti membaca data meteran listrik pascabayar, mengelompokkan biaya token listrik, atau mencatat nominal rupiah tagihan energi) dapat membantu keluarga menganalisis secara kritis dan mengurangi pemborosan energi listrik di rumah?`;
  } else if (matLower.includes("fotosintesis") || matLower.includes("daun") || matLower.includes("tumbuhan") || matLower.includes("klorofil")) {
    permasalahanSehariHari = `Bagaimana pemahaman tentang "Fotosintesis dan Klorofil pada Tumbuhan Hijau" dapat membantu kita merancang tata letak tanaman hias atau pekarangan hijau di sekitar rumah untuk memaksimalkan produksi oksigen segar serta mengurangi pemborosan penggunaan pendingin ruangan (AC) secara ramah lingkungan?`;
  } else if (matLower.includes("ekosistem") || matLower.includes("lingkungan") || matLower.includes("rantai makanan")) {
    permasalahanSehariHari = `Bagaimana penerapan pemahaman "Rantai Makanan dan Ekosistem Lingkungan" dapat membantu kita mengelola kebun rumah atau persawahan keluarga secara mandiri agar terbebas dari hama tikus atau serangga tanpa perlu membeli pestisida kimia berbahaya yang merusak tanah?`;
  } else if (matLower.includes("gaya") || matLower.includes("gesek") || matLower.includes("magnet") || matLower.includes("gravitasi")) {
    permasalahanSehariHari = `Bagaimana penerapan pemahaman konsep "Gaya Gesek atau Gaya Gravitasi" (seperti memasang karet anti-slip di bawah kaki kulkas, melumasi engsel pintu, atau menyusun perabotan secara stabil) dapat membantu keluarga meminimalkan ausnya barang-barang rumah tangga serta menghemat tenaga gerak harian?`;
  }

  // Dynamic Rubric Indicators Tailored to Material
  let indikatorKeaktifan = `Siswa aktif menyumbang ide dalam kelompok serta membimbing teman sebaya dalam mendiskusikan konsep ${design.materiPokok || "pembelajaran"}.`;
  let indikatorPresentasi = `Penyampaian hasil presentasi kelompok mengenai ${design.materiPokok || "materi pokok"} secara jelas, runtut, percaya diri, dan responsif terhadap pertanyaan.`;
  let indikatorKetepatan = `Mampu menjelaskan hubungan sebab-akibat konsep ${design.materiPokok || "materi pokok"} secara mendalam dengan akurasi ilmiah/matematis yang tinggi.`;
  let indikatorKelengkapan = `Menjawab semua lembar kerja tantangan ${design.materiPokok || "materi pokok"} dengan landasan teori akademis yang lengkap dan logis.`;

  if (matLower.includes("bilangan") || matLower.includes("cacah") || matLower.includes("angka") || subLower.includes("matematika")) {
    indikatorKeaktifan = "Siswa aktif berkolaborasi menentukan nilai tempat, menyusun nama dan lambang bilangan cacah, serta telaten membimbing teman sekelompok yang lambat membaca angka.";
    indikatorPresentasi = "Penyampaian pengelompokan bilangan ratusan/puluhan/satuan secara terperinci, runtut membaca nama bilangan, percaya diri, dan sigap menjawab umpan balik audiens.";
    indikatorKetepatan = "Mampu memetakan korelasi nilai tempat angka (misalnya posisi nol atau nilai ratusan/puluhan/satuan) dengan ketepatan pemecahan masalah numerasi secara presisi.";
    indikatorKelengkapan = "Menyelesaikan seluruh soal tantangan hitung, tabel pengamatan bilangan cacah, dan analisis pemborosan energi dengan argumen matematika yang kokoh.";
  } else if (matLower.includes("fotosintesis") || matLower.includes("daun") || matLower.includes("tumbuhan") || matLower.includes("klorofil")) {
    indikatorKeaktifan = "Siswa aktif berbagi ide merancang eksperimen amilum daun, mengoordinasikan penetesan Lugol secara hati-hati, dan membimbing teman yang belum menguasai langkah kerja.";
    indikatorPresentasi = "Menyajikan laporan rantai proses fotosintesis dengan diagram alir yang jelas, vokal runtut, percaya diri, dan responsif atas sanggahan ilmiah kelompok lain.";
    indikatorKetepatan = "Mampu menjelaskan korelasi sebab-akibat antara intensitas cahaya, klorofil, air, dan karbondioksida terhadap kuantitas glukosa yang dihasilkan dengan akurat.";
    indikatorKelengkapan = "Menjawab seluruh kuis, mendeskripsikan fungsi daun hijau, serta menyusun usulan kebun pekarangan rumah secara teoretis lengkap dan logis.";
  } else if (matLower.includes("ekosistem") || matLower.includes("lingkungan") || matLower.includes("rantai makanan")) {
    indikatorKeaktifan = "Siswa aktif berkolaborasi memetakan rantai makanan, mengatur penempatan komponen biotik/abiotik dalam kelompok, dan membantu merumuskan penyelarasan ekosistem.";
    indikatorPresentasi = "Memaparkan keseimbangan ekosistem dengan intonasi mantap, visualisasi jaring-jaring makanan yang jelas, serta solutif menjawab perdebatan interaksi predator.";
    indikatorKetepatan = "Mampu memprediksi dan menerangkan hubungan sebab-akibat gangguan jaring makanan (seperti pemusnahan salah satu organisme) dengan dasar sains ekologi yang akurat.";
    indikatorKelengkapan = "Melengkapi semua lembar pengamatan komponen lingkungan hidup, merangkum dampak pestisida, serta menawarkan solusi biologi yang utuh.";
  }

  // Final Output Module Construct
  return {
    id,
    title: `Modul Ajar RPP - ${primarySubject} - Kelas ${school.kelas}`,
    createdAt: new Date().toISOString(),
    school,
    subject,
    design,
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
3. Penerapan Sintaks Model Pembelajaran "${design.modelPembelajaran}" Secara Terperinci:
${detailedSteps}
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
Aktivitas Kelompok: "Eksperimen Penyelidikan Kolaboratif ${design.materiPokok || "Materi"}"
Instruksi Kerja:
1. Bacalah petunjuk lembar kerja kelompok ini secara seksama bersama anggota kelompokmu.
2. Ambil media peraga / akses simulasi digital yang sudah disediakan guru.
3. Lakukan pengujian dan catatlah data hasil pengamatan pada tabel yang tersedia di bawah ini.
4. Diskusikan pertanyaan analisis kelompok dan presentasikan hasil kesimpulan di depan kelas!

Tabel Hasil Pengamatan Kelompok:
+---+-----------------------------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
|No | Objek Pengamatan                                                      | Hasil Pengamatan Utama                                                                         | Analisis Deskripsi                                                                                     |
+---+-----------------------------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
| 1 | ${objekA.padEnd(69)} | ${hasilA.padEnd(94)} | ${analisisA.padEnd(102)} |
| 2 | ${objekB.padEnd(69)} | ${hasilB.padEnd(94)} | ${analisisB.padEnd(102)} |
+---+-----------------------------------------------------------------------+------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------------------------------------+
      `.trim(),
      kegiatanIndividu: `
Aktivitas Mandiri: "Tantangan Berpikir Kritis Personal"
Petunjuk Pengisian:
1. Selesaikan tantangan pemecahan masalah mandiri ini tanpa berdiskusi.
2. Analisis permasalahan sehari-hari berikut: "${permasalahanSehariHari}"
3. Tuliskan jawaban analisismu secara terperinci maksimal 3 paragraf!

💡 Saran Visualisasi Pendukung Materi:
Rancanglah diagram alir proses melingkar menggunakan sumbu X/Y yang menunjukkan korelasi logis antar variabel.
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
        { kriteria: "Keaktifan Kelompok", indikator: indikatorKeaktifan, skor4: "Sangat Aktif", skor3: "Aktif", skor2: "Cukup Aktif", skor1: "Perlu Bimbingan" },
        { kriteria: "Kemampuan Presentasi", indikator: indikatorPresentasi, skor4: "Sangat Jelas", skor3: "Jelas", skor2: "Cukup Jelas", skor1: "Kurang Jelas" }
      ],
      sumatif: [
        { kriteria: "Ketepatan Analisis", indikator: indikatorKetepatan, skor4: "Sangat Tepat", skor3: "Tepat", skor2: "Cukup Tepat", skor1: "Kurang Tepat" },
        { kriteria: "Kelengkapan Jawaban", indikator: indikatorKelengkapan, skor4: "Sangat Lengkap", skor3: "Lengkap", skor2: "Cukup", skor1: "Kurang" }
      ]
    },
    lampiranKisiKisiSoal,
    lampiranKartuSoal,
    lampiranCetakSoal,
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
