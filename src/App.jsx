import React, { useEffect, useState } from "react";
import { Header, Footer } from "./components";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getUserAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen min-w-min bg-slate-400 flex flex-wrap flex-col">
      <Header />
      <main>
       TODO: <Outlet />
      </main>
      <Footer />
    </div>
  ) : <h1 className="text-xl">Loading ...</h1>;
}

export default App;
