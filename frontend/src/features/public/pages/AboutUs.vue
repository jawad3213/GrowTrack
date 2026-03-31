<template>
  <div class="font-inter bg-white">
    <Header />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-purple-50 to-orange-50 py-20 px-6 overflow-hidden">
      <div class="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
      <div class="relative max-w-4xl mx-auto text-center">
        <span class="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6 tracking-wide">
          About GrowTrack
        </span>
        <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Empowering Education Through
          <span class="bg-gradient-to-r from-purple-600 to-orange-400 bg-clip-text text-transparent"> Smart Tracking</span>
        </h1>
        <p class="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          GrowTrack is an academic management platform designed to bridge the gap between students, professors, and administrators — making skill development, project tracking, and evaluations seamless and transparent.
        </p>
      </div>
    </section>

    <!-- What is GrowTrack -->
    <section class="py-16 px-6">
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">What is GrowTrack?</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            GrowTrack is a comprehensive academic tracking system built for engineering schools and higher-education institutions. It streamlines the entire academic lifecycle — from student enrollment and project assignments to peer evaluations and skill assessments.
          </p>
          <p class="text-gray-600 leading-relaxed">
            Whether you're a student wanting to track your growth, a professor managing evaluations, or an administrator overseeing the institution — GrowTrack gives you the tools you need in one unified platform.
          </p>
        </div>
        <!-- Stats -->
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-purple-50 rounded-2xl p-6 text-center">
            <p class="text-4xl font-extrabold text-purple-600 mb-1">3</p>
            <p class="text-gray-600 text-sm font-medium">User Roles</p>
          </div>
          <div class="bg-orange-50 rounded-2xl p-6 text-center">
            <p class="text-4xl font-extrabold text-orange-500 mb-1">100%</p>
            <p class="text-gray-600 text-sm font-medium">Transparent Evals</p>
          </div>
          <div class="bg-green-50 rounded-2xl p-6 text-center">
            <p class="text-4xl font-extrabold text-green-600 mb-1">∞</p>
            <p class="text-gray-600 text-sm font-medium">Skills Tracked</p>
          </div>
          <div class="bg-blue-50 rounded-2xl p-6 text-center">
            <p class="text-4xl font-extrabold text-blue-600 mb-1">1</p>
            <p class="text-gray-600 text-sm font-medium">Unified Platform</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="bg-gray-50 py-16 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-3">How GrowTrack Works</h2>
          <p class="text-gray-500 text-base max-w-xl mx-auto">A platform built around three distinct roles, each with powerful dedicated tools.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Students -->
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Students</h3>
            <ul class="space-y-2 text-gray-600 text-sm">
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>View assigned projects &amp; groups</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>Complete self-evaluations by skill</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>Track evaluation history</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>Receive notifications &amp; updates</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>Submit signals and reports</li>
            </ul>
          </div>

          <!-- Professors -->
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Professors</h3>
            <ul class="space-y-2 text-gray-600 text-sm">
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>Manage student projects &amp; groups</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>Evaluate classes by skill criteria</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>View evaluation history</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>Generate student PDF reports</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>Submit &amp; track signals</li>
            </ul>
          </div>

          <!-- Admins -->
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Administrators</h3>
            <ul class="space-y-2 text-gray-600 text-sm">
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>Manage students, professors &amp; staff</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>Configure skills &amp; evaluation criteria</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>View global analytics &amp; dashboards</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>Organize classes &amp; sectors</li>
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"></span>Handle signals &amp; reports</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="py-16 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-3">Key Features</h2>
          <p class="text-gray-500 text-base max-w-xl mx-auto">Everything your institution needs, built into one platform.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="feature in features" :key="feature.title"
            class="group p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 cursor-default">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
              :class="feature.iconBg">
              <svg class="w-5 h-5" :class="feature.iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="font-bold text-gray-800 mb-2 text-sm">{{ feature.title }}</h3>
            <p class="text-gray-500 text-xs leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="bg-gradient-to-r from-purple-600 to-orange-400 py-16 px-6">
      <div class="max-w-3xl mx-auto text-center text-white">
        <h2 class="text-3xl font-bold mb-4">Our Mission</h2>
        <p class="text-white/90 text-lg leading-relaxed mb-8">
          We believe every student deserves clear visibility into their growth. GrowTrack was built to make academic progress measurable, evaluations fair, and collaboration effortless — for everyone in the institution.
        </p>
        <router-link
          to="/ContactUs"
          class="inline-block px-8 py-3 bg-white text-purple-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get in Touch
        </router-link>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const features = [
  {
    title: 'Skill-Based Evaluations',
    desc: 'Evaluate students against clearly defined skill indicators for objective, consistent grading.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Project Management',
    desc: 'Create and manage student projects, assign groups, and monitor progress in real time.',
    icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500'
  },
  {
    title: 'PDF Report Generation',
    desc: 'Generate comprehensive student reports as PDF documents with a single click.',
    icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Signal Management',
    desc: 'Submit, track, and resolve academic signals and incidents through a structured workflow.',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500'
  },
  {
    title: 'Role-Based Access',
    desc: 'Separate, secure dashboards for students, professors, and administrators.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Real-Time Analytics',
    desc: 'Dashboards with charts and metrics giving instant insight into academic performance.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  },
  {
    title: 'Notification System',
    desc: 'Keep everyone informed with in-app notifications for evaluations, signals, and updates.',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    title: 'Secure Authentication',
    desc: 'JWT-based auth with CSRF protection, rate limiting, and role-based route guards.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600'
  }
]
</script>
