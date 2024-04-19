// import { Title, Text, Anchor } from '@mantine/core';
import { PropsWithChildren } from 'react';
import classes from './EmailPartlyHidden.module.css';

export function EmailPartlyHidden({ email }: PropsWithChildren<{ email: string }>) {
  const emailPartBeforeAt: string = email.split('@')[0];
  const nbrCharsToHide = Math.ceil(0.6 * emailPartBeforeAt.length);
  const mask: string = Array.from('*'.repeat(nbrCharsToHide)).join('');
  const emailHidden = email.replace(new RegExp(`.{${nbrCharsToHide}}@`), `${mask}@`);
  return (
    <>
      <div className={classes.emailPartlyHidden}>
        <div className={classes.emailHolder}>{emailHidden}</div>
      </div>
    </>
  );
}
