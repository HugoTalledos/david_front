import { getToken, sigout } from "../services/Auth";

const useAuth = () => {
  const login = async (email, password, typeUser) => {
    try {
      const { token, user } = await getToken({ email, password, type: typeUser });
      sessionStorage.setItem('jwtToken', token);
      sessionStorage.setItem('userInfo', JSON.stringify(user));
      window.location.reload();
      return {
        status:true,
        message: '¡Bienvenido de vuelta!'
      }
    } catch (e) {
      console.log('🚀 ~ file: useAuth.js:15 ~ login ~ e:', e);
      return {
        status: false,
        message: 'Usuario o contraseña equivocada'
      }
    }
  }

  const logout = async () => {
    await sigout();
    sessionStorage.clear();
    window.location.reload();
  };

  return { login, logout }
};

export default useAuth;