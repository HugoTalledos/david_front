import { useState, useContext } from "react";
import useAuth from "../hooks/useAuth";
import NotificationContext from '../context/notification-context';
import { Button, TextField } from "leita-components-ui";

const Login = () => {
  const { dispatchData } = useContext(NotificationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const { signIn } = useAuth();

  const login = async () => {
    setIsDisabled(true);
    const { success, message } = await signIn(email, password);
    dispatchData({ type: success ? 'success' : 'danger', text: message });
    setIsDisabled(false);

    if (success) window.location.reload();
  }

  return (<>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">¡Bienvenido!</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <TextField
            icon="account"
            onChange={(e) => setEmail(e.target.value)}
            label="Correo electrónico"
            value={email}
            type="mail"
            disabled={isDisabled}
          />

          <TextField
            icon="key"
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            value={password}
            type="password"
            disabled={isDisabled}
          />

          <Button
            label="Iniciar Sesión"
            loading={isDisabled}
            fullWidth
            disabled={isDisabled}
            onClick={() => login(email, password)}
          />
        </form>
      </div>
    </div>
  </>)
};

export default Login;