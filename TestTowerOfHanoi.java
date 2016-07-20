/*
 *  this is Junit application to test TowerOfHanoi.java
 * */
import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;


public class TestTowerOfHanoi {

	String source, auxiliary, destination;
	int numberOfDisks;
	String tempString;
	
	List<String> expectedOutput;
	TowerOfHanoi th;
	Scanner sc;
	
	@Before
	public void setUp() throws Exception {
		
		source="A"; auxiliary="B"; destination="C";
		
		
		th = new TowerOfHanoi();
		
		expectedOutput = new ArrayList<String>();
		
		//for input from console created scanner object
		sc = new Scanner(System.in);
		sc.delimiter();
		 /*
		  * getting number of disks (height of Tower Of Hanoi)
		  * */
		numberOfDisks = sc.nextInt();
		
		/*
		 * getting standard moves of disks to compare with output from solve
		 * */
		for(int i=0;i<((int)(Math.pow(2, numberOfDisks))-1);i++){
			
			tempString = "Disk "+sc.next()+" moves from "+sc.next()+" to "+sc.next();
			expectedOutput.add(tempString);  
		}
		
		/*
		 *   test case format will be
		 *   
		 *   numberOfDisks in TowerOfHanoi
		 *   next  (power(2,n) - 1) rows will contain
		 *   numberOfDisk  X Y
		 *   
		 *  sample test case
		 *   
		 *   2
		 *   1 A B
		 *   2 A C
		 *   1 B C
		 *   
		 * */
	}

	@Test
	public void test() {
		th.solve(numberOfDisks, source, destination, auxiliary );
		assertArrayEquals(expectedOutput.toArray(), th.movements.toArray()); // toArray() helps to convert List object to Array Object
		
	}

}
