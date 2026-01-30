import { useState, useCallback } from "react";

interface Settings {
  sound: boolean;
  notifications: boolean;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    sound: true,
    notifications: true,
  });

  const toggleSound = useCallback(() => {
    setSettings((prev: Settings) => ({ ...prev, sound: !prev.sound }));
  }, []);

  const toggleNotifications = useCallback(() => {
    setSettings((prev: Settings) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  }, []);

  return {
    settings,
    toggleSound,
    toggleNotifications,
  };
};
