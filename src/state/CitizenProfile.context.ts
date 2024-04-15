import React from 'react';

import { CitizenProfilePreferences } from '@/models/CitizenProfilePreferences';

export class CitizenProfileContextData {
  citizenPreferences: CitizenProfilePreferences;
  setCitizenPreferences: (preferences: CitizenProfilePreferences) => any;
}

export const CitizenProfileContext = React.createContext<CitizenProfileContextData>({
  // only DEFAULT values, not used
  citizenPreferences: {},
  setCitizenPreferences: (preferences: CitizenProfilePreferences): any => preferences,
});
