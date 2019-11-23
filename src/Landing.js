import React, { Component } from 'react'
import BlockstackContext from 'react-blockstack/dist/context'
import { BlockstackButton } from 'react-blockstack-button'

// Demonstrating BlockstackContext in support of legacy React Class Components

export default class Landing extends Component {
  static contextType = BlockstackContext
  render () {
    const { signIn } = this.context
    return (
      <div className="panel-landing text-center mt-5">
        <h1 className="landing-heading">Hello, Blockstack!</h1>
        <p className="lead">
          <BlockstackButton onClick={ signIn }/>
        </p>
      </div>
    )
  }
}
