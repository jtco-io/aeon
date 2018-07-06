import * as React from 'react';
import Navbar from './components/Navbar';
import Routes from './components/Routes';

class App extends React.Component<any, any> {
  public render() {
    return (
      <React.Fragment>
        <Navbar />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
