import React from 'react';

export const ShortSavedMoviesContext = React.createContext({
    savedState: true,
    toggleSavedCheckbox: () => {},
});
