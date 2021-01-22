import React from 'react';
import {BrowserRouter as Router, Switch,  Route} from 'react-router-dom' // esto es para crear un ennrrutador en react

import {About} from './components/About';
import {Users} from './components/Users';
import {Navbar} from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container p-4">
        <Switch>{/* qu2e ruta sera la encargada de renderizar dependiendo de ue ruta nosotros elijamos */}
          <Route path="/about" component={About}/>
          <Route path="/" component={Users}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
