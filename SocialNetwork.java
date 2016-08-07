/**
 * this is social network containing graph of network (User)
 * @author pratap
 * */
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;



public class SocialNetwork {
	
	private String username;	
	ProfileManagement profileManager;
	PostsManagement postManager;
	Scanner sc;
	
	public SocialNetwork(){
		profileManager=new ProfileManagement();
		postManager=new PostsManagement();
		sc=new Scanner(System.in);
	}
	
	
	public void start(String username) {
		this.username=username;
		
		System.out.println("Welcome  "+username );
			
		// menu option
		
		try{
			while(true){	
				System.out.println();
				System.out.println();
				
				System.out.println("1: Show my profile");
				System.out.println("2: Show My Posts");
				System.out.println("3: Show New Posts");
				System.out.println("4: Write a post");
				System.out.println("5: View All people");
				System.out.println("6: Search people");
				System.out.println("7: Log Out");
				System.out.println("Enter your choice");
				
				int choice=sc.nextInt();
				switch (choice){
					case 1: showMyProfile(); //showProfile();
					break;
					case 2: showMyPosts();
					break;
					case 3: showNewPosts();
					break;
					case 4: writePost();
					break;
					case 5: viewAllPeople();
					break;
					case 6: searchPeople();
					break;
					case 7: System.exit(0);
					break;
			
					default:	;
				}	
			}//end while	
		
		}catch(Exception e){
			e.printStackTrace();
		}

	}
	
	//1 show User profile
	void showMyProfile () throws Exception{
		List<Profile> myProfile=profileManager.searchProfiles(username);
		System.out.println("You are  ");
		
		System.out.println( myProfile.get(0) );
		
	}
	
	//2 Post of User only
	void showMyPosts() throws Exception{
		List<Post> allPosts;
		allPosts=postManager.searchPost(username);
		System.out.println("Your Posts are");
		for(Post p : allPosts){
			System.out.println(p);
		}	
	}
	
	//3 show all new Post from other user
	void showNewPosts() throws Exception{
		List<Post> allPosts=postManager.loadPosts();
		System.out.println("Posts from your friends");
		for(Post p : allPosts){
			System.out.println(p);
		}
		
	}
		
	//4  writing post
	void writePost() throws Exception{
		System.out.println("Wite here: ");
		String content=sc.nextLine();
		content=sc.nextLine();
		
		Post p=new Post(username,content);
		postManager.addPost(p);
	}
	
	//5 view all User in  network
	void  viewAllPeople() throws Exception{
		List<Profile> allprofiles=profileManager.loadProfiles();
		System.out.println("People here are");
		for(Profile p : allprofiles){
			System.out.println(p.toString());
		}
	}
	
	// search People in network
	void searchPeople() throws Exception {
		System.out.println("Enter name");
		String garbage=sc.nextLine();
		String name=sc.nextLine();
		System.out.println("Search results");
		List<Profile> profiles=profileManager.searchProfiles(name);
		if(profiles.size() <= 0){
			System.out.println("Not Result Found");
		}else{
			for(Profile p : profiles){
				System.out.println(p);
			}
		}
	}

	
	//end
	

}
