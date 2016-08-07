/**
 * this application is acting like Node
 * in graph hold information about user
 * @author pratap
 * */

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

 class Profile implements Serializable{
	
	
	String username;
	String name;
	int age;
	String occupation;
	List<String> followingList;
	
	public Profile(){
		followingList=new ArrayList<String>();
	
	}
	
	public Profile(String username, String name, int age, String occupation,
			List<String> followingList) {
		super();
		this.username = username;
		this.name = name;
		this.age = age;
		this.occupation = occupation;
		this.followingList = followingList;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getOccupation() {
		return occupation;
	}
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	public List<String> getFollowingList() {
		return followingList;
	}
	
	
	@Override
	public String toString() {
		return "Profile [username=" + username + ", name=" + name + ", age="
				+ age + ", occupation=" + occupation + ", followingList="
				+ followingList + "]";
	}
	
	
}
