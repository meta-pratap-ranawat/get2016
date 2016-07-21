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
	
/*	public static void main(String args[]){
		
		UserInputValidation uiv = new UserInputValidation();
		Scanner sc = new Scanner(System.in);
		String st, num;
		
		 st = sc.next();
		 num = sc.next();
		
		
		
		if(uiv.isString(st)){
			System.out.println("input is String");
		}
		else{
			System.out.println("input is Not String");
		}
		
		if(uiv.isInteger(num)){
			System.out.println("input is Integer");
		}
		else{
			System.out.println("input is Not Integer");
		} 
		sc.close();
	} */
}
