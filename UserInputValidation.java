/*
 * this application for user input validation
 * it contain two function
 * 1. isString()
 * 2. isInteger()
 * */
import java.util.Scanner;

public class UserInputValidation extends MyException {
	
	
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Scanner sc;
	/*
	 * input value is string or not 
	 * if input is string return true else return false
	 * 
	 * 
	 * */
	 public UserInputValidation(){
		 
		 sc = new Scanner(System.in);
	 }
	 
	 /*
	  * getting input and checking input is valid for not
	  * */
	 public Integer getInteger(){
		 String num;
		 do{
			 num = sc.next();
			 
		 }while(!isInteger(num));
		 
		 return Integer.parseInt(num);
		 
	 }
	 
	 
	 
	 /*
	  * getting input and checking input is valid for not
	  * */
	 public String getString(){
		 
		 String num;
		 do{
			 num = sc.next();
			 
		 }while(!isString(num));
		 
		 return num;
		 
	 }
	 
	boolean isString( String input){
		
		 sc = new Scanner(input);
		int num;
		try{
			if(sc.hasNextInt())
			{ num = sc.nextInt();
			 
              throw new MyException("Entered Number is Not String");
			}
		}
		
		catch(MyException e){
			return false;
			}
		
		finally{
			
		}
		return true;
	}
	
	
	/*
	 * input value is Integer or not 
	 * if input is Integer return true else return false
	 * */
	boolean isInteger( String input){
		
		 sc = new Scanner(input);
		String st;
		try{
			if(!sc.hasNextInt())
			{ st = sc.next();
              throw new MyException("Entered Number is Not Integer");
			}
		}
		catch(MyException e){
			return false;
		}
		finally{
			//sc.close();
		}
		return true;
	}
	

}
