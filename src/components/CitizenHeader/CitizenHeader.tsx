// import { Title, Text, Anchor } from '@mantine/core';
// import { Image } from '@mantine/core';
import classes from './CitizenHeader.module.css';
import citizenHeaderImageUrl from './citizen_header.png';

export function CitizenHeader() {
  return (
    <>
      <div className={classes.citizenHeader}>
        {/* <Image radius="md" src={citizenHeaderImageUrl} h="88px" w="100%" /> */}
        <img className={classes.headerImage} alt="header" src={citizenHeaderImageUrl} />
      </div>
    </>
  ); //
}
