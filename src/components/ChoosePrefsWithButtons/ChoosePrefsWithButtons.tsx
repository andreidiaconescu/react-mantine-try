// import { Title, Text, Anchor } from '@mantine/core';
import { PropsWithChildren, useState } from 'react';
import { Button, TextInput, rem } from '@mantine/core';
import { IconSearch, IconCheck } from '@tabler/icons-react';

import classesDefault from './ChoosePrefsWithButtons.module.css';
import classesStyle2 from './ChoosePrefsWithButtons.style2.module.css';
import mantineButtonStylesDefault from './mantinePrefsButton.module.css';
import mantineButtonStyles2 from './mantinePrefsButton.style2.module.css';
import { PrefsWithButtonsStyle } from './PrefsWithButtonsStyle.enum';
// import { MockArea } from '../../data/mock/mock-areas';

export function ChoosePrefsWithButtons({
  prefs,
  selectedPrefs,
  onSelectPref,
  onDeSelectPref,
  styleChoice = PrefsWithButtonsStyle.Default,
}: PropsWithChildren<{
  prefs: any[];
  selectedPrefs?: any[];
  onSelectPref?: (selectedPref: any) => any;
  onDeSelectPref?: (selectedPref: any) => any;
  searchedPref?: string;
  onChangeSearchPref?: (searchPrefChanged: string) => any;
  styleChoice?: PrefsWithButtonsStyle;
}>) {
  const [searchedPref, setSearchedPref] = useState('');
  const styleConfig = {
    mainStyle: {
      [PrefsWithButtonsStyle.Default]: classesDefault,
      [PrefsWithButtonsStyle.Style2]: classesStyle2,
    },
    mantineButtonsStyle: {
      [PrefsWithButtonsStyle.Default]: mantineButtonStylesDefault,
      [PrefsWithButtonsStyle.Style2]: mantineButtonStyles2,
    },
  };
  const classes = styleConfig.mainStyle[styleChoice];
  const mantineButtonStyles = styleConfig.mantineButtonsStyle[styleChoice];

  const isPrefSelected = (pref: any) =>
    Array.isArray(selectedPrefs) &&
    selectedPrefs.find((selPref) => pref.termCode && pref.termCode === selPref.termCode);

  const filterPrefs = (filterBy: string) => [
    ...prefs.filter((pref: any) => {
      const cPref: string = filterBy ? filterBy.trim().toLowerCase() : '';
      if (!cPref) {
        return true;
      }
      return isPrefSelected(pref) || pref.name.trim().toLowerCase().includes(cPref);
    }),
  ];
  const filteredPrefs = filterPrefs(searchedPref);

  const onChangeSearchPref = (changedSearchPref: string) => {
    setSearchedPref(`${changedSearchPref}`);
  };

  const iconSearch = (
    <IconSearch style={{ width: rem(24), height: rem(24) }} stroke="1.5" color="black" />
  );
  const iconPrefButtonSel = (
    <IconCheck style={{ width: rem(24), height: rem(24) }} stroke="1.5" color="#9BF57B" />
  );

  return (
    <>
      <div className={classes.choosePrefsWithButtons}>
        <TextInput
          className={classes.searchInput}
          leftSectionPointerEvents="none"
          leftSection={iconSearch}
          placeholder="Rechercher une ville ou code postal"
          value={searchedPref}
          onChange={(event) =>
            onChangeSearchPref ? onChangeSearchPref(event.currentTarget.value) : null
          }
        />
        <div className={classes.prefButtons}>
          {filteredPrefs.map((pref) => {
            const isItemSel: boolean = isPrefSelected(pref);
            return (
              <Button
                key={pref.termCode || pref._id}
                variant={isItemSel ? 'filled' : 'outline'}
                radius="xl"
                leftSection={isItemSel ? iconPrefButtonSel : null}
                className={classes.prefButton}
                classNames={
                  isItemSel
                    ? {
                        root: mantineButtonStyles.root_sel,
                        inner: mantineButtonStyles.inner_sel,
                        label: mantineButtonStyles.label_sel,
                      }
                    : {
                        root: mantineButtonStyles.root_not_sel,
                        inner: mantineButtonStyles.inner_not_sel,
                        label: mantineButtonStyles.label_not_sel,
                      }
                }
                onClick={() => (isItemSel ? onDeSelectPref(pref) : onSelectPref(pref))}
              >
                {pref.name}
              </Button>
            );
          })}
        </div>
        {/* <div className={classes.prefButtons}>
          {selectedPrefs.map((selPref) => (
            <Button
              key={selPref.termCode || selPref._id}
              variant="outline"
              radius="xl"
              className={classes.prefButton}
              classNames={mantineButtonStyles}
            >
              {selPref.name}
            </Button>
          ))}
        </div> */}
      </div>
    </>
  );
}
