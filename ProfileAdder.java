/**
 * this application is to helps in setting 
 * connections between User and setting User profiles
 * @author pratap
 * */

import java.util.ArrayList;
import java.util.List;



public class ProfileAdder {
	void createProfile(){
		ProfileManagement pm=new ProfileManagement();
		
		List<String> krishFL=new ArrayList<String>();
		krishFL.add("kirsh");
		krishFL.add("Pratap");
		krishFL.add("arpitP");
		krishFL.add("Shobbit");
		
		List<String> pratapFL=new ArrayList<String>();
		pratapFL.add("krish");
		pratapFL.add("Pratap");
		pratapFL.add("NitinDon");
		pratapFL.add("RohitDude");
		
		List<String> arpitFL=new ArrayList<String>();
		arpitFL.add("krish");
		arpitFL.add("Pratap");
		arpitFL.add("NitinDon");
		arpitFL.add("RohitDude");
		
		List<String> rohitFL=new ArrayList<String>();
		rohitFL.add("arpitP");
		rohitFL.add("Shobbit");
		rohitFL.add("krish");
		rohitFL.add("RohitDude");
		
		List<String> nitinFL=new ArrayList<String>();
		nitinFL.add("krish");
		nitinFL.add("Pratap");
		nitinFL.add("NitinDon");
		nitinFL.add("RohitDude");
		
		List<String> shobhitFL=new ArrayList<String>();
		shobhitFL.add("kirsh");
		shobhitFL.add("Pratap");
		shobhitFL.add("arpitP");
		shobhitFL.add("Shobbit");
		
		Profile p1=new Profile("krish", "Krishan", 22, "SoftwareEngineer", krishFL);
		Profile p2=new Profile("Pratap", "PratapSingh", 80, "SoftwareEngineer", pratapFL);
		Profile p3=new Profile("arpitP", "Arpit Pittie", 120, "SoftwareEngineer", arpitFL);
		Profile p4=new Profile("RohitDude", "Rohit", 22, "SoftwareEngineer", rohitFL);
		Profile p5=new Profile("NitinDon", "Nitin", 28, "SoftwareEngineer", nitinFL);
		Profile p6=new Profile("Shobbit", "Shobhit", 22, "HR", shobhitFL);
		
		try{
			pm.addProfile(p1);
			pm.addProfile(p2);
			pm.addProfile(p3);
			pm.addProfile(p4);
			pm.addProfile(p5);
			pm.addProfile(p6);
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
}
