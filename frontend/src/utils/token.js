const ТOKEN_KEY = "jwt";
export const setToken = (token) => {
  localStorage.setItem(ТOKEN_KEY, token);
};
export const getToken = () => localStorage.getItem(ТOKEN_KEY);

export const removeToken = () => {
  localStorage.removeItem(ТOKEN_KEY);
};
