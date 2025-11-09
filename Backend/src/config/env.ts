import { z } from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((value) => Number.parseInt(value, 10))
    .pipe(z.number().min(1).max(65535)),
  NODE_ENV: z
    .enum(['development', 'test', 'production', 'staging'])
    .default('development'),
  LOG_LEVEL: z
    .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'])
    .default('info'),
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required').optional(),
  AZURE_OPENAI_ENDPOINT: z.string().url().optional(),
  MONGO_URI: z.string().url().optional(),
  REDIS_URL: z.string().url().optional()
});

type EnvConfig = {
  port: number;
  nodeEnv: 'development' | 'test' | 'production' | 'staging';
  logLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
  openAiApiKey?: string;
  azureOpenAiEndpoint?: string;
  mongoUri?: string;
  redisUrl?: string;
};

let cachedConfig: EnvConfig | null = null;

export function loadConfig(): EnvConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formattedError = result.error.issues.map((issue) => issue.message).join(', ');
    throw new Error(`Invalid environment configuration: ${formattedError}`);
  }

  const mappedConfig: EnvConfig = {
    port: result.data.PORT,
    nodeEnv: result.data.NODE_ENV,
    logLevel: result.data.LOG_LEVEL,
    openAiApiKey: result.data.OPENAI_API_KEY,
    azureOpenAiEndpoint: result.data.AZURE_OPENAI_ENDPOINT,
    mongoUri: result.data.MONGO_URI,
    redisUrl: result.data.REDIS_URL
  };

  cachedConfig = mappedConfig;

  return mappedConfig;
}

