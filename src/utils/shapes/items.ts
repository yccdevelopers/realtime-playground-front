import Konva from 'konva';
import LineConfig = Konva.LineConfig;
import store from '../../store/index';
import RectConfig = Konva.RectConfig;
import KonvaEventObject = Konva.KonvaEventObject;

export class Pen extends Konva.Line {
  constructor(lineConfig: LineConfig) {
    super({
      // stroke: '#df4b26',
      stroke: store.state.color,
      strokeWidth: 5,
      globalCompositeOperation: 'source-over',
      draggable: true,
      lineJoin: 'round',
      lineCap: 'round',
      ...lineConfig,
    });
  }
}

export class Rectangle extends Konva.Rect {
  constructor(lineConfig: RectConfig) {
    super({
      stroke: store.state.color,
      strokeWidth: 5,
      globalCompositeOperation: 'source-over',
      draggable: true,
      lineJoin: 'round',
      lineCap: 'round',
      ...lineConfig,
    });
  }
}
