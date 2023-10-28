import './input.css';
import './App.css';
import Home from './pages/Home';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import ViewSet from './pages/ViewSet';
import CreateSet from './pages/CreateSet';
import CreateSong from './pages/CreateSong';
import Login from './pages/Login';
import Notification from './components/Notification';
import NotificationContext from './data/notification-data';
import ViewSingers from './pages/ViewSingers';
import ViewSongs from './pages/ViewSongs';

function App() {
  const user = sessionStorage.getItem('userInfo'); 
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <NotificationContext>
        { user && <SideBar /> }
        { user && 
          <Routes>
            <Route exact path='/create/set' element={<CreateSet />} />
            <Route exact path='/edit/set/:setId' element={<CreateSet />} />
            <Route exact path='/create/song' element={<CreateSong />} />
            <Route exact path='/edit/song/:songId' element={<CreateSong />} />
            <Route exact path='/view/singer' element={<ViewSingers />} />
            <Route exact path='/view/song' element={<ViewSongs />} />
          </Routes>
        }
        <Routes>
          <Route exact path='/' element={ user ? <Home /> : <Login />} />
          <Route exact path='/view/set/:setId' element={<ViewSet />} />
        </Routes>
        <Notification />
      </NotificationContext>
    </Router>
  );
}

export default App;
