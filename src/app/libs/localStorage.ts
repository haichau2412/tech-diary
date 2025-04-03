"use client";
//@ts-nocheck
export const getLocalStorage = (key: string, defaultData?: unknown) => {
  if (typeof window !== "undefined") {
    const localData = localStorage.getItem(key);

    if (localData) {
      try {
        const data = JSON.parse(localData);
        return data;
      } catch (err: unknown) {
        void err;
        return localData;
      }
    }
  }

  return defaultData;
};

export const setLocalStorage = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
