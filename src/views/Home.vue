<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// PENTING: Pastikan path gambar ini sesuai dengan lokasi file Anda.
import profileImg from '../assets/p.jpg'; 

const router = useRouter();
const goToPortfolio = () => router.push('/portfolio');

// Logic Custom Cursor & Image Reveal
const cursorX = ref(0);
const cursorY = ref(0);
const isHoveringName = ref(false);

// 1. Logic untuk Desktop (Mouse)
const updateCursor = (e) => {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
};

// 2. Logic untuk Mobile (Sentuhan Jari)
const handleTouchMove = (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    cursorX.value = touch.clientX;
    cursorY.value = touch.clientY;
  }
};

// Event Listeners Global
onMounted(() => window.addEventListener('mousemove', updateCursor));
onUnmounted(() => window.removeEventListener('mousemove', updateCursor));
</script>

<template>
  <div class="architectural-home">
    
    <div 
      class="custom-cursor" 
      :style="{ 
        left: cursorX + 'px', 
        top: cursorY + 'px', 
        transform: isHoveringName ? 'translate(-50%, -50%) scale(4)' : 'translate(-50%, -50%) scale(1)' 
      }"
    ></div>

    <div class="grid-lines">
      <div class="line v-line left"></div>
      <div class="line v-line center"></div>
      <div class="line v-line right"></div>
      <div class="line h-line top"></div>
      <div class="line h-line bottom"></div>
    </div>

    <div class="content-wrapper">
      
      <div class="header-meta">
        <span class="meta-item">JKT — ID</span>
        <span class="meta-item">EST. 2023</span>
      </div>

      <div 
        class="hero-center" 
        @mouseenter="isHoveringName = true" 
        @mouseleave="isHoveringName = false"
        @touchstart="isHoveringName = true"
        @touchmove="handleTouchMove"
        @touchend="isHoveringName = false"
      >
        <div 
          class="reveal-image-container"
          :style="{ 
            opacity: isHoveringName ? 1 : 0,
            transform: `translate(${cursorX * 0.05}px, ${cursorY * 0.05}px)` 
          }"
        >
          <img :src="profileImg" alt="Wildan Profile" />
          </div>

        <h1 class="gigantic-text">
          <div class="row">WILDAN</div>
          <div class="row indent">FADILLAH</div>
        </h1>
      </div>

      <div class="footer-meta">
        <div class="role-desc">
          <p>Mahasiswa Teknik Informatika<br>Universitas Nusa Putra</p>
        </div>
        
        <div class="cta-area">
          <button @click="goToPortfolio" class="btn-cyber">
            View Selected Works
          </button>
        </div>
      </div>

    </div>

    <div class="bg-marquee">
      <div class="track">
        <span>INNOVATION • PRECISION • SCALABILITY • PERFORMANCE • </span>
        <span>INNOVATION • PRECISION • SCALABILITY • PERFORMANCE • </span>
      </div>
    </div>

  </div>
</template>