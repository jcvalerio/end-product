import './PageIntroSection.scss';

import { ActionDialogs, ActionsSection, AddDialogPayload } from '@kleeen/react/components';
import { Container, Title, Typography } from './PagesIntroSection.style';
import React, { useState } from 'react';

import { Action } from '@kleeen/types';
import Grid from '@material-ui/core/Grid';
import { PageIntroSectionProps } from './PageIntroSection.model';
import { isAddAction } from '@kleeen/render-utils';

export function PageIntroSection(props: PageIntroSectionProps): React.ReactElement {
  const [actionPayload, setActionPayload] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const { actions = [] } = props;
  const addActions = actions.filter(isAddAction);

  function dispatchAction({ action, payload }: { action: Action; payload: AddDialogPayload }): void {
    const isCustomDialogOpen = isCustomOpen;
    const needsConfirmation = action?.areYouSure;

    if (isCustomDialogOpen && needsConfirmation) {
      setActionPayload(payload);
      setIsConfirmationOpen(true);
    } else {
      props.entityActions.addRequest(payload || actionPayload);
    }
  }

  function handleClick(action: Action): void {
    if (action?.component) {
      setIsCustomOpen(true);
    } else if (action?.areYouSure) {
      setIsConfirmationOpen(true);
    }
  }

  function handleIsConfirmationOpenChange(): void {
    setIsConfirmationOpen(!isConfirmationOpen);
  }

  function handleIsCustomOpenChange(): void {
    setIsCustomOpen(!isCustomOpen);
  }

  return (
    <>
      <Container maxWidth="xl" className="page-intro">
        <Grid container spacing={1} justify="space-between">
          {props.showAvatar && (
            <Grid item xs={4} sm={2}>
              <AvatarSection />
            </Grid>
          )}
          <Grid className="main-container">
            <Title>
              <Typography variant="h2" component="h1">
                {props.title}
              </Typography>
              {props.description && (
                <Typography variant="subtitle1" component="h2">
                  {props.description}
                </Typography>
              )}
            </Title>
          </Grid>
        </Grid>
        {props.showActions && addActions && (
          <ActionsSection actions={addActions} entity={props.entity} handleAddClick={handleClick} />
        )}
      </Container>
      {addActions.map((action) => (
        <ActionDialogs
          action={action}
          attributes={props.attributes}
          dispatchAction={dispatchAction}
          entity={props.entity}
          isConfirmationOpen={isConfirmationOpen}
          isCustomOpen={isCustomOpen}
          key={`${action.name}-dialogs`}
          onIsConfirmationOpenChange={handleIsConfirmationOpenChange}
          onIsCustomOpenChange={handleIsCustomOpenChange}
        />
      ))}
    </>
  );
}

function AvatarSection(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect id="blue_square" fill="#069" x="0" y="0" width="100%" height="100%" />
    </svg>
  );
}

export default PageIntroSection;
