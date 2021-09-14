export function useGetNavigationStyle(): { isNavLeft: boolean; isNavTop: boolean } {
  const themeWrapper = document.getElementById('theme-wrapper-id');
  return {
    isNavLeft: Boolean(themeWrapper?.classList.contains('nav-left')),
    isNavTop: Boolean(themeWrapper?.classList.contains('nav-top')),
  };
}
