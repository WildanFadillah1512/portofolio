<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// PENTING: Pastikan path gambar ini benar. 
// Jika file gambar Anda bernama lain, ubah 'p1.jpg' ke nama yang sesuai.
import profileImg from '../assets/p1.jpg'; 

// --- DATA: TECH STACK ---
const techStack = [
  'JavaScript (ES6+)', 'Vue.js 3', 'Laravel / PHP', 
  'Python (AI/ML)', 'C++ / Algorithms', 'MySQL / PostgreSQL', 
  'Git/GitHub', 'Tailwind CSS', 'Linux Environment'
];

// --- DATA: RIWAYAT / EXPERIENCE ---
const history = [
  { 
    year: '2023 — NOW', 
    role: 'INFORMATICS STUDENT', 
    company: ' Univ. Nusa Putra', 
    desc: 'Mempelajari Algoritma, Struktur Data, dan Software Engineering.' 
  },
  { 
    year: '2023 — NOW', 
    role: 'FREELANCE / PROJECTS', 
    company: ' Self-Employed', 
    desc: 'Membangun aplikasi web responsif & eksplorasi teknologi baru.' 
  },
  { 
    year: '2023', 
    role: 'ACTIVE MEMBER', 
    company: ' Tech Community / HMTI', 
    desc: 'Kolaborasi, sharing knowledge, dan pengembangan soft skill.' 
  },
];

// --- LOGIC 1: TEXT DECODE EFFECT (Efek Tulisan "IDENTITY" Teracak) ---
const decodedText = ref("IDENTITY");
const originalText = "IDENTITY";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";

const runDecodeEffect = () => {
  let iterations = 0;
  const interval = setInterval(() => {
    decodedText.value = originalText
      .split("")
      .map((letter, index) => {
        if (index < iterations) return originalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");
    if (iterations >= originalText.length) clearInterval(interval);
    iterations += 1 / 3;
  }, 30);
};

// --- LOGIC 2: IMAGE PARALLAX (UPDATE: Mobile Guard) ---
const imageStyle = ref({});

const handleMouseMove = (e) => {
  // UPDATE: Matikan efek parallax di HP (< 768px) untuk performa scroll
  if (window.innerWidth < 768) return;

  const { clientX, clientY } = e;
  
  // Efek Parallax: Gambar bergerak sedikit berlawanan arah mouse
  const xPos = (window.innerWidth / 2 - clientX) / 25; 
  const yPos = (window.innerHeight / 2 - clientY) / 25; 
  imageStyle.value = { transform: `translate(${xPos}px, ${yPos}px) scale(1.05)` };
};

// --- LOGIC 3: SCROLL PROGRESS BAR (Garis Hijau di Kiri) ---
const scrollProgress = ref(0);
const handleScroll = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.value = scrolled;
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  runDecodeEffect();
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="architectural-about">
    
    <div class="left-pane">
      <div class="sticky-wrapper">
        <h1 class="vertical-text">PROFILE</h1>
        
        <div class="progress-track">
          <div class="progress-fill" :style="{ height: scrollProgress + '%' }"></div>
        </div>

        <div class="meta-id">
          <div>ID: WF-NSP</div> 
          <div class="status-live"><span class="blink">●</span> ONLINE</div>
        </div>
      </div>
    </div>

    <div class="right-pane">
      
      <section class="sector bio-sector">
        <div class="sector-label">01 // {{ decodedText }}</div> 
        <h2 class="manifesto-text">
          Mahasiswa Teknik Informatika. <br>
          Mengubah <span class="highlight">logika</span> & <span class="highlight">algoritma</span> menjadi solusi nyata.
        </h2>
        <div class="bio-details">
          <p class="bio-p">
            Hai, saya <strong>Wildan Fadillah</strong>. Saat ini menempuh pendidikan Teknik Informatika di <strong>Universitas Nusa Putra</strong>. 
            Dunia saya berputar di sekitar baris kode, pemecahan masalah (problem solving), dan inovasi digital.
          </p>
          <p class="bio-p">
            Saya percaya bahwa <em>coding</em> bukan hanya tentang sintaks, tapi tentang pola pikir. 
            Saya terus mengasah kemampuan dalam Fullstack Development dan Software Engineering untuk menciptakan sistem yang efisien dan berdampak.
          </p>
        </div>
      </section>

      <section class="sector visual-sector">
        <div class="image-frame">
          <img :src="profileImg" alt="Wildan Profile" :style="imageStyle" />
          <div class="img-overlay"></div>
          <div class="crosshair top-left"></div>
          <div class="crosshair bottom-right"></div>
        </div>
        
        <div class="tech-grid">
          <div class="sector-label">02 // TECH_ARSENAL</div>
          <ul class="tech-list">
            <li v-for="(tech, index) in techStack" :key="index" class="tech-item">
              <span class="bullet">+</span> <span class="tech-name">{{ tech }}</span>
              <div class="hover-scan"></div>
            </li>
          </ul>
        </div>
      </section>

      <section class="sector history-sector">
        <div class="sector-label">03 // ACADEMIC_PATH</div>
        
        <div class="history-table">
          <div class="t-row t-head">
            <div class="col-year">PERIOD</div>
            <div class="col-role">CONTEXT / INSTITUTION</div>
            <div class="col-desc">ACTIVITY</div>
          </div>

          <div v-for="(item, i) in history" :key="i" class="t-row t-body">
            <div class="col-year">{{ item.year }}</div>
            <div class="col-role">
              <span class="role-title">{{ item.role }}</span>
              <span class="company-name">{{ item.company }}</span>
            </div>
            <div class="col-desc">{{ item.desc }}</div>
          </div>
        </div>

      </section>

    </div>

  </div>
</template>