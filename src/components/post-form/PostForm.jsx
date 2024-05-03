import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import service from "../../appwrite/configure";
import { useNavigate } from "react-router-dom";
import {useSelector } from "react-redux"

const PostForm = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, setValue, watch, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        featuredImage: post?.featuredImage || null,
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  async function submit(data) {
    console.log(data)
    if (post) {
      const file = data.image[0]? await service.uploadFile(data.image[0])
        : null;
      if (file) {
        await service.deleteFile(post.featuredImage);
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  }

  const slugTransform = useCallback((data) => {
    if (data && typeof data === "string") {
      return data
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap m-4">
      <div className="w-2/3 px-2 flex gap-4 flex-col">
        <Input
          className="rounded-xl"
          label="Title :"
          type="text"
          {...register("title", { required: true })}
        />
        <Input
          className="rounded-xl"
          label="Slug :"
          type="text"
          {...register("slug", {
            required: true,
          })}
          onInput={(value) =>
            setValue("slug", slugTransform(value), { shouldValidate: true })
          }
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        
        <Input
          className="rounded-xl"
          type="file"
          label="Choose image :"
          placeholder="Show Folder"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          {...register("image", {
            required: !post,
          })}
        />

        {post && (
          <img
            className="rounded-md max-w-56"
            src={service.getFilePreview(post.featuredImage)}
          />
        )}
        <Select
          options={["active", "inactive"]}
          label="status"
          {...register("status", {
            required: true,
          })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
        {post?"Update":"Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
