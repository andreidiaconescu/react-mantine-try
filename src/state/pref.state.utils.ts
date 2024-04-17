import { ModelBase } from '@/models/ModelBase';
import { arePrefsEqual } from '../models/utils';

export const addPref = (
  destCollection: ModelBase[],
  selectedDataItem: ModelBase,
  setPrefsInState: (prefs: any) => any
): any => {
  let updatedCollection = destCollection;
  if (!Array.isArray(destCollection)) {
    destCollection = [];
  }

  if (!destCollection.find((alreadySelItem) => arePrefsEqual(alreadySelItem, selectedDataItem))) {
    updatedCollection = [...destCollection, selectedDataItem];
    if (setPrefsInState) {
      setPrefsInState(updatedCollection);
    }
  }
  return updatedCollection;
};

export const addPrefs = <PrefType = ModelBase>(
  destCollection: PrefType[],
  selectedPrefs: PrefType[]
): PrefType[] => {
  // copy local preferences to higher level state (in CitizenCreateProfile)
  destCollection = destCollection || [];
  selectedPrefs.forEach((selectedArea: PrefType) => {
    destCollection = addPref(destCollection, selectedArea, null);
  });
  return [...destCollection];
};

export const removePref = (
  destCollection: ModelBase[],
  selectedDataItem: ModelBase,
  setPrefsInState: (prefs: any) => any
): any => {
  if (!Array.isArray(destCollection)) {
    destCollection = [];
  }

  const updatedCollection = destCollection.filter(
    (alreadySelItem) => !arePrefsEqual(alreadySelItem, selectedDataItem)
  );
  if (setPrefsInState) {
    setPrefsInState([...updatedCollection]);
  }
  return updatedCollection;
};
