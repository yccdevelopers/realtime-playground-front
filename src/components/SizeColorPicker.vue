<template>
  <v-menu offset-x :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="secondary" v-bind="attrs" v-on="on" block>
        <v-icon :color="$store.state.color" :size="size">fa fa-circle</v-icon>
      </v-btn>
    </template>
    <v-card width="300" class="ma-0 pa-0">
      <v-card-title>Size: {{ size }}px</v-card-title>
      <v-card-text class="ma-0 pa-0">
        <v-slider v-model="size" :thumb-size="size" thumb-label="always" min="1" max="40" @input="emitSize">
          <template v-slot:thumb-label="{}"></template>
        </v-slider>
        <v-color-picker v-model="color" flat elevation="16"></v-color-picker>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import { ColorPickerColor } from '@/model/types';

@Component({
  name: 'SizeColorPicker',
})
export default class SizeColorPicker extends Vue {
  /******************************************************************
   * Props / Emit
   * ****************************************************************/
  @Emit('input') private emitSize(value: number) {
    console.log('%c emitSize - value', 'font-size: 16px; color:  red;', value);
    return value;
  }
  get size(): number {
    return this.$store.state.size;
  }
  set size(value: number) {
    this.$store.dispatch('setSize', value);
  }
  get color() {
    return this.$store.state.color;
  }
  set color(value: ColorPickerColor) {
    this.$store.dispatch('setColor', value);
  }
  /******************************************************************
   * Variables
   * ****************************************************************/
  slider = 0;
  items = [{ title: 'Click Me' }, { title: 'Click Me' }, { title: 'Click Me' }, { title: 'Click Me 2' }];
  /******************************************************************
   * Life Cycles
   * ****************************************************************/
  private created() {
    console.log('created');
  }
  /******************************************************************
   * Methods
   * ****************************************************************/
  private test() {
    console.log('test');
  }
}
</script>

<style lang="scss" scoped>
.v-btn {
  width: 100%;
  min-width: 36px;
}
.v-btn::before {
  background-color: transparent;
}
.v-btn i:hover {
  transform: scale(1.15);
}
</style>
