import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args:{},
    handler: async (ctx)=>{
        return await ctx.db.query('chatGroups').collect();
    }
})

export const getGroup = query({
    args:{
        id: v.id('chatGroups')
    },
    handler: async (ctx, args)=>{
        return await ctx.db.query('chatGroups').filter((q)=>q.eq(q.field("_id"),args.id)).unique();
    }
})

export const createGroup = mutation({
    args:{
        name:v.string(),
        description:v.string(),
        icon_URL:v.string(),
    },
    handler:async (ctx,args)=>{
        await ctx.db.insert("chatGroups",args)
    }
})