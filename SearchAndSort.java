/*
 * this application is containing two operation on array
 *  1. Search ( linear search and binary search )
 *  2. Sort   ( quick sort )
 * */
public class SearchAndSort {
	
	/*
	 * linear search by using recursion
	 * */
	public  int linearSearch(int[] array, int searchElement, int searchIndex){
		
		if( searchIndex < array.length ){  // checking searchIndex lies in array or not
			if( array[searchIndex] == searchElement){  // checking searchIndex element is serachElement or not
				return array[searchIndex];
			}
			else{
				return linearSearch(array,searchElement,searchIndex+1);
			}
		}
		return -1; // if searchElement not found in array
	}
	
	
	/*
	 * binary search using recursion 
	 *  Assumption is that input array is already sorted
	 * */
	public  int binarySearch(int[] array, int searchElement, int begin, int end){
		
		if(begin <= end){			// checking searchIndex lies in array or not
			int mid = (begin+end)/2;
			if(array[mid] == searchElement){  // checking searchIndex element is serachElement or not
				return array[mid];
			}
			else if(array[mid] > searchElement){  // if searchElement lies in left half 
				return binarySearch(array, searchElement, begin, mid-1);
			}
			else{
				return binarySearch(array, searchElement, mid+1, end); // if searchElement lies in right half
			}
		}
		return -1;   // if searchElement not found in array 
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[] arr;
		arr= new int[]{3,4,1,9,5,8};
		//System.out.println("linear "+ linearSearch(arr,8,0) );
	//	System.out.println("binary "+ binarySearch(arr,8,0,arr.length-1) );

	}

}
