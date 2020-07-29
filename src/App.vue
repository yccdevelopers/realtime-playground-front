<template>
  <v-app>
    <notifications group="all" width="100%" position="bottom center" />
    <div v-if="isLoading">
      <fingerprint-spinner class="spinner" :animation-duration="1500" :size="150" color="#136a8a" />
    </div>
    <v-navigation-drawer dark app mini-variant mini-variant-width="64" permanent>
      <ToolBoxPanel></ToolBoxPanel>
      <SizeColorPicker></SizeColorPicker>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-main>
    <v-navigation-drawer right app mini-variant mini-variant-width="300" permanent> </v-navigation-drawer>
  </v-app>
</template>
<script lang="ts">
import { FingerprintSpinner } from 'epic-spinners';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { eventHub } from '@/utils/EventHub';
import ToolBoxPanel from '@/components/ToolBoxPanel.vue';
import ColorPicker from '@/components/ColorPicker.vue';
import SizeColorPicker from '@/components/SizeColorPicker.vue';

@Component({
  name: 'App',
  components: {
    SizeColorPicker,
    ColorPicker,
    ToolBoxPanel,
    FingerprintSpinner,
  },
})
export default class App extends Vue {
  @Prop() private msg!: string;

  /******************************************************************
   * Variables
   * ****************************************************************/
  refCount = 0;
  isLoading = false;

  /******************************************************************
   * Life Cycles
   * ****************************************************************/
  created() {
    eventHub.$on('before-request', this.setLoading);
    eventHub.$on('request-error', this.unsetLoading);
    eventHub.$on('after-response', this.unsetLoading);
    eventHub.$on('response-error', this.unsetLoading);
  }
  beforeDestroy() {
    eventHub.$off('before-request', this.setLoading);
    eventHub.$off('request-error', this.unsetLoading);
    eventHub.$off('after-response', this.unsetLoading);
    eventHub.$off('response-error', this.unsetLoading);
  }

  /******************************************************************
   * Methods
   * ****************************************************************/
  setLoading(): void {
    this.refCount += 1;
    this.isLoading = true;
  }
  unsetLoading(): void {
    if (this.refCount > 0) {
      this.refCount -= 1;
      this.isLoading = this.refCount > 0;
    }
  }
  test(e: any) {
    console.log('%c test - e', 'font-size: 16px; color:  red;', e);
  }
}
</script>
<style lang="scss">
.notifications {
  .notification-wrapper {
    width: 100vw;
  }

  span {
    display: block;
  }
}

.spinner {
  position: fixed !important;
  top: 0 !important;
  height: 100vh !important;
  width: 100% !important;
  z-index: 10000 !important;
  background: rgba(255, 255, 255, 0.8) !important;
}
.fade-enter-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
