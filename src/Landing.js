import React, { Component } from 'react';
import BlockstackContext from 'react-blockstack/dist/context';
import { BlockstackButton } from 'react-blockstack-button';

// Demonstrating BlockstackContext for legacy React Class Components.

export default class Landing extends Component {
  static contextType = BlockstackContext;
  render() {
    const { signIn } = this.context;
    return (
      <div className="Landing">
        <div className="jumbotron jumbotron-fluid pt-3 mb-0">
          <div className="container">
            <div className="panel-landing text-center mt-3">
              <h1 className="landing-heading">
                Demo App for Blockstack Legends
              </h1>
              <p className="lead">Premium features for Blockstack Legends.</p>

              <p className="alert alert-info  border-info">
                Demo App for Blockstack Legends is an{' '}
                <a
                  href="https://github.com/friedger/starter-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open source
                </a>{' '}
                project providing a minimalistic Blockstack starter app, with
                the purpose of{' '}
                <strong>
                  helping software developers like you quickly get going with
                  paid subscriptions.
                </strong>
              </p>

              <div className="card mt-4 border-info">
                <div className="card-header">
                  <h5 className="card-title">About Blockstack</h5>
                </div>
                <div className="row">
                  <div className="col col-md-6 p-4 text-right border-right">
                    <a
                      href="https://blockstack.org/about"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blockstack PBC
                    </a>{' '}
                    is a New York based public benefit corporation, creating a
                    decentralized computing network and app ecosystem designed
                    to protect digital rights including privacy and
                    data&nbsp;ownership.
                  </div>
                  <div className="col col-md-6 p-4 text-left border-left">
                    Demo App for Blockstack Legends uses JWTs to proof
                    memberships.
                  </div>
                </div>
              </div>

              <div className="card mt-4 border-info">
                <div className="card-header">
                  <h5 className="card-title">
                    Demo App for Blockstack Legends
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text mb-3 mt-4 mx-5 px-5">
                    Check out the minimalistic functionality of the demo app.
                    After signing in and authenticating with Blockstack, you can
                    enter your membership card and enjoy "premium" features.
                  </p>
                </div>

                <p className="card-link mb-5">
                  <BlockstackButton onClick={signIn} />
                </p>

                <div className="card-footer text-info">
                  <strong>Decentralized paid subscriptions for all!</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
