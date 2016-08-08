/**
 * this apllication is to implement Queue using Collection (LinkedList )
 * LinkedList provides direct function to add at first addFirst() and remove at last removeLast()
 * @author pratap
 * */
import java.util.LinkedList;


public class MyQueue<E> {

	private LinkedList<E> queue;
	
	private int tempSize=0,size=10; 			//tempSize is to count current available element in Queue
	
	
	/*
	 *  default Queue with 10 size
	 * */
	public MyQueue() {

		queue = new LinkedList<E>()  ;

	}

	
	/**
	 * Queue with predefine size
	 * @param define size of Queue
	 * */
	public MyQueue(int size){

		queue = new LinkedList<E>()  ;
		
		this.size = size;
	}

	
	/**
	 *  to add element in queue
	 *  @param e to add in queue
	 *  @return if add is successful then return true else false
	 * */
	public boolean add(E e){

		if(tempSize<size){

			queue.addLast(e);tempSize++;
			
			return true;

		}else{

			gotException("Queue OverFlow");
			
			return false;

		}

	}

	
	/**
	 * remove element from fronyt of queue
	 * @return if remove is successful then return removed element else return null
	 * */
	public E remove(){

		if(tempSize>0){
			
			tempSize--;
			
			return queue.removeFirst();

		}else{

			gotException("Queue UnderFlow");
			
			return null;

		}

	}

	
	/**
	 * show first element of Queue
	 * @return if queue is not empty then return element else return null
	 * */
	public E peek(){

		if(tempSize>0){
			
			return queue.getFirst();
			
		}else{

			gotException("Queue UnderFlow");
			
			return null;

		}

	}


	/**
	 * handle exception
	 * @param has message to show why exception occured
	 * */
	public void gotException(String message){

		try{

			throw new MyException(message);

		}catch(MyException e){

			System.out.println(e.getMessage());
			

		}

	}

}
