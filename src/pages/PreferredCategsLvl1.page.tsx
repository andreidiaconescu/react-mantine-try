import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredCategsLvl1.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { MockCategory, getCategsLvl1 } from '../data/mock/mock-categs';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { CategoryInterface } from '@/models/Category.interface';

export function PreferredCategsLvl1() {
  const prefs: MockCategory[] = getCategsLvl1();
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.categoriesLvl1 || []);
  }, [citizenPreferences.categoriesLvl1]);
  const navigate = useNavigate();
  console.log('PreferredCategsLvl1 citizenPreferences', citizenPreferences);

  const onSelectPref = (selectedDataItem: any) => {
    addPref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };
  const onDeSelectPref = (selectedDataItem: any) => {
    removePref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };

  const onNavigate = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.categoriesLvl1 = addPrefs<CategoryInterface>(
      citizenPreferences.categoriesLvl1,
      selectedPrefs
    );
    console.log('PreferredCategsLvl1.onNavigateNext citizenPreferences 2', citizenPreferences);
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
            onNavigatePrev={() => onNavigate('/citizen/create-profile/preferred-areas')}
            onNavigateNext={() => onNavigate('/citizen/create-profile/preferred-categs-lvl2')}
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
