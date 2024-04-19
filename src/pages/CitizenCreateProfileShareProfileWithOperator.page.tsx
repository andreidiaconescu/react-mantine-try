import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox } from '@mantine/core';
import classes from './CitizenCreateProfileShareProfileWithOperator.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';

export function CitizenCreateProfileShareProfileWithOperator() {
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  const [acceptShareProfileWithOperator, setCitizenAcceptShareProfileWithOperator] =
    useState(false);
  useEffect(() => {
    // copy registerEmail from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setCitizenAcceptShareProfileWithOperator(
      citizenPreferences.acceptShareProfileWithOperator || acceptShareProfileWithOperator
    );
  }, [citizenPreferences.acceptShareProfileWithOperator]);
  const navigate = useNavigate();
  console.log(
    'CitizenCreateProfileShareProfileWithOperator citizenPreferences',
    citizenPreferences
  );

  const onNavigate = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.acceptShareProfileWithOperator = acceptShareProfileWithOperator;
    console.log(
      'CitizenCreateProfileShareProfileWithOperator.onNavigateNext citizenPreferences 2',
      citizenPreferences
    );
    setCitizenPreferences(citizenPreferences);

    navigate(nextRoute);
  };

  const onChangeAcceptShareProfileWithOperator = () => {
    setCitizenAcceptShareProfileWithOperator(!acceptShareProfileWithOperator);
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Création de votre profil Dcouvr</div>
          <div className={classes.firstParagraph}>
            Profitez d’une expérience personnalisée en partageant vos préférence Dcouvr avecLe Soir
            *
          </div>
          <Checkbox
            label="J'autorise le site Le Soir à importer mes préférences Dcouvr afin de me recommander articles et contenus culturels sur Lesoir.be"
            color="#495057"
            className={classes.checkboxAcceptShareProfileWithOperator}
            onChange={onChangeAcceptShareProfileWithOperator}
            checked={acceptShareProfileWithOperator}
          />
          <Button
            variant="filled"
            className={classes.submitProfileButton}
            classNames={{
              root: classes.but_submit_profile_sel_root,
              label: classes.but_submit_profile_sel_label,
            }}
            onClick={() => {
              onNavigate('/citizen/create-profile/share-profile-with-operator');
            }}
          >
            Valider
          </Button>
        </div>
      </CitizenPageFrame>
    </>
  );
}
