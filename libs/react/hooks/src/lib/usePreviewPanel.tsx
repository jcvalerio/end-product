import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { ReactElement, Widget } from '@kleeen/types';

export type PreviewPanel = {
  previewTitle: ReactElement;
  closePreviewPanel: () => void;
  isPreviewOpen: boolean;
  openPreviewPanel: (title) => void;
  previewWidgets: Widget[];
  setPreviewWidgets: Dispatch<SetStateAction<Widget[]>>;
};

export const PreviewPanelContext = createContext<PreviewPanel>({
  previewTitle: null,
  closePreviewPanel: () => {
    console.warn('No preview panel context set');
  },
  isPreviewOpen: false,
  openPreviewPanel: () => {
    console.warn('No preview panel context set');
  },
  previewWidgets: [],
  setPreviewWidgets: () => {
    console.warn('No preview panel context set');
  },
});

export function usePreviewPanel() {
  const previewPanelContext = useContext(PreviewPanelContext);
  return previewPanelContext;
}

export function PreviewPanelLayoutProvider({ children }: { children: ReactElement }) {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState<ReactElement>(null);
  const [previewWidgets, setPreviewWidgets] = useState<Widget[]>([]);

  function closePreviewPanel() {
    setPreviewOpen(false);
    setPreviewWidgets([]);
    setPreviewTitle(null);
  }

  function openPreviewPanel(title: ReactElement) {
    setPreviewOpen(true);
    setPreviewTitle(title);
  }

  const previewPanelProps = {
    previewTitle,
    closePreviewPanel,
    isPreviewOpen,
    openPreviewPanel,
    previewWidgets,
    setPreviewWidgets,
  };

  return <PreviewPanelContext.Provider value={previewPanelProps}>{children}</PreviewPanelContext.Provider>;
}
