/**
 * this is Junit test for CharacterConcordance
 * @author pratap
 * 
 * */
import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;


public class JunitTestCharacaterConcordance {

	CharacterConcordance cc;
	Map<Character, Set<Integer>> exceptedOutput;
	Map<Character, Set<Integer>> output;
	String string;
	@Before
	public void setUp() throws Exception {

		output = new HashMap<Character, Set<Integer>>();
		exceptedOutput = new HashMap<Character, Set<Integer>>();
		cc = new CharacterConcordance();


		string = " ";


	}

	@Test
	public void test() {

		output = cc.characterConcordance(string);	// string value is white space so function will throw exception and  return empty map 

		assertTrue(exceptedOutput.equals(output)); // comparing two empty HashMap

		output = cc.characterConcordance(null); // string value is null so function will throw exception and return empty map

		assertTrue(exceptedOutput.equals(output));

		/**/
		char key; 
		Set<Integer> set= new HashSet<Integer>();

		set.add(1);		set.add(6);		key = 'p';
		exceptedOutput.put(key,set);
		//set.clear();

		Set<Integer> set1= new HashSet<Integer>();
		set1.add(3);		set1.add(5);		key = 'a';
		exceptedOutput.put(key,set1);
		//set.clear();

		Set<Integer> set2= new HashSet<Integer>();
		set2.add(2);		key = 'r';		
		exceptedOutput.put(key,set2);
		//set.clear();

		Set<Integer> set3= new HashSet<Integer>();
		set3.add(4);		key = 't';		
		exceptedOutput.put(key,set3);
		//set.clear();


		System.out.println(" "+exceptedOutput);

		assertTrue(exceptedOutput.equals(output));
	}

}
