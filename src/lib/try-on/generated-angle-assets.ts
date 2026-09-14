import type { FrameAngleAssets } from "@/types/frame";

type Shape = "rect" | "aviator" | "round" | "cat";

type Style = {
  stroke: string;
  fill: string;
  strokeWidth: number;
  shape: Shape;
  lensOpacity: number;
};

const STYLES: Record<string, Style> = {
  "urban-acetate": {
    stroke: "#111827",
    fill: "#d7f3ee",
    strokeWidth: 36,
    shape: "rect",
    lensOpacity: 0.3,
  },
  "titanium-air": {
    stroke: "#a8b0ba",
    fill: "#e8f5f7",
    strokeWidth: 18,
    shape: "rect",
    lensOpacity: 0.24,
  },
  "crystal-vision": {
    stroke: "#d6e7e5",
    fill: "#effaf8",
    strokeWidth: 28,
    shape: "rect",
    lensOpacity: 0.22,
  },
  "vintage-tortoise": {
    stroke: "#7a4b2a",
    fill: "#d7b28a",
    strokeWidth: 34,
    shape: "rect",
    lensOpacity: 0.28,
  },
  "solar-noir": {
    stroke: "#0b0b0c",
    fill: "#27313b",
    strokeWidth: 38,
    shape: "rect",
    lensOpacity: 0.56,
  },
  "solar-aviator": {
    stroke: "#a6afb8",
    fill: "#6f7f8f",
    strokeWidth: 18,
    shape: "aviator",
    lensOpacity: 0.46,
  },
  "circle-brown": {
    stroke: "#6b4a35",
    fill: "#d9c2aa",
    strokeWidth: 22,
    shape: "round",
    lensOpacity: 0.28,
  },
  "solar-color": {
    stroke: "#2f7c82",
    fill: "#bfe4df",
    strokeWidth: 32,
    shape: "cat",
    lensOpacity: 0.48,
  },
};

function lensPaths(shape: Shape, side: boolean) {
  if (side) {
    switch (shape) {
      case "aviator":
        return [
          '<path d="M250 160 C340 150 430 175 500 240 C430 305 340 330 250 320 C220 270 220 210 250 160 Z"/>',
        ];
      case "round":
        return ['<ellipse cx="360" cy="240" rx="135" ry="125"/>'];
      case "cat":
        return [
          '<path d="M220 180 Q355 120 510 195 Q480 315 335 320 Q235 300 220 180 Z"/>',
        ];
      default:
        return ['<rect x="220" y="150" width="300" height="180" rx="72"/>'];
    }
  }

  switch (shape) {
    case "aviator":
      return [
        '<path d="M120 165 C250 130 395 160 485 240 C395 320 250 350 120 315 C82 262 82 218 120 165 Z"/>',
        '<path d="M548 180 C670 152 805 175 880 238 C805 300 670 327 548 300 C520 260 520 220 548 180 Z"/>',
      ];
    case "round":
      return [
        '<ellipse cx="300" cy="240" rx="165" ry="140"/>',
        '<ellipse cx="680" cy="240" rx="145" ry="124"/>',
      ];
    case "cat":
      return [
        '<path d="M110 205 Q285 115 470 190 Q440 315 285 330 Q145 320 110 205 Z"/>',
        '<path d="M535 205 Q690 145 855 205 Q830 300 690 312 Q570 305 535 205 Z"/>',
      ];
    default:
      return [
        '<rect x="100" y="155" width="380" height="180" rx="70"/>',
        '<rect x="545" y="170" width="320" height="160" rx="62"/>',
      ];
  }
}

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildThreeQuarter(style: Style) {
  const lenses = lensPaths(style.shape, false).join("");
  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" fill="none">
    <g stroke="${style.stroke}" stroke-width="${style.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
      ${lenses}
      <path d="M480 230 Q515 205 548 230"/>
      <path d="M860 210 L1000 165 L1150 128"/>
      <path d="M100 210 L58 192" opacity=".55"/>
    </g>
    <g fill="${style.fill}" opacity="${style.lensOpacity}" stroke="none">${lenses}</g>
  </svg>`);
}

function buildSide(style: Style) {
  const lens = lensPaths(style.shape, true).join("");
  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" fill="none">
    <g stroke="${style.stroke}" stroke-width="${style.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
      ${lens}
      <path d="M500 225 L715 190 L1040 120 L1150 132"/>
      <path d="M1040 120 Q1130 110 1160 154"/>
    </g>
    <g fill="${style.fill}" opacity="${style.lensOpacity}" stroke="none">${lens}</g>
  </svg>`);
}

export function buildGeneratedAngleAssets(slug: string, front: string): FrameAngleAssets {
  const style = STYLES[slug] ?? STYLES["urban-acetate"];
  return {
    front,
    rightThreeQuarter: buildThreeQuarter(style),
    rightSide: buildSide(style),
  };
}
