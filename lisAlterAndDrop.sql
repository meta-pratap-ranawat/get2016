/** operation on LIS
@author pratap
*/
USE lis;


/**  showing all tables of lis*/
SHOW TABLES;


/** altering issue_dt and due_dt of book_issue table */
ALTER TABLE book_issue ALTER  issue_dt SET DEFAULT CURDATE();

ALTER TABLE book_issue ALTER  due_dt SET DEFAULT DATE_ADD(issue_dt,INTERVAL 15 DAY);



/** droping members table
before that removing forien key check 
after droping adding forien key check
*/
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS members;

SET FOREIGN_KEY_CHECKS = 1;


/** creation of members again */
CREATE TABLE IF NOT EXISTS members(

    member_id VARCHAR(20) NOT NULL,
    
    member_nm VARCHAR(20) NOT NULL,
    
    addressline1 VARCHAR(20)  NOT NULL,
    
    addressline2 VARCHAR(20),

    categroy VARCHAR(20),
    
    PRIMARY KEY(member_id)

);