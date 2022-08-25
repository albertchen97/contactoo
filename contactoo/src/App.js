import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Chats from './components/Chats';
import Login from './components/Login';
import Email from './pages/Email';

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          {/* switch component says render either of these inner components (chats or login), using first one that matches URL, instead of all */}
          <Switch>
            {/* <Route path="/chats" component={Chats} /> */}
            <Route path="/chats" component={Chats} />
            <Route path="/email" component={Email} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
