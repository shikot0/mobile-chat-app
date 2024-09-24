import {drizzle} from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from "expo-sqlite/next";
// import migrations from './migrations/migrations';
// import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

const expo = openDatabaseSync("app.db", {enableChangeListener: true});
export const db = drizzle(expo)
// const {success, error} = useMigrations(db, migrations);