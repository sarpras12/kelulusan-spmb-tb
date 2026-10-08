// ==========================================================
// Konfigurasi Firebase (dipakai oleh index.html dan admin.html)
// Isi dari: Firebase Console > Project settings > Your apps > Web app > Config
// Nilai ini memang publik; keamanan diatur oleh firestore.rules.
// ==========================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "GANTI_API_KEY",
  authDomain: "GANTI_PROJECT_ID.firebaseapp.com",
  projectId: "GANTI_PROJECT_ID",
  appId: "GANTI_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ID dokumen siswa = SHA-256("nomor|YYYY-MM-DD").
// Harus IDENTIK di halaman siswa dan admin, jangan diubah salah satu saja.
export async function hashId(nomor, tanggal) {
  const teks = String(nomor).trim().toLowerCase() + "|" + String(tanggal).trim();
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(teks));
  return Array.from(new Uint8Array(buf))
    .map(function (b) { return b.toString(16).padStart(2, "0"); })
    .join("");
}
