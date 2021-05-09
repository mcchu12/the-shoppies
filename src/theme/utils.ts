export const getSavedThemeMode = () => {
  const mode = localStorage.getItem('darkMode')
  if (mode) return JSON.parse(mode);
}

export const saveThemeMode = (mode: string) => {
  localStorage.setItem('darkMode', JSON.stringify(mode))
}