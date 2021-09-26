drop table if exists candidates;
drop table if exists parties;

create table parties (
    id integer auto_increment primary key,
    name varchar(30) not null,
    description text
);

create table candidates (
    id integer auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    party_id integer,
    industry_connected boolean not null,
    constraint fk_party foreign key (party_id) references parties(id) on delete set null
);