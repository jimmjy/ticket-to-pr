import {
  LangfuseSpan,
  propagateAttributes,
  startActiveObservation,
} from "@langfuse/tracing";

export type ObservationType =
  "span" | "agent" | "tool" | "evaluator" | "guardrail";

// reads span / current step trace, updates what happened
export function traced<State, Update>(
  name: string,
  asType: ObservationType,
  node: (state: State) => Promise<Update>,
) {
  const updateObservation = async (observation: LangfuseSpan, state: State) => {
    const update = await node(state);
    observation.update({ output: update });

    return update;
  };

  return (state: State) =>
    startActiveObservation(
      name,
      (observation) => updateObservation(observation, state),
      {
        asType,
      } as { asType: "span" },
    );
}

type TraceInfoT = {
  traceName: string;
  observationName?: string; // gets a default if not provided
  sessionId: string;
  tags: string[];
  metadata?: Record<string, string>;
  input: unknown;
};

export function withTrace<Trace>(
  info: TraceInfoT,
  callBack: () => Promise<Trace>,
): Promise<Trace> {
  const { input, observationName, ...rest } = info;

  const updateObservation = async (observation: LangfuseSpan) => {
    observation.update({ input });
    const output = await callBack();
    observation.update({ output });
    return output;
  };

  const startObservation = () =>
    startActiveObservation(
      observationName ?? info.traceName,
      updateObservation,
    );

  return propagateAttributes(rest, startObservation);
}
