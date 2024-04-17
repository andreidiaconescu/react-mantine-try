import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './PreferredCulturalCreators.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenCreateProfileProgressBar } from '../components/CitizenCreateProfileProgressBar/CitizenCreateProfileProgressBar';
import { ChoosePrefsWithButtons } from '../components/ChoosePrefsWithButtons/ChoosePrefsWithButtons';
import { MockCulturalCreators } from '../data/mock/mock-cultural-creators';
import { CitizenCreateProfileNavigate } from '../components/CitizenCreateProfileNavigate/CitizenCreateProfileNavigate';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { CulturalCreatorInterface } from '@/models/CulturalCreator.interface';
import { addPref, removePref, addPrefs } from '../state/pref.state.utils';

export function PreferredCulturalCreators() {
  const prefs: CulturalCreatorInterface[] = MockCulturalCreators;
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  useEffect(() => {
    // copy preferences from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setSelectedPrefs(citizenPreferences.culturalCreators || []);
  }, [citizenPreferences.culturalCreators]);
  const navigate = useNavigate();
  console.log('PreferredCulturalCreators citizenPreferences', citizenPreferences);

  const onSelectPref = (selectedDataItem: any) => {
    addPref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };
  const onDeSelectPref = (selectedDataItem: any) => {
    removePref(selectedPrefs, selectedDataItem, setSelectedPrefs);
  };

  const onNavigate = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.culturalCreators = addPrefs<CulturalCreatorInterface>(
      citizenPreferences.culturalCreators,
      selectedPrefs
    );
    console.log(
      'PreferredCulturalCreators.onNavigateNext citizenPreferences 2',
      citizenPreferences
    );
    setCitizenPreferences(citizenPreferences);

    navigate(nextRoute);
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <CitizenCreateProfileProgressBar progressValue={80}></CitizenCreateProfileProgressBar>
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Vos artistes préférés</div>
          <div className={classes.subTitleRemark}>Étape facultative</div>
          <div className={classes.firstParagraph}>
            Sélectionnez des artistes que vous appréciez parmi les suggestions suivantes.
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
            onNavigatePrev={() => onNavigate('/citizen/create-profile/preferred-audiences')}
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
