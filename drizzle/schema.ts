import {ExpoSQLiteDatabase} from 'drizzle-orm/expo-sqlite'
import {sqliteTable, text, SQLiteTimestamp , unique, blob, uniqueIndex, primaryKey} from 'drizzle-orm/sqlite-core';
// import {} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    username: text('username').unique().notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone_number', {length: 256}).notNull(),
    password: text('password').notNull(),
    profilePicture: text('profile_picture'),
    // createdAt: timestamp('created_at', {withTimezone: true}).defaultNow().notNull()
    createdAt: text('created_at').notNull()
})

// export const messages = sqliteTable('messages', {
//     id: text('id').defaultRandom().primaryKey(),
//     senderId: text('sender_id').references(() => users.id).notNull(),
//     // status: text('status', {enum: ['sent', 'delivered', 'read']}).notNull(),
//     status: text('status', {enum: ['sent', 'delivered', 'read']}).default('sent').notNull(),
//     // conversationId: text('conversation_id').references(() => conversations.id).notNull(),
//     text: text('text').notNull(),
// })
// export const messages = sqliteTable('messages', {
//     id: text('id').defaultRandom().primaryKey(),
//     type: text('type', {enum: ['text', 'media', 'audio']}),
//     // text: text('text').notNull(),
//     // messageId: text('message_id').references(() => textMessages.id, mediaMessages.id),
//     // messageId: text('message_id').references(() => [textMessages.id, mediaMessages.id]),
//     conversationId: text('conversation_id').references(() => conversations.id).notNull(),
//     messageId: text('message_id').references(() => textMessages.id).notNull(),
//     createdAt: timestamp('created_at', {withTimezone: true}).defaultNow().notNull(),
//     updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow().notNull()
// })
// }, (table) => {
//     return {
//         messagesReference: foreignKey({
//             // columns: [table.messageId],
//             // foreignColumns: [textMessages.id, mediaMessages.id],
//             // foreignColumns: [table.messageId],
//             // columns: [textMessages.id, mediaMessages.id],
//             // foreignColumns: {"0"},
//             columns: [table.messageId],
//             foreignColumns: [users],
//             name: 'message_reference'
//         })
//     }
// })

export const messages = sqliteTable('messages', {
    id: text('id').primaryKey(),
    text: text('text'),
    conversationId: text('conversation_id').references(() => conversations.id).notNull(),
    userId: text('user_id').references(() => users.id).notNull(),
    // media: text('media').array(10),
    media: text('media'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull()
    // createdAt: text('created_at').$type<SQLiteTimestamp>,
    // updatedAt: new SQLiteTimestamp('updated_at').notNull()
})

// export const textMessages = sqliteTable('text_messages', {
//     id: text('id').primaryKey(),
//     text: text('text').notNull(),
//     conversationId: text('conversation_id').references(() => conversations.id).notNull(),
//     // createdAt: timestamp('created_at', {withTimezone: true}).defaultNow().notNull(),
//     // updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow().notNull()
//     createdAt: text('created_at').notNull(),
//     updatedAt: text('updated_at').notNull()
// })

// // export const imageMessages = sqliteTable('image_messages', {
// export const mediaMessages = sqliteTable('media_messages', {
//     id: text('id').primaryKey(),
//     // media: text('media')..notNull(),
//     media: text('media').notNull(),
//     conversationId: text('conversation_id').references(() => conversations.id).notNull(),
//     text: text('text'),
//     // createdAt: timestamp('created_at', {withTimezone: true}).defaultNow().notNull(),
//     // updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow().notNull()
//     createdAt: text('created_at').notNull(),
//     updatedAt: text('updated_at').notNull()
// })

export const conversations = sqliteTable('conversations', { 
    id: text('id').primaryKey(),
    conversationType: text('conversation_type', {enum: ['one-to-one', 'group']}).default('one-to-one').notNull(),
    createdBy: text('created_by').references(() => users.id).notNull(),
    // createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    createdAt: text('created_at')
    // createdBy: text('id').references(() => users.id).notNull()
})

export const conversationParticipants = sqliteTable('conversation_participants', {
    id: text('id').primaryKey(),
    conversationId: text('conversation_id').references(() => conversations.id).notNull(),
    userId: text('user_id').references(() => users.id).notNull(),
    // joinDate: timestamp('join_date', {withTimezone: true}).defaultNow(),
    joinDate: text('join_date').notNull()
})