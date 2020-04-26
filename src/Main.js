import React, { useRef } from 'react';
import { useFile, useBlockstack } from 'react-blockstack';
import Profile from './Profile';
import {
  makeSTXTokenTransfer,
  TransactionVersion,
  ChainID,
  FungibleConditionCode,
} from '@blockstack/stacks-transactions';
import { makeStandardSTXPostCondition } from '@blockstack/stacks-transactions/lib/src/builders';
const BigNum = require('bn.js');

function NoteField({ title, path, placeholder }) {
  const { userSession } = useBlockstack();
  const [note, setNote] = useFile(path);
  const textfield = useRef();
  const nonceField = useRef();
  const spinner = useRef();
  const saveAction = async () => {
    spinner.current.classList.remove('d-none');
    const recipient = await userSession
      .getFile('stx.json', {
        decrypt: false,
        username: textfield.current.value,
      })
      .then(r => JSON.parse(r))
      .catch(e => console.log(e));
    console.log(recipient.address);

    const transaction = makeSTXTokenTransfer(
      'ST1T220B88WSF0ZYNS8V7B33DCZEY23FY7V83GDW',
      new BigNum(1000),
      new BigNum(1000),
      '994d526b3b3409def4d3e481f9c4b3debaf9535cffed0769a7543601e1efa3c501',
      {
        nonce: new BigNum(0),
        version: TransactionVersion.Testnet,
        chainId: ChainID.Testnet,
        postConditions: [
          makeStandardSTXPostCondition(
            'ST2P4S7Q4PHGQE9VGG6X8Z54MQQMN1E5047ZHVAF7',
            FungibleConditionCode.Less,
            new BigNum(2000)
          ),
        ],
      }
    );
    console.log(transaction.serialize().toString('hex'));

    setNote(textfield.current.value);
    setTimeout(() => spinner.current.classList.add('d-none'), 1500);
  };
  return (
    <div>
      Nonce:
      <input
        type="number"
        ref={nonceField}
        className="form-control"
        defaultValue={'0'}
      />
      <div className="NoteField input-group ">
        <div className="input-group-prepend">
          <span className="input-group-text">{title}</span>
        </div>
        <input
          type="text"
          ref={textfield}
          className="form-control"
          disabled={note === undefined}
          defaultValue={note || ''}
          placeholder={placeholder}
          onKeyUp={e => {
            if (e.key === 'Enter') saveAction();
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            disabled={!setNote}
            onClick={saveAction}
          >
            <div
              ref={spinner}
              role="status"
              className="d-none spinner-border spinner-border-sm text-info align-text-top mr-2"
            />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Main(props) {
  return (
    <main className="panel-welcome mt-5">
      <div className="row">
        <div className="mx-auto col-sm-10 col-md-8 px-4">
          <Profile />
        </div>
      </div>
      <div className="lead row mt-5">
        <div className="mx-auto col col-sm-10 col-md-8 px-4">
          <NoteField
            title="Send 1000 STX to"
            path="note"
            placeholder="username"
          />
        </div>

        <div className="card col col-sm-10 col-md-8 mx-auto mt-5 text-center px-0 border-warning">
          <div className="card-header">
            <h5 className="card-title">Instructions</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Type any text in the field above.
            </li>
            <li className="list-group-item">
              Press the <i>Enter</i> key or click the <i>Save</i> button to
              store the note.
            </li>
            <li className="list-group-item">
              Reload the page to confirm that the text is retained.
            </li>
          </ul>
        </div>
        <div className="alert alert-warning text-center col col-sm-10 col-md-8 mt-3 mx-auto px-5">
          <h5>Next Step</h5>
          <p>
            Log out to get back to the Landing page where you can deploy your
            own clone of&nbsp;this&nbsp;app as a starting point for your own
            Blockstack apps.
          </p>
        </div>
      </div>
    </main>
  );
}
