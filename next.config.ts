import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@tensorflow-models/face-landmarks-detection', '@mediapipe/face_mesh'],
};

export default nextConfig;
