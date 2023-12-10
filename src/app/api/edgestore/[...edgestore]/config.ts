export const maxAvatarSize: number = mbToBytes(0.5);
export const maxMediaSize: number = mbToBytes(5);

function mbToBytes(mb: number) {
  return 1024 * 1024 * mb;
}
