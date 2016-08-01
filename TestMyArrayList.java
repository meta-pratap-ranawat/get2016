/**
 * this application is to test arraylist
 * @author pratap
 * */
package DS1;
public class TestMyArrayList {

	public TestMyArrayList() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		MyArrayList<String> myList = new MyArrayList<String>();
		
		myList.add("rahul");
		myList.add("pratap");
		myList.add("1");
		myList.add("1");
		myList.add("1");
		//myList.reverse();
		
		MyArrayList<String> myList1 = new MyArrayList<String>();
		
		myList.add("krishan");
		myList.add("vijay");
		myList1.add("hari");
		myList1.add("ram");
		myList1.add("ji");
		myList1.add("myList1");
		myList1.add("hello");
		myList1.add(0, "6");
		
		System.out.println("index"+myList.remove(15));
		
		myList1.addAll(myList);
		myList.clear();
		myList1.sort();
		
		System.out.println("index"+ myList1.indexOf("jiji"));
		
		
		
		for(int i=0;i<myList1.size();i++){
			System.out.println(" "+myList1.get(i));
			
		}
		

	}

}
