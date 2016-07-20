import java.util.List;
import java.util.ArrayList;

public class Permutation {
	
	public List<String> permutationOfString;
	
	public Permutation(){
	    permutationOfString = new ArrayList<String>();
	}
	
	public void generatePermutation(String input, int start, int end){
		if(start == end){
			permutationOfString.add(input);
		}
		else{
			
			for (int i = start; i <= end; i++)
		       {
		           input = swap(input,start, i);
		           generatePermutation(input, start+1, end);
		           input =  swap(input,start, i); //backtrack rearranging word to previous position
		       }
			
		}
		
	}
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
