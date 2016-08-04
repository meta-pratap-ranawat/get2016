/**
 * this application to test stack operation
 * @author pratap
 * */

public class TestMyStack {
	
	public static void main(String[] args){
		
		MyStack<String> stack = new MyStack<String>();
		
		stack.push("Pratap");
		stack.push("element");
		
		System.out.println(" "+stack.peek());
		System.out.println(" "+stack.pop());
		System.out.println(" "+stack.pop());
		System.out.println(" "+stack.pop());   				//throw exception for underflow of exception (in pop() function) 
		
	}

}

