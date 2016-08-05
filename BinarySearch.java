/**
 * this application is to find element in array using binary search
 * @author Pratap
 * */
public class BinarySearch<E> implements Comparable<E> {

	private E[] array;
	private int mid;


	/*
	 * Initializing Binary Search and checking array is sorted or not
	 * if not then exception is thrown with meassage
	 * */
	public BinarySearch(E[] array){
		this.array = array;
		try{
			if(!isSorted()){

				throw new MyException("Array is not Sorted in Ascending Order");

			}
		}catch(MyException e){

			e.printStackTrace();

		}
	}


	/*
	 * finding searchElement in array recursive function is define
	 * return true if element is found
	 * else false
	 * */
	public boolean binarySearchRecursive(int low, int high, E searchForElement) {


		if(low<high){

			mid = (low+high)/2;

			if( array[mid].equals(searchForElement) ){

				return true;

			}else{
				if( compareTo(searchForElement) > 0 ){

					return binarySearchRecursive(low, mid-1, searchForElement);

				}else{

					return binarySearchRecursive(mid+1, high, searchForElement);

				}

			}

		}else{
			return false;
		}

	}




	public int binarySearchIterative(int low, int high, E searchForElement) {


		while(low<high){

			mid = (low+high)/2+1;

			if( compareTo(searchForElement) > 0 ){

				high = mid-1;

			}else{
				if( compareTo(searchForElement) < 0 ){

					low = mid+1;

				}else{
					
					if(mid!=0)
						mid = mid-1;
					
					if( compareTo(searchForElement) == 0 ){
						if(low<mid)
						high = mid;
						else return mid;
						
					}else{
						
					return mid+1;
					
					}

				}

			}

		}
		
		return -1;

	}


	/*
	 * checks that given array is sorted in ascending order or not
	 * return true if sorted
	 * else false
	 * */
	private  boolean isSorted() 
	{

		int i;
		for(i = 0; i < array.length-1; i ++){
			mid = i+1;
			if ( compareTo(array[i]) < 0 ) {
				return false;
			}  
		}
		return true;
	}



	/*
	 * to comparation for generic type
	 * */
	@Override
	public int compareTo(E element){

		return (array[mid].toString()).compareTo(element.toString());

	}



}
