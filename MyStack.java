import java.util.LinkedList;



public class MyStack<E> {
	private MyLinkList<E> myStack;
	private int size; 

	/*
	 * default allocation
	 * */
	public MyStack(){
		myStack = new MyLinkList<E>();
		size =0;
	}


	/*
	 * to get size of stack
	 * */
	public int getSize(){
		return size;
	}



	/*
	 * push function to enter element into stack
	 * */
	public void push(E element){

		myStack.add(0, element);
		size++;

	}


	/*
	 * pop function to get element from top of stack
	 * when no element left in stack throws error with message Stack underFlow
	 * */
	public E pop(){
		E element=null;

		try{
			if(size>0){
				element = myStack.remove(0);
				size--;
			}
			else{
				throw new MyException("Stack underFlow");
			}



		}catch(MyException e){
			
			e.printStackTrace();

		}
		return element;
	}
	
	
	/*
	 * checks that stack is empty or not
	 * */
	public boolean isEmpty(){
		if(size>0){
			return false;
		}
		return true;
	}
	
	
	/*
	 * check for top symbol
	 * */
	public E peek(){
		
		return myStack.get(0);
		
	}
	
}