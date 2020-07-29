<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn light v-bind="attrs" v-on="on" style="width: 100%;">
        <v-icon :color="color">fa fa-palette</v-icon>
      </v-btn>
    </template>
    <v-color-picker v-model="color" flat elevation="16"></v-color-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import { ColorPickerColor } from '@/model/types';

@Component({
  name: 'ColorPicker',
})
export default class ColorPicker extends Vue {
  /******************************************************************
   * Props / Emit
   * ****************************************************************/
  // @Emit('input') private emitColor(value: ColorPickerColor) {
  //   return value;
  // }
  get color() {
    return this.$store.state.color;
  }
  set color(value: ColorPickerColor) {
    this.$store.dispatch('setColor', value);
  }

  /******************************************************************
   * Variables
   * ****************************************************************/

  /******************************************************************
   * Life Cycles
   * ****************************************************************/

  /******************************************************************
   * Methods
   * ****************************************************************/
}
</script>

<style lang="scss" scoped></style>
