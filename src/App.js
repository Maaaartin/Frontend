import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import './App.css';
import "react-alice-carousel/lib/alice-carousel.css";
import "react-image-gallery/styles/css/image-gallery.css";


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/gallery' component={Gallery} />
          <Route path='/' component={Index} />
        </Switch>
      </Router>
    );
  }
}

export default App;