
JUNIOR IT BUSINESS ANALYST - WEB BASED TEST

STRUKTUR:
- index.html
- style.css
- app.js
- config.js
- backend/Code.gs

ARSITEKTUR:
Candidate -> Website -> Google Apps Script API -> Google Sheet

FRONTEND:
Bisa di-host di:
- Netlify
- Vercel
- GitHub Pages
- Hosting internal

BACKEND:
Google Apps Script hanya menjadi API penerima jawaban.

SETUP BACKEND:
1. Buat Google Sheet baru.
2. Extensions > Apps Script.
3. Paste backend/Code.gs.
4. Deploy > New deployment > Web app.
5. Execute as: Me.
6. Who has access: Anyone.
7. Copy URL Web App.

SETUP FRONTEND:
1. Buka config.js.
2. Ganti:
   PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE
   dengan URL Web App Apps Script.
3. Upload semua file frontend ke Netlify/Vercel/GitHub Pages.

HASIL DI GOOGLE SHEET:
- Timestamp
- Nama kandidat
- Nilai objektif Q1-Q6
- Jawaban seluruh soal
- Status review

CATATAN:
Nilai tidak ditampilkan kepada kandidat.
