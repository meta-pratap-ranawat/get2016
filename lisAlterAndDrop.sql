USE lis;

SHOW TABLES;

ALTER TABLE book_issue ALTER  issue_dt SET DEFAULT CURDATE();

ALTER TABLE book_issue ALTER  due_dt SET DEFAULT DATE_ADD(issue_dt,INTERVAL 15 DAY);