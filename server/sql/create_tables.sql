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
	created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	user_id integer NOT NULL,
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

CREATE TABLE public.gamelist (
	gameid serial NOT NULL,
	gameName varchar NOT NULL,
	gameDescription varchar NULL,
	gameImageUrl varchar NULL,
	CONSTRAINT gamelist_pk PRIMARY KEY (gameid),
	CONSTRAINT gamelist_un UNIQUE (gameName)
);
