<script setup>
import { ref, computed, watch, nextTick } from 'vue';

// --- STATE MANAGEMENT ---
const currentStep = ref(0); // 0: Intro, 1: Name, 2: Email, 3: Message, 4: Success
const formData = ref({
  name: '',
  email: '',
  message: ''
});
const isSubmitting = ref(false);

// Refs untuk auto-focus input
const nameInput = ref(null);
const emailInput = ref(null);
const messageInput = ref(null);

// --- NAVIGATION LOGIC ---
const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};

// Handle Enter key for smooth navigation
const handleEnter = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (currentStep.value === 1 && formData.value.name.length > 0) nextStep();
    else if (currentStep.value === 2 && formData.value.email.includes('@')) nextStep();
  }
};

// --- WHATSAPP LOGIC ---
const handleSubmit = () => {
  if (!formData.value.message) return;
  
  isSubmitting.value = true;

  // 1. Format Nomor (Ganti dengan nomor WhatsApp Anda, format 62...)
  const phoneNumber = "6285216550347"; 

  // 2. Susun Pesan
  const textMessage = `
Halo Wildan, saya ingin mendiskusikan project.

*DATA PENGIRIM:*
Nama: ${formData.value.name}
Email: ${formData.value.email}

*PESAN:*
${formData.value.message}
  `.trim();

  // 3. Encode pesan agar aman untuk URL
  const encodedText = encodeURIComponent(textMessage);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  // 4. Simulasi Loading Cyber effect lalu buka WA
  setTimeout(() => {
    window.open(waUrl, '_blank');
    isSubmitting.value = false;
    currentStep.value = 4; // Pindah ke halaman Sukses
  }, 1500); 
};

// --- AUTO FOCUS LOGIC (UX IMPROVEMENT) ---
watch(currentStep, async (newStep) => {
  await nextTick();
  // Focus otomatis ke input saat ganti step (terutama berguna di Desktop)
  if (newStep === 1) nameInput.value?.focus();
  if (newStep === 2) emailInput.value?.focus();
  if (newStep === 3) messageInput.value?.focus();
});

// --- DYNAMIC BACKGROUND TEXT ---
const backgroundText = computed(() => {
  if (currentStep.value === 0) return "UNLEASH";
  if (currentStep.value === 1) return formData.value.name || "IDENTITY";
  if (currentStep.value === 2) return "CONNECT";
  if (currentStep.value === 3) return "VISION";
  if (currentStep.value === 4) return "SENT";
  return "";
});
</script>

<template>
  <div class="depth-interface">
    
    <div class="echo-chamber">
      <h1 class="echo-text anim-text">{{ backgroundText }}</h1>
      <h1 class="echo-text layer-2">{{ backgroundText }}</h1>
    </div>

    <div class="progress-line" v-if="currentStep > 0 && currentStep < 4">
      <div class="fill" :style="{ width: (currentStep / 3) * 100 + '%' }"></div>
    </div>

    <div class="stage-center">
      
      <transition name="fade-slide">
        <div v-if="currentStep === 0" class="step-container intro-mode">
          <p class="pre-label">PORTFOLIO CONTACT // WILDAN</p>
          <h2 class="prompt-text">Have a project in mind?</h2>
          <button @click="nextStep" class="start-btn">
            <span>START TRANSMISSION</span>
            <div class="btn-glow"></div>
          </button>
        </div>
      </transition>

      <transition name="zoom-blur">
        <div v-if="currentStep === 1" class="step-container">
          <label class="input-label">01 // IDENTIFICATION</label>
          <input 
            ref="nameInput"
            type="text" 
            v-model="formData.name" 
            class="mega-input" 
            placeholder="Your Name..." 
            @keydown="handleEnter"
          />
          <div class="controls">
             <div class="nav-hint">Press <strong>ENTER ↵</strong></div>
             <button @click="nextStep" class="next-btn mobile-only-btn" v-if="formData.name">Next →</button>
          </div>
        </div>
      </transition>

      <transition name="zoom-blur">
        <div v-if="currentStep === 2" class="step-container">
          <label class="input-label">02 // REPLY FREQUENCY</label>
          <input 
            ref="emailInput"
            type="email" 
            v-model="formData.email" 
            class="mega-input" 
            placeholder="email@address.com" 
            @keydown="handleEnter"
          />
          <div class="controls">
            <button @click="prevStep" class="back-btn">← Back</button>
            <button @click="nextStep" class="next-btn">Next →</button>
          </div>
        </div>
      </transition>

      <transition name="zoom-blur">
        <div v-if="currentStep === 3" class="step-container">
          <label class="input-label">03 // THE BLUEPRINT</label>
          <textarea 
            ref="messageInput"
            v-model="formData.message" 
            class="mega-input textarea-mode" 
            placeholder="Tell me about the project details..."
            rows="1"
          ></textarea>
          
          <button 
            @click="handleSubmit" 
            class="final-submit-btn" 
            :disabled="isSubmitting || !formData.message"
          >
            <span v-if="!isSubmitting">INITIALIZE PROJECT (WA)</span>
            <span v-else>REDIRECTING TO WHATSAPP...</span>
          </button>
          
          <button @click="prevStep" class="back-link">Go Back</button>
        </div>
      </transition>

      <transition name="fade-slide">
        <div v-if="currentStep === 4" class="step-container success-mode">
          <div class="success-icon">✓</div>
          <h2 class="prompt-text">Chat Opened.</h2>
          <p class="sub-text">Please continue the conversation on WhatsApp. I'll reply as soon as possible.</p>
          <button @click="currentStep = 0; formData = {name:'', email:'', message:''}" class="reset-btn">
            RESET TERMINAL
          </button>
        </div>
      </transition>

    </div>

    <div class="fixed-footer">
      <span>SECURE CONNECTION</span>
      <span>2024 © WILDAN.DEV</span>
    </div>

  </div>
</template>