import React from "react";
import { useSelector} from "react-redux"
import {Button , Container, Logo} from "../index"
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Header = () => {
 
  const userStatus = useSelector((state)=>{state.auth.status})
  const navigate = useNavigate()

  const navIcons = [
    {
      name: "Home",
      slug: "/",
      active: userStatus,
    },
    {
      name:"Login",
      slug:"/login",
      active:!userStatus
    },
    {
      name:"Signup",
      slug:"/signup",
      active:!userStatus
    },
    {
      name:"All Posts",
      slug:"/posts",
      active:userStatus
    },
    {
      name:"Add Posts",
      slug:"/add-post",
      active:userStatus
    }
  ];
  return (
    <header className="p-2 bg-slate-500 text-black">
      <Container>
      <nav
      className="flex"
      >
        <div className="mr-4">
          <Logo width="70px"/>
        </div>
        <div>
        {navIcons.map((icon)=>(
          icon.active? (
            <li key={icon.name}>
              <Button 
              onClick={navigate(icon.slug)}
              children = {icon.name}
              className="py-3 text-black hover:bg-blue-100 rounded-full"
              />
            </li>
          ):null
        ))}
        <Logout/>
        </div>
      </nav>
      </Container>
    </header>
  );
};

export default Header;
