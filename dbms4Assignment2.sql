/**  Assignment 2 */

USE lis;


/** Question 1 creating view */
CREATE VIEW memberIssue
AS

SELECT m.member_nm, m.member_id, i.issue_dt, i.accession_no, i.due_dt FROM members m 
JOIN book_issue i ON m.member_id = i.member_id; 

SELECT * FROM memberIssue;

/**  Question 2 */

CREATE VIEW memberView 
AS 

SELECT member_nm,member_id, 
CASE categroy 
    WHEN 'F' THEN 'FACULTY' 
    WHEN 'S' THEN 'STUDENT' 
    ELSE 'OTHERS' END  
FROM members;

SELECT * FROM memberView;


/** Question 3 */

CREATE OR REPLACE VIEW overallView
AS
SELECT subject_nm,title_nm,member_nm,categroy,i.issue_dt, return_dt,i.due_dt

FROM book_issue i
 JOIN members m ON i.member_id=m.member_id
 JOIN Books b ON b.accession_no=i.accession_no
 JOIN titles t ON t.title_id= b.title_id
 JOIN subjects s ON s.subject_id=t.subject_id
LEFT JOIN book_return r
ON r.issue_dt = i.issue_dt and i.accession_no=r.accession_no and i.member_id=r.member_id;

SELECT * from overallView;
