export const CONSENT_KEY = 'learnsmc_cookie_consent';
export const CONSENT_EVENT = 'learnsmc:consent';
export function advertisingAllowed() {
  try {
    const consent = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    return consent?.version === 2 && consent.advertising === true;
  } catch { return false; }
}
