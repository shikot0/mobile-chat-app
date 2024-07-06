CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`phone` text(256) NOT NULL,
	`password` text NOT NULL,
	`profile_picture` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `messages_email_unique` ON `messages` (`email`);