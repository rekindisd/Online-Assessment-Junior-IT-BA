
const questions = [
  {
    id:"Q1", type:"mcq", category:"Implementasi",
    question:"User mengatakan fitur yang baru diimplementasikan tidak sesuai kebutuhan, padahal developer merasa sudah mengikuti requirement. Apa tindakan pertama yang paling tepat?",
    options:[
      "Meminta developer langsung memperbaiki fitur",
      "Meminta user membuat requirement baru dari awal",
      "Membandingkan requirement yang disepakati, hasil implementasi, dan contoh kasus user secara bersama",
      "Menunda pembahasan karena kemungkinan user berubah pikiran"
    ]
  },
  {
    id:"Q2", type:"mcq", category:"Problem Solving",
    question:"Sebuah form sering gagal disubmit, tetapi masalah hanya terjadi pada sebagian user. Langkah analisis awal terbaik adalah:",
    options:[
      "Meminta developer rewrite seluruh form",
      "Mengumpulkan pola kejadian: user, browser/device, input, waktu kejadian, dan error",
      "Menghapus validasi form",
      "Meminta user mencoba terus sampai berhasil"
    ]
  },
  {
    id:"Q3", type:"mcq", category:"Komunikasi",
    question:"User meminta banyak fitur baru dan menyebut semuanya prioritas tinggi. Respons terbaik adalah:",
    options:[
      "Menyetujui semuanya sebagai prioritas tinggi",
      "Meminta developer menentukan prioritas",
      "Menggali dampak bisnis, urgensi, risiko, user terdampak, dan dependency",
      "Menolak request sampai user memilih satu"
    ]
  },
  {
    id:"Q4", type:"mcq", category:"Implementasi",
    question:"Sebelum sistem baru go-live, aktivitas yang paling penting untuk mengurangi risiko implementasi adalah:",
    options:[
      "Mempercantik tampilan sistem",
      "Menyiapkan UAT, skenario kritikal, PIC user, dokumentasi, dan fallback plan",
      "Menambah frekuensi meeting",
      "Memastikan tidak ada satu pun exception"
    ]
  },
  {
    id:"Q5", type:"mcq", category:"AI",
    question:"Penggunaan AI yang paling tepat untuk membantu pekerjaan Business Analyst adalah:",
    options:[
      "Menyerahkan keputusan requirement kepada AI",
      "Memakai AI untuk draft requirement, ringkasan meeting, dan test scenario lalu memvalidasi hasilnya",
      "Memasukkan data sensitif perusahaan ke AI publik",
      "Menggunakan AI hanya untuk membuat email"
    ]
  },
  {
    id:"Q6", type:"mcq", category:"Problem Solving",
    question:"Setelah go-live, data dashboard berbeda dengan data sumber. Pendekatan terbaik adalah:",
    options:[
      "Langsung menganggap dashboard salah",
      "Trace sumber data → transformasi/mapping → query/API → tampilan dashboard",
      "Menghapus dashboard",
      "Meminta user memakai data sumber saja"
    ]
  },
  {
    id:"Q7", type:"text", category:"Implementasi & Komunikasi",
    question:"Anda sedang implementasi aplikasi baru. Sebagian user menolak karena merasa proses manual lebih cepat. Jelaskan langkah yang akan Anda lakukan agar user mau mengadopsi aplikasi."
  },
  {
    id:"Q8", type:"text", category:"Problem Solving",
    question:"Saat UAT, user menemukan alur approval tidak sesuai kondisi operasional nyata. Developer mengatakan perubahan akan mengganggu target go-live. Bagaimana Anda menangani situasi ini?"
  },
  {
    id:"Q9", type:"text", category:"Komunikasi",
    question:"User berkata: “Saya mau sistemnya dibuat lebih gampang dan lebih cepat.” Tuliskan minimal 5 pertanyaan yang akan Anda ajukan untuk menggali kebutuhan tersebut."
  },
  {
    id:"Q10", type:"text", category:"AI",
    question:"Berikan contoh bagaimana Anda menggunakan AI dalam pekerjaan Business Analyst dengan tetap menjaga akurasi dan keamanan data perusahaan."
  },
  {
    id:"Q11", type:"text", category:"Implementasi",
    question:"Fitur sudah selesai dibuat tetapi user belum siap melakukan UAT karena kesibukan operasional. Apa yang Anda lakukan agar project tetap berjalan tanpa mengabaikan user?"
  },
  {
    id:"Q12", type:"text", category:"Problem Solving & Komunikasi",
    question:"Developer mengatakan requirement tidak bisa dikerjakan secara teknis sesuai permintaan user. Bagaimana Anda menjembatani developer dan user sampai ditemukan solusi?"
  }
];

const landing = document.getElementById("landing");
const assessment = document.getElementById("assessment");
const success = document.getElementById("success");
const candidateName = document.getElementById("candidateName");
const candidateEmail = document.getElementById("candidateEmail");
const candidateDisplay = document.getElementById("candidateDisplay");
const emailDisplay = document.getElementById("emailDisplay");
const verifyMessage = document.getElementById("verifyMessage");
const draftNotice = document.getElementById("draftNotice");
const startBtn = document.getElementById("startBtn");
const questionsEl = document.getElementById("questions");
const progressLabel = document.getElementById("progressLabel");
const progressBar = document.getElementById("progressBar");
const submitBtn = document.getElementById("submitBtn");

const confirmModal = document.getElementById("confirmModal");
const modalAnsweredCount = document.getElementById("modalAnsweredCount");
const cancelSubmitBtn = document.getElementById("cancelSubmitBtn");
const confirmSubmitBtn = document.getElementById("confirmSubmitBtn");

const STORAGE_KEY_NAME = "tb_assessment_name";
const STORAGE_KEY_EMAIL = "tb_assessment_email";
const STORAGE_KEY_DRAFT_PREFIX = "tb_assessment_draft_";

// Check draft on load
document.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem(STORAGE_KEY_NAME);
  const savedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);

  if (savedName) candidateName.value = savedName;
  if (savedEmail) {
    candidateEmail.value = savedEmail;
    const draft = getSavedDraft(savedEmail);
    if (draft && Object.keys(draft).length > 0) {
      draftNotice.classList.remove("hidden");
    }
  }
});

function getDraftStorageKey(email) {
  return STORAGE_KEY_DRAFT_PREFIX + email.trim().toLowerCase();
}

function getSavedDraft(email) {
  try {
    const raw = localStorage.getItem(getDraftStorageKey(email));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveDraft() {
  const email = candidateEmail.value.trim();
  const name = candidateName.value.trim();
  if (!email) return;

  const answers = collectAnswers();
  localStorage.setItem(STORAGE_KEY_NAME, name);
  localStorage.setItem(STORAGE_KEY_EMAIL, email);
  localStorage.setItem(getDraftStorageKey(email), JSON.stringify(answers));
}

function clearDraft() {
  const email = candidateEmail.value.trim();
  if (email) {
    localStorage.removeItem(getDraftStorageKey(email));
  }
  localStorage.removeItem(STORAGE_KEY_NAME);
  localStorage.removeItem(STORAGE_KEY_EMAIL);
}

startBtn.addEventListener("click", async () => {
  const name = candidateName.value.trim();
  const email = candidateEmail.value.trim();

  verifyMessage.classList.add("hidden");
  verifyMessage.textContent = "";

  if (!name || !email) {
    showError("Silakan isi nama lengkap dan email terlebih dahulu.");
    return;
  }

  if (!API_URL || API_URL.includes("PASTE_GOOGLE")) {
    showError("API_URL belum dikonfigurasi di config.js.");
    return;
  }

  startBtn.disabled = true;
  startBtn.textContent = "Memeriksa data...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "verify", name, email })
    });

    const data = await res.json();

    if (!data.success) {
      showError(data.message || "Gagal melakukan verifikasi kandidat.");
      startBtn.disabled = false;
      startBtn.textContent = "Mulai Assessment";
      return;
    }

    const finalName = data.officialName || name;
    const finalEmail = data.officialEmail || email;

    candidateDisplay.textContent = finalName;
    emailDisplay.textContent = finalEmail;

    // Save official name & email for draft persistence
    localStorage.setItem(STORAGE_KEY_NAME, finalName);
    localStorage.setItem(STORAGE_KEY_EMAIL, finalEmail);

    landing.classList.add("hidden");
    assessment.classList.remove("hidden");
    renderQuestions();
    restoreDraftIfAny(finalEmail);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    showError("Gagal terhubung ke server: " + err.message);
    startBtn.disabled = false;
    startBtn.textContent = "Mulai Assessment";
  }
});

function showError(msg) {
  verifyMessage.textContent = msg;
  verifyMessage.classList.remove("hidden");
}

function renderQuestions() {
  questionsEl.innerHTML = questions.map((q, idx) => {
    if (q.type === "mcq") {
      return `
        <article class="question-card">
          <div class="question-head">
            <div class="number">${idx + 1}</div>
            <div class="tag">${q.category}</div>
          </div>
          <div class="question-text">${q.question}</div>
          <div>
            ${q.options.map((opt, i) => `
              <label class="option">
                <input type="radio" name="${q.id}" value="${i}">
                <span>${opt}</span>
              </label>
            `).join("")}
          </div>
        </article>
      `;
    }
    return `
      <article class="question-card">
        <div class="question-head">
          <div class="number">${idx + 1}</div>
          <div class="tag">${q.category}</div>
        </div>
        <div class="question-text">${q.question}</div>
        <textarea id="${q.id}" placeholder="Tuliskan jawaban Anda di sini..."></textarea>
      </article>
    `;
  }).join("");

  document.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", () => {
      updateProgress();
      saveDraft();
    });
    el.addEventListener("change", () => {
      updateProgress();
      saveDraft();
    });
  });
  updateProgress();
}

function restoreDraftIfAny(email) {
  const draft = getSavedDraft(email);
  if (!draft) return;

  for (const [qId, val] of Object.entries(draft)) {
    if (val === "" || val === undefined || val === null) continue;
    const qObj = questions.find(q => q.id === qId);
    if (!qObj) continue;

    if (qObj.type === "mcq") {
      const radio = document.querySelector(`input[name="${qId}"][value="${val}"]`);
      if (radio) radio.checked = true;
    } else {
      const textarea = document.getElementById(qId);
      if (textarea) textarea.value = val;
    }
  }
  updateProgress();
}

function collectAnswers() {
  const answers = {};
  for (const q of questions) {
    if (q.type === "mcq") {
      const selected = document.querySelector(`input[name="${q.id}"]:checked`);
      answers[q.id] = selected ? selected.value : "";
    } else {
      answers[q.id] = document.getElementById(q.id)?.value.trim() || "";
    }
  }
  return answers;
}

function updateProgress() {
  const answers = collectAnswers();
  const count = Object.values(answers).filter(v => v !== "").length;
  progressLabel.textContent = `${count}/${questions.length} terjawab`;
  progressBar.style.width = `${(count / questions.length) * 100}%`;
}

// Show confirm modal on submit click
submitBtn.addEventListener("click", () => {
  const answers = collectAnswers();
  const missing = Object.entries(answers).filter(([_, v]) => !v).map(([k]) => k);

  if (missing.length) {
    alert(`Masih ada jawaban yang belum diisi: ${missing.join(", ")}`);
    return;
  }

  if (!API_URL || API_URL.includes("PASTE_GOOGLE")) {
    alert("API_URL belum dikonfigurasi di config.js.");
    return;
  }

  const count = Object.values(answers).filter(v => v !== "").length;
  modalAnsweredCount.textContent = `${count}/${questions.length}`;
  confirmModal.classList.remove("hidden");
});

cancelSubmitBtn.addEventListener("click", () => {
  confirmModal.classList.add("hidden");
});

confirmSubmitBtn.addEventListener("click", async () => {
  confirmModal.classList.add("hidden");
  submitBtn.disabled = true;
  submitBtn.textContent = "Mengirim...";

  const answers = collectAnswers();

  try {
    const payload = {
      action: "submit",
      name: candidateDisplay.textContent || candidateName.value.trim(),
      email: emailDisplay.textContent || candidateEmail.value.trim(),
      answers
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Gagal mengirim jawaban.");
    }

    clearDraft();
    assessment.classList.add("hidden");
    success.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    alert("Gagal mengirim jawaban: " + err.message);
    submitBtn.disabled = false;
    submitBtn.textContent = "Kirim Jawaban";
  }
});


