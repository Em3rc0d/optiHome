export type FrameCategory =
  | "Moderna"
  | "Clásica"
  | "Premium"
  | "Solar"
  | "Especial";

export type FrameAngleAssets = {
  front: string;
  leftThreeQuarter?: string;
  rightThreeQuarter?: string;
  leftSide?: string;
  rightSide?: string;
};

export type FrameGeometry = {
  opticalCenterX: number;
  opticalCenterY: number;
  bridgeX: number;
  bridgeY: number;
  nominalWidth: number;
  leftTempleAnchorX: number;
  leftTempleAnchorY: number;
  rightTempleAnchorX: number;
  rightTempleAnchorY: number;
  maxYaw: number;
};

export type Frame = {
  id: number;
  slug: string;
  name: string;
  category: FrameCategory;
  material: string;
  color: string;
  image: string;
  tryOnImage?: string;
  tryOnAngles?: FrameAngleAssets;
  geometry?: FrameGeometry;
  authority: "REFERENCE";
};
