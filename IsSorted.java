/*
 *  this program is application for checking that array is sorted in which way
 * */
public class IsSorted {

	public  int isSorted(int[] input){
		    //checking for descending order
		if(input[0] > input[1]){
			for(int i=2; i<input.length; i++){
				if( input[i] > input[i-1] ) return 0; // for unordered array
			}
			return 2;
		}
		else{
			//checking for ascending order
			for(int i=2; i<input.length; i++){
				if( input[i] < input[i-1] ) return 0;  // for unordered array
			}
			return 1;
			
		}
		
	}
	
}
