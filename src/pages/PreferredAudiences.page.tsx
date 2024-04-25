import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredAudiences.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { Audience } from '@/models/Audience';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';
import { PrefsWithButtonsStyle } from '@/components/ChoosePrefsWithButtons/PrefsWithButtonsStyle.enum';
import { getCurrentLocale } from '@/i18n/currentLocale';
import { useAudiences } from '@/data/hooks/useAudiences';

export function PreferredAudiences() {
  const currentLocale: string = getCurrentLocale();
  const {
    loading: audiencesLoading,
    error: audiencesLoadError,
    data: audiencesData,
  } = useAudiences(currentLocale);

  console.log('PreferredAudiences GQL Loading audiencesLoading', audiencesLoading);
  console.log('PreferredAudiences GQL audiencesLoadError: ', audiencesLoadError);
  console.log('PreferredAudiences GQL audiencesData: ', audiencesData);

  const prefs: Audience[] = audiencesData;
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.audiences || []);
  }, [citizenPreferences.audiences]);
  const navigate = useNavigate();
  console.log('PreferredAudiences citizenPreferences', citizenPreferences);

  if (audiencesLoadError) {
    return <h3>{audiencesLoadError.message}</h3>;
  }
  if (audiencesLoading) {
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
    citizenPreferences.audiences = addPrefs<Audience>(citizenPreferences.audiences, selectedPrefs);
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
