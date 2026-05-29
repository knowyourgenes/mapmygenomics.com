import { defineType, defineField } from "sanity";

export const persona = defineType({
  name: "persona",
  title: "Persona",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "initials",
      type: "string",
      validation: (r) => r.required().max(3),
    }),
    defineField({
      name: "gradient",
      type: "string",
      description:
        "CSS background value for avatar (e.g. linear-gradient(135deg, #2F8C5C, #1F6B43))",
    }),
    defineField({ name: "voice", type: "text", rows: 2 }),
    defineField({ name: "verified", type: "boolean", initialValue: false }),
  ],
});
