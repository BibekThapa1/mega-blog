import React, { useEffect, useState } from "react";
import service from "../appwrite/configure";
import { PostCard, Container } from "../components/index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    service.getPosts().then((data) => {
      if (data) setPosts(data.documents);
    });
  }, []);

  if (!authStatus) {
    return (
      <div className="not-auth-text">
        <h1 className=" text-black "> Please login to read the posts</h1>
      </div>
    );
  }

  if (posts.length === 0 && authStatus) {
    return (
      <div className="flex justify-center align-middle text-black font-mono p-6 home-height">
        <p className="font-bold text-5xl">
          Click here to add post{" "}
          <span
            onClick={() => navigate("/add-post")}
            className="cursor-pointer p-2 rounded-md font-bold italic text-2xl underline hover:bg-white"
          >
            Add
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-5 min home-height">
      <Container>
        <div className="flex justify-center align-middle flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="h-full p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
