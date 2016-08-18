/**
 * this appliation is to Junit test for UniqueCharacter
 * @author pratap
 * */

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


public class JunitTestUniqueCharacter {

	
	UniqueCharacter uc;
	
	UserInputValidation uiv;
	
	@Before
	public void setUp() throws Exception {
		
		uc = new UniqueCharacter();

		uiv = new UserInputValidation();
	}

	@Test
	public void test() {
		
		assertEquals(0, uc.getNumberOfUniqueCharacter(""));
		
		assertEquals(0, uc.getNumberOfUniqueCharacter(null));
		
		assertEquals(1, uc.getNumberOfUniqueCharacter("aaaaaaaaa"));
		
		assertEquals(2, uc.getNumberOfUniqueCharacter("aaaabbb"));
		
		assertEquals(8, uc.getNumberOfUniqueCharacter("abcdefgh"));
		
		assertEquals(4, uc.getNumberOfUniqueCharacter("pratap"));
		
		assertEquals(3, uc.getNumberOfUniqueCharacter("Ram"));
		
		assertEquals(8, uc.getNumberOfUniqueCharacter("abcdefgh"));
		
		assertEquals(8, uc.getNumberOfUniqueCharacter("abcdefgh"));
		
		
		/*
		 * User can also test by passing custom input test 
		 * */
		
		System.out.println("enter number of test case you want to test");
		
		Integer T = uiv.getInteger();
		
		while(T-->0){
			
			System.out.println("enter String and different number of different Character");
			
			Integer output = uc.getNumberOfUniqueCharacter(uiv.getString());
			
			Integer exceptedOutput =  uiv.getInteger();
			
			assertEquals(exceptedOutput, output);
			
		}
	}

}
