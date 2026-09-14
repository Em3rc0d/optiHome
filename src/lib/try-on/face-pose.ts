export type FacePoint = {
  x: number;
  y: number;
  z?: number;
  name?: string;
};

const MAX_YAW_DEG = 42;
const YAW_DEAD_ZONE_DEG = 2.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function valid(point?: FacePoint): point is FacePoint {
  return Boolean(
    point && Number.isFinite(point.x) && Number.isFinite(point.y)
  );
}

function midpoint(a: FacePoint, b: FacePoint): FacePoint {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z:
      Number.isFinite(a.z) && Number.isFinite(b.z)
        ? ((a.z ?? 0) + (b.z ?? 0)) / 2
        : undefined,
  };
}

/**
 * Estimates horizontal head rotation from FaceMesh landmarks.
 *
 * The returned sign is relative to the rendered image: negative means the
 * nose moves toward the rendered left side and positive toward rendered right.
 * Camera inference is already horizontally flipped to match the mirrored
 * preview, so the same convention can be used by the overlay renderer.
 */
export function estimateYaw(points: FacePoint[]): number {
  const rightEyeOuter = points[33];
  const rightEyeInner = points[133];
  const leftEyeInner = points[362];
  const leftEyeOuter = points[263];
  const nose = points[1];

  if (
    !valid(rightEyeOuter) ||
    !valid(rightEyeInner) ||
    !valid(leftEyeInner) ||
    !valid(leftEyeOuter) ||
    !valid(nose)
  ) {
    return 0;
  }

  const rightEye = midpoint(rightEyeOuter, rightEyeInner);
  const leftEye = midpoint(leftEyeInner, leftEyeOuter);
  const eyeCenter = midpoint(rightEye, leftEye);
  const eyeDistance = Math.max(
    1,
    Math.hypot(leftEye.x - rightEye.x, leftEye.y - rightEye.y)
  );

  const normalizedOffset = (nose.x - eyeCenter.x) / eyeDistance;
  return clamp(normalizedOffset * 72, -MAX_YAW_DEG, MAX_YAW_DEG);
}

export function normalizeYaw(yaw: number) {
  if (!Number.isFinite(yaw) || Math.abs(yaw) < YAW_DEAD_ZONE_DEG) return 0;
  return clamp(yaw, -MAX_YAW_DEG, MAX_YAW_DEG);
}
