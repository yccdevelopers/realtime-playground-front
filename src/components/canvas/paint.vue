<template>
  <div>
    <v-stage ref="stage" :config="configKonva">
      <v-layer ref="layer"></v-layer>
    </v-stage>
    <v-btn @click="test">click</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Konva from 'konva';
import { Stage, StageConfig } from 'konva/types/Stage';
import ColorPicker from '@/components/ColorPicker.vue';
import Vector2d = Konva.Vector2d;

@Component({
  name: 'paint',
  components: { ColorPicker },
})
export default class Paint extends Vue {
  @Prop() private msg!: string;

  /******************************************************************
   * Variables
   * ****************************************************************/
  stage: Konva.Stage | any;
  layer: Konva.Layer | any;
  mode = 'brush';

  configKonva: StageConfig = {
    container: this.stage,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  /******************************************************************
   * Life Cycles
   * ****************************************************************/
  created() {
    console.log('created');
  }
  mounted() {
    const { stage, layer } = this.$refs as any;
    this.stage = stage.getNode();
    this.layer = layer.getNode();
    this.$store.dispatch('setStage', this.stage);
    this.$store.dispatch('setLayer', this.layer);
    this.setWheelZoom(this.stage);
    const circle = new Konva.Circle({
      x: this.stage.width() / 2,
      y: this.stage.height() / 2,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true,
    });

    const circle2 = new Konva.Circle({
      x: this.stage.width() / 2,
      y: this.stage.height() / 2,
      radius: 70,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true,
    });

    // add the shape to the layer
    this.layer.add(circle);
    this.layer.add(circle2);
  }

  /******************************************************************
   * Methods
   * ****************************************************************/

  private initCanvas() {
    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }
  private setWheelZoom(stage: Konva.Stage) {
    stage.on('wheel', e => {
      const scaleBy = 0.95;
      e.evt.preventDefault();
      const oldScale = stage.scaleX();

      const pointer = stage.getPointerPosition() as Vector2d;

      let mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      let newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({
        x: newScale,
        y: newScale,
      });

      let newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    });
  }
  test() {
    console.log(this.$store.state.layer);
    const lines = this.stage.find('Line');
    console.log(lines);
  }
}
</script>

<style lang="scss">
.canvas {
  margin: auto;
  border: 2px solid black;
  background: white;
}
</style>
