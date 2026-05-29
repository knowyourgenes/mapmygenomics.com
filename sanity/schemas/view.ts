import { defineType, defineField } from "sanity";

// One document per (questionSlug, fingerprint) pair. Used to dedupe view
// counting: /api/views/[slug] creates this doc only on the first visit from a
// given IP+UA combo and atomically increments question.viewCount.
export const view = defineType({
  name: "view",
  title: "View",
  type: "document",
  fields: [
    defineField({ name: "questionSlug", type: "string", validation: (r) => r.required() }),
    defineField({ name: "fingerprint", type: "string", validation: (r) => r.required() }),
    defineField({ name: "createdAt", type: "datetime" }),
  ],
  preview: {
    select: { title: "questionSlug", subtitle: "fingerprint" },
  },
});
