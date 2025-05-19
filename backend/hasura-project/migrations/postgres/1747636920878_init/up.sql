SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE TABLE public.items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying NOT NULL,
    price integer NOT NULL,
    image_url character varying NOT NULL
);
ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
