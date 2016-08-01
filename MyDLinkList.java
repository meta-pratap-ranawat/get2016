package DS1;
public class MyDLinkList<E> implements MyList<E> {

	private NodeOfDoubly<E> node = new NodeOfDoubly<E>();
	private int size = 0;

	public MyDLinkList() {
	//	node.e = null;
		node.next = null;
		node.prev = null;
	}


	public void add(E e){
		NodeOfDoubly<E> ref = node;
		NodeOfDoubly<E> temp = new NodeOfDoubly<E>();
		temp.e = e;
		temp.next = null;
		temp.prev = null;

		if(ref == null){
			//temp.prev =ref;
			ref = temp;
			size++;
		}
		else{
			while(ref.next!=null){
				ref = ref.next;
			}
			ref.next = temp;
			temp.prev = ref;
			size++;
		}
	}

	public void add(int index, E e){
		NodeOfDoubly<E> ref = node;
		NodeOfDoubly<E> temp = new NodeOfDoubly<E>();
		temp.e = e;
		temp.next = null;
		temp.prev = null;
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
		temp.prev = ref;
		ref.next = temp;
		if(temp.next!=null)(temp.next).prev = temp;
	}


	public void addAll(MyDLinkList<E> c){

		NodeOfDoubly<E> ref = new NodeOfDoubly<E>();

		ref = this.node;

		while(ref.next!=null){
			ref = ref.next;
		}
		ref.next = c.node.next;
		c.node.next.prev = ref;
		this.size += c.size();
	}
	public E get( int index ){

		NodeOfDoubly<E> ref = new NodeOfDoubly<E>();

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

	public int indexOf( E obj ){

		NodeOfDoubly<E> ref = new NodeOfDoubly<E>();

		ref = this.node.next;

		for(int i=0;i<=size;i++,ref=ref.next){

			if(obj.equals(ref.e)){
				return i;
			}

		}
		return -1
				;

	}


	public boolean remove(int index){

		NodeOfDoubly<E> ref = new NodeOfDoubly<E>();

		ref = this.node;

		if(index<=size){

			for(int i=0;i<index;i++){
				ref = ref.next;
			}
			size--;
			ref.next = ref.next.next;
			ref.next.next.prev = ref;
			return true;
		}
		return false;
	}


	/*
	 * removing first occurrence of element
	 * */
	public boolean remove(E element){

		NodeOfDoubly<E> ref = new NodeOfDoubly<E>();

		ref = this.node;



		while(!ref.next.e.equals(element) && ref.next !=null){
			ref = ref.next;
		}
		size--;
		if(ref.next.e.equals(element)){	
			ref.next = ref.next.next;
			ref.next.next.prev = ref;
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

		this.node.next = mergeSort(this.node.next);
	}
	/*sorting*/
	
	 // Split a doubly linked list (DLL) into 2 DLLs of
    // half sizes
	private NodeOfDoubly<E> split(NodeOfDoubly<E> head) {
        NodeOfDoubly<E> fast = head, slow = head;
        while (fast.next != null && fast.next.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }
        NodeOfDoubly<E> temp = slow.next;
        slow.next = null;
        return temp;
    }
 
    private NodeOfDoubly<E> mergeSort(NodeOfDoubly<E> node) {
        if (node == null || node.next == null) {
            return node;
        }
        NodeOfDoubly<E> second = split(node);
 
        // Recursion for left and right halves
        node = mergeSort(node);
        second = mergeSort(second);
 
        // Merge the two sorted halves
        return merge(node, second);
    }
 
    // Function to merge two linked lists
   private NodeOfDoubly<E> merge(NodeOfDoubly<E> first, NodeOfDoubly<E> second) {
        // If first linked list is empty
        if (first == null) {
            return second;
        }
 
        // If second linked list is empty
        if (second == null) {
            return first;
        }
 
        // Pick the smaller value
        if (first.e.hashCode() < second.e.hashCode()) {
            first.next = merge(first.next, second);
            first.next.prev = first;
            first.prev = null;
            return first;
        } else {
            second.next = merge(first, second.next);
            second.next.prev = second;
            second.prev = null;
            return second;
        }
    }
	
	/*sorting*/


	/*
	 * getting size of list
	 * */
	public int size(){
		return size;
	}


	/*
	 * reversing list using recursion
	 * */
	public void reverse(){
		
		myreverse(this.node);

	}
	
	private void myreverse(NodeOfDoubly<E> node){
		
		if(node.next == null){
			this.node = node;
			return;
		}
		
		myreverse(node.next);
		NodeOfDoubly<E> temp= node.next;
		temp.next = node;
		
		node.next = null;
	}

}
