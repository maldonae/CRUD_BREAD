create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

insert into item(id, title, user_id)
values
  (1, "Stuff", 1),
  (2, "Doodads", 1);

create table category (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null unique
);

create table program (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  synopsis text null,
  poster varchar(255) null,
  country varchar(100) null,
  year int null,
  category_id int unsigned null,
  foreign key(category_id) references category(id)
);

insert into category(id, name)
values
  (1, "Comédie"),
  (2, "Science-Fiction");

insert into program
  (
    id,
    title,
    synopsis,
    poster,
    country,
    year,
    category_id
  )
values
  (
    1,
    "The Good Place",
    "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    "USA",
    2016,
    1
  ),
  (
    2,
    "Dark",
    "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    "Allemagne",
    2017,
    2
  );
