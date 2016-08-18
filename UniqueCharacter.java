import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;


public class UniqueCharacter {

	Map<String, Set<Character>> uniqueCharacter;		// store unique character of string key is string and value is set of unique character

	/*
	 * default initialization
	 * */
	public UniqueCharacter() {

		uniqueCharacter = new HashMap<String, Set<Character>>();
	}


	/**
	 * calculate  unique character from string if not in cache else return from cache
	 * @param String input
	 * @return number of unique character in that string throw exception if string is null or white space (i.e. " ")
	 * */
	public int getNumberOfUniqueCharacter(String input) {



		if(input == null || input.trim().length()==0){

			gotException("Input String is null ");
			return 0;

		}
		else{	

			//Integer  keyValue= uniqueCharacter.get(input).size();

			Set<Character> set = uniqueCharacter.get(input);
			if (set == null) {

				set= new HashSet<Character>();


				for(int i=0;i<input.length();i++){

					if(input.charAt(i)!=' '){

						set.add(input.charAt(i));

					}

				}


				uniqueCharacter.put(input, set);

				return uniqueCharacter.get(input).size();
				
			}else {
				
				return uniqueCharacter.get(input).size();
				
			}
		}

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


	public static void main(String[] args) {

		UniqueCharacter uc = new UniqueCharacter();

		System.out.println(" "+ uc.getNumberOfUniqueCharacter("pratap"));
		
		System.out.println(" "+ uc.getNumberOfUniqueCharacter("pratap"));
		
		System.out.println(" "+ uc.getNumberOfUniqueCharacter("vijay"));
		
		System.out.println(" "+ uc.getNumberOfUniqueCharacter(""));
		// TODO Auto-generated method stub

	}

}
