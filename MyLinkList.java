/**
 * this application is to design linkList;
 * @author pratap
 * */


public class MyLinkList{

	private Node node = new Node();
	private int size = 0;

	public MyLinkList(){}
	public MyLinkList(Integer e) {
		node = new Node(e);

	}


	/*
	 * adding element to list in sorting manner by using recursion
	 * */

	public void add(Integer e){
		addRecursive(node,e);
	}


	/**
	 * it adds solution in recursive manner finding its correct location
	 * @param node and element
	 * */
	public void addRecursive(Node node, Integer e){

		if(node==null){

			Node temp = new Node(e);

			node = temp;size++;

		}
		else{
			if(node.next!=null && node.next.e<e ){

				addRecursive(node.next, e);

			}
			else{	
				Node temp = new Node(e);

				temp.next = node.next;

				size++;

				node.next = temp;

			}
		}

	}

	public int size(){
		return size;
	}


	 public Object[] toArray() {
	        Object[] result = new Object[size];
	        int i = 0;
	        for (Node x = node.next; x != null; x = x.next) { 
	        	result[i] = x.e; i++;
	        }
	        return result;
	    }


	/*
	 * getting element by 
	 * given index if index is in list size 
	 * than return element else return null
	 * */
	public Integer get( int index ){

		Node ref = new Node();

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




	/*
	 * main function to test
	 * */
	public static void main(String[] args){

		MyLinkList list = new MyLinkList();

		list.add(5);

		list.add(10);

		list.add(15);

		list.add(16);

		list.add(14);

		list.add(9);
		
		

		for(int i=0;i<list.size();i++){

			System.out.print(" "+list.get(i));

		}

	}

}
