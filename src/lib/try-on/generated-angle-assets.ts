import type { FrameAngleAssets } from "@/types/frame";

type Shape = "rect" | "aviator" | "round" | "cat";
type Direction = "left" | "right";

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
          '<path d="M195 155 C315 142 445 176 535 240 C450 310 320 338 200 323 C165 272 165 208 195 155 Z"/>',
        ];
      case "round":
        return ['<ellipse cx="350" cy="240" rx="158" ry="135"/>'];
      case "cat":
        return [
          '<path d="M175 185 Q350 112 545 195 Q510 320 335 330 Q195 305 175 185 Z"/>',
        ];
      default:
        return ['<rect x="175" y="146" width="370" height="194" rx="76"/>'];
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

function orient(body: string, direction: Direction) {
  return direction === "right"
    ? body
    : `<g transform="translate(1200 0) scale(-1 1)">${body}</g>`;
}

function buildThreeQuarter(style: Style, direction: Direction) {
  const lenses = lensPaths(style.shape, false).join("");
  const body = `<g stroke="${style.stroke}" stroke-width="${style.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
      ${lenses}
      <path d="M480 230 Q515 205 548 230"/>
      <path d="M858 214 C958 216 1052 224 1148 240"/>
      <path d="M100 210 L58 202" opacity=".55"/>
    </g>
    <g fill="${style.fill}" opacity="${style.lensOpacity}" stroke="none">${lenses}</g>`;

  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" fill="none">
    ${orient(body, direction)}
  </svg>`);
}

function buildSide(style: Style, direction: Direction) {
  const lens = lensPaths(style.shape, true).join("");
  const body = `<g stroke="${style.stroke}" stroke-width="${style.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
      ${lens}
      <path d="M535 226 C720 222 905 230 1082 246"/>
      <path d="M1082 246 Q1148 250 1168 280"/>
    </g>
    <g fill="${style.fill}" opacity="${style.lensOpacity}" stroke="none">${lens}</g>`;

  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" fill="none">
    ${orient(body, direction)}
  </svg>`);
}

export function buildGeneratedAngleAssets(slug: string, front: string): FrameAngleAssets {
  const style = STYLES[slug] ?? STYLES["urban-acetate"];
  return {
    front,
    leftThreeQuarter: buildThreeQuarter(style, "left"),
    rightThreeQuarter: buildThreeQuarter(style, "right"),
    leftSide: buildSide(style, "left"),
    rightSide: buildSide(style, "right"),
  };
}
