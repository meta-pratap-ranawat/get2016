
public class Student implements Comparable<Student> {

	private String name;

	private Integer rank;

	public Student() {
		name = null;
		rank = 0;
	}

	
	
	public void setDetails(String name, int rank){

		this.name = name;
		this.rank = rank;
	}
	
	
	
	public String getStudentName(){
		if(name.equals(null)){
			gotException("dummy Student");
			return null;
		}else{
			
			return name;
			
		}
	}
	
	
	
	public Integer getStudentRank(){
		if(rank == 0){
			gotException("dummy Student");
			return 0;
		}else{
			
			return rank;
			
		}
	}
	
	
	
	
	public void gotException(String message){

		try{

			throw new MyException(message);

		}catch(MyException e){

			e.printStackTrace();

		}

	}

	
public int compareTo(Student c){
		
		return (this.rank).compareTo(c.getStudentRank());
		
	}
}
