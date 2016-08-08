import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;


public class CharacterConcordance {




	/**
	 * calculating CC
	 * @param input is String contains string
	 * @return a Map with counter of character
	 * */
	public Map<Character, Set<Integer>> characterConcordance(String input) {

		Map<Character, Set<Integer>> concordance = new HashMap<Character, Set<Integer>>();

		if(input == null || input.trim().length()==0){

			gotException("Input String is null ");

		}
		else{	
			for (int i = 0; i < input.length(); i++) {

				char charAt = input.charAt(i);

				if (charAt == ' ') {

					continue; // ignore spaces

				}

				Set<Integer> set= concordance.get(charAt);

				if (set == null) {

					set= new HashSet<Integer>();

				}

				set.add(i + 1); // used (i+1) for 1-indexed positions

				concordance.put(charAt, set);

			}

		}
		return concordance;


	}


	/*
	 * handle exception
	 * */
	public void gotException(String message){

		try{

			throw new MyException(message);

		}catch(MyException e){

			System.out.println(e.getMessage());
			//e.printStackTrace();

		}

	}

	/*
	 * main program to test CC
	 * */

	public static void main(String[] args){

		CharacterConcordance cc = new CharacterConcordance();


		String string = " ";


		System.out.println(""+ cc.characterConcordance("pratap"));

		System.out.println(""+ cc.characterConcordance(string));

		string = null;

		System.out.println(""+ cc.characterConcordance(string));

		if(args.length!=0){

			System.out.println("" +cc.characterConcordance(args[0]) );

		}else{

			cc.gotException("No Command line argument has passed");

		}

	}

}
