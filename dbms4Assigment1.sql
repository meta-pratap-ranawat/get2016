/** Assignment 1*/

USE lis;


/** Question 1 */
SELECT member_nm AS 'Name' FROM members WHERE categroy = ( SELECT categroy FROM members WHERE member_nm ='Pratap');

SELECT * FROM book_issue;

/** Question 2 */
SELECT i.issue_dt AS 'issued on',m.member_nm AS 'Issued to', t.title_nm AS 'Book Name', i.due_dt AS 'Due By' 
FROM book_issue i  JOIN members m ON i.member_id = m.member_id 
 JOIN books b ON i.accession_no = b.accession_no 
 JOIN titles t ON t.title_id = b.title_id WHERE  
NOT EXISTS (SELECT * FROM book_return r WHERE i.accession_no = r.accession_no AND i.issue_dt = r.issue_dt AND i.member_id = r.member_id); 


/** Question 3 */
SELECT i.issue_dt AS 'issued on',m.member_nm AS 'Issued to', t.title_nm AS 'Book Name', i.due_dt AS 'Due Date' 
FROM book_issue i  LEFT JOIN members m ON i.member_id = m.member_id 
 LEFT JOIN books b ON i.accession_no = b.accession_no 
LEFT JOIN titles t ON t.title_id = b.title_id WHERE  
 EXISTS (SELECT * FROM book_return r WHERE i.accession_no = r.accession_no AND i.issue_dt = r.issue_dt AND i.member_id = r.member_id AND r.return_dt>i.due_dt);
 
 
 /** Question 4 */
 SELECT b.title_id FROM books b  WHERE b.price = (SELECT max(price) FROM books);
 
 /** Question 5 */
SELECT max(price) FROM books WHERE price NOT IN( SELECT max(price) FROM books ); 