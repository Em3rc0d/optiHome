export const WEB_INTENT_EVENTS = [
  "cta_header_request_evaluation",
  "cta_hero_request_evaluation",
  "cta_hero_explore_frames",
  "cta_path_evaluation",
  "cta_path_frames",
  "cta_path_virtual_try_on",
  "cta_catalog_try_on",
  "cta_request_whatsapp",
  "cta_final_request_evaluation",
] as const;

export type WebIntentEvent = (typeof WEB_INTENT_EVENTS)[number];

export function intentProps(event: WebIntentEvent) {
  return { "data-intent": event } as const;
}
