export type FrameCategory =
  | "Moderna"
  | "Clásica"
  | "Premium"
  | "Solar"
  | "Especial";

export type Frame = {
  id: number;
  slug: string;
  name: string;
  category: FrameCategory;
  material: string;
  color: string;
  image: string;
  tryOnImage?: string;
  authority: "DEMO";
};
