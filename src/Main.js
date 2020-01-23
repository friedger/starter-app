import React, { useRef, useState } from 'react';
import { useFile } from 'react-blockstack';
import { verifyProfileToken } from 'blockstack';

const avatarFallbackImage =
  'https://s3.amazonaws.com/onename/avatar-placeholder.png';

function Profile({ person }) {
  const proxyUrl = url => '/proxy/' + url.replace(/^https?\:\/\//i, '');
  return (
    <div className="Profile">
      <div className="avatar-section text-center">
        <img
          src={proxyUrl((person && person.avatarUrl()) || avatarFallbackImage)}
          className="img-rounded avatar"
          id="avatar-image"
          alt="Avatar"
        />
      </div>
      <h1 className="text-center mt-2">
        Hello,{' '}
        <span id="heading-name">
          {(person && person.name()) || 'App Developer'}
        </span>
        !
      </h1>
    </div>
  );
}

const clubPublicKey =
  '023055040a2662b9cbd62ef7062afc12e7283a32a6ab4a2b1ab2e8c9e33ce43ccb';

function NoteField({ title, path, placeholder, username }) {
  const [note, setNote] = useFile(path);
  const textfield = useRef();
  const spinner = useRef();
  const [error, setError] = useState();
  const [membership, setMembership] = useState();
  const saveAction = () => {
    spinner.current.classList.remove('d-none');
    const url = textfield.current.value;
    setNote(url);
    fetch(url)
      .then(response => response.text())
      .then(receiptContent => {
        var receipt;
        try {
          receipt = verifyProfileToken(receiptContent, clubPublicKey);
          const member = receipt.payload.subject.username;
          if (member === username) {
            setMembership(receipt);
          } else {
            if (member) {
              setError(`Member card is not for you but for ${member}`);
            } else {
              setError(`Not a Blockstack Legend membership card`);
            }
          }
          spinner.current.classList.add('d-none');
        } catch (e) {
          setError(e);
          spinner.current.classList.add('d-none');
          return;
        }
      });
    setTimeout(() => spinner.current.classList.add('d-none'), 1500);
  };
  return (
    <>
      {error && <>{error.toString()}</>}
      {membership && (
        <>Hi, as a Blockstack Legend you can use all premium features!</>
      )}
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
    </>
  );
}

export default function Main({ person, username }) {
  return (
    <main className="panel-welcome mt-5">
      <div className="row">
        <div className="mx-auto col-sm-10 col-md-8 px-4">
          <Profile person={person} />
        </div>
      </div>
      <div className="lead row mt-5">
        <div className="mx-auto col col-sm-10 col-md-8 px-4">
          <NoteField
            title="Club Card"
            path="note"
            placeholder="https://..."
            username={username}
          />
        </div>

        <div className="card col col-sm-10 col-md-8 mx-auto mt-5 text-center px-0 border-warning">
          <div className="card-header">
            <h5 className="card-title">Instructions</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Enter your <b>Blockstack Legends</b> club card above.
            </li>
            <li class="list-group-item">
              Press the <i>Enter</i> key or click the <i>Save</i> button to
              store the note.
            </li>
            <li class="list-group-item">
              Reload the page to confirm that the text is retained.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
