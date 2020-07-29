import Konva from 'konva';
import store from '../../store/index';
import { Rectangle } from '@/utils/shapes/items';
import { getRelativePointerPosition } from '@/utils/konvaUtil';
import KonvaEventObject = Konva.KonvaEventObject;

let isDrawing = false;

const setTool = (stage: Konva.Stage, layer: Konva.Layer): void => {
  let start = { x: 0, y: 0 };
  let x1: number;
  let y1: number;
  let x2: number;
  let y2: number;

  const selectionRectangle = new Konva.Rect({
    visible: false,
    dash: [10, 5],
    stroke: store.state.color,
    strokeWidth: 2,
  });
  layer.add(selectionRectangle);

  stage.on('mousedown touchstart', (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button === 2) return;
    isDrawing = true;

    x1 = getRelativePointerPosition(stage).x;
    y1 = getRelativePointerPosition(stage).y;
    x2 = getRelativePointerPosition(stage).x;
    y2 = getRelativePointerPosition(stage).y;

    start = getRelativePointerPosition(stage);

    selectionRectangle.visible(true);
    selectionRectangle.moveToTop();
    layer.draw();
  });

  stage.on('mousemove touchmove', (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button === 2) return;
    if (!selectionRectangle.visible()) {
      return;
    }

    x2 = getRelativePointerPosition(stage).x;
    y2 = getRelativePointerPosition(stage).y;

    selectionRectangle.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
    layer.batchDraw();
  });

  stage.on('mouseup touchend', (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button === 2) return;
    if (!selectionRectangle.visible()) {
      return;
    }

    const newRect = new Rectangle({
      x: start.x,
      y: start.y,
      width: getRelativePointerPosition(stage).x - start.x,
      height: getRelativePointerPosition(stage).y - start.y,
      stroke: store.state.color,
      strokeWidth: store.state.size,
    });
    layer.add(newRect);

    setTimeout(() => {
      selectionRectangle.visible(false);
      layer.batchDraw();
    });

    layer.batchDraw();
  });
};

export default setTool;
