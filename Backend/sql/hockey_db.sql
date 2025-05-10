-- enum data types

create type team_category as enum (
    'male',
    'female'
);

create type team_league as enum (
    'junior league',
    'first division',
    'premier league'
);

create type event_type as enum (
    'league',
    'friendly',
    'practice',
    'meeting'
);

create type user_role as enum (
    'admin',
    'coach',
    'player'
);

-- users table [role based]
create table users (
    user_id serial primary key,
    first_name varchar(80) not null,
    last_name varchar(80) not null,
    phone varchar(50) not null,
    username varchar(100) not null unique,
    password text not null,
    user_role user_role not null,
    date_created timestamp default current_timestamp,
    team_id int not null references team(team_id)
);

--  users' sub-type table for users referencing team_id [coach, players]
create table team_manager (
    user_id int primary key references users(user_id),
    team_id int not null  references team(team_id)
);

-- team table
create table team (
    team_id serial primary key,
    team_name varchar(100) not null unique,
    contact varchar(100) not null,
    team_address varchar(200),
    category team_category not null,
    league team_league not null,
    logo_url text
);

-- invitations joint table : many to many relationship between users and events
create table user_events_invitations (
    user_events_invitations_id serial primary key,
    events_id int not null references events(event_id),
    user_id int not null references users(user_id)
);

-- events table
create table events (
    event_id serial primary key,
    event_name varchar(100) not null,
    type event_type not null,
    venue varchar(200), 
    date timestamp default current_timestamp,
    description text
);

-- announcements table
create table announcements (
    image_url text,
    heading varchar(200),
    description text,
    date_published date,
    time_published time
);

-- table for storing one time pin codes
create table one_time_pin (
    otp_id serial primary key,
    pin_code int,
    user_id int not null references users(user_id)
);