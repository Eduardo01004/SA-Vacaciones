use db;
CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    nombre CHAR(30) NOT NULL,
     PRIMARY KEY (id)
);

INSERT INTO user (nombre) values ("Eduardo");
INSERT INTO user (nombre) values ("Saul");