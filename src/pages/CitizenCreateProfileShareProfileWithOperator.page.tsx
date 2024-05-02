import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox } from '@mantine/core';
import classes from './CitizenCreateProfileShareProfileWithOperator.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { useCitizenAddOperatorAccess } from '@/data/hooks/useCitizenAddOperatorAccess';

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

  const {
    loading: submitResLoading,
    error: submitResError,
    data: submitResData,
    runMutation: submitRunMutation,
  } = useCitizenAddOperatorAccess();
  console.log('CitizenCreateProfileShareProfileWithOperator submitResLoading', submitResLoading);
  console.log('CitizenCreateProfileShareProfileWithOperator submitResError', submitResError);
  console.log('CitizenCreateProfileShareProfileWithOperator submitResData', submitResData);

  const onSubmit = async () => {
    if (acceptShareProfileWithOperator) {
      await submitRunMutation({
        variables: {
          operatorAccess: [citizenPreferences.initialOperatorId],
          activationCode: citizenPreferences.activationCode,
        },
      });
    }
    onNavigate('/citizen/create-profile/activate-account-email-sent');
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Création de votre profil Dcouvr</div>
          <div className={classes.firstParagraph}>
            Profitez d’une expérience personnalisée en partageant vos préférence Dcouvr avecLe Soir
            <span className={classes.legendAsterisk}>*</span>
          </div>
          <Checkbox
            label="J'autorise le site Le Soir à importer mes préférences Dcouvr afin de me recommander articles et contenus culturels sur Lesoir.be"
            color="#495057"
            className={classes.checkboxAcceptShareProfileWithOperator}
            onChange={onChangeAcceptShareProfileWithOperator}
            checked={acceptShareProfileWithOperator}
          />
          <div className={classes.legend}>
            <span className={classes.legendAsterisk}>*</span> Si vous ne donnez pas l’autorisation
            d’importation de vos préférences, le service Dcouvr ne sera pas opérationnel.
          </div>
          <Button
            variant="filled"
            className={classes.submitProfileButton}
            classNames={{
              root: classes.but_submit_profile_sel_root,
              label: classes.but_submit_profile_sel_label,
            }}
            onClick={() => {
              onSubmit();
            }}
          >
            Valider
          </Button>
        </div>
      </CitizenPageFrame>
    </>
  );
}
