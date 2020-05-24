import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import "react-image-gallery/styles/css/image-gallery.css";

// icon
// https://www.flaticon.com/free-icon/gallery_833367?term=gallery&page=1&position=6
// bg
// https://www.svgbackgrounds.com/#subtle-prism

class App extends Component {
  render() {
    return (
      <Router >
        <Switch>
          <Route path='/gallery' component={Gallery} />
          <Route path='/' component={Index} />
        </Switch>
      </Router>

    );
  }
}

export default App;