import authAPI from "apis/authAPI";
import useRequest from "hooks/useRequest";

const AdminRoute = ({ children }) => {
  const { data: admin } = useRequest(() => authAPI.addmin());
  console.log("abc", admin);
};

export default AdminRoute;
