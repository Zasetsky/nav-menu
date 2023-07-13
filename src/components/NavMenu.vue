<template>
  <div class="menu">
    <el-menu
      class="menu__list"
      :collapse="isCollapsed"
      v-model:activeIndex="activeIndex"
      :default-active="activeIndex"
    >
      <div class="menu__wrapper">
        <div class="menu__items">
          <!-- Header -->
          <div
            v-if="isCollapsed"
            class="menu__header-collapsed"
            @click.stop="$emit('update:isCollapsed')"
          >
            <i v-html="building" class="menu__icon-company"></i>
          </div>

          <div v-else class="menu__header">
            <div class="menu__header-wrapper">
              <i v-html="building" class="menu__icon-company"></i>
              <span class="menu__title" v-show="!isCollapsed">КОМПАНИЯ</span>
            </div>

            <i
              v-html="arrows"
              class="menu__icon-colapse"
              @click.stop="$emit('update:isCollapsed')"
            >
            </i>
          </div>

          <!-- Поля меню -->
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
        </div>

        <!-- Настройки -->
        <div @click="openSettings">
          <el-menu-item :class="settingsClass" index="">
            <i :class="isCollapsed ? 'menu__icon-collapsed' : 'menu__icon'"
              ><Icon icon="tabler:settings"
            /></i>
            <span
              class="menu__label"
              :class="{ 'menu__label-active': isSettingsVisible }"
              v-show="!isCollapsed"
              >Настройки</span
            >
          </el-menu-item>
        </div>
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
import useSettingsVisibility from "../utils/useSettingsVisibility";
import { building, arrows } from "@/assets/icons/index";

export default defineComponent({
  components: { Icon, SettingSubMenu },

  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const activeIndex = computed(() => {
      if (!isSettingsVisible.value) {
        return route.path;
      } else {
        return "";
      }
    });

    const settingsClass = computed(() => {
      let classes = "menu__item-settings";
      classes += props.isCollapsed ? " menu__item-collapsed" : " menu__item";
      classes += isSettingsVisible.value ? " active-settings" : "";
      return classes;
    });

    const { isSettingsVisible, openSettings } = useSettingsVisibility();

    const navigateTo = (menuObject: { index: string }) => {
      router.push(menuObject.index);
    };

    return {
      activeIndex,
      isSettingsVisible,
      settingsClass,
      building,
      arrows,
      openSettings,
      navigateTo,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/nav-menu.scss";
</style>
