import React from 'react';
const user = { id: 12, name: 'Leonardo' };
export const UserContext = React.createContext({ ...user });