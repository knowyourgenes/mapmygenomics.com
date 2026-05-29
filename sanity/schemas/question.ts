import { defineType, defineField, defineArrayMember } from "sanity";

export const question = defineType({
  name: "question",
  title: "Question",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "topic",
      type: "reference",
      to: [{ type: "topic" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "askedBy", type: "string", initialValue: "Anonymous" }),
    defineField({
      name: "viewCount",
      type: "number",
      initialValue: 0,
      description: "Incremented by /api/views/[slug] on unique visit.",
    }),
    defineField({ name: "postedAgo", type: "string", description: "e.g. 2 days ago" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({
      name: "answers",
      type: "array",
      of: [
        defineArrayMember({
          name: "answer",
          type: "object",
          fields: [
            defineField({
              name: "persona",
              type: "reference",
              to: [{ type: "persona" }],
              validation: (r) => r.required(),
            }),
            defineField({ name: "upvotes", type: "number", initialValue: 0 }),
            defineField({
              name: "body",
              type: "array",
              of: [{ type: "block" }],
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { persona: "persona.name", upvotes: "upvotes" },
            prepare: ({ persona, upvotes }) => ({
              title: persona || "Unknown",
              subtitle: `${upvotes ?? 0} upvotes`,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", topic: "topic.name" },
    prepare: ({ title, topic }) => ({ title, subtitle: topic }),
  },
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
