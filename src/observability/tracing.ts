import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";

export type TracingT = {
  enabled: boolean;
  flush: () => Promise<void>;
};

export function initTracing(enabled: boolean): TracingT {
  if (!enabled) {
    return {
      enabled,
      flush: async () => {},
    };
  }

  const processor = new LangfuseSpanProcessor();

  new NodeTracerProvider({ spanProcessors: [processor] }).register();

  return {
    enabled,
    flush: () => processor.forceFlush(),
  };
}
