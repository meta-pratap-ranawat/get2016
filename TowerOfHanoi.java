/*
 *  this application is to solve problem tower of hanoi
 *  source to destination
 * */
import java.util.ArrayList;
import java.util.List;


public class TowerOfHanoi {
	
	public  List<String> movements ;
	
	public TowerOfHanoi(){
		movements = new ArrayList<String>();
	}
	public  void solve(int numberOfDisks, String source, String destination, String auxiliary ){
		
		if(numberOfDisks>=1){
			solve(numberOfDisks-1, source, auxiliary, destination);
			
			String st = "Disk "+numberOfDisks+" moves from "+source+" to "+destination;
			movements.add(st);
			
			solve(numberOfDisks-1, auxiliary, destination, source);
		}
	}

/*	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		String source="A", auxiliary="B", destination="C";
		int numberOfDisks = 2;
		
		TowerOfHanoi th = new TowerOfHanoi();
		
		th.solve(numberOfDisks, source, destination, auxiliary );
		
		for(int i=0;i<th.movements.size();i++)
		System.out.println(th.movements.get(i));

	}
	
	*/

}
