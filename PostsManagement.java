/**
 * this application is to get post and add them to profile
 * also search for user post
 * @author pratap
 * */

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;




class PostsManagement  {
	
	String filename="D:/myfiles/postsdb.txt";
	/**
	 *  to open file and add post to it
	 */
	void addPost (Post p) throws IOException{
		
		FileOutputStream fout=new FileOutputStream( filename, true );
		ObjectOutputStream oout=new ObjectOutputStream( fout );
			
		oout.writeObject(p);
		oout.flush();
		oout.close();
		
			
	}
	
	/**
	 * Function to load all posts from DB
	 */
	
	List<Post> loadPosts() throws Exception{
		
		List<Post> allPosts=new ArrayList<Post>();
		Post temp;
		
		FileInputStream fin=new FileInputStream( filename );
		ObjectInputStream oin=new ObjectInputStream(fin);
		
		try{
			while(  (temp = (Post)oin.readObject()) != null ){
				 
				 
				 allPosts.add(temp);
				 // again creating the stream to curb java.io.streamcorruptedexception
				 oin=new ObjectInputStream(fin); 
			}
		}catch(Exception e){
			
			//e.printStackTrace();
			oin.close();
			return allPosts;	
		}
		
		oin.close();
		
		//returning
		return allPosts;	
	}
	
	/**
	 * Function to search Posts
	 */
	
	 List<Post> searchPost(String username) throws Exception{
		List<Post> desiredPosts=new ArrayList<Post>();
		Post temp;
		
		FileInputStream fin=new FileInputStream( filename );
		ObjectInputStream oin=new ObjectInputStream(fin);
		
		/*
		 * oin.available()  -> don't use this, it has ambiguity
		 * */
		
		try{
			while(  (temp = (Post)oin.readObject()) != null ){
				 
				 if( temp.username.equalsIgnoreCase(username) ){
					 desiredPosts.add(temp);
				 }
				 // again creating the stream to curb java.io.streamcorruptedexception
				 oin=new ObjectInputStream(fin); 
			}
		}catch(Exception e){
			
			//e.printStackTrace();
			oin.close();
			return desiredPosts;	
		}
		
		
		oin.close();
		
		//empty list can be returned in failure case
		return desiredPosts;
			
	}
	 
	 public static void main (String arg[]) throws Exception {
		 	PostsManagement pm=new PostsManagement();
			
		 	List<Post> allPosts=pm.loadPosts();
			for(Post p : allPosts){
				System.out.println(p);
			}
			
			allPosts=pm.searchPost("NitinDon");
			for(Post p : allPosts){
				System.out.println(p);
			}
			
		}

	
}
