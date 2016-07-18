import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


public class TestSearchAndSort {

	SearchAndSort sas;
	int[] arr;
	@Before
	public void setUp() throws Exception {
		sas = new SearchAndSort();
		
		arr= new int[]{1,2,3,4,5,6,7,8,9};
	}

	@Test
	public void test() {
		assertEquals(8, sas.linearSearch(arr, 8, 0));
		
		assertEquals(8, sas.binarySearch(arr, 8, 0,arr.length));
	}

}
