/**
 * this application is for sorting using QuickSort
 * @author pratap
 * */


public class QuickSort implements Sort{

	
	/**sorting function 
	 * @param array , starting index, end index
	 * @return sorted array
	 * */
	public int[] sort(int a[], int start, int end) {
		
		if (end - start <= 0) {

			return a;
			
		} else {

			int pivotIndex = partition(a, start, end);

			sort(a, start, pivotIndex - 1);
			
			sort(a, pivotIndex + 1, end);

		}
		return a;
	}
	
	
	/**
	 * partition function
	 * @param  array , starting index, end index
	 * @return pivot Index
	 * */
	private int partition(int a[], int start, int end) {
		
		int t;
		
		int key = a[start];

		while (true) {
			
			while (a[start] < key && start >= 0 && a[start] != key) {
				
				start = start + 1;
				
			}

			while (a[end] > key && a[end] != key) {
				
				end = end - 1;
			}
			
			if (a[start] == a[end] && a[end] == key) {
				
				start = end;

			}
			
			if (start >= end) {
				
				break;
				
			} else {
				
				t = a[start];
				
				a[start] = a[end];
				
				a[end] = t;
				
				if (start == end) {
					
					break;
					
				}

			}
		}

		return start;

	}

	
	/*
	 * main function
	 * */
	public static void main(String args[]) {
		
		QuickSort radix = new QuickSort();
		
		int array[] = { 111, 12, 151, 34, 100, 00, 1, 2, 3, 4, 1000};
		
		radix.sort(array,0,array.length-1);
		
		for (int i = 0; i < array.length; i++) {

			System.out.println(" "+array[i]);
		}
	}
}
