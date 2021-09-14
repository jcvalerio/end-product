import { useEffect } from 'react';
import { useKleeenActions } from './useKleeenActions';
import { useSelector } from 'react-redux';

const useFilterContext = ({ params, taskName, widgetId }) => {
  const pageActions = useKleeenActions(taskName);
  const widgetData = useSelector((state) => state[taskName].widgets[widgetId]);
  const attrs = params.attributes;

  useEffect(() => {
    if (pageActions && widgetId) {
      pageActions.addWidget({ widgetId });
      pageActions.getData({ widgetId, params, paramsBasedOnRoute: {} });
    }

    return () => {
      pageActions.addWidget({ widgetId });
    };
  }, []);

  useEffect(() => {
    if (attrs) {
      pageActions.getData({ widgetId, params, paramsBasedOnRoute: {} });
    }
  }, [attrs]);

  return widgetData;
};

export default useFilterContext;
