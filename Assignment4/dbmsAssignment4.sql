/* Assignment 4 */

/* Create database */
CREATE DATABASE address;

/* Selecting Databse */
USE address;
drop database address;
/* Creating Tables */
CREATE TABLE IF NOT EXISTS state (
    state_id VARCHAR(10),
    state_nm VARCHAR(40),
    PRIMARY KEY (state_id,state_nm)
);

CREATE TABLE IF NOT EXISTS city (
    pincode INT(6),
    city_nm VARCHAR(30),
    state_id VARCHAR(10),
    PRIMARY KEY (pincode),
     FOREIGN KEY (state_id) REFERENCES state(state_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* Inserting data into tables */
INSERT INTO state VALUES ('S-001', 'Rajasthan');
INSERT INTO state VALUES ('S-002', 'Jammu & Kashmir');
INSERT INTO state VALUES ('S-003', 'Kerala');
INSERT INTO state VALUES ('S-004', 'Maharashtra');
INSERT INTO state VALUES ('S-005', 'Uttar Pradesh');

INSERT INTO city VALUES (302019, 'Jaipur', 'S-001');
INSERT INTO city VALUES (302001, 'Alwar', 'S-001');
INSERT INTO city VALUES (302058, 'Bisalpur', 'S-001');
INSERT INTO city VALUES (408702, 'Jammu', 'S-002');
INSERT INTO city VALUES (100156, 'Ghatpur', 'S-003');
INSERT INTO city VALUES (100155, 'Trivandram', 'S-003');
INSERT INTO city VALUES (400020, 'Nagpur', 'S-004');
INSERT INTO city VALUES (400005, 'Jamnagar', 'S-004');
INSERT INTO city VALUES (301041, 'Noida', 'S-005');
INSERT INTO city VALUES (301087, 'Gurgaon', 'S-005');
INSERT INTO city VALUES (400001, 'Mumbai', 'S-004');

/* 
* pincode city relaton
 */
SELECT c.pincode AS 'Zip Code', c.city_nm AS 'City Name', s.state_nm AS 'State Name' 
FROM city c INNER JOIN state s ON c.state_id = s.state_id ORDER BY s.state_nm, c.city_nm;