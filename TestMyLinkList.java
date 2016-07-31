/**
 * this application is to test MyLinkList.java
 * @author pratap
 * */
package DS1;

public class TestMyLinkList {
	
	public static void main(String[] args){
		
		/*
		 * Testing by String List
		 * */
		MyLinkList<String> mylinklist = new MyLinkList<String>();
		MyLinkList<String> mylinklist1 = new MyLinkList<String>();
		
		mylinklist.add("Pratap");
		mylinklist.add("Krishan");
		mylinklist.add("Pawan");
		mylinklist.add("Vijay");
		mylinklist1.add("Warroir");
		mylinklist1.add("fight");
		mylinklist1.add("Goal");
		mylinklist1.add("google");
		mylinklist1.add(4, "Coder");
		
		mylinklist.addAll(mylinklist1);
		mylinklist.remove(4);
		mylinklist.remove("Pratap");
		mylinklist.reverse();
		mylinklist.sort();
		for(int i=0;i<=mylinklist.size();i++){
			System.out.println(" "+mylinklist.get(i));
		}
		
		System.out.println(" "+mylinklist.indexOf("google"));
		
		
		/*
		 * Testing by Interger List
		 * */
		MyLinkList<Integer> IntegerList = new MyLinkList<Integer>();
		MyLinkList<Integer> IntegerList1 = new MyLinkList<Integer>();
		
		IntegerList.add(1);
		IntegerList.add(10);
		IntegerList.add(6);
		IntegerList.add(8);
		IntegerList1.add(2);
		IntegerList1.add(9);
		IntegerList1.add(4);
		IntegerList1.add(255);
		IntegerList1.add(4, 45);
		
		IntegerList.addAll(IntegerList1);
		IntegerList.remove(255);
		IntegerList.remove(0);
		IntegerList.reverse();
		IntegerList.sort();
		for(int i=0;i<=mylinklist.size();i++){
			System.out.println(" "+mylinklist.get(i));
		}
		
		System.out.println(" "+IntegerList.indexOf(45));
	}
}
