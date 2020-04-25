import React from 'react';
import { useBlockstack } from 'react-blockstack';
import { Blockstack } from 'react-blockstack/dist/context';
import Main from './Main.js';
import Landing from './Landing.js';
import { configure, User } from 'radiks';

export default function App(props) {
  const { person, signIn, signOut, userSession } = useBlockstack();
  if (userSession) {
    configure({
      apiServer: 'http://localhost:1260',
      userSession,
    });
    if (signOut) {
      User.createWithCurrentUser().then(user => {
        console.log(user);
      });
    }
  }
  return (
    <Blockstack>
      {signIn && <Landing />}
      {person && <Main person={person} />}
    </Blockstack>
  );
}
