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
      v-model:activeIndex="activeIndex"
      :default-active="activeIndex"
    >
      <div class="menu__wrapper">
        <div class="menu__items">
          <!-- Header -->
          <el-tooltip
            v-if="isCollapsed"
            :disabled="!isCollapsed"
            effect="dark"
            content="Развернуть"
            placement="right"
            :show-after="500"
          >
            <div class="menu__header-collapsed" @click.stop="toggleCollapse">
              <i v-html="building" class="menu__icon-company"></i>
            </div>
          </el-tooltip>

          <div v-else class="menu__header">
            <div class="menu__header-wrapper">
              <i v-html="building" class="menu__icon-company"></i>
              <span class="menu__title" v-show="!isCollapsed">КОМПАНИЯ</span>
            </div>
            <el-tooltip
              :disabled="isCollapsed"
              effect="dark"
              content="Свернуть"
              placement="bottom"
              :show-after="500"
            >
              <i
                v-html="arrows"
                class="menu__icon-colapse"
                @click.stop="toggleCollapse"
              >
              </i>
            </el-tooltip>
          </div>

          <!-- Поля меню -->
          <el-tooltip
            :disabled="!isCollapsed"
            effect="dark"
            content="График работы"
            placement="right"
            :show-after="500"
          >
            <el-menu-item
              :class="isCollapsed ? 'menu__item-collapsed' : 'menu__item'"
              index="/"
              :model-value="activeIndex === '/'"
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
            effect="dark"
            content="Новости компании"
            placement="right"
            :show-after="500"
          >
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
            </el-menu-item>
          </el-tooltip>
          <el-tooltip
            :disabled="!isCollapsed"
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
                <Icon icon="ph:book-bookmark-light" />
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

        <!-- Настройки -->
        <el-tooltip
          :disabled="!isCollapsed || isSettingsVisible"
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
              :class="{ 'menu__label-active': isSettingsVisible }"
              v-show="!isCollapsed"
              >Настройки</span
            >
          </div>
        </el-tooltip>
      </div>
    </el-menu>

    <SettingSubMenu :visible="isSettingsVisible" :isCollapsed="isCollapsed" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import SettingSubMenu from "./SettingsSubMenu.vue";
import useSettingsVisibility from "@/composables/useSettingsVisibility";
import { building, arrows } from "@/assets/icons/index";
import { useStore } from "vuex";

export default defineComponent({
  components: { Icon, SettingSubMenu },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const isCollapsed = computed(() => {
      return store.getters["LocalStates/getIsCollapsed"];
    });

    const activeIndex = computed(() => {
      return route.path;
    });

    const settingsClass = computed(() => {
      let classes = "menu__item-settings";
      classes += isCollapsed.value ? " menu__item-collapsed" : " menu__item";
      classes += isSettingsVisible.value ? " active-settings" : "";
      return classes;
    });

    const settingsIconClass = computed(() => {
      let classes = "";
      classes += isCollapsed.value ? "menu__icon-collapsed" : "menu__icon";
      classes += isSettingsVisible.value ? " active-icon" : "";
      return classes;
    });

    const toggleCollapse = () => {
      store.dispatch("LocalStates/toggleCollapse");
    };

    const { isSettingsVisible, openSettings } = useSettingsVisibility();

    const navigateTo = (menuObject: { index: string }) => {
      router.push(menuObject.index);
    };

    return {
      isCollapsed,
      activeIndex,
      isSettingsVisible,
      settingsClass,
      settingsIconClass,
      building,
      arrows,
      openSettings,
      toggleCollapse,
      navigateTo,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/nav-menu.scss";
</style>
