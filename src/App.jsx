import React, { useEffect, useState } from "react";
import { Header, Footer } from "./components";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import "./App.css"

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
      <main className="home flex justify-center align-middle">
      <Outlet />
      </main>
      <Footer />
    </div>
  ) : <div className="w-screen h-screen text-2xl flex justify-center align-middle"><h1 className="self-center">Loading ...</h1></div>;
}

export default App;
