export const isSomeFilterUnavailable = (
  currentFilters: Record<string, unknown>,
  availableFilters: Record<string, unknown>,
) => {
  const filterKeys = Object.keys(currentFilters);
  const availableKeys = Object.keys(availableFilters);
  return filterKeys.some((key) => !availableKeys.includes(key));
};

export const cleanUnavailableFilters = (
  currentFilters: Record<string, unknown>,
  availableFilters: Record<string, unknown>,
) => {
  const finalFilters = Object.assign(currentFilters, {});
  const availableKeys = Object.keys(availableFilters);
  Object.keys(currentFilters).forEach((key) => {
    if (!availableKeys.includes(key)) {
      delete finalFilters[key];
    }
  });
  return finalFilters;
};
