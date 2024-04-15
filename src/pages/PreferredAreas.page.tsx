import { useState } from 'react';
import classes from './PreferredAreas.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { MockAreas, MockArea } from '../data/mock/mock-areas';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';

export function PreferredAreas() {
  const prefs: MockArea[] = MockAreas;
  const [selectedPrefs, setSelectedPrefs] = useState([]);

  const onSelectPref = (selectedDataItem: any) => {
    if (
      !selectedPrefs.find(
        (alreadySelItem) =>
          alreadySelItem.termCode && alreadySelItem.termCode === selectedDataItem.termCode
      )
    ) {
      setSelectedPrefs([...selectedPrefs, selectedDataItem]);
    } else {
      setSelectedPrefs([
        ...selectedPrefs.filter(
          (alreadySelItem) =>
            alreadySelItem.termCode && alreadySelItem.termCode !== selectedDataItem.termCode
        ),
      ]);
    }
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <CitizenCreateProfileProgressBar progressValue={10}></CitizenCreateProfileProgressBar>
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Vos lieux de sorties</div>
          <div className={classes.firstParagraph}>
            Sélectionnez les villes, régions et provinces où vous profitez habituellement de vos
            activités culturelles.
          </div>
          <ChoosePrefsWithButtons
            prefs={prefs}
            selectedPrefs={selectedPrefs}
            onSelectPref={onSelectPref}
          />
          <CitizenCreateProfileNavigate next previous />
        </div>
      </CitizenPageFrame>
    </>
  );
}
