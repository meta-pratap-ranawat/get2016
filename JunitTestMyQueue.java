/**
 * this application is Junit test for MyQueue
 * @author pratap
 * */
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


public class JunitTestMyQueue {

	MyQueue<Integer>myQueue;
	
	Integer exceptedOutput;
	
	@Before
	public void setUp() throws Exception {
		
		myQueue = new MyQueue<Integer>(); 			//default size will be 10
		
		myQueue.add(4);	myQueue.add(4);	myQueue.add(4);	myQueue.add(4);	myQueue.add(4);	
		myQueue.add(6);	myQueue.add(4); myQueue.add(4); myQueue.add(4); myQueue.add(4);
		
		exceptedOutput = 6;
	}

	@Test
	public void test() {
		
		assertFalse(myQueue.add(5));				// check overflow condition while adding new element to queue
		
		myQueue.remove();	myQueue.remove();	myQueue.remove();	myQueue.remove();	myQueue.remove();
		
		assertEquals(exceptedOutput, myQueue.peek());		// check for front element from Queue
		
		myQueue.remove(); myQueue.remove(); myQueue.remove(); myQueue.remove(); myQueue.remove();
		
		assertEquals(null,myQueue.remove());		// checks underflow condition while removing element from queue
		
		assertEquals(null, myQueue.peek());		// check for front element from Queue but queue is empty 
		
	}

}
