create table parties (
    id integer auto_increment primary key,
    name varchar(30) not null,
    description text
);

create table candidates (
    id integer auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    industry_connected boolean not null
);