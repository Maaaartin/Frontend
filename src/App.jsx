import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import './App.css';
import "react-alice-carousel/lib/alice-carousel.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Test from './components/Test';
import Texture from './assets/texture.jpg';
// https://www.pexels.com/photo/wood-texture-background-pine-82256/


class App extends Component {
  render() {
    return (
      <div style={{
        backgroundImage: "url(" + Texture + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <Router >
          <Switch>
            <Route path='/test' component={Test} />
            <Route path='/gallery' component={Gallery} />
            <Route path='/' component={Index} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;