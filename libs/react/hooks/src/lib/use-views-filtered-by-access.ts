import { useAccessControlChecker } from '@kleeen/core-react';
import { formatViewOptions, roleAccessKeyTag } from '@kleeen/common/utils';
import { ViewOption } from '@kleeen/types';

const rolePermissionOk = 'SHOW';
export const useViewsFilteredByAccess = (viewOptions: ViewOption[], taskName: string, withFormat = true) => {
  const viewOptionFilteredByAccess: ViewOption[] = viewOptions.filter((viewOption) => {
    const viewRoleAccessKey = roleAccessKeyTag(`${taskName}.views.${viewOption.name}`);
    const { permission } = useAccessControlChecker(viewRoleAccessKey);

    return rolePermissionOk === permission;
  });

  if (!withFormat) return viewOptionFilteredByAccess;

  const options = formatViewOptions(viewOptionFilteredByAccess);

  return options;
};
