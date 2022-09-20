import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }
  // console.log("children", children);
  return children;
};

export default CheckoutRoute;
