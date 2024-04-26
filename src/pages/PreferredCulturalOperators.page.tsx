import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredCulturalOperators.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { CulturalOperator } from '@/models/CulturalOperator';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';
import { useCulturalOperators } from '@/data/hooks/useCulturalOperators';

export function PreferredCulturalOperators() {
  const {
    loading: culturalOperatorsLoading,
    error: culturalOperatorsLoadError,
    data: culturalOperatorsData,
  } = useCulturalOperators();

  console.log(
    'PreferredCulturalOperators GQL Loading culturalOperatorsLoading',
    culturalOperatorsLoading
  );
  console.log(
    'PreferredCulturalOperators GQL culturalOperatorsLoadError: ',
    culturalOperatorsLoadError
  );
  console.log('PreferredCulturalOperators GQL culturalOperatorsData: ', culturalOperatorsData);

  const prefs: CulturalOperator[] = culturalOperatorsData;
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.culturalOperators || []);
  }, [citizenPreferences.culturalOperators]);
  const navigate = useNavigate();
  console.log('PreferredCulturalOperators citizenPreferences', citizenPreferences);

  if (culturalOperatorsLoadError) {
    return <h3>{culturalOperatorsLoadError.message}</h3>;
  }
  if (culturalOperatorsLoading) {
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
    citizenPreferences.culturalOperators = addPrefs<CulturalOperator>(
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
