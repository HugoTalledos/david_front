import './input.css';
import './App.css';
import Home from './pages/Home';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import ViewSet from './pages/ViewSet';
import CreateSet from './pages/CreateSet';
import Login from './pages/Login';
import Notification from './components/Notification';
import NotificationContext from './data/notification-data';

function App() {
  const user = sessionStorage.getItem('userInfo'); 
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <NotificationContext>
        { user && <SideBar /> }
        <Routes>
          <Route exact path='/' element={ user ? <Home /> : <Login />} />
          <Route exact path='/view/:setId' element={<ViewSet />} />
          <Route exact path='/create' element={<CreateSet />} />
        </Routes>
        <Notification />
      </NotificationContext>
    </Router>
  );
}

export default App;
