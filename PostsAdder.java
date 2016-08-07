/**
 * it helps in adding post of user
 * @author pratap
 * */
public class PostsAdder {
	
	void createPosts(){
		
		Post p0= new Post("arpitP", "Sunday kb haiii.....");
		Post p1= new Post("kirsh", "enjoying programming at metacube");
		Post p2= new Post("krish", "todays assignment was lengthy");
		Post p3= new Post("Pratap", "lets have a cup of tea");
		Post p4= new Post("arpitP", "busy schedule these days");
		Post p5= new Post("arpitP", "Sunday kb haiii.....");
		Post p6= new Post("NitinDon", "Fun at Evolphin missing my brother KK");
		Post p7= new Post("NitinDon", "nothing to say");
		Post p8= new Post("RohitDude", "i m Busy");
		Post p9= new Post("RohitDude", "at metacube");
		Post p10= new Post("RohitDude", "at dominos");
		
		PostsManagement pm=new PostsManagement();
		
		try{
			pm.addPost(p0);
			pm.addPost(p1);
			pm.addPost(p2);
			pm.addPost(p3);
			pm.addPost(p4);
			pm.addPost(p5);
			pm.addPost(p6);
			pm.addPost(p7);
			pm.addPost(p8);
			pm.addPost(p9);
			pm.addPost(p10);
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
	}
	public static void main(String arg[]){
		PostsAdder pa=new PostsAdder();
		pa.createPosts();
		
	}
	
}
