/** assignment 1 */
USE lis;

/**  Question 1 */
SELECT member_id, member_nm, addressline1, addressline2, categroy FROM members;

/**  Question 2 */
SELECT member_nm, member_id, categroy FROM members;

/**  Question 3 */
SELECT member_nm, member_id, categroy FROM members WHERE categroy='F';

/**  Question 4 */
SELECT DISTINCT categroy FROM members;

/**  Question 5 */
SELECT member_nm, categroy FROM members ORDER BY member_nm DESC;

/**  Question 6 */
SELECT t.title_nm, s.subject_nm, p.publisher_nm FROM titles t, subjects s, publishers p WHERE t.subject_id = s.subject_id and t.publisher_id = p.publisher_id;

/**  Question 7 */
SELECT  categroy, COUNT(categroy) FROM members GROUP BY categroy;

/**  Question 8 */
SELECT m.member_nm FROM members m JOIN members k ON m.categroy = k.categroy WHERE k.member_nm = 'Keshav Sharma';

/**  Question 9 */
SELECT i.member_id as 'issued by', i.issue_dt as 'issued date', i.accession_no as 'book number',r.return_dt as 'return on'  
FROM book_issue i LEFT JOIN book_return r 
ON i.issue_dt = r.issue_dt AND i.accession_no = r.accession_no AND i.member_id = r.member_id ORDER BY i.member_id;
