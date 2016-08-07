/**
 * this application is to test binarySearch working
 * @author pratap
 * */
public class TestBinarySearch {

	

	public static void main(String[] args) {
		
		
		/*
		 * for Integer type data(positive test case)
		 * here array is sorted
		 * */
		Integer array[] = new Integer[]{2,2,8,8,8,8,8,9,9};
		BinarySearch<Integer> bs = new BinarySearch<Integer>(array);
		
		System.out.println("element "+ bs.binarySearchIterative(0, array.length, 9));
		
		//System.out.println("element "+ bs.binarySearch(0, array.length, 10));
		
		/*
		 * for Integer type data (negative test case)
		 * here array is not sorted
		 * */
		Integer array2[] = new Integer[]{1,2,3,10,5,6,7,8,9};
		BinarySearch<Integer> bs2 = new BinarySearch<Integer>(array2);
		
	//	System.out.println("element "+ bs2.binarySearch(0, array2.length, 10));
		
		
		
		/*
		 * for String type data
		 * */
		String arrayString[] = new String[]{"1","2","3","10","5","6","7","8","9"};
		BinarySearch<String> bsForString = new BinarySearch<String>(arrayString);
		
		//System.out.println("element "+ bsForString.binarySearch(0, arrayString.length, "10"));
		

	}

}
