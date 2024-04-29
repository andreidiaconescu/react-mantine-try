import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import classes from './CitizenActivate.module.css';
import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';

export function CitizenActivate() {
  const [activationStarted, setActivationStarted] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams({
    citizenEmail: null,
    citizenActivationCode: null,
  });

  const citizenEmail = searchParams.get('citizenEmail');
  const citizenActivationCode = searchParams.get('citizenActivationCode');
  console.log('CitizenActivate citizenEmail', citizenEmail);
  console.log('CitizenActivate citizenActivationCode', citizenActivationCode);

  if (!citizenEmail) {
    return 'Error: citizenEmail not provided';
  }
  if (!citizenActivationCode) {
    return 'Error: citizenActivationCode not provided';
  }

  const ACTIVATE_CITIZEN = gql`
    mutation citizenActivate($citizenEmail: String!, $citizenActivationCode: String!) {
      citizenActivate(email: $citizenEmail, code: $citizenActivationCode)
    }
  `;
  const [activateCitizen, { data, loading, error }] = useMutation(ACTIVATE_CITIZEN);

  console.log('CitizenActivate data', data);
  console.log('CitizenActivate loading', loading);
  console.log('CitizenActivate error', error);

  if (loading) {
    return 'Submitting...';
  }
  if (error) {
    return `Submission error! ${error.message}`;
  }

  if (!activationStarted) {
    activateCitizen({ variables: { citizenEmail, citizenActivationCode } });
    setActivationStarted(true);
  }

  const activationResultIsOk = () => data && data.citizenActivate && data.citizenActivate.length();

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <div className={classes.pageContent}>
          {activationResultIsOk && <h3>Redirecting after Citizen activation</h3>}
          {!activationResultIsOk && (
            <div>
              <div className={classes.contentTitle}>Activating account</div>
              <div className={classes.firstParagraph}>Please wait ...</div>
            </div>
          )}
        </div>
      </CitizenPageFrame>
    </>
  );
}
