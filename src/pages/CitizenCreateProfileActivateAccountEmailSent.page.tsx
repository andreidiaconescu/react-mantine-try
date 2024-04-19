import { useContext } from 'react';
import { NavLink } from '@mantine/core';

import classes from './CitizenCreateProfileActivateAccountEmailSent.module.css';
import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import emailActivateAccountHeadImageUrl from './emailActivateAccountHeadImage.png';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';

export function CitizenCreateProfileActivateAccountEmailSent() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  console.log(
    'CitizenCreateProfileActivateAccountEmailSent citizenPreferences',
    citizenPreferences
  );

  const onClickLinkResendEmail = () => {
    console.log('CitizenCreateProfileActivateAccountEmailSent onClickLinkResendEmail');
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <div className={classes.pageContent}>
          <div className={classes.headImage}>
            <img
              className={classes.emailActivateAccountHeadImage}
              src={emailActivateAccountHeadImageUrl}
              alt="decoration only"
            />
          </div>
          <div className={classes.contentTitle}>Vous y êtes presque !</div>
          <div className={classes.firstParagraph}>
            Un lien pour activer votre compte Dcouvr vous a été envoyé par e-mail.
          </div>
          <div className={classes.secondParagraph}>
            Si vous ne le trouvez pas, pensez à vérifier vos spams.
          </div>
          <div className={classes.thirdParagraph}>
            Vous n’avez pas reçu d’e-mail ?<div className={classes.linkResendEmail}></div>
            <NavLink
              label="Renvoyer à nouveau"
              classNames={{
                root: classes.linkResendEmail_root,
                label: classes.linkResendEmail_label,
                body: classes.linkResendEmail_body,
              }}
              onClick={onClickLinkResendEmail}
            />
          </div>
        </div>
      </CitizenPageFrame>
    </>
  );
}
