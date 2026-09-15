// Charges, warranty and contact from the dashboard (Settings page), fetched
// at build time. The page also re-fetches in the browser (see Base.astro) so a
// change on the dashboard shows without a redeploy. Falls back to these
// defaults if the API is unreachable at build.
import { API } from "../data/business.js";

export const DEFAULTS = {
  service_charge: 250,
  installation_charge: null,
  labour_charge: null,
  warranty_parts_days: null,
  warranty_install_days: 7,
  warranty_repair_days: 7,
  contact_whatsapp: "",
  office_address: "",
};

// One fetch per build, shared by every page (Render cold-starts take ~20 s).
let pending;
export function getConfig() {
  return (pending ||= load());
}

async function load() {
  try {
    const r = await fetch(`${API}/api/public/config`, { signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const live = await r.json();
    console.log("[config] live settings:", JSON.stringify(live));
    return { ...DEFAULTS, ...live };
  } catch (e) {
    console.warn("[config] using defaults:", e.message);
    return { ...DEFAULTS };
  }
}

export const rupee = (n) => "₹" + Number(n).toLocaleString("en-IN");
