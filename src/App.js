import React from 'react';
import { useBlockstack } from 'react-blockstack';
import { Blockstack } from 'react-blockstack/dist/context';
import Main from './Main.js';
import Landing from './Landing.js';

export default function App() {
  const { person, signIn, userData } = useBlockstack();
  return (
    <Blockstack>
      {signIn && <Landing />}
      {person && <Main person={person} username={userData.username} />}
    </Blockstack>
  );
}
