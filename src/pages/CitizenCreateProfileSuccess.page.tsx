import { useContext } from 'react';

import { TextInput, rem } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';

import classes from './CitizenCreateProfileSuccess.module.css';
import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import citizenAccountActivatedPresentUrl from './CitizenAccountActivatedPresent.png';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';

export function CitizenCreateProfileSuccess() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  console.log('CitizenCreateProfileSuccess citizenPreferences', citizenPreferences);

  const iconCopy = (
    <IconCopy style={{ width: rem(24), height: rem(24) }} stroke="1.5" color="black" />
  );

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <div className={classes.pageContent}>
          <div className={classes.headImage}>
            <img
              className={classes.citizenRegisterSuccessTopImg}
              src={citizenAccountActivatedPresentUrl}
              alt="decoration only"
            />
          </div>
          <div className={classes.contentTitle}>Profil créé avec succès !</div>
          <div className={classes.firstParagraph}>
            Liez l’ensemble de vos médias à votre compte Dcouvr pour profiter au maximum de votre
            personnalisation de contenu.
          </div>
          <div className={classes.secondParagraph}>
            Votre cadeau exclusif :{' '}
            <span className={classes.highlightPriceReduction}>
              5% de réduction chez nos partenaires
            </span>
            . Le code de réduction vous a également été envoyé sur votre adresse e-mail.
          </div>
          <TextInput
            className={classes.reductionCodeInput}
            rightSectionPointerEvents="none"
            rightSection={iconCopy}
            placeholder="Rechercher une ville ou code postal"
            value="6J53-FNGD-XCD7-C3GV"
            readOnly
          />
        </div>
      </CitizenPageFrame>
    </>
  );
}
