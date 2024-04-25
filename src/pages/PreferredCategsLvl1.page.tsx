import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredCategsLvl1.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { Category } from '@/models/Category';
import { getCurrentLocale } from '@/i18n/currentLocale';
import { useCategs } from '@/data/hooks/useCategs';

export function PreferredCategsLvl1() {
  const currentLocale: string = getCurrentLocale();
  const {
    loading: categsLoading,
    error: categsLoadError,
    data: categsData,
  } = useCategs(1, currentLocale);

  console.log('PreferredCategsLvl1 GQL Loading categsLoading', categsLoading);
  console.log('PreferredCategsLvl1 GQL categsLoadError: ', categsLoadError);
  console.log('PreferredCategsLvl1 GQL categsData: ', categsData);

  const prefs: Category[] = categsData;
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.categoriesLvl1 || []);
  }, [citizenPreferences.categoriesLvl1]);
  const navigate = useNavigate();
  console.log('PreferredCategsLvl1 citizenPreferences', citizenPreferences);

  if (categsLoadError) {
    return <h3>{categsLoadError.message}</h3>;
  }
  if (categsLoading) {
    return <h3>Loading</h3>;
  }

  const onSelectPref = (selectedDataItem: any) => {
    addPref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };
  const onDeSelectPref = (selectedDataItem: any) => {
    removePref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };

  const onNavigate = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.categoriesLvl1 = addPrefs<Category>(
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
