CREATE TABLE IF NOT EXISTS tablestatus (
  status_id SERIAL,
  name varchar(20) NOT NULL,
  PRIMARY KEY (status_id)
);

-- Creation of product table
CREATE TABLE IF NOT EXISTS users (
   user_id SERIAL,
   name varchar(50) NOT NULL,
   email_user varchar(50),
   status_id INT DEFAULT 1,
   password varchar(254) NOT NULL,
   PRIMARY KEY (user_id, email_user),
   FOREIGN key (status_id) REFERENCES tablestatus(status_id)
);


create or replace function public.fn_create_user(fn_name varchar, fn_email varchar, fn_password varchar)
returns int
language plpgsql
as
$$
declare
	validate_email integer;
	answer integer;
begin
	select count(*) into validate_email from users where email_user = fn_email;
	if validate_email = 1 then
	return 0;
	end if;
	INSERT INTO users (name, email_user, password)
	values(fn_name, fn_email, fn_password);
	return 1;
end;
$$;

create or replace function public.fn_update_user(fn_id integer ,fn_name varchar, fn_email varchar, fn_password varchar, fn_status integer)
returns int
language plpgsql
as
$$
declare
validate_email integer;
validate_id integer;
begin
	select count(*) into validate_email from users where email_user = fn_email;
	if validate_email = 1 then
		select count(*) into validate_id from users where user_id = fn_id;
		if  validate_id = 1 then
			return 2;
		end if;
		return 0;
	end if;
	UPDATE users SET name = fn_name, email_user = fn_email, password = fn_password, status_id = fn_status
	WHERE user_id = fn_id;
   return 1;
end;
$$;

create or replace function public.fn_eliminate_user(fn_id integer )
returns int
language plpgsql
as
$$
declare
begin
	UPDATE users SET status_id = 3
	WHERE user_id = fn_id;
	
   return 1;
end;
$$;

Insert into tablestatus (name) values ('Activo');
Insert into tablestatus (name) values ('Inactivivo');
Insert into tablestatus (name) values ('Eliminado');

select * from public.fn_create_user('Luis', 'luis@gmail.com', 'dddd');
select * from public.fn_update_user(1,'Fernando', 'luis@gmail.com', 'dddd',2);
select * from public.fn_eliminate_user(1);

create or replace function public.fn_update_user(fn_id integer , fn_name varchar, fn_email varchar, fn_password varchar, fn_status integer)
returns int
language plpgsql
as
$$
declare
validate_email integer;
validate_id integer;
begin
	select count(*) into validate_email from users where email_user = fn_email;
	if validate_email = 1 then
		select count(*) into validate_id from users where user_id = fn_id;
		if  validate_id = 1 then
			return 0;
		end if;
		return 0;
	end if;
	UPDATE users SET name = fn_name, email_user = fn_email, password = fn_password, status_id = fn_status
	WHERE user_id = fn_id;
   return 1;
end;
$$;


create or replace function public.fn_getEmail_user(fn_email varchar)
returns int
language plpgsql
as
$$
declare
begin
	return (select count(*) from users where email_user = fn_email);
end;
$$;


