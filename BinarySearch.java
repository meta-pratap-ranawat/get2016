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
	public boolean binarySearch(int low, int high, E searchForElement) {
		
		
		if(low<high){
			
			mid = (low+high)/2;
			
			if( array[mid].equals(searchForElement) ){
				
				return true;
				
			}else{
				if( compareTo(searchForElement) > 0 ){
					
					return binarySearch(low, mid-1, searchForElement);
					
				}else{
					
					return binarySearch(mid+1, high, searchForElement);
					
				}
				
			}
			
		}else{
			return false;
		}
		
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
