import { v } from 'convex/values';
import { mutation, query } from "./_generated/server";

export const sendMessages = mutation({
    args:{
        content: v.string(),
        group_id: v.id('chatGroups'),
        user: v.string(),
        file:v.optional(v.string())
    },
    handler:async(ctx, args)=>{
        return await ctx.db.insert('chatMessages', args)
    }
})

export const get = query({
    args:{
        group_id: v.id('chatGroups')
    }
    ,handler: async(ctx, args)=>{
       return await ctx.db.query('chatMessages').filter((q)=>q.eq(q.field('group_id'),args.group_id )).collect()
    }
})