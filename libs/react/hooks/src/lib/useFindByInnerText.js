import { useEffect } from 'react';
let refs = [];
const addRefs = ref => {
  if (ref) refs.push(ref);
};

const applyFind = text => {
  refs.forEach(ref => {
    const elementText = ref.innerText.toLowerCase();
    const textToFind = text.toLowerCase();
    ref.style.display = elementText.includes(textToFind) ? '' : 'none';
  });
};

const useFindByInnerText = () => {
  useEffect(() => {
    return () => {
      // this one validates only one per view
      refs = [];
    };
  }, []);

  return [addRefs, applyFind];
};

export default useFindByInnerText;
