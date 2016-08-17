/**Assigment 1*/
use lis;

/**
Question 1
*/
SELECT m.member_nm AS 'name', r.member_id AS 'ID',title_nm AS 'book title', r.accession_no AS 'book number', r.issue_dt AS 'issued on', i.due_dt AS 'due by', DATEDIFF(r.return_dt,r.issue_dt)/30 AS 'issued for(months)' 
FROM book_return r LEFT JOIN members m ON r.member_id = m.member_id JOIN book_issue i 
ON i.issue_dt = r.issue_dt AND i.accession_no = r.accession_no AND r.member_id = i.member_id 
JOIN books b ON b.accession_no = r.accession_no
JOIN titles t ON b.title_id = t.title_id WHERE DATEDIFF(r.return_dt,r.issue_dt)>60 ORDER BY m.member_nm, t.title_nm;


/**
Question 2
*/
SELECT member_nm, LENGTH(member_nm) FROM members WHERE LENGTH(member_nm) >=(SELECT MAX(LENGTH(member_nm)) FROM members   );


/**
Question 3
*/
SELECT COUNT(accession_no) FROM book_issue;
