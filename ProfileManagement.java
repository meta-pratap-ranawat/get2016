/**
 *  this application is to manage profile add new profiles
 *  and retrieve old ones from file
 *  also do search operation
 *  @author pratap
 * */
import java.io.EOFException;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

public class ProfileManagement  {

	String filename="D:/myfiles/profiledb.txt";
	
	/**
	 * Function to add new profile to DB
	 */
	void addProfile (Profile p) throws IOException{
		
		FileOutputStream fout=new FileOutputStream( filename ,true);	// here 'true' to append the file
		ObjectOutputStream oout=new ObjectOutputStream( fout );
			
		oout.writeObject(p);
		oout.flush();
		oout.close();
		
			
	}
	
	/**
	 * Function to load all profiles from DB
	 */
	
	List<Profile> loadProfiles() throws Exception{
		
		List<Profile> allProfiles=new ArrayList<Profile>();
		Profile temp;
		
		FileInputStream fin=new FileInputStream( filename );
		ObjectInputStream oin=new ObjectInputStream(fin);
		
		try{
			while(  (temp = (Profile)oin.readObject()) != null ){
				 
				 
				 allProfiles.add(temp);
				 // again creating the stream to curb java.io.streamcorruptedexception
				 oin=new ObjectInputStream(fin); 
			}
		}catch(Exception e){
			
			//e.printStackTrace();
			oin.close();
			return allProfiles;	
		}
		
		oin.close();
		
		//returning
		return allProfiles;	
	}
	
	/**
	 * Function to search profiles
	 */
	
	 List<Profile> searchProfiles(String username) throws Exception{
		List<Profile> desiredProfiles=new ArrayList<Profile>();
		Profile temp;
		
		FileInputStream fin=new FileInputStream( filename );
		ObjectInputStream oin=new ObjectInputStream(fin);
		
		/*
		 * oin.available()  -> don't use this, it has ambiguity
		 * */
		
		try{
			while(  (temp = (Profile)oin.readObject()) != null ){
				 
				 if( temp.username.toLowerCase().contains(username.toLowerCase())==true  ){
					 desiredProfiles.add(temp);
				 }
				 
				 // again creating the stream to curb java.io.streamcorruptedexception
				 oin=new ObjectInputStream(fin); 
			}
		}catch(Exception e){
			
			//e.printStackTrace();
			oin.close();
			return desiredProfiles;	
		}
		
		
		oin.close();
		
		//empty list can be returned in failure case
		return desiredProfiles;
			
	}
	 
	public static void main (String arg[]) throws Exception {
		ProfileManagement pm=new ProfileManagement();
		List<Profile> allProfiles=pm.loadProfiles();
		for(Profile p : allProfiles){
			System.out.println(p);
		}
		
		allProfiles=pm.searchProfiles("Pratap");
		if(allProfiles.size() <= 0){
			System.out.println("Not Found");
		}else{
			for(Profile p : allProfiles){
				System.out.println(p);
			}
		}	
	}


}
