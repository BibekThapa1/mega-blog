import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Protected({ authentication = true, children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authenticationStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authenticationStatus != authentication)
      navigate("/login");
    else if (!authentication && authenticationStatus != authentication)
      navigate("/");
     setLoading(false);;
  }, [authentication, navigate, authenticationStatus]);

  return loading ? <h1>Loading...</h1> : { children };
}
