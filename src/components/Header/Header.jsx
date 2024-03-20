import React from "react";
import { useSelector } from "react-redux";
import { Button, Container, Logo } from "../index";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Header = () => {
  const userStatus = useSelector((state) => state.auth.status
  );
  const navigate = useNavigate();
  // console.log(userStatus);

  const navIcons = [
    {
      name: "Home",
      slug: "/",
      active: userStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !userStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !userStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: userStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: userStatus,
    },
  ];
  return (
    <header className="p-2 bg-slate-500 text-black ">
      <Container>
        <nav className="flex  justify-between">
          <div className="mr-4 my-auto">
            <Logo width="70px self-center" />
          </div>
          <div className="flex flex-wrap justify-around align-middle">
            {navIcons.map((icon) =>
              icon.active ? (
                <li key={icon.name} className="list-none">
                  <Button
                    onClick={() => navigate(icon.slug)}
                    children={icon.name}
                    className="m-3 text-black hover:bg-blue-100 rounded-full"
                  />
                </li>
              ) : null
            )}{userStatus && <Logout className="" />
}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
