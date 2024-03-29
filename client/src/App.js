import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import GameCreate from './components/GameCreate/GameCreate';
import About from './components/About/About';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path='/home/:id' component={Detail} />
        <Route path="/home" component={Home} />
        <Route path="/create" component={GameCreate} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
