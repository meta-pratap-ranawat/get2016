/*
 * this program is Junit application for testing IsSorted.java
 * it contains all 3 test cases in it
 * */
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


public class TestIsSorted {

	IsSorted ls;
	int[][] input;

	@Before
	public void setUp() throws Exception {
		
		ls = new IsSorted();
		input = new int[][] { {1,2,4,5,6,7,8,9},
								{9,8,7,6,5,4,2,1},
								{1,9,4,3,7,2,8,7} }; //input
	}

	@Test
	public void test() {
		
		assertEquals("Ascending Sorted Array",1,ls.isSorted(input[0]) );
		assertEquals("descending Sorted Array",2,ls.isSorted(input[1]) );
		assertEquals("Unordered Array",0,ls.isSorted(input[2]) );
	}

}
