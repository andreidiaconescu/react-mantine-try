// import { Title, Text, Anchor } from '@mantine/core';
import { Button, TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import classes from './ChoosePrefsWithButtons.module.css';
import mantineButtonStyles from './mantinePrefsButton.module.css';
import { MockAreas, MockArea } from '../../data/mock/mock-areas';

export function ChoosePrefsWithButtons() {
  const icon = (
    <IconSearch style={{ width: rem(24), height: rem(24) }} stroke="1.5" color="black" />
  );
  const areas: MockArea[] = MockAreas;

  return (
    <>
      <div className={classes.choosePrefsWithButtons}>
        <TextInput
          className={classes.searchInput}
          leftSectionPointerEvents="none"
          leftSection={icon}
          placeholder="Rechercher une ville ou code postal"
        />
        <div className={classes.prefButtons}>
          {areas.map((area) => (
            <Button
              variant="outline"
              radius="xl"
              className={classes.prefButton}
              classNames={mantineButtonStyles}
            >
              {area.name}
            </Button>
          ))}
          {/* <Button
            variant="outline"
            radius="xl"
            className={classes.prefButton}
            classNames={mantineButtonStyles}
          >
            Button 1 serfg ewrg weg wertgh getryh wergw erth wwerfq ert werf qwert e tyuktyujrt
          </Button> */}
        </div>
      </div>
    </>
  );
}
