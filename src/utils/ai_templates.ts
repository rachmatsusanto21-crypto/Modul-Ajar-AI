import { GeneratedModule, SchoolIdentity, SubjectIdentity, LearningDesign } from "../types";

// Helper function to get specific question for PjBL/PBL Tahap 1
function getMateriQuestion(materiPokok: string): string {
  const m = (materiPokok || "").toLowerCase();
  if (m.includes("bilangan") || m.includes("cacah") || m.includes("angka") || m.includes("lambang")) {
    return "Bagaimana cara membaca dan menuliskan nama serta lambang bilangan puluhan ribu dengan benar?";
  }
  if (m.includes("fotosintesis") || m.includes("daun") || m.includes("tumbuhan") || m.includes("klorofil")) {
    return "Bahan apa saja yang diperlukan tumbuhan untuk fotosintesis dan bagaimana proses terjadinya?";
  }
  if (m.includes("ekosistem") || m.includes("lingkungan") || m.includes("rantai makanan")) {
    return "Bagaimana rantai makanan dan interaksi antar makhluk hidup menjaga keseimbangan ekosistem?";
  }
  if (m.includes("gaya") || m.includes("gesek") || m.includes("magnet") || m.includes("gravitasi")) {
    return "Bagaimana pengaruh gaya gesek dan gravitasi terhadap pergerakan benda dalam kehidupan sehari-hari?";
  }
  return `Bagaimana cara memecahkan masalah kontekstual dan mengaplikasikan prinsip dasar ${materiPokok || "topik pembelajaran"} secara tepat?`;
}

// Helper function to get specific tools/media for PjBL/PBL Tahap 2
function getMateriTools(materiPokok: string, mediaBelajar?: string): string {
  const m = (materiPokok || "").toLowerCase();
  if (m.includes("bilangan") || m.includes("cacah") || m.includes("angka") || m.includes("lambang")) {
    return "kartu bilangan puluhan ribu, papan nilai tempat, poster lipat angka, dan lembar hitung";
  }
  if (m.includes("fotosintesis") || m.includes("daun") || m.includes("tumbuhan") || m.includes("klorofil")) {
    return "pot tanaman hias berdaun hijau, kantong plastik bening, larutan iodine/lugol, pipet tetes, dan lembar pengamatan daun";
  }
  if (m.includes("ekosistem") || m.includes("lingkungan") || m.includes("rantai makanan")) {
    return "kartu bergambar komponen biotik/abiotik, papan jaring-jaring makanan, dan kertas karton poster";
  }
  if (m.includes("gaya") || m.includes("gesek") || m.includes("magnet") || m.includes("gravitasi")) {
    return "mobil-mobilan mainan, neraca pegas, alas papan licin & kasar, serta lembar ukur";
  }
  if (mediaBelajar && mediaBelajar.trim().length > 0) {
    return mediaBelajar;
  }
  return `kartu peraga ${materiPokok || "materi"}, papan pameran 3D, dan lembar observasi`;
}

// Helper function to get specific Klasikal opening activity
function getKlasikalText(materiPokok: string): string {
  const m = (materiPokok || "").toLowerCase();
  if (m.includes("bilangan") || m.includes("cacah") || m.includes("angka") || m.includes("lambang")) {
    return "1. Klasikal: Guru menyajikan sebuah kartu bilangan puluhan ribu (misalnya angka 45.210) kemudian meminta siswa menebak cara membaca dan menuliskannya secara interaktif.";
  }
  if (m.includes("fotosintesis") || m.includes("daun") || m.includes("tumbuhan") || m.includes("klorofil")) {
    return "1. Klasikal: Guru menyajikan sebuah pot tanaman hias berdaun hijau segar dan tanaman layu dari tempat gelap, kemudian meminta siswa menebak bagaimana daun memproses makanan dengan bantuan cahaya matahari.";
  }
  if (m.includes("ekosistem") || m.includes("lingkungan") || m.includes("rantai makanan")) {
    return "1. Klasikal: Guru menyajikan gambar/foto ekosistem persawahan yang penuh dengan padi, belalang, dan katak, lalu meminta siswa menebak apa yang terjadi jika belalang punah.";
  }
  if (m.includes("gaya") || m.includes("gesek") || m.includes("magnet") || m.includes("gravitasi")) {
    return "1. Klasikal: Guru memperagakan dorongan dan tarikan pada mobil-mobilan mainan di permukaan meja yang licin dan kasar, lalu meminta siswa menebak gaya yang bekerja.";
  }
  return `1. Klasikal: Guru menyajikan media peraga/gambar/simulasi interaktif yang menampilkan contoh kasus riil terkait "${materiPokok || "materi pokok"}", kemudian meminta siswa menebak dan mendiskusikan fenomena tersebut secara interaktif.`;
}

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

  // Create list of students from school.students or default
  const defaultStudentNames = [
    "Achmad Fauzi", "Aisyah Putri", "Anindya Lestari", "Bagus Tri", "Citra Kirana",
    "Dewi Lestari", "Eko Prasetyo", "Fajar Hidayat", "Gita Gutawa", "Hadi Wijaya",
    "Indah Permata", "Joko Susilo", "Kartika Sari", "Lukman Hakim", "Megawati",
    "Naufal Abdi", "Putu Gede", "Rina Marlina", "Siti Aminah", "Taufik Hidayat",
    "Umar Faruq", "Vina Panduwinata", "Wawan Setiawan", "Yusuf Habibie", "Zaskia Adya"
  ];
  
  const studentSource = (school.students && school.students.length > 0)
    ? school.students.map(s => s.namaSiswa)
    : defaultStudentNames;

  const listAssessmentSiswa = Array.from({ length: Math.min(school.jumlahSiswa, studentSource.length) }, (_, i) => ({
    namaSiswa: studentSource[i] || `Siswa Kelas ${i + 1}`,
    nilaiSikap: ["Amat Baik (SB)", "Baik (B)", "Cukup (C)"][i % 3],
    nilaiKeterampilan: (85 + (i % 15)).toString(),
    nilaiKognitif: (80 + ((i * 3) % 20)).toString(),
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
  const materiQuestion = getMateriQuestion(design.materiPokok);
  const materiTools = getMateriTools(design.materiPokok, design.mediaBelajar);

  let detailedSteps = "";
  if (design.modelPembelajaran === "PjBL") {
    detailedSteps = `   a. Tahap 1 (Penentuan Pertanyaan Mendasar): Guru mengajukan masalah kontekstual mengenai "${design.materiPokok || "materi pokok"}" dengan pertanyaan mendasar: "${materiQuestion}". Siswa menganalisis isu tersebut dan merumuskan pertanyaan mendasar yang memicu rasa ingin tahu untuk dirancang solusinya.
   b. Tahap 2 (Mendesain Perencanaan Projek): Siswa berkolaborasi dalam kelompok heterogen merancang rencana kerja pembuatan projek/solusi. Mereka merencanakan aturan main kelompok, pembagian tugas, alat/bahan pendukung (seperti ${materiTools}), dan langkah-langkah penyelesaian projek.
   c. Tahap 3 (Menyusun Jadwal Pembuatan): Siswa secara kritis berdiskusi menyusun garis waktu (timeline) pengerjaan projek secara detail, menetapkan batas akhir pengerjaan, serta pembagian target capaian harian kelompok di bawah bimbingan guru.
   d. Tahap 4 (Memonitor Keberajuan Projek): Siswa aktif membuat projek atau melaksanakan investigasi mendalam sesuai jadwal yang disepakati. Guru berkeliling melakukan pemantauan intensif, membimbing penyelesaian kendala teknis, serta memastikan semua siswa berpartisipasi aktif.
   e. Tahap 5 (Menguji Hasil): Kelompok melakukan uji coba akhir terhadap projek/karya yang telah diselesaikan untuk mengukur kelayakan fungsinya. Guru memantau unjuk kerja siswa dan mencatat hasil evaluasi produk sebagai dasar penilaian ketercapaian kompetensi.
   f. Tahap 6 (Evaluasi Pengalaman Belajar): Setiap kelompok menyajikan dan mendemonstrasikan hasil karya projek mereka di hadapan kelas secara komunikatif. Siswa kelompok lain menyimak dengan saksama dan memberikan masukan konstruktif. Guru memberikan penguatan konsep esensial serta merefleksikan seluruh proses pembuatan projek bersama siswa.`;
  } else if (design.modelPembelajaran === "PBL") {
    detailedSteps = `   a. Tahap 1 (Orientasi Siswa pada Masalah): Guru mempresentasikan kasus nyata dan menantang terkait "${design.materiPokok || "materi pokok"}" dengan pertanyaan kunci: "${materiQuestion}". Siswa mengamati, merumuskan pertanyaan kunci, serta menetapkan fokus masalah yang perlu dipecahkan berkelompok.
   b. Tahap 2 (Mengorganisasi Siswa untuk Belajar): Siswa bergabung dalam kelompok heterogen. Guru membagikan LKPD, mendefinisikan tugas belajar secara spesifik, membimbing pembagian peran anggota kelompok, dan menyepakati rujukan pemecahan masalah dengan media pendukung (seperti ${materiTools}).
   c. Tahap 3 (Membimbing Penyelidikan Individu/Kelompok): Siswa melakukan investigasi mendalam, mencari informasi rujukan dari "${design.sumberBelajar || "buku pelajaran dan bahan ajar digital"}", mengumpulkan data hasil eksperimen/observasi, dan mendiskusikannya secara kritis dengan anggota kelompok untuk merumuskan draf solusi.
   d. Tahap 4 (Mengembangkan dan Menyajikan Hasil Karya): Siswa menyatukan data hasil penyelidikan untuk merumuskan solusi terbaik. Mereka menuangkannya ke dalam laporan terstruktur, peta konsep, atau poster visual, lalu mempresentasikan hasil karyanya di depan kelas secara percaya diri.
   e. Tahap 5 (Menganalisis & Mengevaluasi Proses): Kelompok lain menanyakan hal baru, menanggapi, atau menyempurnakan solusi yang ditawarkan. Guru mengonfirmasi kebenaran konsep ilmiah, meluruskan miskonsepsi, mereview langkah-langkah pemecahan masalah, dan memberikan umpan balik evaluatif.`;
  } else if (design.modelPembelajaran === "Discovery") {
    detailedSteps = `   a. Tahap 1 (Pemberian Rangsangan / Stimulation): Guru memberikan stimulus visual berupa peragaan media ${materiTools} mengenai "${design.materiPokok || "topik materi"}" tanpa penjelasan awal untuk memicu rasa ingin tahu mendalam.
   b. Tahap 2 (Pernyataan/Identifikasi Masalah / Problem Statement): Siswa mengidentifikasi sebanyak mungkin agenda pertanyaan dari stimulus tersebut, berfokus pada: "${materiQuestion}". Siswa merumuskannya dalam bentuk hipotesis dugaan sementara.
   c. Tahap 3 (Pengumpulan Data / Data Collection): Kelompok siswa melakukan pengumpulan data dengan membaca referensi literatur, melakukan eksperimen praktis, atau mengeksplorasi simulasi virtual untuk membuktikan kebenaran hipotesis mereka.
   d. Tahap 4 (Pengolahan Data / Data Processing): Siswa berdiskusi mengolah data hasil pengamatan, mengklasifikasikan pola, menghitung korelasi, dan menuliskannya ke dalam tabel analisis LKPD yang rapi.
   e. Tahap 5 (Pembuktian / Verification): Siswa melakukan verifikasi hasil olah data dengan mencocokkan teori resmi pada buku teks. Guru memberikan bimbingan untuk memastikan tidak terjadi miskonsepsi ilmiah.
   f. Tahap 6 (Menarik Kesimpulan / Generalization): Siswa bersama kelompok merumuskan kesimpulan umum/prinsip yang terbukti, mempresentasikannya, dan guru menyempurnakan kesimpulan akhir materi pembelajaran hari ini.`;
  } else if (design.modelPembelajaran === "Inquiry") {
    detailedSteps = `   a. Tahap 1 (Orientasi Masalah & Merumuskan Pertanyaan): Guru memandu perhatian siswa pada fenomena terkait "${design.materiPokok || "materi pokok"}" dengan pertanyaan penyelidikan: "${materiQuestion}". Siswa menanya secara kritis dan merumuskan pertanyaan penyelidikan mandiri kelompok.
   b. Tahap 2 (Merumuskan Hipotesis): Siswa secara cerdas bercurah pendapat untuk merumuskan jawaban sementara (hipotesis) terhadap pertanyaan riset yang telah ditetapkan sebelumnya.
   c. Tahap 3 (Mengumpulkan Data / Eksperimen): Siswa merancang tata cara pengujian menggunakan ${materiTools}, menguji langsung, dan mencatat angka/kejadian objektif secara teliti dalam lembar observasi.
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
    options?: { A: string; B: string; C: string; D: string };
  }

  const generatedQuestions: QuestionItem[] = [];
  let qTemplates: { 
    indicator: string; 
    level: string; 
    type: "Pilihan Ganda" | "Isian Pendek" | "Uraian / Esai"; 
    question: string; 
    key: string; 
    points: number;
    options?: { A: string; B: string; C: string; D: string };
  }[] = [];

  if (matLower.includes("bilangan") || matLower.includes("cacah") || matLower.includes("angka") || subLower.includes("matematika")) {
    qTemplates = [
      {
        indicator: "Siswa dapat menentukan lambang bilangan dari nama bilangan cacah sampai 100.000 yang disajikan.",
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: "Lambang bilangan dari 'tujuh puluh empat ribu dua ratus lima puluh' yang tepat adalah...",
        options: {
          A: "74.250",
          B: "70.425",
          C: "74.025",
          D: "74.520"
        },
        key: "A. 74.250 (Angka 7 menempati puluh ribuan, 4 ribuan, 2 ratusan, 5 puluhan, dan 0 satuan)",
        points: 10
      },
      {
        indicator: "Disajikan angka acak, siswa dapat menganalisis nilai tempat angka tertentu pada lambang bilangan sampai 100.000.",
        level: "C2 (Memahami)",
        type: "Pilihan Ganda",
        question: "Pada lambang bilangan '50.400', nilai tempat yang dimiliki oleh angka '5' adalah...",
        options: {
          A: "Ratusan",
          B: "Puluh Ribuan",
          C: "Ribuan",
          D: "Puluhan"
        },
        key: "B. Puluh Ribuan (Angka 5 menempati puluh ribuan, bernilai 50.000)",
        points: 10
      },
      {
        indicator: "Siswa dapat membandingkan dua bilangan cacah sampai 100.000 menggunakan simbol ketidaksamaan.",
        level: "C3 (Mengaplikasikan)",
        type: "Pilihan Ganda",
        question: "Perbandingan yang benar antara bilangan '56.780' dan '56.870' di bawah ini adalah...",
        options: {
          A: "56.780 > 56.870",
          B: "56.780 = 56.870",
          C: "56.780 < 56.870",
          D: "56.780 + 56.870 = 100.000"
        },
        key: "C. 56.780 < 56.870 (Karena nilai ratusan 7 lebih kecil daripada ratusan 8)",
        points: 10
      },
      {
        indicator: "Siswa dapat menentukan penulisan nominal mata uang sampai 100.000 yang tepat sesuai aturan tata bahasa.",
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: "Penulisan lambang uang dan nama bilangan dari nominal 'Rp 98.500' yang benar secara formal adalah...",
        options: {
          A: "Sembilan puluh delapan ribu lima ratus rupiah",
          B: "Sembilan puluh delapan ratus rupiah",
          C: "Delapan puluh sembilan ribu lima ratus rupiah",
          D: "Sembilan belas ribu delapan ratus rupiah"
        },
        key: "A. Sembilan puluh delapan ribu lima ratus rupiah",
        points: 10
      },
      {
        indicator: "Siswa dapat mengurutkan beberapa bilangan cacah besar mulai dari yang nilainya paling kecil.",
        level: "C3 (Mengaplikasikan)",
        type: "Pilihan Ganda",
        question: "Urutan bilangan dari yang terkecil hingga terbesar untuk bilangan: 12.350, 12.530, dan 12.305 yang benar adalah...",
        options: {
          A: "12.530, 12.350, 12.305",
          B: "12.305, 12.350, 12.530",
          C: "12.350, 12.305, 12.530",
          D: "12.305, 12.530, 12.350"
        },
        key: "B. 12.305, 12.350, 12.530",
        points: 10
      },
      {
        indicator: "Siswa dapat melengkapi nilai tempat dari digit angka nol pada bilangan besar harian.",
        level: "C2 (Memahami)",
        type: "Isian Pendek",
        question: "Pada bilangan 90.400, angka 0 yang terletak di sebelah kanan angka 9 menempati nilai tempat...",
        key: "Ribuan (bernilai 0 ribuan)",
        points: 10
      },
      {
        indicator: "Siswa dapat menuliskan lambang bilangan cacah yang didektekan guru secara lisan.",
        level: "C1 (Mengingat)",
        type: "Isian Pendek",
        question: "Lambang bilangan dari sembilan puluh ribu sembilan secara numerik ditulis...",
        key: "90.009",
        points: 10
      },
      {
        indicator: "Siswa dapat menguraikan bentuk panjang bilangan berdasarkan letak nilai tempatnya.",
        level: "C2 (Memahami)",
        type: "Isian Pendek",
        question: "Bilangan 67.089 jika dijabarkan menurut nilai tempatnya adalah 60.000 + 7.000 + [....] + 80 + 9. Isian rumpang yang tepat adalah...",
        key: "0 (karena ratusannya bernilai nol)",
        points: 10
      },
      {
        indicator: "Siswa dapat menganalisis peran nilai tempat bilangan cacah dalam kehidupan sehari-hari.",
        level: "C4 (Menganalisis)",
        type: "Uraian / Esai",
        question: "Analisislah mengapa pemahaman nilai tempat bilangan cacah sangat krusial saat kita menghitung total harga buku di kasir toko buku dan mencocokkan jumlah uang kembalian yang diterima secara cepat!",
        key: "Jawaban analisis terstruktur: Nilai tempat memandu pembacaan nominal uang dengan presisi. Misalnya, membedakan pecahan Rp 50.000 dan Rp 5.000. Kesalahan posisi digit (nilai tempat) berisiko menyebabkan kerugian transaksi finansial secara riil.",
        points: 10
      },
      {
        indicator: "Siswa dapat mengevaluasi miskonsepsi penulisan angka besar harian dan menyajikan solusinya.",
        level: "C5 (Mengevaluasi)",
        type: "Uraian / Esai",
        question: "Siswa bernama Budi menuliskan nominal 'lima puluh ribu empat ratus' menjadi '5400'. Evaluasilah miskonsepsi apa yang dialami oleh Budi, jelaskan konsep penulisan angka yang benar berdasarkan nilai tempat beserta alasannya!",
        key: "Jawaban kritis-evaluatif: Budi mengalami miskonsepsi hilangnya angka nol penjaga nilai tempat (place-holder). Ia langsung menggabungkan 50 ribu dan 400 tanpa memperhatikan kolom ribuan dan puluhan. Penulisan yang benar adalah '50.400', di mana kolom ribuan diisi angka 0 dan puluhan diisi angka 0 agar angka 5 bernilai puluh ribuan.",
        points: 10
      }
    ];
  } else if (matLower.includes("fotosintesis") || matLower.includes("daun") || matLower.includes("tumbuhan") || matLower.includes("klorofil") || subLower.includes("ipas") || subLower.includes("ipa")) {
    qTemplates = [
      {
        indicator: "Siswa dapat menyebutkan zat hijau daun yang krusial dalam menyerap energi matahari.",
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: "Zat hijau pada daun tumbuhan yang berperan menangkap sinar matahari untuk fotosintesis disebut...",
        options: {
          A: "Stomata",
          B: "Klorofil",
          C: "Kloroplas",
          D: "Amilum"
        },
        key: "B. Klorofil",
        points: 10
      },
      {
        indicator: "Siswa dapat menyimpulkan bahan-bahan baku utama yang diperlukan untuk reaksi fotosintesis.",
        level: "C2 (Memahami)",
        type: "Pilihan Ganda",
        question: "Bahan yang diperlukan tumbuhan untuk melakukan fotosintesis yang diserap melalui akar dan udara adalah...",
        options: {
          A: "Air dan Karbondioksida",
          B: "Air dan Oksigen",
          C: "Glukosa dan Nitrogen",
          D: "Karbondioksida dan Oksigen"
        },
        key: "A. Air dan Karbondioksida",
        points: 10
      },
      {
        indicator: "Siswa dapat memprediksi dampak penutupan permukaan daun dengan alumunium foil terhadap produksi amilum.",
        level: "C3 (Mengaplikasikan)",
        type: "Pilihan Ganda",
        question: "Jika selembar daun ditutup kertas timah (alumunium foil) selama beberapa hari lalu ditetesi larutan iodine, bagian daun yang tertutup akan berwarna...",
        options: {
          A: "Biru kehitaman pekat",
          B: "Hijau tua kebiruan",
          C: "Pucat kekuningan (tidak berubah gelap)",
          D: "Merah kecokelatan"
        },
        key: "C. Pucat kekuningan (tidak berubah gelap)",
        points: 10
      },
      {
        indicator: "Siswa dapat mengidentifikasi gas hasil fotosintesis yang dilepaskan ke udara bebas.",
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: "Gas hasil akhir proses fotosintesis yang sangat bermanfaat bagi kelangsungan pernapasan manusia dan hewan adalah...",
        options: {
          A: "Karbondioksida",
          B: "Nitrogen",
          C: "Hidrogen",
          D: "Oksigen"
        },
        key: "D. Oksigen",
        points: 10
      },
      {
        indicator: "Siswa dapat menunjukkan sumber energi eksternal alami utama dalam proses pembuatan makanan tumbuhan.",
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: "Sumber energi alami paling utama yang menggerakkan seluruh proses fotosintesis pada tumbuhan hijau adalah...",
        options: {
          A: "Sinar Matahari",
          B: "Lampu Neon",
          C: "Pupuk Kompos",
          D: "Panas Bumi"
        },
        key: "A. Sinar Matahari",
        points: 10
      },
      {
        indicator: "Siswa dapat menyebutkan organel sel spesifik pada tumbuhan tempat berlangsungnya fotosintesis.",
        level: "C2 (Memahami)",
        type: "Isian Pendek",
        question: "Organel sel tumbuhan yang mengandung zat klorofil tempat dilangsungkannya fotosintesis secara internal disebut...",
        key: "Kloroplas",
        points: 10
      },
      {
        indicator: "Siswa dapat mengidentifikasi senyawa kimia karbon yang diserap daun dari atmosfer.",
        level: "C1 (Mengingat)",
        type: "Isian Pendek",
        question: "Gas yang diserap stomata daun tumbuhan hijau dari udara sebagai bahan baku karbon fotosintesis adalah...",
        key: "Karbondioksida (CO2)",
        points: 10
      },
      {
        indicator: "Siswa dapat menyebutkan senyawa karbohidrat hasil fotosintesis yang disimpan sebagai cadangan energi.",
        level: "C2 (Memahami)",
        type: "Isian Pendek",
        question: "Zat tepung hasil fotosintesis yang terdeteksi kehitaman saat diuji iodine di laboratorium dinamakan...",
        key: "Amilum / Glukosa / Zat Tepung",
        points: 10
      },
      {
        indicator: "Siswa dapat menguraikan hubungan sebab-akibat fotosintesis terhadap kesegaran udara pekarangan.",
        level: "C4 (Menganalisis)",
        type: "Uraian / Esai",
        question: "Analisislah mengapa intensitas sinar matahari pagi yang melimpah berkorelasi langsung terhadap peningkatan kesegaran udara di pekarangan rumah yang dipenuhi pepohonan hijau!",
        key: "Jawaban analitis: Pepohonan hijau menyerap energi matahari pagi secara optimal untuk melangsungkan fotosintesis dengan memecah air dan karbondioksida menjadi glukosa dan oksigen (O2). Kuantitas pelepasan gas oksigen segar yang melimpah inilah yang membuat udara pagi terasa sangat bersih dan menyehatkan.",
        points: 10
      },
      {
        indicator: "Siswa dapat merinci proses fotosintesis secara runtut beserta skema reaksinya.",
        level: "C5 (Mengevaluasi)",
        type: "Uraian / Esai",
        question: "Jelaskan proses terjadinya fotosintesis pada tumbuhan secara sistematis, sertakan pula bahan baku yang dibutuhkan serta produk-produk akhir yang dihasilkannya!",
        key: "Jawaban proses terperinci: Fotosintesis diawali penyerapan air oleh akar dan gas CO2 oleh stomata. Energi cahaya matahari ditangkap klorofil untuk mereaksikan air dan CO2 tersebut menjadi glukosa (sebagai cadangan makanan) dan gas oksigen (O2) yang dilepaskan kembali ke udara bebas.",
        points: 10
      }
    ];
  } else {
    // Generik fallbacks
    qTemplates = [
      {
        indicator: `Siswa dapat mendefinisikan prinsip dasar materi pokok ${design.materiPokok}.`,
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: `Manakah dari pernyataan berikut yang mendefinisikan konsep utama dari ${design.materiPokok || "Materi Pokok"} secara tepat?`,
        options: {
          A: `Definisi operasional teoretis yang selaras dengan konsep ${design.materiPokok || "materi"}`,
          B: `Pernyataan acak yang tidak berkaitan dengan ${design.materiPokok || "materi"}`,
          C: `Rumus umum tanpa penerapan pada ${design.materiPokok || "materi"}`,
          D: `Pendapat subjektif tanpa bukti ilmiah`
        },
        key: "A. Definisi operasional teoretis yang selaras dengan standar akademis nasional.",
        points: 10
      },
      {
        indicator: `Siswa dapat memahami komponen pembentuk materi ${design.materiPokok}.`,
        level: "C2 (Memahami)",
        type: "Pilihan Ganda",
        question: `Berikut ini yang merupakan elemen pendukung utama dalam mewujudkan konsep ${design.materiPokok || "Materi Pokok"} adalah...`,
        options: {
          A: `Unsur abiotik tanpa kaitan dengan ${design.materiPokok || "materi"}`,
          B: `Kolaborasi elemen pendukung dan interaksi konseptual ${design.materiPokok || "materi"}`,
          C: `Hambatan eksternal yang merusak sistem`,
          D: `Variabel tidak terstruktur`
        },
        key: "B. Kolaborasi unsur biotik dan interaksi konseptual berkelanjutan harian.",
        points: 10
      },
      {
        indicator: `Siswa dapat mendemonstrasikan penyelesaian kasus terkait ${design.materiPokok}.`,
        level: "C3 (Mengaplikasikan)",
        type: "Pilihan Ganda",
        question: `Ketika diberikan tantangan praktis mengenai ${design.materiPokok || "Materi Pokok"}, langkah pertama yang logis dilakukan adalah...`,
        options: {
          A: `Mengabaikan gejala awal masalah`,
          B: `Langsung mengambil kesimpulan tanpa data`,
          C: `Melakukan observasi karakteristik objek dan merencanakan tindakan ${design.materiPokok || "materi"}`,
          D: `Meninggalkan tugas kelompok`
        },
        key: "C. Melakukan observasi karakteristik objek dan menyusun perencanaan tindakan harian.",
        points: 10
      },
      {
        indicator: `Siswa dapat mengidentifikasi tujuan utama materi ${design.materiPokok}.`,
        level: "C1 (Mengingat)",
        type: "Pilihan Ganda",
        question: `Tujuan fundamental dari pengkajian terstruktur terhadap materi ${design.materiPokok || "Materi Pokok"} di kelas adalah...`,
        options: {
          A: `Menghafal istilah tanpa memahami konteks`,
          B: `Mengejar nilai ujian semata`,
          C: `Menghindari tugas berbasis projek`,
          D: `Menumbuhkan penalaran kritis aktif siswa terhadap fenomena ${design.materiPokok || "materi"}`
        },
        key: "D. Menumbuhkan penalaran kritis aktif siswa terhadap lingkungan riil.",
        points: 10
      },
      {
        indicator: `Siswa dapat mengidentifikasi pengaplikasian mandiri materi ${design.materiPokok}.`,
        level: "C3 (Mengaplikasikan)",
        type: "Pilihan Ganda",
        question: `Manakah di bawah ini yang merupakan perwujudan profil pelajar mandiri dalam mengkaji ${design.materiPokok || "Materi Pokok"}?`,
        options: {
          A: `Mampu menyelesaikan tugas latihan pemahaman ${design.materiPokok || "materi"} secara mandiri dan tekun`,
          B: `Bergantung sepenuhnya pada instruksi teman sekelompok`,
          C: `Tidak mengumpulkan laporan tepat waktu`,
          D: `Menolak berpartisipasi dalam diskusi`
        },
        key: "A. Mampu menyelesaikan uji latihan pemahaman mandiri secara tekun dan berani.",
        points: 10
      },
      {
        indicator: `Siswa dapat melengkapi istilah kunci pada pembahasan materi harian.`,
        level: "C2 (Memahami)",
        type: "Isian Pendek",
        question: `Pendekatan terstruktur yang digunakan guru harian dalam menjembatani penyampaian materi ${design.materiPokok || "Materi Pokok"} adalah pendekatan...`,
        key: "Pendekatan Saintifik Kontekstual",
        points: 10
      },
      {
        indicator: `Siswa dapat menentukan jenis media yang paling relevan untuk materi harian.`,
        level: "C2 (Memahami)",
        type: "Isian Pendek",
        question: `Situs web penunjang visualisasi virtual yang disiapkan oleh guru untuk simulasi konsep harian adalah...`,
        key: "Simulasi Virtual / Alat Peraga Konkrit",
        points: 10
      },
      {
        indicator: `Siswa dapat menyebutkan jenis evaluasi akhir di ujung pembelajaran harian.`,
        level: "C1 (Mengingat)",
        type: "Isian Pendek",
        question: `Jenis asesmen mandiri tertulis di akhir pembelajaran harian untuk memetakan capaian pemahaman siswa dinamakan asesmen...`,
        key: "Asesmen Sumatif Lingkup Materi",
        points: 10
      },
      {
        indicator: `Siswa dapat menganalisis hubungan timbal balik variabel pada materi ${design.materiPokok}.`,
        level: "C4 (Menganalisis)",
        type: "Uraian / Esai",
        question: `Jelaskan analisis hubungan sebab-akibat yang terjadi apabila salah satu komponen penting dalam materi ${design.materiPokok || "Materi Pokok"} ditiadakan secara sengaja!`,
        key: "Jawaban analisis mendalam: Siswa menjabarkan runtutan akibat dari hilangnya salah satu variabel terhadap kestabilan sistem konsep pembelajaran secara keseluruhan.",
        points: 10
      },
      {
        indicator: `Siswa dapat merancang usulan skenario penerapan konsep materi harian di lingkungan rumah.`,
        level: "C6 (Menciptakan)",
        type: "Uraian / Esai",
        question: `Rancanglah sebuah rencana sederhana penerapan konsep materi harian ${design.materiPokok || "Materi Pokok"} untuk membantu memecahkan satu permasalahan konkrit di lingkungan keluarga Anda!`,
        key: "Jawaban kreatif: Siswa merumuskan langkah praktis berurutan mulai dari mengenali gejala masalah domestik, mengaitkannya dengan prinsip materi pokok, dan melaksanakan pemecahan mandiri harian.",
        points: 10
      }
    ];
  }

  // We always map all 10 questions of qTemplates to generatedQuestions
  qTemplates.forEach((q, index) => {
    generatedQuestions.push({
      nomorSoal: index + 1,
      indikator: q.indicator,
      levelKognitif: q.level,
      jenisSoal: q.type,
      rincianSoal: q.question,
      kunciJawaban: q.key,
      poin: q.points,
      options: q.options
    });
  });

  // Construct printable exam test sheet
  let cetakSoalText = `
ASESMEN SUMATIF HARIAN SEKOLAH
Mata Pelajaran: ${primarySubject} | Kelas: ${school.kelas}
Hari/Tanggal: _____________________ | Nama Siswa: ____________________

`;

  const pgQs = generatedQuestions.filter(q => q.jenisSoal === "Pilihan Ganda");
  const isianQs = generatedQuestions.filter(q => q.jenisSoal === "Isian Pendek");
  const esaiQs = generatedQuestions.filter(q => q.jenisSoal === "Uraian / Esai");

  if (pgQs.length > 0) {
    cetakSoalText += `I. Pilihan Ganda (Pilihlah salah satu jawaban yang paling tepat!)\n`;
    pgQs.forEach((q, idx) => {
      let optA = "";
      let optB = "";
      let optC = "";
      let optD = "";
      if (q.options) {
        optA = `A. ${q.options.A}`;
        optB = `B. ${q.options.B}`;
        optC = `C. ${q.options.C}`;
        optD = `D. ${q.options.D}`;
      } else {
        const correctOptionLetter = q.kunciJawaban.substring(0, 1);
        const optStr = q.kunciJawaban.substring(2);
        optA = "A. " + (correctOptionLetter === "A" ? optStr : "Opsi pengecoh alternatif A");
        optB = "B. " + (correctOptionLetter === "B" ? optStr : "Opsi pengecoh alternatif B");
        optC = "C. " + (correctOptionLetter === "C" ? optStr : "Opsi pengecoh alternatif C");
        optD = "D. " + (correctOptionLetter === "D" ? optStr : "Opsi pengecoh alternatif D");
      }
      cetakSoalText += `${idx + 1}. ${q.rincianSoal}\n   ${optA}\n   ${optB}\n   ${optC}\n   ${optD}\n\n`;
    });
  }

  if (isianQs.length > 0) {
    cetakSoalText += `II. Isian Pendek (Isilah titik-titik di bawah ini dengan jawaban yang singkat dan tepat!)\n`;
    isianQs.forEach((q, idx) => {
      cetakSoalText += `${idx + 1}. ${q.rincianSoal}\n   Jawaban: ____________________________________________________________________________\n\n`;
    });
  }

  if (esaiQs.length > 0) {
    cetakSoalText += `III. Uraian/Esai (Jawablah pertanyaan berikut dengan analisis yang jelas dan terperinci!)\n`;
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

  // Dynamic Introductory/Awal activities with 5 highly detailed specific points
  let kegiatanAwalText = "";
  if (matLower.includes("bilangan") || matLower.includes("cacah") || matLower.includes("angka") || subLower.includes("matematika")) {
    kegiatanAwalText = `1. Pembukaan (Salam & Doa): Guru membuka pembelajaran dengan salam hangat, menanyakan kabar, mengajak seluruh siswa berdoa bersama dipimpin oleh ketua kelas, serta melakukan presensi kehadiran siswa secara interaktif untuk menciptakan atmosfer kelas yang positif dan siap belajar.
2. Kegiatan Pagi Ceria: Ice breaking interaktif "Tepuk Konsentrasi & Bilangan Cepat", di mana guru menyebutkan angka puluhan/satuan secara cepat dan siswa harus menepuk tangan sesuai jumlah nilai tempatnya untuk membangkitkan fokus, kesiapan mental, dan kebahagiaan siswa sebelum masuk ke materi inti.
3. Apersepsi Spesifik: Guru mengaitkan materi sebelumnya (yaitu "Bilangan cacah sampai 10.000") dengan materi baru "${design.materiPokok || "Bilangan cacah sampai 100.000"}". Caranya, guru menunjukkan gambar barang seharga Rp 9.500 dan bertanya secara konkret kepada siswa: "Anak-anak, jika kita membeli 5 buku ini di toko, harganya akan melebihi sepuluh ribu rupiah. Bagaimana cara kita menuliskan dan membaca nominal besar tersebut secara tepat?" Siswa mengamati perubahan digit dari ribuan menuju puluh ribuan.
4. Tujuan Pembelajaran Spesifik: Melalui kegiatan eksplorasi kelompok dan media kartu angka, peserta didik dapat menentukan nilai tempat, membaca, menulis, membandingkan, serta mengurutkan bilangan cacah hingga 100.000 dengan tepat dan mandiri.
5. Kontekstualitas Nyata: Pembelajaran ini bermanfaat langsung agar peserta didik mampu menyebutkan nama bilangan dengan tepat saat menghitung harga total buku yang dibeli di toko buku, membayar belanjaan, atau menghitung kembalian belanja secara mandiri tanpa keliru nilai tempatnya dalam kehidupan sehari-hari.`;
  } else if (matLower.includes("fotosintesis") || matLower.includes("daun") || matLower.includes("tumbuhan") || matLower.includes("klorofil") || subLower.includes("ipas") || subLower.includes("ipa")) {
    kegiatanAwalText = `1. Pembukaan (Salam & Doa): Guru membuka pembelajaran dengan salam hangat, menanyakan kabar, mengajak seluruh siswa berdoa bersama dipimpin oleh ketua kelas, serta melakukan presensi kehadiran siswa secara interaktif untuk menciptakan atmosfer kelas yang positif dan siap belajar.
2. Kegiatan Pagi Ceria: Ice breaking interaktif "Tebak Daun & Gerak Oksigen", di mana siswa melakukan gerakan menghirup udara segar bersama-sama dan menebak jenis tanaman di pekarangan sekolah untuk menyegarkan pikiran dan membangkitkan kesiapan belajar.
3. Apersepsi Spesifik: Guru mengaitkan materi bagian-bagian tumbuhan (akar, batang, daun) dengan materi "Fotosintesis dan Klorofil". Caranya, guru menyandingkan tumbuhan yang segar dengan tumbuhan pot kecil yang layu karena disimpan di lemari gelap, lalu melontarkan pertanyaan pemantik konkrit: "Anak-anak, mengapa tumbuhan yang disimpan di lemari gelap tampak layu kekuningan sedangkan yang di luar tampak hijau segar? Apa yang sedang dilakukan oleh zat hijau daun di bawah paparan sinar matahari?" Siswa diajak mengidentifikasi pentingnya cahaya bagi daun tumbuhan.
4. Tujuan Pembelajaran Spesifik: Melalui eksperimen sederhana uji amilum daun dan diskusi kelompok, peserta didik dapat mengidentifikasi bahan-bahan utama proses fotosintesis, menjelaskan skema reaksinya, serta menyimpulkan pentingnya fotosintesis bagi makhluk hidup lain dengan tepat.
5. Kontekstualitas Nyata: Pembelajaran ini bermanfaat langsung agar peserta didik menyadari pentingnya merawat tumbuhan hijau di pekarangan rumah serta melestarikannya guna menjamin ketersediaan suplai udara bersih (oksigen) yang segar untuk pernapasan seluruh keluarga secara alami.`;
  } else {
    kegiatanAwalText = `1. Pembukaan (Salam & Doa): Guru membuka pembelajaran dengan salam hangat, menanyakan kabar, mengajak seluruh siswa berdoa bersama dipimpin oleh ketua kelas, serta melakukan presensi kehadiran siswa secara interaktif untuk menciptakan atmosfer kelas yang positif dan siap belajar.
2. Kegiatan Pagi Ceria: Ice breaking interaktif "Sambung Kata Konseptual", di mana siswa secara bergiliran mengucapkan satu kata positif yang relevan dengan materi "${design.materiPokok || "pembelajaran hari ini"}" untuk menstimulus kesiapan kognitif, kebersamaan, dan rasa gembira.
3. Apersepsi Spesifik: Guru mengaitkan materi prasyarat yang dipelajari pada pertemuan sebelumnya dengan materi baru "${design.materiPokok || "topik utama"}". Caranya, guru menuliskan satu studi kasus singkat di papan tulis terkait pengalaman harian siswa dan bertanya secara konkret: "Bagaimana cara kita memecahkan masalah tersebut dengan menyambungkan konsep lama kita ke topik ${design.materiPokok || "yang akan kita bahas hari ini"}?"
4. Tujuan Pembelajaran Spesifik: Melalui rangkaian aktivitas pembelajaran aktif menggunakan pendekatan ${design.pendekatan} dan model ${design.modelPembelajaran}, siswa diharapkan secara spesifik mampu menganalisis, menguraikan, serta mendemonstrasikan pemahaman konsep "${design.materiPokok || "materi utama"}" secara runtut, logis, dan kritis.
5. Kontekstualitas Nyata: Pembelajaran mengenai "${design.materiPokok || "topik ini"}" bermanfaat langsung agar peserta didik memiliki kecakapan praktis dalam mengenali, menyusun solusi, dan mengaplikasikan keahlian terkait ${design.materiPokok || "topik pembelajaran"} untuk memecahkan masalah nyata yang mereka temui dalam kehidupan sehari-hari di rumah maupun di masyarakat.`;
  }
  let kegiatanAkhirText = "";
  if (matLower.includes("bilangan") || matLower.includes("cacah") || matLower.includes("angka") || subLower.includes("matematika")) {
    kegiatanAkhirText = `1. Penguatan Konseptual & Koreksi Miskonsepsi: Guru memberikan penguatan secara verbal dan visual menggunakan alat peraga nilai tempat. Guru meluruskan miskonsepsi umum di mana siswa sering salah memposisikan angka nol saat mendiktekan angka puluhan ribu (misal: "lima puluh ribu empat ratus" ditulis salah menjadi "5400" atau "500400"). Guru menerangkan konsep yang benar bahwa setiap angka menempati kolom masing-masing secara berurutan: Puluh Ribuan (5), Ribuan (0), Ratusan (4), Puluhan (0), Satuan (0) menjadi "50.400".
2. Penyimpulan Bersama: Guru bersama perwakilan siswa menyusun simpulan esensial mengenai materi hari ini. Poin simpulan mencakup: bilangan cacah sampai 100.000 memiliki lima digit angka. Konsep pembacaan yang benar dimulai dari kiri ke kanan dengan memperhatikan pemisah titik ribuan. Contoh konkrit: bilangan 74.250 memiliki struktur 7 puluh ribuan (70.000), 4 ribuan (4.000), 2 ratusan (200), 5 puluhan (50), dan 0 satuan (0) yang dibaca "tujuh puluh empat ribu dua ratus lima puluh".
3. Refleksi Interaktif: Guru membagikan lembar umpan balik singkat "3-2-1" mengenai 3 hal yang paling dipahami (cara membaca, membandingkan, menulis lambang bilangan), 2 bagian paling menarik (ice breaking gerak cepat nilai tempat), dan 1 pertanyaan yang masih belum dipahami sepenuhnya.
4. Evaluasi Mandiri: Siswa mengerjakan kuis tertulis (Asesmen Sumatif Akhir) selama 15 menit secara mandiri yang terdiri atas tepat 10 soal (5 Pilihan Ganda, 3 Isian Pendek, dan 2 Uraian) guna memetakan ketuntasan kognitif individu harian.
5. Umpan Balik & PR Spesifik: Sebagai tindak lanjut, guru memberikan Penugasan Terstruktur di Rumah (PR) kolaboratif bersama orang tua: Siswa mencari 3 struk belanja/nota harian di rumah yang mencantumkan nominal harga di bawah Rp 100.000 (misalnya belanja dapur atau buku tulis), menempelkannya di buku tugas, lalu menuliskan nama bilangannya secara tepat sesuai tata bahasa matematika Indonesia.`;
  } else if (matLower.includes("fotosintesis") || matLower.includes("daun") || matLower.includes("tumbuhan") || matLower.includes("klorofil") || subLower.includes("ipas") || subLower.includes("ipa")) {
    kegiatanAkhirText = `1. Penguatan Konseptual & Koreksi Miskonsepsi: Guru memberikan penguatan visual melalui diagram proses fotosintesis. Guru meluruskan miskonsepsi umum di mana beberapa siswa mengira fotosintesis hanya terjadi pada malam hari atau bahwa fotosintesis melepaskan gas karbondioksida ke udara. Guru menerangkan konsep yang benar bahwa fotosintesis membutuhkan cahaya matahari (paling optimal pada siang hari) dan menyerap karbondioksida serta mengeluarkan gas oksigen (O2) yang segar serta glukosa sebagai makanan cadangan tumbuhan.
2. Penyimpulan Bersama: Guru bersama perwakilan siswa menyusun poin-poin kesimpulan esensial. Poin simpulan mencakup: fotosintesis adalah proses pembuatan zat makanan oleh tumbuhan berklorofil menggunakan air dan karbondioksida dengan bantuan energi cahaya matahari. Contoh hasilnya adalah zat tepung (amilum) yang terbukti melalui perubahan warna daun menjadi biru kehitaman saat diuji iodine, dan pelepasan oksigen ke atmosfer bumi.
3. Refleksi Interaktif: Guru membagikan lembar umpan balik bergambar "Pohon Emosi & Pengetahuan" di mana siswa mengidentifikasi emosi mereka saat melakukan uji amilum daun, serta merangkum bagian materi yang sudah jelas dan yang masih butuh pengulangan.
4. Evaluasi Mandiri: Siswa mengerjakan kuis tertulis (Asesmen Sumatif Akhir) selama 15 menit secara mandiri yang terdiri atas tepat 10 soal (5 Pilihan Ganda, 3 Isian Pendek, dan 2 Uraian) untuk mengukur pemahaman saintifik individu tanpa membuka buku catatan.
5. Umpan Balik & PR Spesifik: Sebagai tindak lanjut, guru memberikan Penugasan Terstruktur di Rumah (PR) kolaboratif bersama orang tua: Siswa mengamati satu jenis tumbuhan pot hijau di pekarangan rumahnya, menuliskan deskripsi singkat mengenai kecukupan paparan sinar matahari tumbuhan tersebut, serta menjelaskan peran pentingnya dalam memproduksi oksigen harian bagi keluarga.`;
  } else {
    kegiatanAkhirText = `1. Penguatan Konseptual & Koreksi Miskonsepsi: Guru memberikan penguatan materi harian secara konkret. Guru meluruskan miskonsepsi umum terkait materi harian di mana siswa sering keliru membedakan urutan prosedural konsep "${design.materiPokok || "ini"}". Guru menerangkan kembali konsep yang benar secara terstruktur demi menghindari kesalahan pemahaman yang berlanjut.
2. Penyimpulan Bersama: Guru bersama perwakilan siswa menyusun simpulan esensial harian. Poin simpulan mencakup konsep-konsep kunci dari materi pokok beserta contoh konkrit pengaplikasian praktis harian.
3. Refleksi Interaktif: Guru membagikan lembar tiket keluar (exit ticket) reflektif harian mengenai materi yang disukai, dipahami, dan yang belum jelas.
4. Evaluasi Mandiri: Siswa menuntaskan kuis tertulis secara mandiri selama 10-15 menit berisi tepat 10 butir soal (5 Pilihan Ganda, 3 Isian Pendek, dan 2 Uraian) guna mengukur pemahaman harian.
5. Umpan Balik & PR Spesifik: Guru membagikan PR terstruktur kolaboratif bersama keluarga untuk mengamati penerapan konsep "${design.materiPokok || "materi harian"}" di lingkungan rumah.`;
  }

  // Wajib mencantumkan website address, citations, and journals
  const customSourcesList = [
    `Buku Panduan Guru dan Buku Siswa ${primarySubject} SD Kelas ${school.kelas}, Kemdikbudristek RI. Akses katalog resmi di: https://buku.kemdikbud.go.id/katalog/buku-kurikulum-merdeka`,
    "Portal Resmi Merdeka Mengajar, Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI. URL: https://guru.kemdikbud.go.id",
    "Jurnal Ilmiah Pendidikan Dasar Indonesia (JIPDI), Vol. 8 No. 1, Artikel: Peningkatan Efektivitas Pembelajaran Berbasis Konstruktivisme. Tautan artikel jurnal: https://journal.unesa.ac.id/index.php/jipdi/article/view/10294"
  ];

  // Narasumber kompeten bila tidak dicantumkan di Sumber Belajar & Referensi maka tidak perlu dituliskan
  if (design.sumberBelajar) {
    if (design.sumberBelajar.toLowerCase().includes("narasumber") || design.sumberBelajar.toLowerCase().includes("wawancara") || design.sumberBelajar.toLowerCase().includes("tokoh") || design.sumberBelajar.toLowerCase().includes("ahli") || design.sumberBelajar.toLowerCase().includes("praktisi")) {
      customSourcesList.push(`Narasumber Kompeten Terpilih (Sesuai Referensi Pengguna): ${design.sumberBelajar}`);
    } else {
      customSourcesList.push(`Sumber Belajar Kustom Pengguna: ${design.sumberBelajar} (Diakses melalui: https://belajar.kemdikbud.go.id)`);
    }
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
        kegiatan: kegiatanAwalText,
        alokasiWaktu: waktuAwal,
        keterangan: "Fokus pada pengkondisian psikis siswa dan pembentukan koneksi emosional pembelajaran."
      },
      {
        tahapan: "Inti",
        sintaks: `${sintaksAwal} s/d ${sintaksInti2}`,
        kegiatan: `${getKlasikalText(design.materiPokok)}
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
        kegiatan: kegiatanAkhirText,
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
    sumberDihasilkan: customSourcesList,
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
