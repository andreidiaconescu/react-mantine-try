import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './PreferredAreas.module.css';
import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
// import { MockAreas } from '../data/mock/mock-areas';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { Area } from '@/models/Area';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';
import { useAreas } from '../data/hooks/useAreas';
import { getCurrentLocale } from '@/i18n/currentLocale';

export function PreferredAreas() {
  const currentLocale: string = getCurrentLocale();
  const { loading: areasLoading, error: areasLoadError, data: areasData } = useAreas(currentLocale);

  console.log('PreferredAreas GQL Loading areasLoading', areasLoading);
  console.log('PreferredAreas GQL areasLoadError: ', areasLoadError);
  console.log('PreferredAreas GQL areasData: ', areasData);

  const prefs: Area[] = areasData;
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.areas || []);
  }, [citizenPreferences.areas]);
  const navigate = useNavigate();
  console.log('PreferredAreas citizenPreferences', citizenPreferences);

  if (areasLoadError) {
    return <h3>{areasLoadError.message}</h3>;
  }
  if (areasLoading) {
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
    citizenPreferences.areas = addPrefs<Area>(citizenPreferences.areas, selectedPrefs);
    console.log('PreferredAreas.onNavigateNext citizenPreferences 2', citizenPreferences);
    setCitizenPreferences(citizenPreferences);

    navigate(nextRoute);
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
            onDeSelectPref={onDeSelectPref}
          />
          {/* <CitizenCreateProfileNavigate next previous /> */}
          <CitizenCreateProfileNavigate
            next
            onNavigateNext={() => onNavigate('/citizen/create-profile/preferred-categs-lvl1')}
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
