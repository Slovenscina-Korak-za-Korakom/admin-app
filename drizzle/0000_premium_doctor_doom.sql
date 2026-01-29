CREATE TABLE "lang_club_bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lang_club_bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"eventId" integer NOT NULL,
	"userId" varchar(255) NOT NULL,
	"stripeSessionId" varchar(255),
	"stripePaymentIntentId" varchar(255),
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lang_club" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lang_club_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tutor" varchar(255) NOT NULL,
	"date" timestamp NOT NULL,
	"theme" varchar(255) NOT NULL,
	"description" text,
	"level" text,
	"location" text NOT NULL,
	"peopleBooked" integer DEFAULT 0 NOT NULL,
	"maxBooked" integer DEFAULT 0 NOT NULL,
	"duration" integer,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"stripeProductId" varchar(255),
	"stripePriceId" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "regular_invitations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "regular_invitations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"token" varchar(255) NOT NULL,
	"tutorId" integer NOT NULL,
	"studentEmail" varchar(255) NOT NULL,
	"studentClerkId" varchar(255),
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"dayOfWeek" integer NOT NULL,
	"startTime" varchar(10) NOT NULL,
	"duration" integer NOT NULL,
	"location" varchar(255) NOT NULL,
	"description" text,
	"color" varchar(50),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "regular_invitations_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "schedules_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"ownerId" varchar(255) NOT NULL,
	"schedule" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timeblocks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "timeblocks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tutorId" integer NOT NULL,
	"startTime" timestamp with time zone NOT NULL,
	"duration" integer NOT NULL,
	"status" varchar(255) NOT NULL,
	"sessionType" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"studentId" varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tutors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tutors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"bio" text NOT NULL,
	"avatar" varchar(255) NOT NULL,
	"color" varchar(255) NOT NULL,
	"clerkId" varchar(255) NOT NULL,
	CONSTRAINT "tutors_email_unique" UNIQUE("email"),
	CONSTRAINT "tutors_clerkId_unique" UNIQUE("clerkId")
);
--> statement-breakpoint
ALTER TABLE "lang_club_bookings" ADD CONSTRAINT "lang_club_bookings_eventId_lang_club_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."lang_club"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regular_invitations" ADD CONSTRAINT "regular_invitations_tutorId_tutors_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."tutors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timeblocks" ADD CONSTRAINT "timeblocks_tutorId_tutors_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."tutors"("id") ON DELETE no action ON UPDATE no action;