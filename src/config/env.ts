import "dotenv/config";
import { z } from "zod";

// validate env values
const EnvSchema = z.object({
  MOCK: z.string().default("1"),
  LLM_MODEL: z.string().min(1).default("claude-haiku-5-5"),
  JUDGE_MODEL: z.string().min(1).default("claude-sonnet-5-5"),
  CLAUDE_CODE_MODEL: z.string().min(1).default("sonnet"),
  MAX_ATTEMPTS: z.coerce.number().int().min(1).default(3),
  LANGFUSE_PUBLIC_KEY: z.string().optional(),
  LANGFUSE_SECRET_KEY: z.string().optional(),
});

export type ConfigT = {
  mock: boolean;
  llmModel: string;
  judgeModel: string;
  claudeCodeModel: string;
  maxAttempts: number;
  trackingEnabled: boolean;
  rootDir: string;
};

// block runs if invalid, prevents stalled tasks
export function loadConfig(env: NodeJS.ProcessEnv = process.env): ConfigT {
  const parsedEnv = EnvSchema.safeParse(env);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid settings in .env:\n${z.prettifyError(parsedEnv.error)}`,
    );
  }

  const envValues = parsedEnv.data;

  return {
    mock: envValues.MOCK === "1",
    llmModel: envValues.LLM_MODEL,
    judgeModel: envValues.JUDGE_MODEL,
    claudeCodeModel: envValues.CLAUDE_CODE_MODEL,
    maxAttempts: envValues.MAX_ATTEMPTS,
    trackingEnabled: Boolean(
      envValues.LANGFUSE_PUBLIC_KEY && envValues.LANGFUSE_SECRET_KEY,
    ),
    rootDir: process.cwd(),
  };
}
