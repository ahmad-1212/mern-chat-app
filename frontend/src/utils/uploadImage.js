export const uploadImage = async (file) => {
  // Ready image to upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app");
  formData.append("cloud_name", import.meta.env.VITE_IMAGE_CLOUD_NAME);

  // upload image to cloudinary
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_IMAGE_CLOUD_NAME
    }/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  // if something wrong return an error
  if (!res.ok) throw new Error("Something went wrong could upload the Image");

  // send response
  return res;
};
