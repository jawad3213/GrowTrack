<template>
  <aside
    :class="[ 
      'fixed mt-16 lg:mt-0 top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out',
      'bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800',
      'border-r border-gray-200/80 dark:border-gray-700/50',
      {
        'lg:w-[280px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[88px]': !isExpanded && !isHovered,
        'translate-x-0 w-[280px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <!-- Logo Section -->
    <div class="h-16 flex items-center justify-center border-b border-gray-200/80 dark:border-gray-700/50">
      <div class="flex items-center gap-3 px-4">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <span class="text-white font-bold text-lg">G</span>
        </div>
        <Transition name="fade">
          <div v-if="isExpanded || isHovered || isMobileOpen" class="flex flex-col">
            <span class="font-bold text-gray-900 dark:text-white text-lg tracking-tight">GrowTrack</span>
            <span class="text-xs text-gray-400">Admin Panel</span>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Menu Section -->
    <div class="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto py-4 px-3">
      <nav class="space-y-1">
        <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
          <!-- Group Title -->
          <div
            v-if="isExpanded || isHovered || isMobileOpen"
            class="px-3 mb-2"
          >
            <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {{ menuGroup.title }}
            </span>
          </div>
          
          <div class="space-y-1">
            <template v-for="(item, index) in menuGroup.items" :key="item.name">
              <!-- Menu Item with Submenu -->
              <div v-if="item.subItems">
                <button
                  @click="toggleSubmenu(groupIndex, index)"
                  :class="[
                    'group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                    isSubmenuOpen(groupIndex, index) 
                      ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300'
                  ]"
                >
                  <div 
                    :class="[
                      'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                      isSubmenuOpen(groupIndex, index)
                        ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 group-hover:text-violet-600 dark:group-hover:text-violet-400'
                    ]"
                  >
                    <component :is="item.icon" class="w-5 h-5" />
                  </div>
                  
                  <Transition name="fade">
                    <span 
                      v-if="isExpanded || isHovered || isMobileOpen"
                      class="flex-1 text-sm font-medium text-left"
                    >
                      {{ item.name }}
                    </span>
                  </Transition>
                  
                  <Transition name="rotate">
                    <ChevronDownIcon
                      v-if="isExpanded || isHovered || isMobileOpen"
                      :class="[
                        'w-4 h-4 transition-transform duration-200',
                        isSubmenuOpen(groupIndex, index) ? 'rotate-180' : ''
                      ]"
                    />
                  </Transition>
                </button>

                <!-- Submenu -->
                <Transition name="collapse">
                  <div
                    v-show="isSubmenuOpen(groupIndex, index) && (isExpanded || isHovered || isMobileOpen)"
                    class="ml-5 mt-1 space-y-1 overflow-hidden"
                  >
                    <router-link
                      v-for="subItem in item.subItems"
                      :key="subItem.path"
                      :to="subItem.path"
                      :class="[
                        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                        isActive(subItem.path)
                          ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300'
                      ]"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-current opacity-0 transition-opacity"
                        :class="isActive(subItem.path) ? 'opacity-100' : ''"
                      />
                      {{ subItem.name }}
                    </router-link>
                  </div>
                </Transition>
              </div>

              <!-- Single Menu Item -->
              <router-link
                v-else-if="item.path"
                :to="item.path"
                :class="[
                  'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  isActive(item.path)
                    ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300'
                ]"
              >
                <div 
                  :class="[
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                    isActive(item.path)
                      ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 group-hover:text-violet-600 dark:group-hover:text-violet-400'
                  ]"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                </div>
                
                <Transition name="fade">
                  <span 
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="text-sm font-medium"
                  >
                    {{ item.name }}
                  </span>
                </Transition>
              </router-link>
            </template>
          </div>
        </div>
      </nav>

      <!-- User Profile Section -->
      <div class="mt-auto pt-4 border-t border-gray-200/80 dark:border-gray-700/50">
        <div 
          v-if="isExpanded || isHovered || isMobileOpen"
          class="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
        >
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">admin@growtrack.com</p>
          </div>
          <button class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
        <button
          v-else
          class="w-full flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  UserSittings,
  UserAdd,
  GridIcon,
  CalenderIcon,
  ChevronDownIcon,
  PageIcon,
  PieChartIcon,
} from "@/components/icons";
import { useSidebar } from "@/composables/useSidebar";

const route = useRoute();
const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar();

const menuGroups = [
  {
    title: "Main Menu",
    items: [
      { icon: GridIcon, name: "Dashboard", path: "/dashboard" },
      { icon: CalenderIcon, name: "Calendar", path: "/Calendar" },
      { 
        icon: UserAdd, 
        name: "User Management",
        subItems: [
          { name: "Students", path: "/Student" },
          { name: "Professors", path: "/Professor" },
          { name: "Supervisors", path: "/Supervisor" },
        ],
      },
      { icon: UserSittings, name: "Skills", path: "/Skills" },
      { 
        name: "Evaluations", 
        icon: PageIcon,
        subItems: [
          { name: "Global Overview", path: "/GlobalOverview" },
          { name: "Signals", path: "/Signals" },
        ]
      },
      { 
        name: "Settings", 
        icon: PieChartIcon,
        subItems: [
          { name: "Fields & Groups", path: "/Group" },
          { name: "Coaches", path: "/Coach" },
        ]
      },
    ]
  }
];

const isActive = (path) => route.path === path;

const toggleSubmenu = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  openSubmenu.value = openSubmenu.value === key ? null : key;
};

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.some((group) =>
    group.items.some(
      (item) => item.subItems && item.subItems.some((subItem) => isActive(subItem.path))
    )
  );
});

const isSubmenuOpen = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      menuGroups[groupIndex].items[itemIndex].subItems?.some((subItem) => isActive(subItem.path))
    )
  );
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.rotate-enter-active,
.rotate-leave-active {
  transition: transform 0.2s ease;
}
.rotate-enter-from,
.rotate-leave-to {
  transform: rotate(-90deg);
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.2s ease;
}
.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
