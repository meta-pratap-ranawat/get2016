/**  
   inserting data into lis 
   @author pratap
*/

INSERT INTO members(member_id,member_nm,addressline1,addressline2,categroy)VALUES(1,'Pratap','Durgapura','Jaipur','S');
INSERT INTO members(member_id,member_nm,addressline1,addressline2,categroy)VALUES(2,'Krishan','MalviyaNagar','Jaipur','S');
INSERT INTO members(member_id,member_nm,addressline1,addressline2,categroy)VALUES(3,'Monika','RKCOLONY','BHL','F');

INSERT INTO author VALUES('101','Sudarshan');
INSERT INTO author VALUES('102','Shaumn');
INSERT INTO author VALUES('103','Korth');
INSERT INTO author VALUES('104','HorowitzSahani');


INSERT INTO publishers VALUES(1011,'New Moon books');
INSERT INTO publishers VALUES(1012,'Heaven havelies');
INSERT INTO publishers VALUES(1013,'Riya Publishers');


INSERT INTO subjects VALUES(10111,'Economics');
INSERT INTO subjects VALUES(10121,'History');
INSERT INTO subjects VALUES(10131,'Journalism');
INSERT INTO subjects VALUES(10141,'Engineering');
INSERT INTO subjects VALUES(10151,'Politics');

INSERT INTO titles VALUES('B101','Economics of science',10111,1011);
INSERT INTO titles VALUES('B102','Magic of engineering',10141,1013);
INSERT INTO titles VALUES('B103','Facts of engineering',10141,1013);
INSERT INTO titles VALUES('B104','How to be journlist',10131,1013);
INSERT INTO titles VALUES('B105','war of politicians',10151,1012);

INSERT INTO title_author VALUES('B101',101);
INSERT INTO title_author VALUES('B102',102);
INSERT INTO title_author VALUES('B102',103);
INSERT INTO title_author VALUES('B103',104);

INSERT INTO books VALUES(12343,'B101','2016-01-10',1500,1);
INSERT INTO books VALUES(12345,'B101','2016-01-10',500,1);
INSERT INTO books VALUES(12347,'B102','2016-01-10',700,1);
INSERT INTO books VALUES(12348,'B103','2015-12-09',500,1);
INSERT INTO books VALUES(12349,'B104','2015-11-21',600,1);
INSERT INTO books VALUES(12344,'B101','2016-02-10',1500,1);








INSERT INTO book_issue VALUES(CURDATE(),12347,1,CURDATE()+15);
INSERT INTO book_issue VALUES(CURDATE(),12347,2,CURDATE()+15);
INSERT INTO book_issue VALUES(CURDATE()-2,12346,2,CURDATE()-2+15);
INSERT INTO book_issue VALUES(CURDATE()-3,12348,4,CURDATE()-3+15);
INSERT INTO book_issue VALUES(CURDATE()-10,12349,1,CURDATE()-10+15);



INSERT INTO book_return VALUES('2016-08-21 00:00:00',12349,1,'2016-08-00 00:00:00');
INSERT INTO book_return VALUES('2016-08-24 00:00:00',12346,2,'2016-08-08 00:00:00');
INSERT INTO book_return VALUES('2016-08-23 00:00:00',12348,4,'2016-08-07 00:00:00');

/** showing all tables */

SELECT * FROM members;

SELECT * FROM books;

SELECT * FROM titles;

SELECT * FROM title_author;

SELECT * FROM author;

SELECT * FROM book_issue;

SELECT * FROM book_return;

SELECT * FROM subjects;

SELECT * FROM publishers;