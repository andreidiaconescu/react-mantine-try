// import { Title, Text, Anchor } from '@mantine/core';
import { PropsWithChildren } from 'react';
import classes from './CitizenPageFrame.module.css';

export function CitizenPageFrame({ children }: PropsWithChildren) {
  return (
    <>
      <div className={classes.citizenPageFrame}>{children}</div>
    </>
  );
}
