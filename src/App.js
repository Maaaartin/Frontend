import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Index';
import Gallery from './components/Gallery';
import AliceGallery from './components/AliceGallery';
import './App.css';
import "react-alice-carousel/lib/alice-carousel.css";
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import LightWeight from './components/LeightWeight';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/gallery' component={LightWeight} />
          <Route path='/' component={Index} />
        </Switch>
      </Router>
    );
  }
}

export default App;