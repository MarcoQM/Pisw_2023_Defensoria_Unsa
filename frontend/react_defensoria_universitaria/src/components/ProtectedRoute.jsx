
import { Navigate } from 'react-router-dom';




// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  // Lógica para verificar si el usuario está autenticado (puedes utilizar cookies, tokens, etc.)
  const tokenName = 'user_uaeh_token';
  const getLocalToken = () => JSON.parse(localStorage.getItem(tokenName));

  const isAuthenticated = getLocalToken() !== null;

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace={true} state={{ from: window.location.pathname }} />
  );
};

export default ProtectedRoute;