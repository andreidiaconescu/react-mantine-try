// import { Title, Text, Anchor } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { ActionIcon, rem } from '@mantine/core';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import classes from './CitizenCreateProfileNavigate.module.css';

export function CitizenCreateProfileNavigate({
  next = true,
  previous = false,
}: PropsWithChildren<{ next?: boolean; previous?: boolean }>) {
  const iconArrowRight = (
    <IconArrowRight style={{ width: rem(29), height: rem(29) }} stroke="1.5" color="#ffffff" />
  );
  const iconArrowLeft = (
    <IconArrowLeft style={{ width: rem(29), height: rem(29) }} stroke="1.5" color="#ffffff" />
  );

  return (
    <>
      <div className={classes.citizenCreateProfileNavigate}>
        <div className={classes.navigationHolder}>
          {previous && (
            <ActionIcon
              variant="filled"
              radius="xl"
              size={rem(56)}
              // leftSection={isItemSel ? iconPrefButtonSel : null}
              className={classes.goNextButton}
              classNames={{
                root: classes.nav_button_root,
                icon: classes.nav_button_icon,
              }}
              // onClick={() => onSelectPref(pref)}
            >
              {iconArrowLeft}
            </ActionIcon>
          )}
          <div className={classes.navCenter}>&nbsp;</div>
          {next && (
            <ActionIcon
              variant="filled"
              radius="xl"
              size={rem(56)}
              // leftSection={isItemSel ? iconPrefButtonSel : null}
              className={classes.goNextButton}
              classNames={{
                root: classes.nav_button_root,
                icon: classes.nav_button_icon,
              }}
              // onClick={() => onSelectPref(pref)}
            >
              {iconArrowRight}
            </ActionIcon>
          )}
        </div>
      </div>
    </>
  ); //
}
