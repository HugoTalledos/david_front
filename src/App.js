import './input.css';
import './App.css';
import Home from './pages/Home';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import ViewSet from './pages/ViewSet';
import CreateSet from './pages/CreateSet';
import Login from './pages/Login';

function App() {
  const user = sessionStorage.getItem('userInfo'); 
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      { user && <SideBar /> }
      <Routes>
        <Route exact path='/' element={ user ? <Home /> : <Login />} />
         <Route exact path='/view/:setId' element={<ViewSet />} />
        <Route exact path='/create' element={<CreateSet />} />
      </Routes>
    </Router>
  );
}

export default App;
