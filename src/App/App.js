import './App.css';
import Header from '../components/Header/Header';
import RouterURL from '../components/RouterURL/RouterURL';
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router>
      <div canvas="container">
          <div>
              <Header/>
              <RouterURL/>
          </div>
      </div>
    </Router>
  );
}

export default App;
