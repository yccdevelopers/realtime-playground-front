export interface Tool {
  value: string;
  icon: string;
  action: (state: any, layer: any) => void;
}

export interface ColorPickerColor {
  alpha?: number;
  hex: string;
  hexa?: string;
  hsla?: { a: number; h: number; l: number; s: number };
  hsva?: { a: number; h: number; s: number; v: number };
  hue?: number;
  rgba?: { a: number; b: number; g: number; r: number };
}
