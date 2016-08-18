/**
 * Custom Exception class
 * @author pratap
 * */

public class MyException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/*
	 * MyException constructor with void/null passing to
	 * Exception class constructor 
	 * */
	public MyException(){
		super();
	}
	
	/*
	 * MyException constructor with message passing to
	 * Exception class constructor 
	 * */
	public MyException(String msg){
		super(msg);
	}
}