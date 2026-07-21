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
  const content = `
=========================================
MODUL AJAR & RPP: ${module.title}
Dibuat oleh: ${module.school.namaGuru} (${module.school.nipGuru})
Sekolah: ${module.school.namaSekolah}
=========================================
Kurikulum: ${module.school.kurikulum}
Fase/Kelas: ${module.school.fase} / ${module.school.kelas}
Semester: ${module.school.semester} | TP: ${module.school.tahunPelajaran}

A. IDENTIFIKASI KARAKTERISTIK PESERTA DIDIK
${module.karakteristikSiswa || "Tidak diisi"}

ANALISIS MATERI PELAJARAN
${module.analisisMateri || "Tidak diisi"}

B. DESAIN PEMBELAJARAN
Tujuan Pembelajaran: ${module.design.tujuanPembelajaran}
Pendekatan: ${module.design.pendekatan}
Model: ${module.design.modelPembelajaran}

KEGIATAN BELAJAR:
${module.kegiatanBelajar.map(kb => `
Tahap: ${kb.tahapan} | Sintaks: ${kb.sintaks} | Waktu: ${kb.alokasiWaktu}
Aktivitas:
${kb.kegiatan}
Keterangan: ${kb.keterangan}
`).join("\n")}

APPENDICES / LAMPIRAN:
1. LKPD Kelompok:
${module.lampiranLKPD.kegiatanKelompok}
2. LKPD Individu:
${module.lampiranLKPD.kegiatanIndividu}
3. Ringkasan Materi:
${module.lampiranRingkasanMateriDetail}
`;
  return new Blob([content], { type: "application/msword" });
}

export function generatePDFSimulatedContent(module: GeneratedModule): Blob {
  // Return printable-styled text blob
  return generateDOCXSimulatedContent(module);
}
