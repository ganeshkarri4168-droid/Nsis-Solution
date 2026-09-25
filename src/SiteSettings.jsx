import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./api.js";
import { COMPANY } from "./data.js";

const defaults = {
  whatsapp: COMPANY.whatsapp,
  whatsappDisplay: COMPANY.whatsappDisplay,
};

const SiteSettingsContext = createContext({
  ...defaults,
  applySettings: () => {},
});

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaults);

  const applySettings = useCallback((next) => {
    if (!next?.whatsapp) return;
    setSettings({
      whatsapp: next.whatsapp,
      whatsappDisplay: next.whatsappDisplay || next.whatsapp,
    });
  }, []);

  useEffect(() => {
    api("/api/settings")
      .then(applySettings)
      .catch(() => {});
  }, [applySettings]);

  const value = useMemo(
    () => ({ ...settings, applySettings }),
    [settings, applySettings]
  );

  return (
    <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
