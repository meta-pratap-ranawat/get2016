/**
 * this application is to add item into menu
 * @author pratap
 * */
import java.util.List;
import java.util.ArrayList;

public class MenuItem{
	ArrayList<String>[] menuitem;
	List<String> menu;
	Menu m;
	
	
	MenuItem(){
		m = new Menu();
		menu = new ArrayList<String>();
		
		menu = m.addMenu();
		menu = m.getMenues();
		
		
		/*
		 *Array of arraylist for submenuitems
		 */
		menuitem = new ArrayList[menu.size()];

	}
	
	
	
	/*
	 * To add menu item 
	 * */
	void addMenuItem(){
		
		for (int j = 0; j < menu.size(); j++){
			
			menuitem[j] = new ArrayList<String>();
			
		}
		
		menuitem[0].add("New");
		menuitem[0].add("Open");

		menuitem[0].add("Save");
		menuitem[1].add("Undo");
		menuitem[1].add("Cut");
		menuitem[1].add("Copy");
		menuitem[2].add("Font");
		menuitem[2].add("StatusBar");
		menuitem[3].add("View Help");
		menuitem[4].add("About Notepad");

	}
	
	
	/*
	 * to getting menuItem from menu
	 * */
	List<String> getMenuItem(int Menu){
		List<String> item = new ArrayList<String>();

		int size = menuitem[Menu].size();
		for (int j = 0; j < size; j++){
			item.add(menuitem[Menu].get(j));
		}

		return item;

	}
}
