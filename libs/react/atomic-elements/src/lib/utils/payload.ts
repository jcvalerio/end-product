import { AttributeInputEvents } from '@kleeen/types';
import { UpdatePayload } from '@kleeen/react/components';

export function getUpdateRequestPayload(attributeEventList: AttributeInputEvents[]): UpdatePayload {
  const eventsPayload = attributeEventList.map((event) => event.onSave()).filter((data) => data);
  const updatePayload = eventsPayload.reduce((previous, current) => {
    return {
      ...current,
      params: {
        ...previous.params,
        ...current.params,
      },
    };
  }, {});

  return updatePayload;
}
