<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

// --- IMPORT GAMBAR LOKAL ---
import foto1 from '../assets/foto1.jpg'
import foto2 from '../assets/foto2.jpg'
import foto3 from '../assets/foto3.jpg'
import foto4 from '../assets/foto4.jpg'
import foto5 from '../assets/foto5.jpg'
import foto6 from '../assets/foto6.jpg'
import foto7 from '../assets/foto7.jpg'
import foto8 from '../assets/foto8.jpg'
import foto9 from '../assets/foto9.jpg'
import foto10 from '../assets/foto10.jpg'
import foto11 from '../assets/foto11.jpg'
import foto12 from '../assets/foto12.jpg'
import foto13 from '../assets/foto13.jpg'
import foto14 from '../assets/foto14.jpg'
import foto15 from '../assets/foto15.jpg'


// --- DATA ---
const rawItems = [
  // ================= EXPERIENCE ==================
  {
    id: 'EXP-01',
    type: 'EXPERIENCE',
    title: 'Anggota HMTI',
    subtitle: 'Himpunan Mahasiswa Teknik Informatika',
    desc: 'Berperan aktif dalam kegiatan organisasi HMTI, berkontribusi pada event akademik dan pengembangan komunitas TI.',
    tech: ['Organization', 'Teamwork'],
    link: '#',
    image: foto1
  },
  {
    id: 'EXP-02',
    type: 'EXPERIENCE',
    title: 'Koordinator Kewirausahaan',
    subtitle: 'Jurnalis Nuansa',
    desc: 'Mengelola divisi kewirausahaan, merancang strategi finansial, dan mengembangkan konsep usaha internal.',
    tech: ['Leadership', 'Entrepreneurship'],
    link: '#',
    image: foto2
  },
  {
    id: 'EXP-03',
    type: 'EXPERIENCE',
    title: 'MAGANG AKTIF PROGRESIF (MAKSIF)',
    subtitle: 'DPM Nusa Putra — Divisi 4',
    desc: 'Terlibat dalam koordinasi program kampus serta dokumentasi kebijakan internal.',
    tech: ['Management', 'Coordination'],
    link: 'https://drive.google.com/file/d/1_dWQbsrPIty0hGIkaNwBga7jLUUDrmMk/view?usp=sharing',
    image: foto3
  },
  {
    id: 'EXP-04',
    type: 'EXPERIENCE',
    title: 'Panitia MABIM 2025',
    subtitle: 'Divisi IT',
    desc: 'Bertanggung jawab mengelola Website MABIM 2025 dan memastikan stabilitasnya.',
    tech: ['Web Dev','IT Support'],
    link: 'https://mabim.nusaputra.ac.id/',
    image: foto4
  },

  // ================= PROJECTS ==================
  {
    id: 'PRJ-01',
    type: 'PROJECT',
    title: 'PAKESEWA APP',
    subtitle: 'React Native App',
    desc: 'Mobile rental app dengan Redux, Express.js, dan PostgreSQL.',
    tech: ['React Native','Redux','Express.js','Node.js','PostgreSQL'],
    link: 'https://drive.usercontent.google.com/download?id=1ljJqBoExs-cXanbRtZHtk5N55AoXqM_B',
    image: foto5
  },
  {
    id: 'PRJ-02',
    type: 'PROJECT',
    title: 'Price Prediction Model',
    subtitle: 'Machine Learning',
    desc: 'Prediksi harga saham & crypto menggunakan XGBoost.',
    tech: ['Python','ML','Data Science'],
    link: 'https://machinelearningpricepredictionmodel1-bmmvkquzayg3ysttwczboh.streamlit.app/',
    image: foto6
  },
  {
    id: 'PRJ-03',
    type: 'PROJECT',
    title: 'Portfolio Website',
    subtitle: 'Vue.js + Orbit UI',
    desc: 'Website portofolio pribadi dengan efek 3D Orbital Singularity.',
    tech: ['Vue.js','CSS3D','UI/UX'],
    link: 'https://wildanfadillah.netlify.app/',
    image: foto7
  },
  {
    id: 'PRJ-04',
    type: 'PROJECT',
    title: 'AI Skin Analyzer (YOLOv8)',
    subtitle: 'Deep Learning',
    desc: 'Sistem deteksi masalah kulit dengan YOLOv8 + Face Mapping.',
    tech: ['YOLOv8','Python','OpenCV'],
    link: 'https://ta-skincare-acne-tezo.streamlit.app/',
    image: foto8
  },
  {
    id: 'PRJ-05',
    type: 'PROJECT',
    title: 'MirAI',
    subtitle: 'AI Accessible Marketplace',
    desc: 'Platform inklusif dengan voice navigation dan AI UMKM support.',
    tech: ['AI','Accessibility','Smart Commerce'],
    link: 'https://drive.google.com/drive/folders/1I6DlaoWyDTD0uRSW3jkdB_pYtG7STim_',
    image: foto9
  },
  {
    id: 'PRJ-06',
    type: 'PROJECT',
    title: 'P2MW — Snackelor',
    subtitle: 'UMKM Innovation',
    desc: 'Snack bar daun kelor untuk pencegahan stunting.',
    tech: ['Food Innovation','Product Dev'],
    link: 'https://drive.google.com/file/d/1Jdc5duRcws-fYusTSD3jJIOEzr_JOl1a/view?usp=sharing',
    image: foto10
  },
  {
    id: 'PRJ-07',
    type: 'PROJECT',
    title: 'Smart Trash IoT (ESP32 + Sensor Ultrasonic)',
    subtitle: 'IoT & Embedded System',
    desc: 'Tempat sampah pintar dengan ESP32, sensor ultrasonik, dan sistem monitoring penuh melalui Firebase/Thinger.io.',
    tech: ['IoT', 'ESP32', 'Ultrasonic Sensor', 'Firebase'],
    link: 'https://github.com/WildanFadillah1512/IoT-SmartTrash',
    image: foto11
  },


  // ================= CERTIFICATES ==================
  {
    id: 'CRT-01',
    type: 'CERTIFICATE',
    title: 'Public Speaking',
    subtitle: 'Soft Skill Certification',
    desc: 'Pelatihan public speaking untuk meningkatkan komunikasi.',
    tech: ['Communication','Presentation'],
    link: 'https://drive.google.com/file/d/1srW6W7SX62GA_0vb7aoE8PyL-kSyz8Bw/view?usp=sharing',
    image: foto12
  },
  {
    id: 'CRT-02',
    type: 'CERTIFICATE',
    title: 'Oracle Database (Fundamentals)',
    subtitle: 'Oracle Academy',
    desc: 'Pemahaman dasar SQL & manajemen database.',
    tech: ['Oracle','SQL'],
    link: 'https://drive.google.com/file/d/1PKth7x1-yzPZUnJ5OifGs7Uedpgjo37r/view?usp=sharing',
    image: foto13
  },
  {
    id: 'CRT-03',
    type: 'CERTIFICATE',
    title: 'Python (SoloLearn)',
    subtitle: 'Interactive Certificate',
    desc: 'Pemrograman Python dari dasar sampai menengah.',
    tech: ['Python','Programming'],
    link: 'https://drive.google.com/file/d/1S_ee6BkQW695J40Pn5hXKHWgXvX4lmCS/view?usp=sharing',
    image: foto14
  },
  {
    id: 'CRT-04',
    type: 'CERTIFICATE',
    title: 'Perekayasa Perangkat IoT',
    subtitle: 'VSGA / Digital Talent Scholarship 2025',
    desc: 'Sertifikasi IoT: microcontroller, sensor, integrasi sistem.',
    tech: ['IoT','Embedded','Microcontroller'],
    link: 'https://drive.google.com/file/d/1tEdwDy9f_N1gXxPqabqwzQcxCgQHNt5T/view?usp=sharing',
    image: foto15
  },
];

// --- STATE ---
const rotation = ref(0);
const tiltX = ref(0);
const tiltY = ref(0);

// default tanpa ALL
const activeFilter = ref('EXPERIENCE');

const windowWidth = ref(window.innerWidth);

// --- OPEN LINK ---
const openItem = (item) => {
  if (!item || !item.link || item.link === '#') return;
  window.open(item.link, '_blank');
};

// --- COMPUTED ---
const radius = computed(() => (windowWidth.value <= 900 ? 250 : 500));

const filteredItems = computed(() => {
  return rawItems.filter(item => item.type === activeFilter.value);
});

const angleStep = computed(() => {
  const count = filteredItems.value.length;
  return count > 0 ? 360 / count : 360;
});

const activeItem = computed(() => {
  const items = filteredItems.value;
  if (items.length === 0) return null;

  let normRot = rotation.value % 360;
  if (normRot > 0) normRot -= 360;

  const index = Math.round(-normRot / angleStep.value);
  const actualIndex = (index % items.length + items.length) % items.length;

  return items[actualIndex];
});

const isItemActive = (item) => activeItem.value && activeItem.value.id === item.id;

// --- EVENTS ---
watch(activeFilter, () => { rotation.value = 0; });

const setFilter = (mode) => { activeFilter.value = mode; };

const rotateNext = () => { rotation.value -= angleStep.value; };
const rotatePrev = () => { rotation.value += angleStep.value; };

const handleWheel = (e) => {
  const scrollSensitivity = windowWidth.value <= 900 ? 0.02 : 0.05;
  rotation.value += e.deltaY * scrollSensitivity;
};

const handleMouseMove = (e) => {
  if (windowWidth.value <= 900) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  tiltX.value = y * 5;
  tiltY.value = x * -5;
};

const handleResize = () => { windowWidth.value = window.innerWidth; };

onMounted(() => {
  window.addEventListener('wheel', handleWheel);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="orbital-singularity">
    
    <div class="star-field"></div>
    <div class="nebula-glow"></div>
    <div class="vignette"></div>

    <!-- FILTER -->
    <div class="filter-bar">
      <div class="filter-group">
        <button 
          v-for="mode in ['PROJECT', 'EXPERIENCE', 'CERTIFICATE']" 
          :key="mode"
          @click="setFilter(mode)"
          :class="{ active: activeFilter === mode }"
          class="filter-pill"
        >
          {{ mode }}
        </button>
      </div>
    </div>

    <!-- 3D STAGE -->
    <div class="stage-3d" :style="{ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }">
      
      <div class="core-singularity">
        <div class="core-ring r1"></div>
        <div class="core-ring r2"></div>
        <div class="core-text">WF</div>
      </div>

      <div 
        class="orbit-path" 
        :style="{ width: (radius * 2) + 'px', height: (radius * 2) + 'px' }"
      ></div>
      
      <div class="carousel-pivot" :style="{ transform: `rotateY(${rotation}deg)` }">
        <div 
          v-for="(item, i) in filteredItems" 
          :key="item.id"
          class="satellite-wrapper"
          :class="{ 'is-focus': isItemActive(item) }"
          :style="{ transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)` }"
        >
          <!-- Card kecil (orbit) -->
          <a :href="item.link" target="_blank" class="satellite-card" @click.stop>
            <div class="card-glass">
              
              <div class="card-visual" v-if="item.image">
                <img :src="item.image" loading="lazy" :alt="item.title" />
                <div class="visual-overlay"></div>
              </div>
              
              <div class="card-label">
                <span class="id-text">{{ item.id }}</span>
              </div>
            </div>
          </a>

        </div>
      </div>
    </div>

    <!-- NAV -->
    <div class="nav-container">
      <button class="nav-btn prev" @click="rotatePrev" aria-label="Previous">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <button class="nav-btn next" @click="rotateNext" aria-label="Next">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>

    <!-- HUD / DETAIL PANEL -->
    <div class="hud-panel-container">
      <transition name="fade-slide" mode="out-in">
        <div 
          class="hud-content" 
          v-if="activeItem" 
          :key="activeItem.id"
          @click="openItem(activeItem)"
          style="cursor: pointer;"
        >
          
          <div class="hud-left">
            <h3 class="hud-type">{{ activeItem.type }}</h3>
            <h1 class="hud-title">{{ activeItem.title }}</h1>
            <h2 class="hud-sub">{{ activeItem.subtitle }}</h2>
            <div class="hud-tech-stack">
              <span v-for="t in activeItem.tech" :key="t" class="tech-tag">{{ t }}</span>
            </div>
          </div>

          <div class="hud-right">
            <p class="hud-desc">{{ activeItem.desc }}</p>
            <div class="hud-progress">
              <span>STATUS: ONLINE</span>
              <div class="bar"><div class="fill"></div></div>
            </div>
          </div>

          <div class="corner tl"></div><div class="corner tr"></div>
          <div class="corner bl"></div><div class="corner br"></div>
        </div>
      </transition>
    </div>

  </div>
</template>
