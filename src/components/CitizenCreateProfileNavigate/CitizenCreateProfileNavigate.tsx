// import { Title, Text, Anchor } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { ActionIcon, rem } from '@mantine/core';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import classes from './CitizenCreateProfileNavigate.module.css';

export function CitizenCreateProfileNavigate({
  next = true,
  previous = false,
  onNavigateNext,
  onNavigatePrev,
}: PropsWithChildren<{
  next?: boolean;
  previous?: boolean;
  onNavigateNext?: () => any;
  onNavigatePrev?: () => any;
}>) {
  const iconArrowRight = (
    <IconArrowRight style={{ width: rem(29), height: rem(29) }} stroke="1.5" color="#ffffff" />
  );
  const iconArrowLeft = (
    <IconArrowLeft style={{ width: rem(29), height: rem(29) }} stroke="1.5" color="#ffffff" />
  );

  const onLocalNavNext = () => {
    onNavigateNext();
  };

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
              onClick={() => onNavigatePrev()}
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
              onClick={() => onLocalNavNext()}
            >
              {iconArrowRight}
            </ActionIcon>
          )}
        </div>
      </div>
    </>
  ); //
}
