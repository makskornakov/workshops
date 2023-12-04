export const maxAvatarSize: number = mbToBytes(0.5);

function mbToBytes(mb: number) {
  return 1024 * 1024 * 8 * mb;
}
