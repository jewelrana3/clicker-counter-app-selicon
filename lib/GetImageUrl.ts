export const getImageUrl = (image: string | null | undefined): string => {
  if (!image) {
    return "/ads/profile.png";
  }

  if (image?.startsWith("http")) {
    return image;
  }

  return `${process.env.NEXT_PUBLIC_IMAGE_URL || process.env.IMAGE_URL}${image}`;
};
