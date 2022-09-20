import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "components/MainLayout";
import AuthLayout from "components/AuthLayout";
import CheckoutRoute from "routes/CheckoutRoute";
import "swiper/css/bundle";
import "./modules/Home/components/Banner/styles.css";
import AdminLayout from "components/AdminLayout/AdminLayout";
import MovieList from "modules/Admin/Films/Films";
import AddMovie from "modules/Admin/Films/Add/AddMovie";
import EditMovie from "modules/Admin/Films/Edit/EditMovie";
import AddShowtime from "modules/Admin/Films/AddShowtime/AddShowtime";
import Users from "modules/Admin/Users/Users";
import AddUser from "modules/Admin/Users/AddUser/AddUser";
import EditUser from "modules/Admin/Users/EditUser/EditUser";
// import PurChase from "modules/Purchase/pages/PurChase";
// import EditUser from "modules/Admin/Users/EditUser/EditUser";
const Home = lazy(() => import("modules/Home/pages/Home"));
const Movie = lazy(() => import("modules/Movie/pages/Movie"));
const PurChase = lazy(() => import("modules/Purchase/pages/PurChase"));
const Login = lazy(() => import("modules/Authentication/pages/Login"));
const Register = lazy(() => import("modules/Authentication/pages/Register"));
function App() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            background: "#130830",
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://tcdtist-tix-clone.vercel.app/static/media/loadingPage.a098baa8.gif"
            alt=""
          />
        </div>
      }
    >
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="films" element={<MovieList />} />
          <Route path="films/add" element={<AddMovie />} />
          <Route path="films/edit/:id" element={<EditMovie />} />
          <Route path="films/showtime/:id" element={<AddShowtime />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/updateUser/:id" element={<EditUser />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movie/:movieId" element={<Movie />} />

          <Route
            path="checkout/:checkoutId"
            element={<CheckoutRoute></CheckoutRoute>}
          />
          <Route path="purchase/:id" element={<PurChase />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="movies/add" element={<AddMovie />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
