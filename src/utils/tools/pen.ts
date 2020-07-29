import Konva from 'konva';
import { Pen } from '@/utils/shapes/items';
import Vector2d = Konva.Vector2d;
import store from '../../store/index';
import KonvaEventObject = Konva.KonvaEventObject;

let isDrawing = false;
let lastLine: Konva.Line;

const setTool = (stage: Konva.Stage, layer: Konva.Layer) => {
  stage.on('mousedown touchstart', (e: KonvaEventObject<MouseEvent>) => {
    isDrawing = true;
    const pos = stage.getPointerPosition() as Vector2d;

    lastLine = new Pen({
      points: [pos.x, pos.y],
      strokeWidth: store.state.size,
    });
    layer.add(lastLine);
  });

  // and core function - drawing
  stage.on('mousemove touchmove', () => {
    if (!isDrawing) {
      return;
    }
    const pos = stage.getPointerPosition() as Vector2d;
    const newPoints = lastLine!.points().concat([pos.x, pos.y]);
    lastLine.points(newPoints);
    layer.batchDraw();
  });

  stage.on('mouseup touchend', () => {
    isDrawing = false;
  });
};

export default setTool;
