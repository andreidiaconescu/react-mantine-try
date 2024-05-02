import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, NavLink, TextInput } from '@mantine/core';
import classes from './CitizenCreateProfileChooseEmail.module.css';

import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { EmailPartlyHidden } from '@/components/EmailPartlyHidden/EmailPartlyHidden';
import { useCitizenRegister } from '@/data/hooks/useCitizenRegister';
import { getCurrentLocale } from '@/i18n/currentLocale';
import { getBaseUrl } from '@/utils';

export function CitizenCreateProfileChooseEmail() {
  const locale = getCurrentLocale();
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  const [registerEmail, setRegisterEmail] = useState('adiaconescu@jems-group.com');
  useEffect(() => {
    // copy registerEmail from higher level state (in CitizenCreateProfile component) to local state, if they changed in the high level state
    setRegisterEmail(citizenPreferences.registerEmail || registerEmail);
    setAcceptUseExistingEmail(citizenPreferences.acceptUseExistingEmail || acceptUseExistingEmail);
  }, [citizenPreferences.registerEmail]);
  const navigate = useNavigate();
  console.log('CitizenCreateProfileChooseEmail citizenPreferences', citizenPreferences);
  const [acceptUseExistingEmail, setAcceptUseExistingEmail] = useState(false);
  const [showEnterOtherEmail, setshowEnterOtherEmail] = useState(false);
  const [otherRegisterEmailIsValid, setOtherRegisterEmailIsValid] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onNavigate = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.registerEmail = registerEmail;
    citizenPreferences.acceptUseExistingEmail = acceptUseExistingEmail;
    console.log(
      'CitizenCreateProfileChooseEmail.onNavigateNext citizenPreferences 2',
      citizenPreferences
    );
    setCitizenPreferences(citizenPreferences);

    navigate(nextRoute);
  };

  const onChangeAcceptUseExistingEmail = () => {
    setAcceptUseExistingEmail(!acceptUseExistingEmail);
  };

  const butonOnClickUseOtherEmail = () => {
    setshowEnterOtherEmail(true);
  };

  const {
    loading: submitProfileResLoading,
    error: submitProfileResError,
    data: submitProfileResData,
    runMutation: submitProfileRunMutation,
  } = useCitizenRegister(locale, `${getBaseUrl()}/citizen/create-profile/activate-citizen`);

  const onClickSubmitProfile = async () => {
    const runMutationRes = await submitProfileRunMutation({
      variables: { citizenEmail: registerEmail, locale },
    });
    console.log(
      'CitizenCreateProfileChooseEmail onClickSubmitProfile runMutationRes',
      runMutationRes
    );
    console.log(
      'CitizenCreateProfileChooseEmail onClickSubmitProfile submitProfileResData',
      submitProfileResData
    );
    onNavigate('/citizen/create-profile/share-profile-with-operator');
  };

  const onChangeOtherEmail = (event: any) => {
    console.log('CitizenCreateProfileChooseEmail onChangeOtherEmail event', event);
    setRegisterEmail(event.target.value);

    const validateEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailIsValid = validateEmailRegex.test(event.target.value);
    console.log('CitizenCreateProfileChooseEmail onChangeOtherEmail emailIsValid', emailIsValid);
    setOtherRegisterEmailIsValid(emailIsValid);
  };

  console.log('CitizenCreateProfileChooseEmail submitProfileResLoading', submitProfileResLoading);
  console.log('CitizenCreateProfileChooseEmail submitProfileResError', submitProfileResError);
  console.log('CitizenCreateProfileChooseEmail submitProfileResData', submitProfileResData);

  if (submitProfileResLoading) {
    return <h3>Submitting Profile ...</h3>;
  }
  if (submitProfileResError) {
    return <h3>Error Submitting Profile ...</h3>;
  }

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <div className={classes.pageContent}>
          <div className={classes.contentTitle}>Création de votre profil Dcouvr</div>
          <div className={classes.firstParagraph}>
            Vous êtes sur le point de créer un profil, souhaitez vous utiliser l’adresse e-mail de
            votre compte Le Soir :
          </div>
          {showEnterOtherEmail && (
            <TextInput
              label="Use Other email"
              placeholder="Enter other email"
              onChange={(event) => {
                onChangeOtherEmail(event);
              }}
              value={registerEmail}
            />
          )}
          {!showEnterOtherEmail && (
            <>
              <EmailPartlyHidden email={registerEmail} />
              <Checkbox
                label="J'accepte d’utiliser cette adresse e-mail pour créer mon profil Dcouvr."
                color="#495057"
                className={classes.checkboxUseExistingEmailToRegister}
                onChange={onChangeAcceptUseExistingEmail}
                checked={acceptUseExistingEmail}
              />
            </>
          )}
          <Button
            variant="filled"
            className={classes.submitProfileButton}
            disabled={!(acceptUseExistingEmail || otherRegisterEmailIsValid)}
            classNames={{
              root: classes.but_submit_profile_sel_root,
              label: classes.but_submit_profile_sel_label,
            }}
            onClick={() => {
              onClickSubmitProfile();
            }}
          >
            Créer mon profil
          </Button>
          {!showEnterOtherEmail && (
            <NavLink
              label="Utiliser un autre email"
              classNames={{
                root: classes.nav_link_use_other_email_root,
                label: classes.nav_link_use_other_email_label,
                body: classes.nav_link_use_other_email_body,
              }}
              onClick={butonOnClickUseOtherEmail}
            />
          )}
        </div>
      </CitizenPageFrame>
    </>
  );
}
