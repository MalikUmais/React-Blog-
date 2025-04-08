import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    setLoading(true);
    setError("");

    try {
      let featuredImage = post?.featuredImage;

      if (data.image?.[0]) {
        const uploadedFile = await service.uploadFile(data.image[0]);
        if (uploadedFile) {
          featuredImage = uploadedFile.$id;
          if (post?.featuredImage) {
            await service.deleteFile(post.featuredImage);
          }
        }
      }

      if (post) {
        const updatedPost = await service.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage,
        });
        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        const newPost = await service.createPost({
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage,
          userId: userData.$id,
          slug: data.slug,
        });
        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    // <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    //   {error && (
    //     <div className="w-full mb-4 px-2">
    //       <p className="text-red-500 text-center">{error}</p>
    //     </div>
    //   )}
    //   <div className="w-2/3 px-2">
    //     <Input
    //       label="Title:"
    //       placeholder="Enter post title"
    //       className="mb-4"
    //       {...register("title", {
    //         required: true,
    //       })}
    //     />
    //     <Input
    //       label="Slug:"
    //       placeholder="Post slug"
    //       className="mb-4"
    //       {...register("slug", {
    //         required: true,
    //       })}
    //       onInput={(e) => {
    //         setValue("slug", slugTransform(e.currentTarget.value), {
    //           shouldValidate: true,
    //         });
    //       }}
    //     />
    //     <RTE
    //       label="Content:"
    //       name="content"
    //       control={control}
    //       defaultValue={getValues("content")}
    //     />
    //   </div>
    //   <div className="w-1/3 px-2">
    //     <Input
    //       label="Featured Image:"
    //       type="file"
    //       className="mb-4"
    //       accept="image/png, image/jpg, image/jpeg, image/gif"
    //       {...register("image", {
    //         required: !post,
    //       })}
    //     />
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6">
      {error && (
        <div className="w-full px-4 py-3 bg-red-50 rounded-lg border border-red-100">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      <div className="w-full lg:w-2/3 px-2 space-y-4">
        <Input
          label="Title:"
          placeholder="Enter post title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Post slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-full lg:w-1/3 px-2 space-y-4">
        <Input
          label="Featured Image:"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={service.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status:"
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
