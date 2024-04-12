// import { Title, Text, Anchor } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { Button, TextInput, rem } from '@mantine/core';
import { IconSearch, IconCheck } from '@tabler/icons-react';

import classes from './ChoosePrefsWithButtons.module.css';
import mantineButtonStyles from './mantinePrefsButton.module.css';
// import { MockArea } from '../../data/mock/mock-areas';

export function ChoosePrefsWithButtons({
  dataItems,
  selectedDataItems,
  onSelectDataItem,
  searchedPref,
  onChangeSearchPref,
}: PropsWithChildren<{
  dataItems: any[];
  selectedDataItems?: any[];
  onSelectDataItem?: (selectedDataItem: any) => any;
  searchedPref?: string;
  onChangeSearchPref?: (searchPrefChanged: string) => any;
}>) {
  console.log('ChoosePrefsWithButtons dataItems', dataItems);
  const iconSearch = (
    <IconSearch style={{ width: rem(24), height: rem(24) }} stroke="1.5" color="black" />
  );
  const iconPrefButtonSel = (
    <IconCheck style={{ width: rem(24), height: rem(24) }} stroke="1.5" color="#9BF57B" />
  );
  const isDataItemSelected = (dataItem: any) =>
    Array.isArray(selectedDataItems) &&
    selectedDataItems.find(
      (selDataItem) => dataItem.termCode && dataItem.termCode === selDataItem.termCode
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
          {dataItems.map((dataItem) => {
            const isItemSel: boolean = isDataItemSelected(dataItem);
            return (
              <Button
                key={dataItem.termCode || dataItem._id}
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
                onClick={() => onSelectDataItem(dataItem)}
              >
                {dataItem.name}
              </Button>
            );
          })}
          {/* <Button
            variant="outline"
            radius="xl"
            className={classes.prefButton}
            classNames={mantineButtonStyles}
          >
            Button 1 serfg ewrg weg wertgh getryh wergw erth wwerfq ert werf qwert e tyuktyujrt
          </Button> */}
        </div>
        <div className={classes.prefButtons}>
          {selectedDataItems.map((selDataItem) => (
            <Button
              key={selDataItem.termCode || selDataItem._id}
              variant="outline"
              radius="xl"
              className={classes.prefButton}
              classNames={mantineButtonStyles}
            >
              {selDataItem.name}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
