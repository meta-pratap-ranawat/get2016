import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class TestPermutation {
	
	Permutation perm;
	
	@Before
	public void setUp() throws Exception {
		perm = new Permutation();
	}
	

	@Test
	public void test() {
		perm.generatePermutation("ABC", 0, 2);
		//for(int i=0;i<perm.permutationOfString.size();i++)
		//System.out.println(perm.permutationOfString.get(i));
	}

}
