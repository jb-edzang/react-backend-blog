CREATE DATABASE IF NOT EXISTS blogreactDB;

CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY NOT NULL AUTO_INCREMENT,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "create_at" TIMESTAMP
);

CREATE TABLE "users" (
  "id" INT PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
);

CREATE TABLE "users_posts_id" (
  "id" INT PRIMARY KEY,
  "post_id" INT , NOT NULL,
  "user_id" INT, NOT NULL
);



--Pour générer 10 posts aléatoires 

DO $$
DECLARE
  i INT := 1;
BEGIN
  -- Créez la table "post" si elle n'existe pas encore
  CREATE TABLE IF NOT EXISTS post (
    id SERIAL PRIMARY KEY,
    title TEXT,
    body TEXT,
    created_at TIMESTAMP
  );

  -- Importez des données JSON depuis la source externe
  INSERT INTO post (title, body, created_at)
  SELECT
    'Titre du post ' || i,
    'Corps du post ' || i,
    NOW() - (random() * interval '365 days')
  FROM
    jsonb_array_elements(
      get_data_from_url('https://jsonplaceholder.typicode.com/posts')
    ) AS data(json);

  i := i + 1;
END $$;



