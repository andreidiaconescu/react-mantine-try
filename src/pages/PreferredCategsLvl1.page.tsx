import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredCategsLvl1.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { MockAreas, MockArea } from '../data/mock/mock-areas';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { addPref, removePref } from '../state/pref.state.utils';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { Area } from '@/models/Area.interface';

export function PreferredCategsLvl1() {
  const prefs: MockArea[] = MockAreas;
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  const navigate = useNavigate();

  const onSelectPref = (selectedDataItem: any) => {
    addPref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };
  const onDeSelectPref = (selectedDataItem: any) => {
    removePref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };

  const onNavigatePrev = (nextRoute: string) => {
    console.log('PreferredAreas.onNavigateNext selectedPrefs', selectedPrefs);
    console.log(
      'PreferredAreas.onNavigateNext citizenPreferences.areas 1',
      citizenPreferences.areas
    );
    citizenPreferences.areas = citizenPreferences.areas || [];
    selectedPrefs.forEach((selectedArea: Area) => {
      citizenPreferences.areas = addPref(citizenPreferences.areas, selectedArea, null);
    });
    console.log('PreferredAreas.onNavigateNext citizenPreferences 2', citizenPreferences);
    setCitizenPreferences(citizenPreferences);

    navigate(nextRoute);
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <CitizenCreateProfileProgressBar progressValue={20}></CitizenCreateProfileProgressBar>
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Vos activités préférées</div>
          <div className={classes.firstParagraph}>
            Sélectionnez les types d’activités qui vous intéressent.
          </div>
          <ChoosePrefsWithButtons
            prefs={prefs}
            selectedPrefs={selectedPrefs}
            onSelectPref={onSelectPref}
            onDeSelectPref={onDeSelectPref}
          />
          <CitizenCreateProfileNavigate
            next
            previous
            onNavigatePrev={() => onNavigatePrev('/citizen/create-profile/preferred-areas')}
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
