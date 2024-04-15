// import { Title, Text, Anchor } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { Progress } from '@mantine/core';

import classes from './CitizenCreateProfileProgressBar.module.css';
import profileCompletePresentUrl from './profile_complete_present.svg';

export function CitizenCreateProfileProgressBar({
  progressValue = 10,
}: PropsWithChildren<{ progressValue: number }>) {
  return (
    <>
      <div className={classes.citizenCreateProfileProgressBar}>
        <div className={classes.firstRow}>
          <div className={classes.presentBox}>
            <img alt="profile Complete Present box" src={profileCompletePresentUrl} />
          </div>
          <div className={classes.presentDescription}>
            Votre cadeau sera disponible en fin d`inscription
          </div>
        </div>
        <div className={classes.secondRow}>
          <div className={classes.percentNumber}>{progressValue}%</div>
          <div className={classes.percentLine}>
            <Progress size="4" radius="2" value={progressValue} color="#33CCCC" />
          </div>
        </div>
      </div>
    </>
  ); //
}
