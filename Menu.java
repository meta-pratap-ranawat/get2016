/**
 * this application is for Menu
 * to add menu, display menu
 * @author pratap
 * */
import java.util.List;
import java.util.ArrayList;

public class Menu {

	private List<String> menu = new ArrayList<String>();
	
	
	/*
	 * adding element to  menu
	 * */
	List<String> addMenu(){
		menu.add("File");
		menu.add("Edit");
		menu.add("Format");
		menu.add("View");
		menu.add("Help");
		return menu;
	}
	
	
	/*
	 *for display of menu 
	 * */
	void display(){
		for (int i = 0; i < menu.size(); i++){
			System.out.println("Select " + i + " for " + menu.get(i));
		}
	}
	
	
	/*
	 * getting menu
	 * */
	List<String> getMenues(){
		return menu;
	}

}
