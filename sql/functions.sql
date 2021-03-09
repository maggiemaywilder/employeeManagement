-- Note to self: enter full_name(first_name, last_name) after SELECT (in query) to call this function --

CREATE FUNCTION full_name(first_name VARCHAR(30), last_name VARCHAR(30))
RETURNS VARCHAR(65) DETERMINISTIC
RETURN CONCAT(first_name, ' ', last_name);
