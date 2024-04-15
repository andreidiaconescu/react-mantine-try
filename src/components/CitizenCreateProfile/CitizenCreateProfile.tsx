// import { Title, Text, Anchor } from '@mantine/core';
// import { PropsWithChildren } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import classes from './CitizenCreateProfile.module.css';
// import { CitizenProfileState } from '@/state/CitizenProfile.context';
import { CitizenProfileContext } from '../../state/CitizenProfile.context';
import { CitizenProfilePreferences } from '@/models/CitizenProfilePreferences';

export function CitizenCreateProfile() {
  const [citizenPreferences, setCitizenPreferences] = useState(new CitizenProfilePreferences());
  console.log('CitizenCreateProfile citizenPreferences', citizenPreferences);

  return (
    <>
      <div className={classes.CitizenCreateProfile}>
        in CitizenCreateProfile
        <CitizenProfileContext.Provider value={{ citizenPreferences, setCitizenPreferences }}>
          <Outlet />
        </CitizenProfileContext.Provider>
      </div>
      {/* <Outlet context={{ user } satisfies ContextType} /> */}
    </>
  );
}
