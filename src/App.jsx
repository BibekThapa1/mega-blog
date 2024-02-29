import React, { useEffect, useState } from "react";
import { Header, Footer } from "./components";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";


function App() {
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getUserAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen min-w-min bg-slate-400 flex flex-wrap flex-col justify-center align-middle">
      <Header />
      TO BE DONE {/* <Outline /> */}
      <Footer />
    </div>
  ) : null;
}

export default App;
