import { GeneratedModule } from "../types";

// Helper for Google Drive and Google Docs client-side calls
// We support both actual OAuth token-based calls AND a beautiful robust local simulation
export interface DriveLog {
  id: string;
  type: "info" | "success" | "error" | "sync";
  message: string;
  timestamp: string;
}

export interface DriveFolderStructure {
  name: string;
  files: { name: string; type: string; size: string; date: string }[];
}

export async function createGoogleDriveFolder(
  token: string,
  folderName: string,
  parentFolderId?: string
): Promise<{ id: string; name: string }> {
  try {
    const body: any = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    };
    if (parentFolderId) {
      body.parents = [parentFolderId];
    }

    const response = await fetch("https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Gagal membuat folder: ${response.statusText}`);
    }

    const data = await response.json();
    return { id: data.id, name: data.name };
  } catch (error) {
    console.error("Error creating Google Drive folder:", error);
    throw error;
  }
}

export async function uploadFileToGoogleDrive(
  token: string,
  fileName: string,
  mimeType: string,
  content: string | Blob,
  folderId?: string
): Promise<{ id: string; webViewLink?: string }> {
  try {
    const metadata: any = {
      name: fileName,
      mimeType: mimeType,
    };
    if (folderId) {
      metadata.parents = [folderId];
    }

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", content instanceof Blob ? content : new Blob([content], { type: mimeType }));

    const response = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      }
    );

    if (!response.ok) {
      throw new Error(`Gagal unggah berkas: ${response.statusText}`);
    }

    const data = await response.json();
    return { id: data.id };
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    throw error;
  }
}

export async function createGoogleDoc(
  token: string,
  title: string,
  markdownContent: string,
  folderId?: string
): Promise<{ id: string; documentId: string }> {
  try {
    // 1. Create a blank Google Doc
    const response = await fetch("https://docs.googleapis.com/v1/documents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`Gagal membuat Google Doc: ${response.statusText}`);
    }

    const docData = await response.json();
    const docId = docData.documentId;

    // 2. Add text content to the Google Doc
    const requests = [
      {
        insertText: {
          location: { index: 1 },
          text: markdownContent,
        },
      },
    ];

    await fetch(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests }),
    });

    // 3. Move document to specified folder if provided
    if (folderId) {
      await fetch(`https://www.googleapis.com/drive/v3/files/${docId}?addParents=${folderId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }

    return { id: docId, documentId: docId };
  } catch (error) {
    console.error("Error creating Google Doc:", error);
    throw error;
  }
}

// Generate simple printable view / simulated download files
export function generateDOCXSimulatedContent(module: GeneratedModule): Blob {
  const isCocurricular = module.subject.namaMataPelajaran.includes(";");
  const pppHtml = module.dimensiProfilLulusan.map(p => `<li style="margin-bottom: 4px;">${p}</li>`).join("");
  const kaihHtml = module.kaih7 ? module.kaih7.map(k => `<li style="margin-bottom: 4px;">${k}</li>`).join("") : "";
  const mediaHtml = module.mediaDihasilkan.map(m => `<li style="margin-bottom: 4px;">${m}</li>`).join("");
  const sumberHtml = module.sumberDihasilkan.map(s => `<li style="margin-bottom: 4px;">${s}</li>`).join("");

  const glosariumRowsHtml = module.glosarium && module.glosarium.length > 0
    ? module.glosarium.map(g => `
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 6px; font-weight: bold; width: 30%; font-size: 10pt; vertical-align: top;">${g.istilah}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px; font-size: 10pt; vertical-align: top;">${g.arti}</td>
      </tr>`).join("")
    : `<tr><td colspan="2" style="border: 1px solid #cbd5e1; padding: 6px; font-size: 10pt; text-align: center;">Tidak ada istilah glosarium</td></tr>`;

  const kegiatanRowsHtml = module.kegiatanBelajar.map((kb, idx) => `
    <tr>
      <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; font-weight: bold; font-size: 10pt; width: 5%; vertical-align: top;">${idx + 1}</td>
      <td style="border: 1px solid #cbd5e1; padding: 8px; font-size: 10pt; width: 25%; vertical-align: top;">
        <strong>Tahap:</strong> ${kb.tahapan}<br/>
        <strong>Sintaks:</strong> ${kb.sintaks}
      </td>
      <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; font-size: 10pt; width: 15%; font-weight: bold; vertical-align: top;">${kb.alokasiWaktu}</td>
      <td style="border: 1px solid #cbd5e1; padding: 8px; font-size: 10pt; width: 55%; vertical-align: top; line-height: 1.4;">
        ${kb.kegiatan.replace(/\n/g, "<br/>")}
      </td>
    </tr>
  `).join("");

  // Create highly compatible and beautiful MS Word HTML layout
  const htmlContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${module.title}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: 8.5in 11in;
      margin: 1.0in 1.0in 1.0in 1.0in;
    }
    body {
      font-family: 'Arial', 'Calibri', sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #333333;
    }
    .kop-sekolah {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px double #1e3a8a;
      padding-bottom: 8px;
    }
    .kop-sekolah h1 {
      font-size: 14pt;
      font-weight: bold;
      color: #1e3a8a;
      margin: 0;
      text-transform: uppercase;
    }
    .kop-sekolah h2 {
      font-size: 11pt;
      font-weight: normal;
      color: #475569;
      margin: 3px 0 0 0;
    }
    .title-doc {
      text-align: center;
      font-size: 13pt;
      font-weight: bold;
      color: #0d9488;
      margin-top: 15px;
      margin-bottom: 15px;
      text-transform: uppercase;
      text-decoration: underline;
    }
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      color: #ffffff;
      background-color: #1e3a8a;
      padding: 6px 10px;
      margin-top: 20px;
      margin-bottom: 10px;
      border-left: 5px solid #0d9488;
    }
    .subsection-title {
      font-size: 11pt;
      font-weight: bold;
      color: #0d9488;
      margin-top: 12px;
      margin-bottom: 4px;
    }
    table.table-identity {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
    }
    table.table-identity td {
      padding: 6px;
      border: 1px solid #cbd5e1;
      font-size: 10pt;
    }
    table.table-identity td.label {
      font-weight: bold;
      background-color: #f1f5f9;
      width: 25%;
    }
    table.table-data {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    table.table-data th {
      background-color: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 8px;
      font-size: 10pt;
      font-weight: bold;
      text-align: left;
      color: #1e3a8a;
    }
    table.table-data td {
      border: 1px solid #cbd5e1;
      padding: 8px;
      font-size: 10pt;
      vertical-align: top;
    }
    ul, ol {
      margin-top: 5px;
      margin-bottom: 10px;
      padding-left: 20px;
    }
    li {
      margin-bottom: 4px;
    }
    .footer-sign {
      margin-top: 40px;
      width: 100%;
    }
    .footer-sign td {
      width: 50%;
      font-size: 10pt;
      text-align: center;
      border: none;
    }
    .materi-box {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 12px;
      margin-top: 10px;
      margin-bottom: 15px;
      border-radius: 6px;
    }
    .pre-formatted {
      font-family: 'Courier New', monospace;
      font-size: 9.5pt;
      white-space: pre-wrap;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 10px;
      margin-top: 5px;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>

  <div class="kop-sekolah">
    <h1>KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</h1>
    <h1>DINAS PENDIDIKAN KOTA ${module.school.namaKota.toUpperCase()}</h1>
    <h2><strong>${module.school.namaSekolah.toUpperCase()}</strong></h2>
    <p style="margin: 2px 0 0 0; font-size: 9pt;">Situs Web Sekolah & Hubungan Sinkronisasi Google Drive Berkas Kurikulum Merdeka</p>
  </div>

  <div class="title-doc">
    RENCANA PELAKSANAAN PEMBELAJARAN (RPP) / MODUL AJAR
  </div>

  <div class="section-title">I. INFORMASI UMUM & IDENTITAS SEKOLAH</div>
  
  <table class="table-identity">
    <tr>
      <td class="label">Nama Guru</td>
      <td>${module.school.namaGuru}</td>
      <td class="label">NIP Guru</td>
      <td>${module.school.nipGuru || "-"}</td>
    </tr>
    <tr>
      <td class="label">Sekolah</td>
      <td>${module.school.namaSekolah}</td>
      <td class="label">Kurikulum</td>
      <td>${module.school.kurikulum}</td>
    </tr>
    <tr>
      <td class="label">Fase / Kelas</td>
      <td>${module.school.fase} / Kelas ${module.school.kelas}</td>
      <td class="label">Semester / TP</td>
      <td>${module.school.semester} / ${module.school.tahunPelajaran}</td>
    </tr>
    <tr>
      <td class="label">Mata Pelajaran</td>
      <td>${module.subject.namaMataPelajaran}</td>
      <td class="label">Alokasi Waktu</td>
      <td>${module.subject.jamPelajaran} (${module.subject.durasiJamPelajaran} menit/JP)</td>
    </tr>
    <tr>
      <td class="label">Jumlah Siswa</td>
      <td>${module.school.jumlahSiswa} Siswa</td>
      <td class="label">Tanggal Dibuat</td>
      <td>${module.school.tanggalPembuatan}</td>
    </tr>
  </table>

  <div class="section-title">II. KOMPETENSI INTI & DESAIN PEMBELAJARAN</div>
  
  <div class="subsection-title">A. Capaian Pembelajaran (CP)</div>
  <p>${module.design.capaianPembelajaran || "Disesuaikan otomatis secara pedagogis"}</p>

  <div class="subsection-title">B. Elemen Capaian</div>
  <p>${module.design.elemenCapaian || "Disesuaikan otomatis secara teoretis"}</p>

  <div class="subsection-title">C. Tujuan Pembelajaran (TP)</div>
  <p>${module.design.tujuanPembelajaran || "Disesuaikan otomatis secara operasional"}</p>

  <div class="subsection-title">D. Materi Pokok Pembelajaran</div>
  <div class="materi-box">
    <strong>Materi Pokok:</strong> ${module.design.materiPokok || "Materi Pokok Harian"}<br/>
    <strong>Pendekatan Pedagogi:</strong> ${module.design.pendekatan}<br/>
    <strong>Model Pembelajaran:</strong> ${module.design.modelPembelajaran}
  </div>

  <div class="subsection-title">E. Dimensi Profil Pelajar Pancasila</div>
  <ul>${pppHtml}</ul>

  ${isCocurricular && kaihHtml ? `
  <div class="subsection-title">F. 7 Karakter Akhlakul Karimah & Nilai Keutamaan (7 KAIH)</div>
  <ul>${kaihHtml}</ul>
  ` : ""}

  <div class="subsection-title">G. Karakteristik Peserta Didik</div>
  <p>${module.karakteristikSiswa || "Karakteristik umum siswa kelas dasar berfokus pada kolaborasi aktif."}</p>

  <div class="subsection-title">H. Analisis Materi Pembelajaran</div>
  <p>${module.analisisMateri || "Materi dianalisis mendalam dengan korelasi kognitif harian siswa."}</p>

  <div class="section-title">III. SKENARIO KEGIATAN BELAJAR MENGAJAR</div>
  
  <table class="table-data">
    <thead>
      <tr>
        <th style="width: 5%; text-align: center;">No</th>
        <th style="width: 25%;">Langkah & Sintaks</th>
        <th style="width: 15%; text-align: center;">Alokasi Waktu</th>
        <th style="width: 55%;">Deskripsi Kegiatan Pembelajaran</th>
      </tr>
    </thead>
    <tbody>
      ${kegiatanRowsHtml}
    </tbody>
  </table>

  <div class="section-title">IV. MEDIA, SUMBER BELAJAR, & ASESMEN</div>
  
  <div class="subsection-title">A. Media Pembelajaran</div>
  <ul>${mediaHtml}</ul>

  <div class="subsection-title">B. Sumber Belajar & Referensi Akademik</div>
  <ul>${sumberHtml}</ul>

  <div class="subsection-title">C. Metode & Instrumen Penilaian (Asesmen)</div>
  <table class="table-data">
    <tr>
      <td style="width: 30%; font-weight: bold; background-color: #f8fafc;">Asesmen Sikap (Afektif)</td>
      <td>${module.asesmenSikap}</td>
    </tr>
    <tr>
      <td style="width: 30%; font-weight: bold; background-color: #f8fafc;">Asesmen Keterampilan (Psikomotorik)</td>
      <td>${module.asesmenKeterampilan}</td>
    </tr>
    <tr>
      <td style="width: 30%; font-weight: bold; background-color: #f8fafc;">Asesmen Kognitif (Pengetahuan)</td>
      <td>${module.asesmenKognitif}</td>
    </tr>
    <tr>
      <td style="width: 30%; font-weight: bold; background-color: #f8fafc;">Asesmen Formatif (Proses)</td>
      <td>${module.asesmenFormatif}</td>
    </tr>
    <tr>
      <td style="width: 30%; font-weight: bold; background-color: #f8fafc;">Asesmen Sumatif (Hasil Akhir)</td>
      <td>${module.asesmenSumatif}</td>
    </tr>
  </table>

  <div class="section-title">V. GLOSARIUM & KATA KUNCI KBBI</div>
  <table class="table-data">
    <thead>
      <tr>
        <th>Istilah / Kata Kunci</th>
        <th>Arti & Keterangan Rujukan Resmi</th>
      </tr>
    </thead>
    <tbody>
      ${glosariumRowsHtml}
    </tbody>
  </table>

  <div class="section-title">VI. LAMPIRAN DOKUMEN PENDUKUNG (APPENDICES)</div>
  
  <div class="subsection-title">Lampiran A: Lembar Kerja Peserta Didik (LKPD) Kelompok</div>
  <div class="pre-formatted">${module.lampiranLKPD.kegiatanKelompok}</div>

  <div class="subsection-title">Lampiran B: Lembar Kerja Peserta Didik (LKPD) Individu Mandiri</div>
  <div class="pre-formatted">${module.lampiranLKPD.kegiatanIndividu}</div>

  <div class="subsection-title">Lampiran C: Ringkasan Materi Pendalaman Detail</div>
  <div class="pre-formatted">${module.lampiranRingkasanMateriDetail || module.lampiranLKPD.ringkasanMateri}</div>

  <br/><br/>
  
  <table class="footer-sign">
    <tr>
      <td>
        Mengetahui,<br/>
        Kepala Sekolah ${module.school.namaSekolah}<br/><br/><br/><br/><br/>
        <strong><u>${module.school.namaKepalaSekolah}</u></strong><br/>
        NIP. ${module.school.nipKepalaSekolah || "-"}
      </td>
      <td>
        ${module.school.namaKota}, ${module.school.tanggalPembuatan}<br/>
        Guru Kelas ${module.school.kelas}<br/><br/><br/><br/><br/>
        <strong><u>${module.school.namaGuru}</u></strong><br/>
        NIP. ${module.school.nipGuru || "-"}
      </td>
    </tr>
  </table>

</body>
</html>
  `;
  return new Blob([htmlContent], { type: "application/msword;charset=utf-8" });
}

export function generatePDFSimulatedContent(module: GeneratedModule): Blob {
  // Return same styled document
  return generateDOCXSimulatedContent(module);
}
