create database if not exists eCommerce;

use eCommerce;

create table products(

    product_id varchar(10),
    
    product_nm varchar(40) not null,
    
    parent_id varchar(10),
    
    primary key(product_id),
    
    foreign key(parent_id) references products(product_id)

);


insert into products (product_id, product_nm) values('MT','Mobiles & Tablets');

    insert into products (product_id, product_nm,parent_id) values('M','Mobile','MT');
    
        insert into products (product_id, product_nm,parent_id) values('MSP','Smart Phones','M');
        insert into products (product_id, product_nm,parent_id) values('MFP','Featured Phones','M');    

    insert into products (product_id, product_nm,parent_id) values('T','Tablets','MT');
    
        insert into products (product_id, product_nm,parent_id) values('T2','2G','T');
        insert into products (product_id, product_nm,parent_id) values('T3','3G','T');
        
    insert into products (product_id, product_nm,parent_id) values('MTA','Accessories','MT');

    insert into products (product_id, product_nm,parent_id) values('MTCC','Cases and Covers','MT');


insert into products (product_id, product_nm) values('C','Computers');

    insert into products (product_id, product_nm,parent_id) values('CD','Desktop','C');

    insert into products (product_id, product_nm,parent_id) values('CL','Laptop','C');

    insert into products (product_id, product_nm,parent_id) values('CLA','Laptop Accessories','C');
    
        insert into products (product_id, product_nm,parent_id) values('CLAK','Keyboard','CLA');
        insert into products (product_id, product_nm,parent_id) values('CLAM','Mouse','CLA');
        insert into products (product_id, product_nm,parent_id) values('CLAH','HeadPhones','CLA');
        
    insert into products (product_id, product_nm,parent_id) values('CP','Printers','C');
    
        insert into products (product_id, product_nm,parent_id) values('CPI','InkJey','CP');
        insert into products (product_id, product_nm,parent_id) values('CPL','Laser','CP');


insert into products (product_id, product_nm) values('HA','Home Appliances');

    insert into products (product_id, product_nm,parent_id) values('HATV','Tele Vision','HA');
    
        insert into products (product_id, product_nm,parent_id) values('HATVLE','LED','HATV');
        insert into products (product_id, product_nm,parent_id) values('HATVLC','LCD','HATV');
        insert into products (product_id, product_nm,parent_id) values('HATVP','Plasma','HATV');
        
    insert into products (product_id, product_nm,parent_id) values('HAAC','Air Conditioners','HA');

    insert into products (product_id, product_nm,parent_id) values('HAWM','Washing Machines','HA');
    
        insert into products (product_id, product_nm,parent_id) values('HAWMF','Full Automatic','HAWM');
        
            insert into products (product_id, product_nm,parent_id) values('HAWMFT','Top Load','HAWMF');
            insert into products (product_id, product_nm,parent_id) values('HAWMFF','Front Load','HAWMF');
            
        insert into products (product_id, product_nm,parent_id) values('HAWMS','Semi Automatic','HAWM');
        
  
select c.product_nm, ifnull(p.product_nm,'Top Category') as 'Parent Category' from products c left join products p 
on c.parent_id = p.product_id order by p.product_nm;

select product_nm from products where parent_id is null;
 
