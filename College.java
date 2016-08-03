
public class College implements Comparable<College> {

	private String name;

	private Integer rank;

	private int capacity;

	public College() {
		name = null;
		rank = 0;
		capacity = 0;
	}

	public void setDetails(String name, int rank,int capacity){

		this.name = name;
		this.rank = rank;
		this.capacity = capacity;
	}


	public String getCollegeName(){

		if(name.equals(null)){

			gotException("dummy College");

			return null;

		}else{

			return name;

		}
	}



	public Integer getCollegeRank(){

		if(rank == 0){

			gotException("dummy College");

			return 0;

		}else{

			return rank;

		}
	}


	public int getCollegeCapacity(){

		return capacity;

	}
	
	public void decreaseCapacity(){
		
		--capacity;
		
	}


	public void gotException(String message){

		try{

			throw new MyException(message);

		}catch(MyException e){

			e.printStackTrace();

		}

	}
	
	
	public int compareTo(College c){
		
		return (this.rank).compareTo(c.getCollegeRank());
		
	}
}
