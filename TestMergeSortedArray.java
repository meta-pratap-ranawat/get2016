/*
 * this program is Junit application for testing MergeSortedArray.java
 * MergeSortedArray correctly joining two array or not
 * */
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


public class TestMergeSortedArray {
	
	MergeSortedArray msa;
	int[] a,b,c;
	@Before
	public void setUp() throws Exception {
		msa = new MergeSortedArray();
		 a = new int[]{1,3,5,7,9,11,13};
		 b = new int[]{2,4,6,8,10,12,14};
		 c = new int[]{1,2,3,4,5,6,7,8,9,10,11,12,13,14};
	}

	@Test
	public void test() {
		assertArrayEquals(c,msa.join(a,7,b,7));
	}

}
