/*
 * this program is application to remove duplicate element from array
 * */
import java.util.Arrays;

public class RemoveDuplicateArray {
	
	public  int[] removeDuplicates(int[] duplicateInArray){
	    int end = duplicateInArray.length;

	    for (int i = 0; i < end; i++) {
	        for (int j = i + 1; j < end; j++) {
	            if (duplicateInArray[i] == duplicateInArray[j]) {                  
	               /*if two elements are same at location i and j 
	                * then jth element will be replaced by end element
	                * array size (end) will be decreased by one
	                */
	                duplicateInArray[j] = duplicateInArray[end-1];
	                end--;
	                j--;
	            }
	        }
	    }
          //creating new array for copying  elements from duplicateInArray upto end index
	    int[] updatedArray = new int[end];
	    //copying duplicatedArray to updatedArray for return array
	    for(int i = 0; i < end; i++){
	        updatedArray[i] = duplicateInArray[i];
	    }   
	    Arrays.sort(updatedArray);
	    return updatedArray;
	}

}
