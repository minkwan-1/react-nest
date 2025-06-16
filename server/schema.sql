--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Postgres.app)
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: google_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.google_user (
    id character varying NOT NULL,
    email character varying NOT NULL,
    verified_email boolean NOT NULL,
    name character varying NOT NULL,
    given_name character varying NOT NULL,
    family_name character varying NOT NULL,
    profile_image character varying NOT NULL,
    is_default_image boolean NOT NULL,
    connected_at timestamp without time zone NOT NULL,
    "isExist" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.google_user OWNER TO postgres;

--
-- Name: my_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.my_info (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" character varying NOT NULL,
    job character varying(100),
    interests text[] DEFAULT '{}'::text[] NOT NULL,
    "socialLinks" text[] DEFAULT '{}'::text[] NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.my_info OWNER TO postgres;

--
-- Name: naver_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.naver_user (
    id character varying NOT NULL,
    email character varying NOT NULL,
    nickname character varying NOT NULL,
    "profileImage" character varying,
    name character varying,
    connected_at timestamp with time zone DEFAULT now(),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.naver_user OWNER TO postgres;

--
-- Name: phone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phone (
    id integer NOT NULL,
    "phoneNumber" character varying(15) NOT NULL,
    code character varying(6) NOT NULL,
    "expiresAt" timestamp without time zone NOT NULL,
    verified boolean DEFAULT false NOT NULL
);


ALTER TABLE public.phone OWNER TO postgres;

--
-- Name: phone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.phone_id_seq OWNER TO postgres;

--
-- Name: phone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phone_id_seq OWNED BY public.phone.id;


--
-- Name: question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question (
    id integer NOT NULL,
    title character varying NOT NULL,
    content text NOT NULL,
    tags text NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.question OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_id_seq OWNER TO postgres;

--
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- Name: self_intro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.self_intro (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" character varying NOT NULL,
    content character varying(80) NOT NULL
);


ALTER TABLE public.self_intro OWNER TO postgres;

--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sessions (
    session_id character varying NOT NULL,
    user_id character varying NOT NULL,
    provider character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    data jsonb
);


ALTER TABLE public.user_sessions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    name character varying NOT NULL,
    "accountID" character varying NOT NULL,
    "phoneNumber" character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: phone id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone ALTER COLUMN id SET DEFAULT nextval('public.phone_id_seq'::regclass);


--
-- Name: question id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- Name: question PK_21e5786aa0ea704ae185a79b2d5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY (id);


--
-- Name: google_user PK_327db3e0d20823d96ed80889431; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_user
    ADD CONSTRAINT "PK_327db3e0d20823d96ed80889431" PRIMARY KEY (id);


--
-- Name: naver_user PK_a29e55b30aa93acd8a463d11632; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.naver_user
    ADD CONSTRAINT "PK_a29e55b30aa93acd8a463d11632" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: user_sessions PK_b6c41d19165af4c69eba9ecda46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT "PK_b6c41d19165af4c69eba9ecda46" PRIMARY KEY (session_id);


--
-- Name: self_intro PK_b94a89cc23d08de2e49697c2bf6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.self_intro
    ADD CONSTRAINT "PK_b94a89cc23d08de2e49697c2bf6" PRIMARY KEY (id);


--
-- Name: my_info PK_e701b937033d3e027976870864d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.my_info
    ADD CONSTRAINT "PK_e701b937033d3e027976870864d" PRIMARY KEY (id);


--
-- Name: phone PK_f35e6ee6c1232ce6462505c2b25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phone
    ADD CONSTRAINT "PK_f35e6ee6c1232ce6462505c2b25" PRIMARY KEY (id);


--
-- Name: my_info UQ_4e7e143f76beedc7751b78fadea; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.my_info
    ADD CONSTRAINT "UQ_4e7e143f76beedc7751b78fadea" UNIQUE ("userId");


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: naver_user UQ_bc4d42ca863a602b1035be4016b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.naver_user
    ADD CONSTRAINT "UQ_bc4d42ca863a602b1035be4016b" UNIQUE (email);


--
-- Name: self_intro UQ_cd509eb068c2b15cf4fc6db93be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.self_intro
    ADD CONSTRAINT "UQ_cd509eb068c2b15cf4fc6db93be" UNIQUE ("userId");


--
-- Name: users UQ_d9b6a9589111d076c52553b9dcb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_d9b6a9589111d076c52553b9dcb" UNIQUE ("accountID");


--
-- Name: question FK_80f29cc01d0bd1644e389cc13be; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "FK_80f29cc01d0bd1644e389cc13be" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: users FK_d9b6a9589111d076c52553b9dcb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_d9b6a9589111d076c52553b9dcb" FOREIGN KEY ("accountID") REFERENCES public.google_user(id);


--
-- PostgreSQL database dump complete
--

