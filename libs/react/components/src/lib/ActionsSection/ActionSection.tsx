import { ActionType } from '@kleeen/types';
import { ActionsSectionProps } from './ActionSection.model';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid } from '@material-ui/core';
import { KUIConnect } from '@kleeen/core-react';
import { KsButton } from '../button';
import { KsButtonText } from './ActionSection.styles';
import { ReactElement } from 'react';
import { isNilOrEmpty } from '@kleeen/common/utils';

function ActionsSection({
  actions,
  entity,
  handleAddClick,
  skinny = false,
  translate,
}: ActionsSectionProps & { translate: (input: string) => string }): ReactElement | null {
  if (isNilOrEmpty(actions)) return null;

  const { component: Button, size, variant } = getComponentAndProps(skinny);

  return (
    <Grid alignItems="center" container item justifyContent="flex-start" spacing={1}>
      {actions.map((action) => {
        const { displayName, name, type } = action;
        const actionType = type.toLowerCase();

        switch (actionType) {
          case ActionType.Add:
            return (
              <Grid item key={name}>
                <Button
                  color="primary"
                  data-testid="add"
                  onClick={() => handleAddClick(action)}
                  size={size}
                  startIcon={skinny && <AddCircleIcon fontSize="small" />}
                  variant={variant}
                >
                  {translate('app.actions.add')} {entity}
                </Button>
              </Grid>
            );
          case ActionType.Delete:
            return (
              <Grid item key={name}>
                <Button color="primary" size={size} variant={variant} data-testid="delete">
                  {translate('app.actions.delete')} {entity}
                </Button>
              </Grid>
            );
          case ActionType.Custom:
            return (
              <Grid item key={name}>
                <Button color="primary" size={size} variant={variant}>
                  {displayName}
                </Button>
              </Grid>
            );
        }
      })}
    </Grid>
  );
}

function getComponentAndProps(skinny: boolean): { component: any; size: string; variant: string } {
  if (skinny) {
    return {
      component: KsButtonText,
      size: 'small',
      variant: 'text',
    };
  }

  return {
    component: KsButton,
    size: 'medium',
    variant: 'contained',
  };
}

export default KUIConnect(({ translate }) => ({ translate }))(ActionsSection);
