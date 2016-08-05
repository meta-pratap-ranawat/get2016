/**
 * Describe Guest Entity with name and age
 * @author pratap
 * */
public class Guest {
	
	private	Integer age;
		
	private	String name;
				
	
	public Guest() {
		
		age = 0;
		
		name = null;
		
	}
	
	public Guest(String name, Integer age){
		
		this.name = name;
		
		this.age = age;
		
	}

	public String getGuestName(){
		
		return name;
		
	}
	
	public Integer getGuestAge(){
		
		return age;
		
	}
}
