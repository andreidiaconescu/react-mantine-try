// import { Title, Text, Anchor } from '@mantine/core';
import { TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import classes from './FormSearchArea.module.css';

export function FormSearchArea() {
  const icon = (
    <IconSearch style={{ width: rem(24), height: rem(24) }} stroke="1.5" color="black" />
  );

  return (
    <>
      <div className={classes.formSearchArea}>
        <TextInput
          className={classes.searchInput}
          leftSectionPointerEvents="none"
          leftSection={icon}
          placeholder="Rechercher une ville ou code postal"
        />
      </div>
    </>
  );
}
