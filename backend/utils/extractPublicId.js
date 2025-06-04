export const extractPublicId = (imageUrl) => {
  const parts = imageUrl.split('/');
  const filename = parts[parts.length - 1];
  const publicId = filename.split('.')[0]; // remove .jpg/.png etc.
  return `PawStore/${publicId}`;
};
