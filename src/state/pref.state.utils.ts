import { ModelBase } from '@/models/ModelBase';

export const addPref = (
  destCollection: ModelBase[],
  selectedDataItem: ModelBase,
  setPrefsInState: (prefs: any) => any
): any => {
  let updatedCollection = destCollection;
  if (
    !destCollection.find(
      (alreadySelItem) =>
        alreadySelItem.termCode && alreadySelItem.termCode === selectedDataItem.termCode
    )
  ) {
    updatedCollection = [...destCollection, selectedDataItem];
    if (setPrefsInState) {
      setPrefsInState(updatedCollection);
    }
  }
  return updatedCollection;
};

export const removePref = (
  destCollection: ModelBase[],
  selectedDataItem: ModelBase,
  setPrefsInState: (prefs: any) => any
): any => {
  const updatedCollection = destCollection.filter(
    (alreadySelItem) =>
      alreadySelItem.termCode && alreadySelItem.termCode !== selectedDataItem.termCode
  );
  if (setPrefsInState) {
    setPrefsInState([...updatedCollection]);
  }
  return updatedCollection;
};
