/** 
Assignment 3
*/

USE lis;

/** Question 1 */

SELECT (select count(member_nm) from members where categroy = 'F') AS 'Faculty', 
        (select count(member_nm) from members where categroy = 'S') AS 'Sutdent',
        (select count(member_nm) from members where NOT (categroy = 'F' OR  categroy = 'S')  ) AS 'Other';
        

/**  Question 2 */

SELECT t.title_nm, COUNT(b.title_id) AS 'Issued Copy' FROM book_issue i JOIN books b ON i.accession_no = b.accession_no
JOIN titles t ON t.title_id = b.title_id GROUP BY t.title_nm HAVING COUNT(b.title_id)>2;



/** Question 3 */

SELECT m.member_nm AS 'name', i.accession_no AS 'Book Number', i.issue_dt AS 'Issued on', i.due_dt AS 'Due Date' 
FROM book_issue i JOIN members m ON m.member_id = i.member_id WHERE NOT m.categroy = 'F' ORDER BY m.member_nm;



/** Question 4 */

SELECT a.author_id AS 'Author ID', a.author_nm AS 'Author Name', COUNT(a.author_id) AS 'Number of Books' FROM author a JOIN title_author ta ON ta.author_id = a.author_id
JOIN books b ON b.title_id = ta.title_id GROUP BY a.author_id, a.author_nm HAVING COUNT(a.author_id)>=1;