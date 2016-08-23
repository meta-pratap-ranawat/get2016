/**
 * this application is to run task(Assignment)
 * @author pratap
 * */

import java.util.*;


public class MainClass {

	public static void main(String args[]){

		QueryOperation qo = new QueryOperation();

		Scanner sc = new Scanner(System.in);


		/**
		 * Question 1
		 * */
		List<Title> bookList = new ArrayList<Title>();

		System.out.println("Enter author Name");

		String authorName = sc.next();

		bookList = qo.getBookByAuthorName(authorName);

		for(Title lis : bookList){

			System.out.println("bookName: "+lis.getTitleName());
		}

		/**
		 * Question 2
		 * */
		System.out.println("Enter Book Name");

		String bookName = sc.next();
		
		if(qo.getBookAvailableStatus(bookName)){
			
			System.out.println("Book is Available in Library");
			
		} else {
			
			System.out.println("Book is Not Available in Library");
		}
		
		
		/**
		 * Question 3
		 * */
		System.out.println("Number of Book not Issue then More than Year: "
		 +qo.deleteBook() );
		
		
		sc.close();
		qo.close();
	}

}
