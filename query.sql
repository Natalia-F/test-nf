CREATE TABLE postTable (
	postId SERIAL PRIMARY KEY,
	namePost VARCHAR(50),
	description VARCHAR(200)
);

select * from postTable;


CREATE OR REPLACE FUNCTION fn_addPost(name VARCHAR, descriptionPost VARCHAR)
RETURNS TABLE (postId INT, namePost VARCHAR, description VARCHAR) AS $$
BEGIN
    RETURN QUERY 
    INSERT INTO postTable(namePost, description)
    VALUES (name, descriptionPost)
    RETURNING postTable.postId, postTable.namePost, postTable.description;
END;
$$ LANGUAGE plpgsql;


select * from fn_addPost('noticias del dia','hoy tendras un excelente dia!');



CREATE OR REPLACE FUNCTION fn_getpost()
RETURNS TABLE (postId INT, namePost VARCHAR, description VARCHAR) AS $$
BEGIN
    RETURN QUERY SELECT postTable.postId, postTable.namePost, postTable.description FROM postTable;
END;
$$ LANGUAGE plpgsql;

select * from fn_getPost();


CREATE OR REPLACE FUNCTION fn_deletePost(id INT)
RETURNS TABLE (postId INT, namePost VARCHAR, description VARCHAR) AS $$
DECLARE
    deletedPost postTable%ROWTYPE; 
BEGIN
    SELECT * INTO deletedPost FROM postTable WHERE postTable.postId = id;
    DELETE FROM postTable WHERE postTable.postId = id;
    RETURN QUERY SELECT deletedPost.postId, deletedPost.namePost, deletedPost.description;
END;
$$ LANGUAGE plpgsql;