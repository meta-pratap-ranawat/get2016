/** modifation in data in lis
@author pratap
*/



SELECT * FROM members;


SET SQL_SAFE_UPDATES = 0;

UPDATE members SET addressline2 = 'Jaipur';

SET SQL_SAFE_UPDATES = 1;



UPDATE members SET addressline1 = 'EPIP, Sitapura' WHERE categroy='F' ;



DELETE FROM publishers;


/** data insertion through variable substitution in publisher */
 SET @id = '1';
SET @name = 'TMH';
INSERT INTO publishers VALUES ( @id, @name );

SET @id = '2';
SET @name = 'Oracle Publications';
INSERT INTO publishers VALUES ( @id, @name );

SET @id = '3';
SET @name = 'Salesforce';
INSERT INTO publishers VALUES ( @id, @name );

SET @id = '4';
SET @name = 'pEARSON';
INSERT INTO publishers VALUES ( @id, @name );

SET @id = '5';
SET @name = 'Genius Publications';
INSERT INTO publishers VALUES ( @id, @name );


SELECT * FROM publishers;



/** deleting record from title with publisher is 1 */
SELECT publisher_id FROM titles;

SET SQL_SAFE_UPDATES = 0;

DELETE  FROM titles WHERE publisher_id = 1; 

SET SQL_SAFE_UPDATES = 1;

SELECT publisher_id FROM titles;