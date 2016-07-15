/*
 *  this program is application for finding longest increasing Sequence from array
 * */


public class LongestSequence {

	  int[] longestSequence(int[] input){
		
		int counter = 1,lengthSeq = 0,beginOfSequence = 0,beginIndexOfLongestSeq = 0;
		for( int i = 1; i < input.length; i++ ){
			/*if elements are in increasing order then increasing counter 
			 * else set counter to 1 and reset sequence begin
			 * */
			if(input[i-1]<input[i]){
				counter++;
			}
			else{
				beginOfSequence = i;
				counter = 1;
				}
			/*
			 *  updating longestSequence with new one if counter is large enough
			 * */
			if( lengthSeq < counter ){
				beginIndexOfLongestSeq = beginOfSequence;
				lengthSeq = counter;
			} 
		}
		
		
		 int[] updatedArray = new int[lengthSeq];
		 int m=0;
		 /*
		  *  copying selected range of input Array to new Array (updatedArray)
		  * */
		for(int i = beginIndexOfLongestSeq; i < beginIndexOfLongestSeq+lengthSeq; i++){
		    updatedArray[m++] = input[i];
		}   
		   
		return updatedArray;
	}
	 
}
