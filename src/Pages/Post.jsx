import React, { useEffect, useState } from "react";
import { useParams, useNavigate ,Link } from "react-router-dom";
import { Button, Container } from "../components/index";
import service from "../appwrite/configure";
import { useSelector } from "react-redux";
import "../App.css"
import parse from "html-react-parser";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = userData && post ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((data) => {
        if (data) {
          setPost(data);
          // console.log("post data:", post);
        } else navigate("/");
      });
    } 
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div>
      <Container>
        <div className="flex flex-wrap ">
          <div className="p-2 bg-slate-200 rounded-xl">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl max-h-72"
            />
            <div>
              <h1 className="p-2 border-blue-100 text-black text-2xl">
                {post.title}
              </h1>
              <h3 className="text-xl text-black my-3">{parse(post.content)}</h3>
            </div>
            <div className="p-4">
              {isAuthor ? (
                <div>
                  <Button onClick={deletePost} className="bg-blue-400">
                    Delete
                  </Button>
                  <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    // onClick={() => navigate(`/edit-post/${post.$id}`)}
                    className="bg-red-500"
                  >
                    Edit
                  </Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
