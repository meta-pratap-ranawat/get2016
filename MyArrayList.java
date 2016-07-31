package DS1;
/**

 * this application is to creating And define arrayList with its functionality
 * @author pratap
 * */
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;

/*
 * generic class is define so that it can be implement to all Object(User define and system define)
 * */
public class MyArrayList< E > implements MyList<E> {			// implements MyList interface

	private E array[];											// to store elements

	private final int DEFAULT_SIZE = 10;						//default size for array

	private int size = 0;										// zero length initially


	public MyArrayList() {										

		array = ( E[] ) new Object[DEFAULT_SIZE];				// default allocation of arrayList

	}

	public MyArrayList(int initialCapacity) {

		array = ( E[] ) new Object[initialCapacity];			// if capacity is passed then arrayList allocation

	}


	/*
	 * to add new element to list
	 * */
	public boolean add(E element){

		if(array.length <= size){
			
			E	temp[] = ( E[] ) new Object[DEFAULT_SIZE+size];		// increasing size of array by 10 when needed
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


	/*
	 * to add new element at specific index
	 * if index doesn't exist then added the element at last of list
	 * */
	public void add(int index, E element){
		if( array.length>size ){

			if( size >= index ){										//if index is between current size then shifting element from index to size to +1 indexes
				for(int i=size;i>index;i--){
					array[i] =array[i-1];
				}

				array[index] = element; size++;							//putting element at index location and increasing of list by one 
			}else{
				array[size++] = element;
			}
		}else{
			E	temp[] = ( E[] ) new Object[DEFAULT_SIZE+size];			// if array is short then declaring new one

			for(int i=0;i<index;i++){
				temp[i]=array[i];
			}

			temp[index] = element;

			for(int i=index+1;i<size+1;i++){
				temp[i] = array[i-1];
			}

			array = temp; size++;
		}

	}


	/*
	 * adding One list to other list
	 * */
	public void addAll(MyArrayList<? extends E> c){
		E	temp[] = ( E[] ) new Object[c.size()+this.size()];

		for(int i=0;i<this.size();i++){
			temp[i] = array[i];
		}

		for(int i = this.size();i<(c.size()+this.size());i++ ){
			temp[i] = c.get(i-this.size());
		}

		array = ( E[] ) new Object[c.size()+this.size()];

		array = temp;
		size+=c.size();
	}


	/*
	 * clearing list
	 * */

	public void clear(){


		size = 0;

	}


	/*
	 * getting element from specific index
	 * */
	public E get(int index){

		return array[index];

	}


	/*
	 * getting location of first element
	 * */
	public int indexOf(E element){

		for(int i=0;i<this.size();i++){
			if(array[i].equals(element) ){
				return i;
			}
		}
		return -1;
	}


	/*
	 * deleting element from index(given) location
	 * */
	public boolean remove(int index){

		if(index<size){

			for(int i=index;i<(size-1);i++){
				array[i] = array[i+1];
			}
			size--;
			return true;
		}
		return false;
	}


	/*
	 * removing first occurrence of element
	 * */
	public boolean remove(E element){
		for(int i=0;i<this.size();i++){
			if(array[i].equals(element) ){
				return remove(i);
			}
		}
		return false;

	}


	/*
	 * sorting list
	 * */
	public void sort(){

		for(int i=0;i<this.size();i++){
			for(int j=0;j<this.size()-i-1;j++){
				if(array[j].hashCode()>array[j+1].hashCode()){
					
					E e = array[j];
					array[j] = array[j+1];
					array[j+1] = e;
					
				}
			}
		}
	}


	/*
	 * getting size of list
	 * */
	public int size(){
		return size;
	}


	/*
	 * reversing list
	 * */
	public void reverse(){
		E temp;
		int i=0,j=size-1;
		while(i<j){
			temp = array[i];
			array[i]=array[j];
			array[j]=temp;
			i++;j--;
		}
	}


}
