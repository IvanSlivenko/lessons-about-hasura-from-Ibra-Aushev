CREATE TABLE "public"."cart" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "quantity" integer NOT NULL, "sneaker_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("sneaker_id") REFERENCES "public"."items"("id") ON UPDATE restrict ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
