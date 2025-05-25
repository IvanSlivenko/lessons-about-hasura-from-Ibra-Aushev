CREATE TABLE "public"."favorites" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "sneaker_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("sneaker_id") REFERENCES "public"."items"("id") ON UPDATE restrict ON DELETE cascade);COMMENT ON TABLE "public"."favorites" IS E'favorites';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
