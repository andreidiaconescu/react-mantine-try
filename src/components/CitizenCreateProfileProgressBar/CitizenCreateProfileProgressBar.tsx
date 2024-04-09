// import { Title, Text, Anchor } from '@mantine/core';
import { Progress } from '@mantine/core';

import classes from './CitizenCreateProfileProgressBar.module.css';
import profileCompletePresentUrl from './profile_complete_present.svg';

export function CitizenCreateProfileProgressBar() {
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
          <div className={classes.percentNumber}>10%</div>
          <div className={classes.percentLine}>
            <Progress size="4" radius="2" value={20} color="#33CCCC" />
          </div>
        </div>
      </div>
    </>
  ); //
}
