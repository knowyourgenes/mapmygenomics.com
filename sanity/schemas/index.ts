import type { SchemaTypeDefinition } from "sanity";
import { persona } from "./persona";
import { topic } from "./topic";
import { question } from "./question";
import { trending } from "./trending";
import { view } from "./view";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [persona, topic, question, trending, view],
};
