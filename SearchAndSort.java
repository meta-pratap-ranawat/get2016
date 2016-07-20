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
	
	
	/*
	 * Quick Sort using recursion
	 * */
	public  void quickSort(int[] arr, int start, int end){
		if( start>=end ){
			return;
		}
		//getting pivotIndex for partitioning
		int pivotIndex = partition(arr, start, end); 
		
		//Array from start to end is divided into two part
		quickSort(arr, start, pivotIndex-1);
		quickSort(arr,pivotIndex+1, end);
		
	}
	
	/*
	 * partitioning array for recursive call 
	 * and getting pivot element fixed at its location
	 * also giving pivotIndex for next partition
	 * */
	public  int partition(int[] arr, int start, int end){
		
		int pivot = arr[end],i;
		int pivotIndex = start;
		
		for( i=start;i<end;i++){
			if(arr[i]<=pivot){
				
				swap(arr,i, pivotIndex);
				
				pivotIndex++;
			}
		}
		
		swap(arr, pivotIndex, end);
	
		return pivotIndex;
	}
	
	/* 
	 * Swapping two element of array
	 *  */
	public  void swap(int[] arr,int index1, int index2){
		
		int temp = arr[index1];
		arr[index1]=arr[index2];
		arr[index2]= temp;
	}

}
