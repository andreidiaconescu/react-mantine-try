// import { Welcome } from '../components/Welcome/Welcome';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { useState } from 'react';
import classes from './PreferredAreas.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { MockAreas, MockArea } from '../data/mock/mock-areas';

export function PreferredAreas() {
  const prefs: MockArea[] = MockAreas;
  const [selectedDataItems, setSelectedDataItems] = useState([]);
  const [searchedPref, setSearchedPref] = useState('');
  let filteredPrefs: MockArea[] = prefs;

  const onChangeSearchPref = (changedSearchPref: string) => {
    console.log('PreferredAreas onChangeSearchPref changedSearchPref', changedSearchPref);
    filteredPrefs = prefs.filter((pref: MockArea) => {
      const cPref: string = changedSearchPref ? changedSearchPref.trim().toLowerCase() : '';
      if (!cPref) {
        return true;
      }
      return pref.name.trim().toLowerCase().includes(cPref);
    });
    console.log('PreferredAreas onChangeSearchPref filteredPrefs', filteredPrefs);
    setSearchedPref(`${changedSearchPref}`);
  };

  const onSelectDataItem = (selectedDataItem: any) => {
    if (
      !selectedDataItems.find(
        (alreadySelItem) =>
          alreadySelItem.termCode && alreadySelItem.termCode === selectedDataItem.termCode
      )
    ) {
      setSelectedDataItems([...selectedDataItems, selectedDataItem]);
    } else {
      setSelectedDataItems([
        ...selectedDataItems.filter(
          (alreadySelItem) =>
            alreadySelItem.termCode && alreadySelItem.termCode !== selectedDataItem.termCode
        ),
      ]);
    }
    // selectedDataItems.push(selectedDataItem);
    console.log(
      'PreferredAreas selectedDataItems: ',
      selectedDataItems,
      ' selectedDataItem: ',
      selectedDataItem
    );
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <CitizenCreateProfileProgressBar></CitizenCreateProfileProgressBar>
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Vos lieux de sorties</div>
          <div className={classes.firstParagraph}>
            Sélectionnez les villes, régions et provinces où vous profitez habituellement de vos
            activités culturelles.
          </div>
          <ChoosePrefsWithButtons
            dataItems={filteredPrefs}
            selectedDataItems={selectedDataItems}
            onSelectDataItem={onSelectDataItem}
            searchedPref={searchedPref}
            onChangeSearchPref={onChangeSearchPref}
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
