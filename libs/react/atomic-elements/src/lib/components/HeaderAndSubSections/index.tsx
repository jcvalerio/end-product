import './headerAndSubSections.scss';

import { ButtonFilter, ButtonSelect, ButtonSummary, SubHeader } from '../SubHeader/SubHeader';
import { ReactElement, useState } from 'react';
import { isNilOrEmpty, sortByKeys } from '@kleeen/common/utils';
import { useGetDisplayValue, useKleeenActions } from '@kleeen/react/hooks';

import { ButtonDate } from '../SubHeader/component/ButtonsDate/ButtonsDate';
import { HeaderAndSubSectionsProps } from './HeaderAndSubSections.model';
import { HeaderTitle } from '../HeaderTitle';
import { KUIConnect } from '@kleeen/core-react';
import { KsHeader } from '../Header';

function HeaderAndSubSectionsComponent({
  actionsProps,
  filters,
  handleChangeTab,
  onTabIndexChanged,
  hideRefreshControl,
  objectValue,
  subTitle,
  taskName,
  title,
  translate,
  upText,
  value,
  viewOptions,
  withDateFilter,
  withFilterSection,
  withSummarySection,
}: HeaderAndSubSectionsProps): ReactElement {
  const { refreshPage } = useKleeenActions(taskName);
  const [outContainer, setOutContainer] = useState<ReactElement>();
  const { displayValue, format } = useGetDisplayValue({ objectValue, taskName });

  // TODO: @cafe move this logic to a shared util and re-use it in DataViewControlSection
  const viewOption = viewOptions && viewOptions[value];
  const orderedViewProps = sortByKeys(viewOptions, ['viewOrder', 'viewId']);
  const actions = isNilOrEmpty(actionsProps?.actions) ? viewOption?.actions : actionsProps.actions;
  const props = {
    objectValue,
    taskName,
    results: subTitle,
    title,
    onTabIndexChanged,
  };

  const hasSubHeader = () =>
    orderedViewProps.length > 1 || withDateFilter || withFilterSection || withSummarySection;

  return (
    <>
      <KsHeader
        actionsProps={{
          ...actionsProps,
          actions,
          taskName,
        }}
        hideRefreshControl={hideRefreshControl}
        onRefresh={refreshPage}
        subTitle={subTitle}
        title={<HeaderTitle displayValue={displayValue} format={format} title={title} subTitle={subTitle} />}
        upText={upText}
        withoutSubHeader={!hasSubHeader()}
      />
      {hasSubHeader() && (
        <SubHeader>
          <ButtonSelect
            handleChangeTab={handleChangeTab}
            onTabIndexChanged={props.onTabIndexChanged}
            taskName={taskName}
            translate={translate}
            value={value}
            viewOptions={orderedViewProps}
          />
          {withDateFilter && <ButtonDate translate={translate} hasDateFilter={true} />}
          {withFilterSection && (
            <ButtonFilter
              filters={filters}
              outContainer={setOutContainer}
              taskName={taskName}
              translate={translate}
            />
          )}
          {withSummarySection && (
            <ButtonSummary
              displayTaskName={withSummarySection.displayTaskName}
              entityDetails={withSummarySection.entityDetails}
              isEditable={withSummarySection.isEditable}
              outContainer={setOutContainer}
              taskName={withSummarySection.taskName}
              translate={translate}
            />
          )}
        </SubHeader>
      )}
      {outContainer}
    </>
  );
}

export const HeaderAndSubSections = KUIConnect(({ translate }) => ({ translate }))(
  HeaderAndSubSectionsComponent,
);
