import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    if (email.length >= 3 && password.length >= 3 && userType.length >= 0) return setIsDisabled(false);
    setIsDisabled(true);
  }, [email, password, userType]);

  return (<>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">¡Bienvenido!</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Correo electrónico</label>
            <div className="mt-2">
              <input id="email"
                     value={email}
                     onChange= {(e) => setEmail(e.target.value)}
                     name="email"
                     type="email"
                     autocomplete="email"
                     required
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
              <div className="text-sm">
                <span className="font-semibold text-indigo-600 hover:text-indigo-500">Olvide mi contraseña</span>
              </div>
            </div>
            <div className="mt-2">
              <input id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)} 
                     name="password"
                     type="password"
                     autocomplete="current-password"
                     required
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
          <select id="countries"
                  onChange={(e) => setUserType(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>¿Qué tipo de usuario eres?</option>
            <option value="admin">Administrador</option>
            <option value="user">Lector</option>
          </select>

          <div>
          <button type="button"
                  disabled={isDisabled}
                  onClick={() => login(email, password, userType)}
                  className={isDisabled
                  ? 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'}>Iniciar sesión</button>
          </div>
        </form>
      </div>
    </div>
  </>)
};

export default Login;