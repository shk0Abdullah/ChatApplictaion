import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  chatGroups: defineTable({
    description: v.string(),
    icon_URL: v.string(),
    name: v.string(),
  }),
  chatMessages:defineTable({
    content:v.string(),
    group_id:v.id('chatGroups'),
    user:v.string(),
    file:v.optional(v.string()),
  })
});

