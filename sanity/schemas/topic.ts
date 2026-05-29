import { defineType, defineField } from "sanity";

export const topic = defineType({
  name: "topic",
  title: "Topic",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "color",
      type: "string",
      description: "CSS var, e.g. var(--c-teal-light)",
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
});
