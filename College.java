/**
 * this application is an an entity College
 * @author pratap
 * */
public class College implements Comparable<College> {

	private String name;

	private Integer rank;

	private int capacity;

	public College() {
		name = null;
		rank = 0;
		capacity = 0;
	}

	
	/*
	 * setting college details 
	 * */
	public void setDetails(String name, int rank,int capacity){

		this.name = name;
		this.rank = rank;
		this.capacity = capacity;
	}

	
	
	/*
	 * gettting college Name
	 * */
	public String getCollegeName(){

		if(name.equals(null)){

			gotException("dummy College");

			return null;

		}else{

			return name;

		}
	}


	/*
	 * college rank
	 * */
	public Integer getCollegeRank(){

		if(rank == 0){

			gotException("dummy College");

			return 0;

		}else{

			return rank;

		}
	}

	/*
	 * capacity
	 * */
	public int getCollegeCapacity(){

		return capacity;

	}
	
	public void decreaseCapacity(){
		
		--capacity;
		
	}

	/*
	 * to throw custom exception
	 * */
	public void gotException(String message){

		try{

			throw new MyException(message);

		}catch(MyException e){

			e.printStackTrace();

		}

	}
	
	/*
	 * for sorting
	 * */
	public int compareTo(College c){
		
		return c.getCollegeRank().compareTo((this.rank));
		
	}
}
