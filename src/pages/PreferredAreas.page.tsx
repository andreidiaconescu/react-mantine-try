import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredAreas.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { MockAreas } from '../data/mock/mock-areas';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { AreaInterface } from '@/models/Area.interface';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';

export function PreferredAreas() {
  const prefs: AreaInterface[] = MockAreas;
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.areas || []);
  }, [citizenPreferences.areas]);
  const navigate = useNavigate();
  console.log('PreferredAreas citizenPreferences', citizenPreferences);

  const onSelectPref = (selectedDataItem: any) => {
    addPref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };
  const onDeSelectPref = (selectedDataItem: any) => {
    removePref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };

  const onNavigateNext = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.areas = addPrefs<AreaInterface>(citizenPreferences.areas, selectedPrefs);
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
            previous
            onNavigateNext={() => onNavigateNext('/citizen/create-profile/preferred-categs-lvl1')}
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
