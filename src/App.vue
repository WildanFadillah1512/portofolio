<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'; // Ditambahkan RouterLink dan RouterView di sini

// --- ROUTE CHECKING ---
const route = useRoute();
const isPortfolioPage = computed(() => route.name === 'Portfolio' || route.path === '/portfolio');

// --- STATE MANAGEMENT ---
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const cursorDot = ref(null);

// --- ACTIONS ---
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;
const closeMenu = () => isMenuOpen.value = false;

// --- SCROLL HANDLER ---
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// --- CURSOR TRACKING ---
const moveCursor = (e) => {
  if (cursorDot.value) {
    cursorDot.value.style.left = `${e.clientX}px`;
    cursorDot.value.style.top = `${e.clientY}px`;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('mousemove', moveCursor);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('mousemove', moveCursor);
});
</script>

<template>
  <div class="custom-cursor" ref="cursorDot"></div>

  <header :class="{ 'scrolled': isScrolled, 'menu-active': isMenuOpen }">
    <div class="nav-capsule">
      
      <RouterLink to="/" class="logo" @click="closeMenu">
        WF<span class="dot">.</span>
      </RouterLink>

      <nav class="desktop-nav">
        <RouterLink to="/">Index</RouterLink>
        <RouterLink to="/about">Profile</RouterLink>
        <RouterLink to="/portfolio">Portfolio</RouterLink>
      </nav>

      <div class="nav-actions">
        <RouterLink to="/contact" class="btn-talk" @click="closeMenu">Let's Talk</RouterLink> 
        
        <button class="hamburger" @click="toggleMenu" aria-label="Toggle Menu">
          <span class="line l1"></span>
          <span class="line l2"></span>
          <span class="line l3"></span> </button>
      </div>

    </div>
  </header>

  <div class="mobile-overlay" :class="{ 'open': isMenuOpen }">
    
    <div class="menu-bg-text">NAVIGATION</div>

    <div class="overlay-content">
      <div class="menu-link-wrapper">
        <span class="menu-number">01</span>
        <RouterLink to="/" @click="closeMenu">INDEX</RouterLink>
      </div>
      <div class="menu-link-wrapper">
        <span class="menu-number">02</span>
        <RouterLink to="/about" @click="closeMenu">PROFILE</RouterLink>
      </div>
      <div class="menu-link-wrapper">
        <span class="menu-number">03</span>
        <RouterLink to="/portfolio" @click="closeMenu">WORKS</RouterLink>
      </div>
      <div class="menu-link-wrapper">
        <span class="menu-number">04</span>
        <RouterLink to="/contact" @click="closeMenu">CONTACT</RouterLink>
      </div>
    </div>

    <div class="overlay-footer">
      <div class="social-links">
        <a href="https://www.linkedin.com/in/wildan-fadillah" target="_blank">LINKEDIN</a>
        <a href="https://github.com/WildanFadillah1512/" target="_blank">GITHUB</a>
        <a href="https://www.instagram.com/wildanfadhilah728?igsh=M284djFmMnRrOTA5" target="_blank">INSTAGRAM</a>
      </div>
      <div class="copyright">
        <span>JAKARTA, ID</span>
        <span>© 2025</span>
      </div>
    </div>
  </div>

  <main :class="{ 'full-screen-mode': isPortfolioPage }">
    <router-view v-slot="{ Component }">
      <transition name="fade-page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <footer v-if="!isPortfolioPage">
    <div class="footer-grid">
      <div class="f-col f-brand">
        <h2>WILDAN FADILLAH</h2>
        <p class="role">FULLSTACK DEVELOPER</p>
      </div>
      <div class="f-col">
        <span class="f-label">SITEMAP</span>
        <div class="link-stack">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/portfolio">Projects</RouterLink>
        </div>
      </div>
      <div class="f-col">
        <span class="f-label">CONNECT</span>
        <div class="link-stack">
          <a href="https://www.linkedin.com/in/wildan-fadillah" target="_blank">LinkedIn ↗</a>
          <a href="https://github.com/WildanFadillah1512/" target="_blank">GitHub ↗</a>
          <a href="mailto:wfadillah228@gmail.com">Email ↗</a>
        </div>
      </div>
      <div class="f-col f-copy">
        <span class="f-label">VERSION</span>
        <p>2025 EDITION ©</p>
      </div>
    </div>
  </footer>
</template>