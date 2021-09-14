import { AttributeInputEvents, RegisterEvents } from '@kleeen/types';

let configInputEventList: AttributeInputEvents[] = [];

export const useEntityDetailsEventHandler = (): [
  AttributeInputEvents[],
  {
    addEvent: RegisterEvents;
    clearEventList: () => void;
  },
] => {
  return [
    configInputEventList,
    {
      addEvent: (event: AttributeInputEvents) => {
        if (Object.prototype.hasOwnProperty.call(event, 'id')) {
          configInputEventList = configInputEventList.filter(
            (currentEvent) => !currentEvent.id || currentEvent.id !== event.id,
          );
        }
        configInputEventList.push(event);
      },
      clearEventList: () => {
        configInputEventList = [];
      },
    },
  ];
};
