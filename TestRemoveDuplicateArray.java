import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

public class TestRemoveDuplicateArray {
	
	RemoveDuplicateArray rda;
	int[] expectedOutput;int[] input;
	
	@Before
	public void setup(){
		rda= new RemoveDuplicateArray();
		expectedOutput = new int[] {1,2,3,4,5,6};
		Arrays.sort(expectedOutput);
		input = new int[] {1,2,3,4,5,6,6,6,6};
	}
        
	@Test
	public void testRemoveDuplicateArray() {
		assertArrayEquals(expectedOutput,rda.removeDuplicates(input) );
	}

}
