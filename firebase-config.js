// ==========================================================
// Konfigurasi Firebase (dipakai oleh index.html dan admin.html)
// Isi dari: Firebase Console > Project settings > Your apps > Web app > Config
// Nilai ini memang publik; keamanan diatur oleh firestore.rules.
// ==========================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBv_DY54jrMJ_c2iwJp0i3Twv4GqN-Vlok",
  authDomain: "kelulusan-7bbd5.firebaseapp.com",
  projectId: "kelulusan-7bbd5",
  storageBucket: "kelulusan-7bbd5.firebasestorage.app",
  messagingSenderId: "920968626430",
  appId: "1:920968626430:web:d2ae6b566204420bc725af",
  measurementId: "G-KQF79LJ5F6"
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
