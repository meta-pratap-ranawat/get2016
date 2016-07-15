import static org.junit.Assert.*;



import org.junit.Before;
import org.junit.Test;


public class TestLongestSequence {
	
	LongestSequence ls;
	int[] expectedOutput;int[] input;

	@Before
	public void setUp() throws Exception {
		expectedOutput = new int[] {1,2,4,5,6,7,8,9}; // output
		ls = new LongestSequence();
		input = new int[] {1,2,3,2,3,4,5,3,4,2,2,3,4,5,6,7,8,1,2,4,5,6,7,8,9}; //input
	}

	@Test
	public void test() {
		assertArrayEquals(expectedOutput,ls.longestSequence(input) );
	}

}
