import {ExpoSQLiteDatabase} from 'drizzle-orm/expo-sqlite'
import {sqliteTable, text, unique, uniqueIndex} from 'drizzle-orm/sqlite-core';
// import {} from 'drizzle-orm/sqlite-core';

export const messages = sqliteTable("messages", {
    id: text('id').primaryKey().notNull(),
    username: text('username').notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone', {length: 256}).notNull(),
    password: text('password').notNull(),
    profilePicture: text('profile_picture'),
    // createdAt: timestamp
})