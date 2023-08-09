<template>
  <div
    class="menu"
    :style="{
      width: isCollapsed ? '3.75rem' : '16.5rem',
    }"
  >
    <el-menu
      class="menu__list"
      :collapse="isCollapsed"
      :default-active="activeIndex"
    >
      <div class="menu__wrapper">
        <div class="menu__items">
          <!-- Header -->
          <el-tooltip
            v-if="isCollapsed"
            :disabled="!isCollapsed"
            popper-class="menu-custom-tooltip"
            effect="dark"
            content="Развернуть"
            placement="right"
            :show-after="500"
          >
            <div class="menu__header-collapsed" @click.stop="toggleCollapse">
              <i class="menu__icon-company"><building_icon /></i>
            </div>
          </el-tooltip>

          <div v-else class="menu__header">
            <div class="menu__header-wrapper">
              <i class="menu__icon-company"><building_icon /></i>
              <span class="menu__title" v-show="!isCollapsed">КОМПАНИЯ</span>
            </div>
            <el-tooltip
              :disabled="isCollapsed"
              popper-class="menu-custom-tooltip"
              effect="dark"
              content="Свернуть"
              placement="bottom"
              :show-after="500"
            >
              <i class="menu__icon-colapse" @click.stop="toggleCollapse">
                <double_arrows_menu_icon />
              </i>
            </el-tooltip>
          </div>

          <!-- Поля меню -->
          <el-tooltip
            :disabled="!isCollapsed"
            popper-class="menu-custom-tooltip"
            effect="dark"
            content="График работы"
            placement="right"
            :show-after="500"
          >
            <el-menu-item
              :class="isCollapsed ? 'menu__item-collapsed' : 'menu__item'"
              index="/"
              @click="navigateTo"
            >
              <i
                class="el-icon-time"
                :class="isCollapsed ? 'menu__icon-collapsed' : 'menu__icon'"
              ></i>
              <span
                class="menu__label"
                :class="{ 'menu__label-active': activeIndex === '/' }"
                v-show="!isCollapsed"
                >График работы</span
              >
            </el-menu-item>
          </el-tooltip>
          <el-tooltip
            :disabled="!isCollapsed"
            popper-class="menu-custom-tooltip"
            effect="dark"
            content="Структура компании"
            placement="right"
            :show-after="500"
          >
            <el-menu-item
              :class="isCollapsed ? 'menu__item-collapsed' : 'menu__item'"
              index="/company-structure"
              @click="navigateTo"
            >
              <i :class="isCollapsed ? 'menu__icon-collapsed' : 'menu__icon'">
                <company_structure
                  :is-active="activeIndex === '/company-structure'"
                />
              </i>
              <span
                class="menu__label"
                :class="{
                  'menu__label-active': activeIndex === '/company-structure',
                }"
                v-show="!isCollapsed"
                >Структура компании</span
              >
            </el-menu-item>
          </el-tooltip>
          <el-tooltip
            :disabled="!isCollapsed"
            popper-class="menu-custom-tooltip"
            effect="dark"
            placement="right"
            :show-after="500"
          >
            <template #content>
              <span>Новости компании</span>
              <span class="unread-count-badge" v-if="unreadCount > 0">{{
                unreadCount
              }}</span>
            </template>
            <el-menu-item
              :class="isCollapsed ? 'menu__item-collapsed' : 'menu__item'"
              index="/news"
              @click="navigateTo"
            >
              <i
                class="el-icon-news"
                :class="isCollapsed ? 'menu__icon-collapsed' : 'menu__icon'"
              ></i>
              <span
                class="menu__label"
                :class="{ 'menu__label-active': activeIndex === '/news' }"
                v-show="!isCollapsed"
                >Новости компании</span
              >
              <span v-if="unreadCount > 0 && !isCollapsed" class="unread-count">
                {{ unreadCount }}
              </span>
              <div
                v-if="unreadCount > 0 && isCollapsed"
                class="unread-count-dot"
              ></div>
            </el-menu-item>
          </el-tooltip>
          <el-tooltip
            :disabled="!isCollapsed"
            popper-class="menu-custom-tooltip"
            effect="dark"
            content="База знаний"
            placement="right"
            :show-after="500"
          >
            <el-menu-item
              :class="isCollapsed ? 'menu__item-collapsed' : 'menu__item'"
              index="/knowledge"
              @click="navigateTo"
            >
              <i :class="isCollapsed ? 'menu__icon-collapsed' : 'menu__icon'">
                <knowledge_base_icon
                  :is-active="activeIndex === '/knowledge'"
                />
              </i>
              <span
                class="menu__label"
                :class="{ 'menu__label-active': activeIndex === '/knowledge' }"
                v-show="!isCollapsed"
                >База знаний</span
              >
            </el-menu-item>
          </el-tooltip>
          <el-tooltip
            :disabled="!isCollapsed"
            popper-class="menu-custom-tooltip"
            effect="dark"
            content="Пароли"
            placement="right"
            :show-after="500"
          >
            <el-menu-item
              :class="isCollapsed ? 'menu__item-collapsed' : 'menu__item'"
              index="/passwords"
              @click="navigateTo"
            >
              <i :class="isCollapsed ? 'menu__icon-collapsed' : 'menu__icon'"
                ><Icon icon="iconoir:password-pass"
              /></i>
              <span
                class="menu__label"
                :class="{ 'menu__label-active': activeIndex === '/passwords' }"
                v-show="!isCollapsed"
                >Пароли</span
              >
            </el-menu-item>
          </el-tooltip>
        </div>

        <button style="width: 20px; margin-left: 30px" @click="theme">*</button>

        <!-- Настройки -->
        <el-tooltip
          :disabled="!isCollapsed || isSettingsVisible"
          popper-class="menu-custom-tooltip"
          effect="dark"
          content="Настройки"
          placement="right"
          :show-after="500"
        >
          <div :class="settingsClass" @click="openSettings">
            <i class="menu__icon-settings" :class="settingsIconClass"
              ><Icon icon="tabler:settings"
            /></i>
            <span
              class="menu__label menu__label-settings"
              :class="{
                'menu__label-active': isSettingsVisible || isActiveSettings,
              }"
              v-show="!isCollapsed"
              >Настройки</span
            >
          </div>
        </el-tooltip>
      </div>
    </el-menu>

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
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import SettingSubMenu from "./SettingsSubMenu.vue";
import {
  building_icon,
  double_arrows_menu_icon,
  knowledge_base_icon,
  company_structure,
} from "@/assets/icons/index";
import useSettingsVisibility from "@/composables/useSettingsVisibility";
import { useStore } from "vuex";
import { Socket } from "socket.io-client";

export default defineComponent({
  components: {
    Icon,
    SettingSubMenu,
    building_icon,
    double_arrows_menu_icon,
    knowledge_base_icon,
    company_structure,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const unreadCount = ref(12); // Здесь нужно поменять на реальные данные с сервера
    const socket = inject("socket") as Socket;
    const isSettingsVisible = ref(false);

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

    const settingsClass = computed(() => {
      let classes = "menu__item-settings";
      classes += isCollapsed.value ? " menu__item-collapsed" : " menu__item";
      classes +=
        isSettingsVisible.value || isActiveSettings.value
          ? " active-settings"
          : "";
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
      document.body.classList.add("dark-theme");
    };

    const navigateTo = (menuObject: { index: string }) => {
      router.push(menuObject.index);
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
