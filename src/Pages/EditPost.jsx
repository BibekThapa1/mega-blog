import React, { useEffect, useState } from "react";
import service from "../appwrite/configure";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm, Container } from "../components/index";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      // console.log(slug)
      service.getPost(slug).then((data) => {
        if (data) {
          setPost(data);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return post ? (
    <Container>
      <PostForm post={post} />
    </Container>
  ) : null;
};

export default EditPost;
