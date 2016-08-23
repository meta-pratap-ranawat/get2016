/**
 * this application is Containing Task function
 * */
import java.sql.*;
import java.util.*;





public class QueryOperation {

	PreparedStatement statement;
	
	MyConnection myConn;
	
	Connection conn;
		
	ResultSet res;
	
	/**
	 * initialization
	 * */
	public QueryOperation() {
		
		statement = null;
		
		res =null;
		
		myConn = new MyConnection();
		
		conn = myConn.getConnection();
	}
	
	public void close(){
		
		try {
			
			conn.close();
			
		} catch (SQLException e) {
			
			
			e.printStackTrace();
			
		}
	}
	
	
	/**
	 * getting books return by author
	 * @param author name
	 * @return list of object of titles containing book name
	 * */
	public List<Title> getBookByAuthorName(String authorName){
		
		List<Title> myList = new ArrayList<Title>();
		
		String query = new String("SELECT t.title_nm AS 'bookName' FROM titles t "
				+ "JOIN title_author ta ON t.title_id = ta.title_id "
				+ "JOIN author a ON ta.author_id = a.author_id "
				+ "WHERE a.author_nm = ?"); 
		
		try {
			
			statement = conn.prepareStatement(query);
			
			statement.setString(1, authorName);
			
			ResultSet rs=statement.executeQuery();
			
			while(rs.next()){  
			
				myList.add( new Title( rs.getString("bookName") ) );  
				
			} 
			
		} catch (SQLException e) {
			
			e.printStackTrace();
			
		}
		
		return myList;
		
	}

	
	
	/**
	 * checking for book availability in Library
	 * @param book Name
	 * @return true if book is available else false ( book not in library or all books are issued )
	 * */
	public boolean  getBookAvailableStatus(String bookName){
		
		res = null;
		/*
		 * check book available or not in library database
		 * */
		String query = new String("SELECT title_id FROM titles WHERE title_nm = ? "); 
		
		try {
			
			statement = conn.prepareStatement(query);
			
			statement.setString(1, bookName);
			
			if((res = statement.executeQuery()) == null){
			
				return false;
				
			} 
			
		} catch (SQLException e) {
			
			e.printStackTrace();
			
		}
		
		
		/*
		 * checking for book status 
		 * */
		
		 query = new String("SELECT accession_no FROM "
		 		+ "(SELECT accession_no FROM books WHERE title_id = ? )"
		 		+ " JOIN book_issue i ON accession_no = i.accession_no "
		 		+ "JOIN book_return r ON r.accession_no = i.accession_no"
		 		+ "UNION"
		 		+ "SELECT accession_no FROM "
		 		+ "(SELECT accession_no FROM books WHERE title_id = ? )"
		 		+ " WHERE accession_no IN NOT(SELECT accession_no FROM book_issue) "); 
		
		try {
			
			statement = conn.prepareStatement(query);
			
			statement.setString(1, res.getString(1));
			
			statement.setString(2, res.getString(1));
			
			if(statement.executeQuery() != null){
			
				return true;
				
			} 
			
		} catch (SQLException e) {
			
			e.printStackTrace();
			
		}
		
		return false;
	} 
	
	
	/**
	 * deleting book which are not issued for more than one year
	 * 
	 * */
	public Integer deleteBook(){
		
		return deleteBook(364);
	}
	
	
	/*
	 * according to number of days 
	 * */
	private Integer deleteBook(Integer days){
		
		
		int res = 0;
		/*
		 * check book available or not in library database
		 * */
		String query = new String("DELETE FROM books WHERE accession_no "
				+ "NOT IN (SELECT accession_no FROM book_issue b WHERE"
				+ " DATEDIFF(CURDATE(),b.issue_dt)< ? )"); 
		
		try {
			
			statement = conn.prepareStatement(query);
			
			statement.setInt(1, days);
			
			res = statement.executeUpdate();
		
		} catch (SQLException e) {
			
			e.printStackTrace();
			
		}
		
		return res;
	}
	
}
