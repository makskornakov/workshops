export const maxAvatarSize: number = mbToBytes(0.5);
export const maxMediaSize: number = mbToBytes(5);

function mbToBytes(mb: number) {
  return 1024 * 1024 * mb;
}

export const timeConsumptionValues = ['5min', '10min', '15min', '30min', '1h+'];
export const complexityValues = ['very simple', 'simple', 'medium', 'advanced', 'specialized'];
export const maxMaterialFieldsLengths = {
  title: 50,
  description: 300,
  content: 1000,
};
