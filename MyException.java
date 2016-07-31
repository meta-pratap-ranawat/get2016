package DS2;

public class MyException extends Exception{

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
