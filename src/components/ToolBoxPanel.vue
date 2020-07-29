<template>
  <div class="toolbox">
    <v-btn
      v-for="item in toolBox"
      :key="item.value"
      :value="item.value"
      block
      @click.native="selectTool(item)"
      class="d-flex ma-0 py-6"
      color="primary"
      :style="$store.state.selectedTool === item ? 'background: #DC6A4F !important;' : ''"
    >
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Tool } from '@/model/types';
import Selector from '../utils/tools/selector';
import Pen from '../utils/tools/pen';
import Sqaure from '../utils/tools/rectangle';
import Circle from '../utils/tools/circle';

@Component({
  name: 'ToolBoxPanel',
})
export default class ToolBoxPanel extends Vue {
  toolBox: Tool[] = [
    {
      value: 'Selector',
      icon: 'fas fa-mouse-pointer',
      action: Selector,
    },
    {
      value: 'Pencil',
      icon: 'fas fa-pen',
      action: Pen,
    },
    {
      value: 'Square',
      icon: 'fas fa-square',
      action: Sqaure,
    },
    {
      value: 'Circle',
      icon: 'fas fa-circle',
      action: Circle,
    },
    // {
    //   value: 'Rotate',
    //   icon: 'fas fa-sync',
    //   action: Pen,
    // },
    // {
    //   value: 'Panning',
    //   icon: 'fas fa-hand-paper',
    //   action: Pen,
    // },
    // {
    //   value: 'FullScreen',
    //   icon: 'fas fa-arrows-alt',
    //   action: Pen,
    // },
    // {
    //   value: 'Undo',
    //   icon: 'fas fa-undo',
    //   action: Pen,
    // },
    // {
    //   value: 'Redo',
    //   icon: 'fas fa-redo',
    //   action: Pen,
    // },
  ];
  selectTool(tool: Tool) {
    this.$store.dispatch('setSelectedTool', tool);
  }
}
</script>

<style lang="scss" scoped>
.v-btn-toggle {
  flex-direction: column;
}
.selectedToolStyle {
  background: red !important;
}
.v-btn {
  width: 100%;
  min-width: 36px;
  border-radius: 0;
}
.v-btn::before {
  background-color: transparent;
}
.v-btn i:hover {
  transform: scale(1.15);
}
</style>
