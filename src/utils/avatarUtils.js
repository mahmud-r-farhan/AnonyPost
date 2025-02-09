import { createAvatar } from '@dicebear/core';
import { lorelei, thumbs, bottts, avataaars } from '@dicebear/collection';

const avatarStyles = [lorelei, thumbs, bottts, avataaars];

export const getRandomAvatar = (seed) => {
  const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
  const avatar = createAvatar(randomStyle, {
    seed: seed || Math.random().toString(),
    size: 128,
  });

  // Convert SVG to data URI
  const svgString = avatar.toString();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

// Get avatar with specific style
export const getAvatarByStyle = (style, seed) => {
  const avatar = createAvatar(style, {
    seed: seed || Math.random().toString(),
    size: 128,
  });

  // Convert SVG to data URI
  const svgString = avatar.toString();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};
