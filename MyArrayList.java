import java.util.Collection;
import java.util.Comparator;


public class MyArrayList< E > implements MyList<E> {

	private E array[];
	
	private final int DEFAULT_SIZE = 10;
	
	private int size = 0;
	
	
	public MyArrayList() {
		
		array = ( E[] ) new Object[DEFAULT_SIZE];
		
	}

	public MyArrayList(int initialCapacity) {
		
		array = ( E[] ) new Object[initialCapacity];
		
	}
	

	boolean add(E element){
		
		if(array.length <= size){
	    	E	temp[] = ( E[] ) new Object[DEFAULT_SIZE+size];
	    	 for(int i=0;i<size;i++){
	    		 temp[i]=array[i];
	    	 }
	    	 temp[size++] = element;
	    	 array = temp;
	    	 return true;
		}
		else{
			array[size++] = element;
			return true;
		}
		
	}
	
	
	void add(int index, E element){
		if( array.length>size ){

			if( size >= index ){
				for(int i=size;i>=index;i--){
					array[i] =array[i-1];
				}
				
				array[index] = element; size++;
			}else{
				array[size++] = element;
			}
		}else{
			E	temp[] = ( E[] ) new Object[DEFAULT_SIZE+size];
			
	    	 for(int i=0;i<index;i++){
	    		 temp[i]=array[i];
	    	 }
	    	 
	    	 temp[index] = element;
	    	 
	    	 for(int i=index+1;i<size;i++){
	    		 temp[i] = array[i];
	    	 }
	    	 
	    	 array = temp; size++;
		}

	}
	
	
	boolean addAll(Collection<? extends E> c){
		E[] = to.A
		
	}
	
	
	void clear(){
		
	}
	
	public E get(int index){
		
	}
	
	public int indexOf(E element){
		
	}
	
	E remove(int index){
		
		
	}
	
	
	boolean remove(Object o){
		
	}
	
	
	void sort(Comparator<? super E> c){
		
	}
	
	
	int size(){
		return size;
	}
	
	void reverse(){
		
	}
	
	
}
