import Konva from 'konva';
import Vector2d = Konva.Vector2d;

const setTool = (stage: Konva.Stage, layer: Konva.Layer): void => {
  const tr = new Konva.Transformer();
  layer.add(tr);
  layer.draw();

  // add a new feature, lets add ability to draw selection rectangle
  const selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
  });
  layer.add(selectionRectangle);

  let x1: number;
  let y1: number;
  let x2: number;
  let y2: number;

  stage.on('mousedown touchstart', e => {
    if (e.target !== stage) {
      return;
    }
    const pos = stage.getPointerPosition() as Vector2d;

    x1 = pos.x;
    y1 = pos.y;
    x2 = pos.x;
    y2 = pos.y;

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
    layer.draw();
  });

  stage.on('mousemove touchmove', () => {
    // no nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    const pos = stage.getPointerPosition() as Vector2d;
    if (!pos.x || !pos.y) return;

    x2 = pos.x;
    y2 = pos.y;

    selectionRectangle.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
    layer.batchDraw();
  });

  stage.on('mouseup touchend', () => {
    // no nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectangle.visible(false);
      layer.batchDraw();
    });

    // const shapes = stage.find('Circle').toArray();
    const shapes = layer
      .getChildren(item => item.constructor.name !== 'Transformer' && item.constructor.name !== 'Rect')
      .toArray();
    console.log('%c sha - shapes', 'font-size: 16px; color:  red;', shapes);
    const box = selectionRectangle.getClientRect(null);
    const selected = shapes.filter(shape => Konva.Util.haveIntersection(box, shape.getClientRect()));
    console.log('%c selected - selcted', 'font-size: 16px; color:  red;', selected);
    tr.nodes(selected);
    layer.batchDraw();
  });

  // clicks should select/deselect shapes
  stage.on('click tap', function (e) {
    console.log('%c  - e.target', 'font-size: 16px; color:  red;', e.target);
    if (selectionRectangle.visible()) {
      return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage) {
      tr.nodes([]);
      layer.draw();
      return;
    }
    // do nothing if clicked NOT on our rectangles
    if (!e.target) {
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
    }
    layer.draw();
  });
};
export default setTool;
