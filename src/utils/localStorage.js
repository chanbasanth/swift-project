const STORAGE_KEY = 'swiftDashboardState';

export const saveToStorage = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};
