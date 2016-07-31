package DS2;

public class TestMyStack {
	
	public static void main(String[] args){
		
		MyStack<String> stack = new MyStack<String>();
		
		stack.push("Pratap");
		stack.push("element");
		
		System.out.println(" "+stack.pop());
		System.out.println(" "+stack.pop());
		System.out.println(" "+stack.pop());   				//throw exception for underflow of exception (in pop() function) 
		
	}

}

