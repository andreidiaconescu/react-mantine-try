import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredCategsLvl2.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { MockCategory, getCategsLvl2 } from '../data/mock/mock-categs';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { CategoryInterface } from '@/models/Category.interface';

export function PreferredCategsLvl2() {
  const prefs: MockCategory[] = getCategsLvl2();
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.categoriesLvl2 || []);
  }, [citizenPreferences.categoriesLvl2]);
  const navigate = useNavigate();
  console.log('PreferredCategsLvl2 citizenPreferences', citizenPreferences);

  const onSelectPref = (selectedDataItem: any) => {
    addPref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };
  const onDeSelectPref = (selectedDataItem: any) => {
    removePref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };

  const onNavigatePrev = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.categoriesLvl2 = addPrefs<CategoryInterface>(
      citizenPreferences.categoriesLvl2,
      selectedPrefs
    );
    console.log('PreferredCategsLvl2.onNavigateNext citizenPreferences 2', citizenPreferences);
    setCitizenPreferences(citizenPreferences);

    navigate(nextRoute);
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <CitizenCreateProfileProgressBar progressValue={40}></CitizenCreateProfileProgressBar>
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Vos goûts culturels</div>
          <div className={classes.firstParagraph}>
            Sélectionnez les styles qui vous intéressent.
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
            onNavigatePrev={() => onNavigatePrev('/citizen/create-profile/preferred-categs-lvl1')}
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
