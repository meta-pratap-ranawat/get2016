/*
 * this application is to generate all permutation of string
 * */
import java.util.List;
import java.util.ArrayList;

public class Permutation {
	
	public List<String> permutationOfString;
	public UserInputValidation uiv;
	
	public Permutation(){
	    permutationOfString = new ArrayList<String>();
	    uiv = new UserInputValidation();
	}
	
	public void generatePermutation(String input, Integer start, Integer end){
		
		// checking for valid user input
		if(!uiv.isString(input) || !uiv.isInteger( start.toString() ) || !uiv.isInteger( end.toString() )){
			System.out.println("Arguments are invalid");
		}
		else{
			if(start == end){
				permutationOfString.add(input); // storing result into list
			}
			else{
			
				for (int i = start; i <= end; i++) // looking for all combination
				{
					input = swap(input,start, i);
					generatePermutation(input, start+1, end);
					input =  swap(input,start, i); //backtrack rearranging word to previous position
				}
			
			}
		}
		
	}
	
	/*
	 * swap to element of String from specific indexes index1 and index2
	 * */
	private String swap(String input, int index1, int index2){
		
		char[] inputChar = input.toCharArray();
		char ch = inputChar[index1];
		inputChar[index1] = inputChar[index2];
		inputChar[index2] = ch;
		input = String.valueOf(inputChar);
		return input;
	}
	
	/*public static void main(String args[]){
		Permutation perm = new Permutation();
		perm.generatePermutation("ABC", 0, 2);
		for(int i=0;i<perm.permutationOfString.size();i++)
		System.out.println(perm.permutationOfString.get(i));
		
	}*/
}
