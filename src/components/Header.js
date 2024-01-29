import { SideBar, SideBarItem } from 'leita-components-ui';
import useAuth from '../hooks/useAuth';
import { sessionConfig } from '../utils/Utils';

const Header = () => { 
  const { signOut } = useAuth();
  const { username } = sessionConfig();

  return (<>
    <SideBar title="Iglesia En-hacoré">
      <a href='/'>
        <SideBarItem label={`¡Bienvenido, ${username}!`} icon="hand-wave" />
      </a>
      <a href='/create/set'>
        <SideBarItem label="Crear set" icon="list-box" />
      </a>
      <a href='/create/song'>
        <SideBarItem label="Crear canción" icon="music-note" />
      </a>
      <a href='/view/song'>
        <SideBarItem label="Lista de canciones" icon="playlist-music" />
      </a>
      <a href='/view/singer'>
        <SideBarItem label="Lista de cantantes" icon="account-music" />
      </a>
      <SideBarItem label="Cerrar sesión" icon="logout" onClick={() => signOut()} />
    </SideBar>
  </>);
};

export default Header;
