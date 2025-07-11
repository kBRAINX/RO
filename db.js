const { Client } = require('pg');
// require('dotenv').config();

const db = require('./configBD')

const client = new Client({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database
});

client.connect()
.then(() => {
  console.log('Connected to PostgreSQL database');

  const createTableUserQuery = `
  CREATE TABLE IF NOT EXISTS public.users
  (
      email character varying COLLATE pg_catalog."default" NOT NULL,
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
      password character varying COLLATE pg_catalog."default" NOT NULL,
      CONSTRAINT users_pkey PRIMARY KEY (id)
  )
  `;

  const createTableHouseQuery = `
  CREATE TABLE IF NOT EXISTS public.house
  (
      id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
      url_img text COLLATE pg_catalog."default",
      titre_bien character varying COLLATE pg_catalog."default",
      prix integer,
      nbr_pieces integer,
      nbr_chambres integer,
      surface integer,
      dpe "char",
      ges "char",
      description text COLLATE pg_catalog."default",
      id_user integer NOT NULL,
      adresse_bien character varying COLLATE pg_catalog."default" NOT NULL,
      CONSTRAINT house_pkey PRIMARY KEY (id),
      CONSTRAINT house_fkey FOREIGN KEY (id_user)
          REFERENCES public.users (id) MATCH SIMPLE
          ON UPDATE NO ACTION
          ON DELETE NO ACTION
          NOT VALID
  )
  `;

  client.query(createTableUserQuery, (error, result) => {
    if (error) {
      console.error('Erreur lors de la création de la table', error);
    } else {
      console.log('Table "users" existe déjà ou a été créée avec succès');
    }
  });
  client.query(createTableHouseQuery, (error, result) => {
    if (error) {
      console.error('Erreur lors de la création de la table', error);
    } else {
      console.log('Table "house" existe déjà ou a été  créée avec succès');
    }
  });
})
.catch((err) => {
  console.error('Error connecting to PostgreSQL database', err);
});

module.exports = client;
