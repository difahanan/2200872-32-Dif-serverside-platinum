CREATE TABLE public."user" (
	id serial NOT NULL,
	username varchar NULL,
	"password" varchar NULL,
	email varchar NULL,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE public.biodata_user (
	id serial NOT NULL,
	umur integer NULL,
	city varchar NULL,
	country varchar NULL,
	user_id integer NOT NULL,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT biodata_user_pk PRIMARY KEY (id),
	CONSTRAINT biodata_user_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE
);

CREATE TABLE public.history (
	id serial NOT NULL,
	user_skor integer NULL,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	user_id integer NOT NULL,
	CONSTRAINT history_pk PRIMARY KEY (id),
	CONSTRAINT history_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE
);

CREATE TABLE public.gamelist(
	game_id serial NOT NULL,
	game_name varchar NOT NULL,
	game_description varchar NULL,
	game_type varchar,
	game_image_url varchar NULL,
	CONSTRAINT gamelist_pk PRIMARY KEY (game_id),
	CONSTRAINT gamelist_un UNIQUE (game_name)
);
