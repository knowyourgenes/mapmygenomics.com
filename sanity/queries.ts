import { groq } from "next-sanity";

export const questionsQuery = groq`*[_type == "question"] | order(order asc) {
  "slug": slug.current,
  title,
  askedBy,
  "viewCount": coalesce(viewCount, 0),
  postedAgo,
  "topic": topic->name,
  "topicColor": topic->color,
  "answers": answers[]{
    upvotes,
    "personaSlug": persona->slug.current,
    "personaName": persona->name,
    "personaTitle": persona->title,
    "personaInitials": persona->initials,
    "personaGradient": persona->gradient,
    "personaVerified": persona->verified,
    body
  }
}`;

export const personasQuery = groq`*[_type == "persona"] | order(name asc) {
  "slug": slug.current,
  name,
  title,
  initials,
  gradient,
  verified
}`;

export const topicsQuery = groq`*[_type == "topic"] | order(order asc) {
  "slug": slug.current,
  name,
  color
}`;

export const trendingQuery = groq`*[_type == "trending"] | order(order asc) {
  question,
  topic,
  views,
  postedAgo
}`;

export const questionBySlugQuery = groq`*[_type == "question" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  askedBy,
  "viewCount": coalesce(viewCount, 0),
  postedAgo,
  "topic": topic->name,
  "topicColor": topic->color,
  "answers": answers[]{
    upvotes,
    "personaSlug": persona->slug.current,
    "personaName": persona->name,
    "personaTitle": persona->title,
    "personaInitials": persona->initials,
    "personaGradient": persona->gradient,
    "personaVerified": persona->verified,
    body
  }
}`;

export const questionSlugsQuery = groq`*[_type == "question" && defined(slug.current)][].slug.current`;

// Projection for /llms.txt and /llms-full.txt. Keeps raw portable-text answer
// bodies (so they can be serialized to markdown) alongside thread metadata.
export const questionsForLlmsQuery = groq`*[_type == "question" && defined(slug.current)] | order(order asc) {
  "slug": slug.current,
  title,
  askedBy,
  postedAgo,
  "viewCount": coalesce(viewCount, 0),
  "topic": topic->name,
  "answers": answers[]{
    "personaName": persona->name,
    "personaTitle": persona->title,
    upvotes,
    body
  }
}`;
