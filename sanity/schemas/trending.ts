import { defineType, defineField } from "sanity";

export const trending = defineType({
  name: "trending",
  title: "Trending item",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "topic", type: "string" }),
    defineField({ name: "views", type: "string" }),
    defineField({ name: "postedAgo", type: "string" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
