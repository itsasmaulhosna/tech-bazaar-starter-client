export const imageUpload = async (image) => {
  const formDta = new FormData();
  formDta.append('image', image);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API_KEY}`,
    {
      method: 'POST',
      body: formDta,
    },
  );
  const data = await res.json();
  return data.data;
};
