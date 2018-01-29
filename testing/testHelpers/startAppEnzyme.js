import React from 'react'
import { mount, configure } from 'enzyme'
import { ApolloClient } from 'apollo-client'
import { EnzymeDriver } from './EnzymeDriver'
import { createTheBrainStore, createHistory } from '../../client/src/store'
import { ApolloProvider } from 'react-apollo'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const storage = {}
global.localStorage = {
  setItem (key, value) {
    storage[key] = value
  },
  getItem (key) {
    return storage[key]
  },
  removeItem (key) {
    return delete storage[key]
  }
}

// This will be needed when we move to React16
// class ErrorBoundary extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {hasError: false}
//   }
//
//   componentDidCatch (error, info) {
//     // Display fallback UI
//     this.setState({hasError: true})
//     // You can also log the error to an error reporting service
//     console.log(error, info)
//   }
//
//   render () {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       // return <h1>Something went wrong.</h1>;
//     }
//     return this.props.children
//   }
// }

const startAppEnzyme = (path, networkInterface) => {
  const history = createHistory()
  history.push(path)

// //This and attachTo Div we do only because we have some jQuery code that runs outside of react
//   const div = document.createElement('div');
//   document.body.appendChild(div);
  const MainContainer = require('../../client/src/components/MainContainer').default

  const client = new ApolloClient({networkInterface})

  const wrapper = mount(
    <ApolloProvider client={client} store={createTheBrainStore(history)}><MainContainer history={history} /></ApolloProvider>)

  return new EnzymeDriver(wrapper)
}

export { startAppEnzyme }
