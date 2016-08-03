/**
 * this application is to design linkList;
 * @author pratap
 * */


public class MyLinkList<E> implements MyList<E> {

	private Node<E> node = new Node<E>();
	private int size = 0;

	public MyLinkList() {
	//	node.e = null;
		node.next = null;
	}

	
	/*
	 * adding element to list at end
	 * */
	public void add(E e){
		Node<E> ref = node;
		Node<E> temp = new Node<E>();
		temp.e = e;
		temp.next = null;

		if(ref == null){

			ref = temp;
			size++;
		}
		else{
			while(ref.next!=null){
				ref = ref.next;
			}
			ref.next = temp;
			size++;
		}
	}
	
	
	/*
	 * adding element to list by index
	 * if index is in list size then 
	 * added at that position else added to end of list
	 * */
	public void add(int index, E e){
		Node<E> ref = node;
		Node<E> temp = new Node<E>();
		temp.e = e;
		temp.next = null;
		int counter = 0;

		if(index<size){
			while(counter!=index-1 && index!=0){
				ref = ref.next; counter++;
			}

			
		}else{
			while(ref.next!=null){
				ref = ref.next;
			}
		}
		temp.next = ref.next;
		ref.next = temp;
		size++;
	}
	

	/*
	 * adding one list to other
	 * list c is added to caller
	 * */
	public void addAll(MyLinkList<E> c){

		Node<E> ref = new Node<E>();

		ref = this.node;

		while(ref.next!=null){
			ref = ref.next;
		}
		ref.next = c.node.next;
		this.size += c.size();
	}
	
	
	/*
	 * getting element by 
	 * given index if index is in list size 
	 * than return element else return null
	 * */
	public E get( int index ){

		Node<E> ref = new Node<E>();

		ref = this.node.next;
		if(size>=index){
			while(index!=0){
				ref = ref.next;
				index--;
			}
			return ref.e;
		}
		return null;
	}
	
	
	/*getting index of element*/
	public int indexOf( E obj ){

		Node<E> ref = new Node<E>();

		ref = this.node.next;

		for(int i=0;i<=size;i++,ref=ref.next){

			if(obj.equals(ref.e)){
				return i;
			}

		}
		return -1
				;

	}

	
	/*
	 * removing element by given index
	 * if index is greater than list size than it return false else true
	 * */
	public E remove(int index){

		Node<E> ref = new Node<E>();
		E removed=null;
		
		ref = this.node;
		
		if(index<=size){
			
			for(int i=0;i<index;i++){
				ref = ref.next;
			}
			
			size--;
			removed = ref.next.e;
			ref.next = ref.next.next;
			
		}
		
		return removed;
		
	}


	/*
	 * removing first occurrence of element
	 * */
	public boolean remove(E element){

		
		Node<E> ref = new Node<E>();

		ref = this.node;



		while(!ref.next.e.equals(element) && ref.next !=null){
			ref = ref.next;
		}
		size--;
		if(ref.next.e.equals(element)){	
			
			ref.next = ref.next.next;
			return true;
			
		}
		else{
			
			return false;
			
		}

	}


	/*
	 * sorting list
	 * */
	public void sort(){
		
		
		Node<E> second = this.node;
		for(int i=0;i<this.size()-1;i++){
			
			for(int j=0;j<this.size()-i-1;j++){
				
				if(second.e.hashCode()>second.next.e.hashCode()){
			
					E e = second.e;
					second.e = second.next.e;
					second.next.e = e;
					
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
	 * 
	 * reversing list using recursion
	 * */
	public void reverse(){
		
		myreverse(this.node);

	}
	
	private void myreverse(Node<E> node){
		
		if(node.next == null){
			this.node = node;
			return;
		}
		
		myreverse(node.next);
		
		Node<E> temp= node.next;
		
		temp.next = node;
		node.next = null;
	}

}
