/*
 * this application for user input validation
 * it contain two function
 * 1. isString()
 * 2. isInteger()
 * */
import java.util.Scanner;

class MyException extends Exception{
	public MyException(){
		super();
	}
	public MyException(String msg){
		super(msg);
	}
}
public class UserInputValidation extends MyException {
	/*
	 * input value is string or not 
	 * if input is string return true else return false
	 * */
	boolean isString( String input){
		
		Scanner sc = new Scanner(input);
		int num;
		try{
			if(sc.hasNextInt())
			{ num = sc.nextInt();
			 
              throw new MyException();
			}
		}
		
		catch(MyException e){
			return false;
			}
		
		finally{
			sc.close();
		}
		return true;
	}
	
	/*
	 * input value is Integer or not 
	 * if input is Integer return true else return false
	 * */
	boolean isInteger( String input){
		
		Scanner sc = new Scanner(input);
		String st;
		try{
			if(!sc.hasNextInt())
			{ st = sc.next();
              throw new MyException();
			}
		}
		catch(MyException e){
			return false;
		}
		finally{
			sc.close();
		}
		return true;
	}
	
	
}
