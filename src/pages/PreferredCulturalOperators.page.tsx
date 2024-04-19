import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredCulturalOperators.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { MockCulturalOperators } from '../data/mock/mock-cultural-operators';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { CulturalOperatorInterface } from '@/models/CulturalOperator.interface';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';

export function PreferredCulturalOperators() {
  const prefs: CulturalOperatorInterface[] = MockCulturalOperators;
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.culturalOperators || []);
  }, [citizenPreferences.culturalOperators]);
  const navigate = useNavigate();
  console.log('PreferredCulturalOperators citizenPreferences', citizenPreferences);

  const onSelectPref = (selectedDataItem: any) => {
    addPref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };
  const onDeSelectPref = (selectedDataItem: any) => {
    removePref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };

  const onNavigate = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.culturalOperators = addPrefs<CulturalOperatorInterface>(
      citizenPreferences.culturalOperators,
      selectedPrefs
    );
    console.log(
      'PreferredCulturalOperators.onNavigateNext citizenPreferences 2',
      citizenPreferences
    );
    setCitizenPreferences(citizenPreferences);

    navigate(nextRoute);
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <CitizenCreateProfileProgressBar progressValue={90}></CitizenCreateProfileProgressBar>
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Vos lieux culturels favoris</div>
          <div className={classes.subTitleRemark}>Étape facultative</div>
          <div className={classes.firstParagraph}>
            Sélectionnez des lieux culturels ou événements qui vous tiennent à cœur parmi les
            suggestions suivantes.
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
            onNavigatePrev={() => onNavigate('/citizen/create-profile/preferred-cultural-creators')}
            onNavigateNext={() => onNavigate('/citizen/create-profile/choose-email')}
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
