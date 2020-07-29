import Konva from 'konva';
import store from '../../store/index';
import Vector2d = Konva.Vector2d;
import { getRelativePointerPosition } from '@/utils/konvaUtil';
const setTool = (stage: Konva.Stage, layer: Konva.Layer) => {
  let start = { x: 0, y: 0 };
  const selectionCircle = new Konva.Circle({
    x: start.x,
    y: start.y,
    radius: 10,
    visible: false,
  });

  layer.add(selectionCircle);

  stage.on('mousedown touchstart', () => {
    start = getRelativePointerPosition(stage);

    selectionCircle.visible(true);
    selectionCircle.moveToTop();

    layer.draw();
  });

  stage.on('mousemove touchmove', () => {
    if (!selectionCircle.visible()) {
      return;
    }

    const cur = getRelativePointerPosition(stage) as Vector2d;

    selectionCircle.setAttrs({
      position: start,
      stroke: store.state.color,
      strokeWidth: store.state.size,
      radius: Math.sqrt(Math.pow(cur.x - start.x, 2) + Math.pow(cur.y - start.y, 2)),
    });
    layer.batchDraw();
  });

  stage.on('mouseup touchend', () => {
    if (!selectionCircle.visible()) {
      return;
    }

    const end = getRelativePointerPosition(stage) as Vector2d;

    const newCricle = new Konva.Circle({
      x: start.x,
      y: start.y,
      radius: Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)),
      stroke: store.state.color,
      strokeWidth: store.state.size,
    });
    layer.add(newCricle);

    setTimeout(() => {
      selectionCircle.visible(false);
      layer.batchDraw();
    });

    layer.batchDraw();
  });
};

export default setTool;
