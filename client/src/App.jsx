import Layout from "./Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./reduxStore/store";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Home from "./pages/user/Home";

import { Provider, useSelector } from "react-redux";
import AdminLog from "./pages/admin/AdminLog";
import Dashboard from "./pages/admin/Dashboard";
import UserEditAdmin from "./components/admin/UserEditAdmin";
import CreateUserAdmin from "./components/admin/CreateUserAdmin";
import EditProfileUser from "./components/user/EditProfileUser";
import PrivateRoute from "./components/user/PrivateRoute";
import NotFound from "./components/user/NotFound";
import PrivateRoutesAdmin from "./components/admin/PrivateRoutesAdmin";



function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="updateUser/:userId" element={<EditProfileUser/>} />
        </Route>

        <Route path="/admin" element={<AdminLog />} />

        <Route path="" element={<PrivateRoutesAdmin/>} >
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="admin/createUser" element={<CreateUserAdmin />} />
        <Route path="admin/editUser/:userId" element={<UserEditAdmin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
