CREATE DATABASE IF NOT EXISTS lis;

USE lis;

CREATE TABLE IF NOT EXISTS members(

    member_id VARCHAR(20) NOT NULL,
    
    member_nm VARCHAR(20) NOT NULL,
    
    addressline1 VARCHAR(20)  NOT NULL,
    
    addressline2 VARCHAR(20),

    categroy VARCHAR(20),
    
    PRIMARY KEY(member_id)

);

CREATE TABLE IF NOT EXISTS author(

    author_nm VARCHAR(20) NOT NULL,
    
    author_id VARCHAR(30) NOT NULL,
    
    PRIMARY KEY(author_id)
    
);

CREATE TABLE IF NOT EXISTS publishers(

    publisher_id VARCHAR(20) NOT NULL,
    
    publisher_nm VARCHAR(30) NOT NULL,
    
    PRIMARY KEY(publisher_id)
    
);

CREATE TABLE IF NOT EXISTS subjects(

    subject_id VARCHAR(20) NOT NULL,
    
    subject_nm VARCHAR(100) NOT NULL,
    
    PRIMARY KEY(subject_id)
    
);

CREATE TABLE IF NOT EXISTS titles(

    subject_id VARCHAR(20) NOT NULL,
    
    title_id VARCHAR(20) NOT NULL,
    
    title_nm VARCHAR(20) NOT NULL,
    
    publisher_id VARCHAR(20) NOT NULL,
    
    PRIMARY KEY(title_id),
    
    FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);




CREATE TABLE IF NOT EXISTS title_author(

    title_id VARCHAR(20) NOT NULL,
    
    author_id VARCHAR(30) NOT NULL,
    
    PRIMARY KEY(title_id, author_id),
    
    FOREIGN KEY (author_id) REFERENCES author(author_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
    FOREIGN KEY (title_id) REFERENCES titles(title_id)
    
    ON DELETE CASCADE
    ON UPDATE CASCADE
    
);

CREATE TABLE IF NOT EXISTS books(

    accession_no VARCHAR(20) NOT NULL,
    
    title_id VARCHAR(20) NOT NULL,
    
    purchase_id VARCHAR(20) NOT NULL,
    
    price INTEGER  NOT NULL,
    
    status VARCHAR(10)  NOT NULL,
    
    PRIMARY KEY(accession_no),
    
    FOREIGN KEY (title_id) REFERENCES titles(title_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
   
);

CREATE TABLE IF NOT EXISTS book_issue(

    issue_dt DATETIME  NOT NULL,
    
    due_dt DATETIME  NOT NULL,
        
    accession_no VARCHAR(20) NOT NULL,
    
    member_id VARCHAR(20) NOT NULL,
    
    
    PRIMARY KEY(issue_dt, accession_no, member_id ),
    
    FOREIGN KEY (accession_no) REFERENCES books(accession_no)
    
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
    FOREIGN KEY (member_id) REFERENCES members(member_id)
    
    ON DELETE CASCADE
    ON UPDATE CASCADE
    
    
    
    
);

CREATE TABLE IF NOT EXISTS book_return(

    accession_no VARCHAR(20) NOT NULL,
    
    member_id VARCHAR(20) NOT NULL,
    
    issue_dt DATETIME  NOT NULL,
    
    return_dt DATETIME  NOT NULL,
    
    PRIMARY KEY(return_dt, accession_no, member_id),
    
    FOREIGN KEY (accession_no) REFERENCES books(accession_no)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
    FOREIGN KEY (member_id) REFERENCES members(member_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    
    FOREIGN KEY (issue_dt) REFERENCES book_issue(issue_dt)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    
    
);





