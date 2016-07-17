
/*
 * this program is Junit application for testing FCFS scheduling result
 * */

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


public class TestFCFS {
	
	FCFS sh;
	 int[] arrivalTime,jobSize;
			 int expectedOutput[][];
	
	@Before
	public void setUp() throws Exception {
		
		 sh = new FCFS();
		  arrivalTime = new int[]{ 1, 5, 9, 25 };
			 jobSize = new int[]{ 12, 7, 2, 5 };
			 expectedOutput = new int[][]  { { 1, 1, 0, 1, 12 }, 
					 			{ 2, 5, 8, 13, 19 },
					 			{ 3, 9, 11, 20, 21 }, 
					 			{ 4, 25, 0, 25, 29 } };
	}

	@Test
	public void testFcfsScheduling() {
		
		
		
			assertArrayEquals(expectedOutput, sh.fcfsScheduling(arrivalTime, jobSize));
		
	}

}
