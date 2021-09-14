import { CustomActionArgs, DispatchCustomActionResults } from '../types';

import { wait } from './utils';

const pickRandomProperty = (obj) => {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]]; // or parseInt(keys.length * Math.random(), 0)
};

// TODO select more stables links for download
const possibleDownloads = {
  downloadCSV: {
    title: 'Download CSV',
    type: 'download',
    link: 'https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv',
  },
  downloadPDF: {
    title: 'Download PDF',
    type: 'download',
    link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
};

const possibleLinks = {
  link: { title: 'Kleeen Software', link: { url: 'https://www.kleeen.software/', target: '_self' }, type: 'navigation' },
  linkCr: { title: 'Kleeen Software CR', link: 'https://www.kleeen.cr/', type: 'navigation' },
};

const possibleReload = {
  reload: { title: 'Reload Widgets', type: 'reload' },
  reload2: { title: 'Refresh your data', type: 'reload' },
};

const ActionResponseCases = ({ functionName }) => ({
  simpleSuccess: {
    success: true,
    functionName,
  },
  simpleError: {
    success: false,
    functionName,
    customTitle: 'Something Went Wrong',
  },
  navigationAndReload: {
    success: true,
    functionName,
    customTitle: 'Actions',
    actions: [pickRandomProperty(possibleLinks), pickRandomProperty(possibleReload)],
    customMessage: 'Use the above actions to navigate or refresh the content.',
  },
  navigationAndDownload: {
    success: true,
    functionName,
    customTitle: 'Actions',
    actions: [pickRandomProperty(possibleLinks), pickRandomProperty(possibleDownloads)],
    customMessage: 'Use the above actions to navigate or refresh the content.',
  },
  downLoadAndReload: {
    success: true,
    functionName,
    customTitle: 'Actions',
    actions: [pickRandomProperty(possibleReload), pickRandomProperty(possibleDownloads)],
    customMessage: 'Use the above actions to navigate or refresh the content.',
  },
  navigationDownLoadAndReload: {
    success: true,
    functionName,
    customTitle: 'Your Link is Ready',
    actions: [
      pickRandomProperty(possibleLinks),
      pickRandomProperty(possibleDownloads),
      pickRandomProperty(possibleReload),
    ],
    customMessage: 'Use the above actions to navigate or refresh the content.',
  },
});

export const dispatchCustomAction = (input: CustomActionArgs): DispatchCustomActionResults | any => {
  wait(1500);
  const chosenOne = pickRandomProperty(ActionResponseCases(input));

  return { data: chosenOne };
};
