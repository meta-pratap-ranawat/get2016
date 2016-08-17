/** Assignment 2 */

use lis;


/**
Question 1
*/
SELECT s.subject_nm,s.subject_id,COUNT(t.title_id) FROM 
books b JOIN titles t ON b.title_id = t.title_id
JOIN subjects s ON  s.subject_id = t.subject_id GROUP BY s.subject_nm,s.subject_id;

/**
Question 2
*/
SELECT issue_dt, accession_no, member_id, due_dt FROM book_issue WHERE DATEDIFF(due_dt,issue_dt)>60; 


/**
Question 3
*/
SELECT accession_no, title_id, purchase_id, price, status FROM books WHERE price >(SELECT MIN(price) FROM books   );
