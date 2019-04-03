import React, { Component } from 'react';
import ToDoContainer from './components/ToDoListContainer';

class App extends Component<{},{}> {
  constructor(props: any) {
    super(props);
  }


  render() {
    return (
      <React.Fragment>
        <ToDoContainer />
      </React.Fragment>
    );
  }
}


export default App;
