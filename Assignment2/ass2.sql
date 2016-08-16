/**
assignment 2 rewritten Query for Question 9 order by with member_nm
*/
SELECT i.member_id as 'issued by',m.member_nm as 'name', i.issue_dt as 'issued date', i.accession_no as 'book number',r.return_dt as 'return on'  
FROM book_issue i LEFT JOIN book_return r  
ON i.issue_dt = r.issue_dt AND i.accession_no = r.accession_no AND i.member_id = r.member_id 
JOIN members m ON i.member_id = m.member_id ORDER BY i.member_id,m.member_nm;
