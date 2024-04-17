import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredAudiences.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { MockAudiences } from '../data/mock/mock-audiences';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { AudienceInterface } from '@/models/Audience.interface';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';
import { PrefsWithButtonsStyle } from '@/components/ChoosePrefsWithButtons/PrefsWithButtonsStyle.enum';

export function PreferredAudiences() {
  const prefs: AudienceInterface[] = MockAudiences;
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.audiences || []);
  }, [citizenPreferences.audiences]);
  const navigate = useNavigate();
  console.log('PreferredAudiences citizenPreferences', citizenPreferences);

  const onSelectPref = (selectedDataItem: any) => {
    addPref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };
  const onDeSelectPref = (selectedDataItem: any) => {
    removePref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };

  const onNavigate = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.audiences = addPrefs<AudienceInterface>(
      citizenPreferences.audiences,
      selectedPrefs
    );
    console.log('PreferredAudiences.onNavigateNext citizenPreferences 2', citizenPreferences);
    setCitizenPreferences(citizenPreferences);

    navigate(nextRoute);
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <CitizenCreateProfileProgressBar progressValue={60}></CitizenCreateProfileProgressBar>
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Vos partenaires de sorties</div>
          <div className={classes.firstParagraph}>
            Indiquez avec qui vous partagez généralement vos activités culturelles.
          </div>
          <ChoosePrefsWithButtons
            prefs={prefs}
            selectedPrefs={selectedPrefs}
            onSelectPref={onSelectPref}
            onDeSelectPref={onDeSelectPref}
            styleChoice={PrefsWithButtonsStyle.Style2}
          />
          {/* <CitizenCreateProfileNavigate next previous /> */}
          <CitizenCreateProfileNavigate
            next
            previous
            onNavigatePrev={() => onNavigate('/citizen/create-profile/preferred-categs-lvl2')}
            onNavigateNext={() => onNavigate('/citizen/create-profile/preferred-cultural-creators')}
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
