CREATE TABLE "cancelled_regular_sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cancelled_regular_sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"invitationId" integer NOT NULL,
	"cancelledDate" timestamp with time zone NOT NULL,
	"reason" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cancelled_regular_sessions" ADD CONSTRAINT "cancelled_regular_sessions_invitationId_regular_invitations_id_fk" FOREIGN KEY ("invitationId") REFERENCES "public"."regular_invitations"("id") ON DELETE no action ON UPDATE no action;