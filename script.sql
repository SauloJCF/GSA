create database gsa;

use gsa;

create table user (
	id int AUTO_INCREMENT primary key,
    email varchar(32),
    name varchar(72),
    username varchar(32),
    password varchar(80),
    status int default 1
)ENGINE=InnoDB;

create table specie (
	id int AUTO_INCREMENT PRIMARY key,
    name VARCHAR(72),
    status int default 1
)ENGINE=InnoDB;

create table animal (
	id int AUTO_INCREMENT PRIMARY key,
    name varchar(48),
    birthDate DATETIME,
    idSpecie int,
    sex int,
    img varchar(128),
    idUser int,
    status int default 1,
    constraint fk_specieAnimal FOREIGN KEY (idSpecie)
    references specie(id),
     constraint fk_userAnimal FOREIGN KEY (idUser)
    references user(id)
)ENGINE=InnoDB;

create table vaccine (
	id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(72),
    startOfApplication date,
    endOfApplication date,
    idUser int,
    status int default 1,
     constraint fk_userVaccine FOREIGN KEY (idUser)
    references user(id)
)ENGINE=InnoDB;

create table vaccinated_specie (
    idVaccine int,
    idSpecie int,
    CONSTRAINT fk_vaccine FOREIGN KEY (idVaccine)
    REFERENCES vaccine (id),
    CONSTRAINT fk_specie FOREIGN KEY (idSpecie)
    references specie (id),
    CONSTRAINT pk_vaccinatedSpecie PRIMARY KEY(idVaccine, idSpecie)
)ENGINE=InnoDB; 

create table vaccination_record (
    idAnimal int,
    idVaccine int,
    date date,
    status int default 1,
    CONSTRAINT fk_AnimalRecord FOREIGN KEY (idAnimal)
    REFERENCES animal(id),
    CONSTRAINT fk_VaccineRecord FOREIGN KEY (idVaccine)
    REFERENCES vaccine(id),
    CONSTRAINT pk_vaccinationRecord PRIMARY KEY(idAnimal, idVaccine)
)ENGINE=InnoDB;