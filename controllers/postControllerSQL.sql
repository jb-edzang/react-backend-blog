
/* select all posts */
SELECT * FROM posts LIMIT 10;

/* limit and offset*/
SELECT * FROM posts LIMIT 10 OFFSET 5;

/* select by ID */
SELECT * FROM posts WHERE id = 1;

/* update post */
UPDATE posts SET title = 'updated post title', body = 'updated random post content' WHERE id = 1;

/* delete by ID */
DELETE FROM posts WHERE id = 1;

/* insert into */
INSERT INTO posts (title, body) VALUES ('Post title', 'post content');

/* select by desc order */
SELECT * FROM posts ORDER BY id DESC;

/* posts whom the first title word = dolorem */
SELECT * FROM posts WHERE LEFT(title, POSITION(' ' IN title) - 1) = 'dolorem';


