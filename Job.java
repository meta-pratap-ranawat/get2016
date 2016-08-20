/**
 * this application is for Job describes user name(whom Job belongs)
 * And set priority according to user
 * */
public class Job implements Comparable<Job>{

	
	private Integer priority;
	
	private String user;
	
	public Job() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	/*
	 * Initialization of Object
	 * */
	public Job(String user){
		
		this.user = user.toLowerCase();
		
		if(this.user.equals("chair")){
			
			priority = 1;
			
		} else {
			
			if(this.user.equals("professor")){
				
				priority = 2;
				
			} else {
				
				if(this.user.equals("graduate")){
					
					priority = 3;
					
				}
				
				if(this.user.equals("undergraduate")){
					
					priority = 4;
					
				} else {
					
					gotException("Invalid User");
				}
			}
			
		}
		
	}
	
	
	/*
	 * return priority of current object
	 * */
	public int getPriority(){
		
		return priority;
		
	}



	@Override
	public int compareTo(Job arg0) {
		
		return this.priority.compareTo(arg0.getPriority());
	}

	
	/*
	 * to show message when exception occurs
	 * */
	private void gotException(String msg){
		
		try{

			throw new MyException(msg);

		}catch(MyException e){

			System.out.println(e.getMessage());
			

		}
		
	}
}
