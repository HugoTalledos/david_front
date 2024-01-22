import './input.css';
import './App.css';
import Home from './pages/Home';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ViewSet from './pages/ViewSet';
import CreateSet from './pages/CreateSet';
import CreateSong from './pages/CreateSong';
import Login from './pages/Login';
import Notification from './components/Notification';
import NotificationContext from './data/notification-data';
import ViewSingers from './pages/ViewSingers';
import ViewSongs from './pages/ViewSongs';
import { Theme } from 'leita-components-ui';
import '@mdi/font/css/materialdesignicons.min.css';

function App() {
  const user = localStorage.getItem('us'); 
  const history = createBrowserHistory();
  return (
    <Theme
    primary="#2274A5"
    backgroundColor="#fbfbfb"
    darkPrimary="#011627"
    accent="#eeeeee"
    black="#171D1C"
    white="#FFFBFC"
    shadow="#9b9b9b96"
    danger="#BB0A21"
    fontFamily={['Raleway', 'BlinkMacSystemFont', 'Segoe UI']}
  >
    <div className='main-container'>
      <main className="flex h-[90vh] flex-col w-full p-10">
        <Router history={history}>
          <NotificationContext>
            { user && <Header /> }
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
      </main>
    </div>
  </Theme>);
}

export default App;
