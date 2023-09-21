<template>
  <div
    class="menu"
    :style="{ width: isCollapsed ? '3.75rem' : '16.5rem' }"
    :class="{ collapsed: isCollapsed }"
  >
    <!-- Шапка -->
    <div class="menu-top-items">
      <div
        v-if="isCollapsed"
        class="menu__header-collapsed"
        @click.stop="toggleCollapse"
      >
        <i class="menu__icon-company"><building_icon /></i>
      </div>
      <div v-else class="menu__header">
        <div class="menu__header-wrapper">
          <i class="menu__icon-company"><building_icon /></i>
          <span class="menu__title" v-show="!isCollapsed">КОМПАНИЯ</span>
        </div>
        <i class="menu__icon-collapse" @click.stop="toggleCollapse">
          <double_arrows_menu_icon />
        </i>
      </div>

      <!-- Элементы меню -->
      <div class="menu__nav" :class="{ collapsed: isCollapsed }">
        <!-- График работы -->
        <div :class="itemClass('/')" @click="navigateTo('/')">
          <i class="menu__icon"
            ><graph_icon :is-active="activeIndex === '/'"
          /></i>
          <span
            class="menu__label"
            :class="{
              'menu__label-active': activeIndex === '/',
            }"
            v-show="!isCollapsed"
            >График работы</span
          >
        </div>
        <!-- Структура компании -->
        <div
          :class="itemClass('/company-structure')"
          @click="navigateTo('/company-structure')"
        >
          <i class="menu__icon"
            ><company_structure
              :is-active="activeIndex === '/company-structure'"
          /></i>
          <span
            class="menu__label"
            :class="{
              'menu__label-active': activeIndex === '/company-structure',
            }"
            v-show="!isCollapsed"
            >Структура компании</span
          >
        </div>
        <!-- Новости компании -->
        <div :class="itemClass('/news')" @click="navigateTo('/news')">
          <i class="menu__icon"
            ><news_icon :is-active="activeIndex === '/news'"
          /></i>
          <span
            class="menu__label"
            :class="{
              'menu__label-active': activeIndex === '/news',
            }"
            v-show="!isCollapsed"
            >Новости компании</span
          >
        </div>
        <!-- База знаний -->
        <div :class="itemClass('/knowledge')" @click="navigateTo('/knowledge')">
          <i class="menu__icon"
            ><knowledge_base_icon :is-active="activeIndex === '/knowledge'"
          /></i>
          <span
            class="menu__label"
            :class="{
              'menu__label-active': activeIndex === '/knowledge',
            }"
            v-show="!isCollapsed"
            >База знаний</span
          >
        </div>
        <!-- Пароли -->
        <div :class="itemClass('/passwords')" @click="navigateTo('/passwords')">
          <i class="menu__icon"
            ><password_icon :is-active="activeIndex === '/passwords'"
          /></i>
          <span
            class="menu__label"
            :class="{
              'menu__label-active': activeIndex === '/passwords',
            }"
            v-show="!isCollapsed"
            >Пароли</span
          >
        </div>
      </div>
    </div>
    <!-- Кнопка смены темы -->
    <button style="width: 20px; margin-left: 30px" @click="theme">*</button>

    <!-- Настройки -->
    <div :class="settingsClass" @click="openSettings">
      <i class="menu__icon-settings" :class="settingsIconClass">
        <settings_icon :is-active="isSettingsVisible || isActiveSettings" />
      </i>
      <span
        class="menu__label menu__label-settings"
        :class="{
          'menu__label-active': isSettingsVisible || isActiveSettings,
        }"
        v-show="!isCollapsed"
      >
        Настройки
      </span>
    </div>

    <!-- Подменю настроек -->
    <SettingSubMenu
      :isCollapsed="isCollapsed"
      :isSettingsVisible="isSettingsVisible"
      @closeSettings="closeSettings"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUnmounted,
  inject,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import SettingSubMenu from "./SettingsSubMenu.vue";
import {
  building_icon,
  double_arrows_menu_icon,
  knowledge_base_icon,
  company_structure,
  graph_icon,
  news_icon,
  password_icon,
  settings_icon,
} from "@/assets/icons/index";
import useSettingsVisibility from "@/composables/useSettingsVisibility";
import { useStore } from "vuex";
import { Socket } from "socket.io-client";

export default defineComponent({
  components: {
    SettingSubMenu,
    building_icon,
    double_arrows_menu_icon,
    knowledge_base_icon,
    company_structure,
    graph_icon,
    news_icon,
    password_icon,
    settings_icon,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const unreadCount = ref(12); // Здесь нужно поменять на реальные данные с сервера
    const socket = inject("socket") as Socket;
    const isSettingsVisible = ref(false);
    const isDark = ref(false);

    const { openSettings, closeSettings } =
      useSettingsVisibility(isSettingsVisible);

    const isCollapsed = computed(() => {
      return store.getters["LocalStates/getIsCollapsed"];
    });

    const activeIndex = computed(() => {
      return route.path;
    });

    const isActiveSettings = computed(() => {
      const settingsRoutes = ["/employees", "/absences", "/deal-distribution"];
      return settingsRoutes.includes(route.path);
    });

    const itemClass = (route: string) => {
      let classes = "menu__item";
      if (activeIndex.value === route) {
        classes += " active";
      }
      if (isCollapsed.value) {
        classes += " collapsed";
      }
      return classes;
    };

    const settingsClass = computed(() => {
      let classes = "menu__item menu__item-settings";

      if (isSettingsVisible.value || isActiveSettings.value) {
        classes += " active-settings";
      }

      if (isCollapsed.value) {
        classes += " collapsed";
      }

      return classes;
    });

    const settingsIconClass = computed(() => {
      let classes = "";
      classes += isCollapsed.value ? "menu__icon-collapsed" : "menu__icon";
      classes +=
        isSettingsVisible.value || isActiveSettings.value ? " active-icon" : "";
      return classes;
    });

    const theme = () => {
      isDark.value = !isDark.value;
      if (isDark.value) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    };

    const navigateTo = (index: string) => {
      router.push(index);
    };

    const toggleCollapse = () => {
      store.dispatch("LocalStates/toggleCollapse");
    };

    const handleNotification = () => {
      unreadCount.value++; // Изменить под сервер
    };

    onMounted(() => {
      socket.on("notification", handleNotification);
    });

    onUnmounted(() => {
      socket.off("notification", handleNotification);
    });

    return {
      isCollapsed,
      activeIndex,
      isSettingsVisible,
      isActiveSettings,
      settingsClass,
      settingsIconClass,
      unreadCount,
      itemClass,
      openSettings,
      closeSettings,
      toggleCollapse,
      navigateTo,
      theme,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/nav-menu.scss";
</style>
