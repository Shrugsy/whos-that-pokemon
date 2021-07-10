import SparklesRaw from 'react-sparkle';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Sparkles = (
  import.meta.env.PROD ? (SparklesRaw as any).default : SparklesRaw
) as typeof SparklesRaw;
/* eslint-enable @typescript-eslint/no-explicit-any */
