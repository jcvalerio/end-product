function toObject(list: { label: string; value: number }[]): { [key: string]: string } {
  return list.reduce((acc: { [key: string]: string }, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});
}

const parseDataFormat = (format: any) => {
  if (Array.isArray(format?.valueLabels)) {
    format.valueLabels = toObject(format.valueLabels);
    return format;
  }

  return Object.entries(format).reduce((acc, [key, value]: [string, any]) => {
    if (Array.isArray(value?.valueLabels)) {
      value.valueLabels = toObject(value.valueLabels);
    }

    acc[key] = value;

    return acc;
  }, {})
}

const parseDataItem = (data: any): any => {
  if(data?.format) {
    data.format = parseDataFormat(data.format);
  }
  return data;
}

export const parseData = (data: any): any => {
  return Array.isArray(data)
    ? data.map((list) => parseDataItem(list))
    : parseDataItem(data);
}
