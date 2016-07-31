/**
 * this application is running all application(menu)
 * @author pratap
 * */
import java.util.List;
import java.util.Scanner;

public class Mainmenu{

	public static void main(String args[]){
		Menu m = new Menu();

		List<String> menu = m.addMenu();

		System.out.println("Menu options are:-");

		m.display();

		System.out.println("Select any menu");

		Scanner sc = new Scanner(System.in);
               
		int selectMenu = sc.nextInt();

		while(true){
			if (selectMenu >= 0 && selectMenu < menu.size()){
				break;
			} else {
				System.out.println("Select correct menu");

				selectMenu = sc.nextInt();

			}
		}

		MenuItem menuitem = new MenuItem();
		menuitem.addMenuItem();

		List<String> item = menuitem.getMenuItem(selectMenu);

		for (int j = 0; j < item.size(); j++) {
			System.out.println("Select " + j + " for " + item.get(j));
		}


		System.out.println("Select any menuitem");
		
		int selectMenuItem = sc.nextInt();

		while (true) {
			if (selectMenuItem >= 0 && selectMenuItem < item.size()) {
				break;
			} else {
				System.out.println("Select correct menu");

				selectMenuItem = sc.nextInt();

			}
		}

		Action a = new Action();

		a.menuItemAction(item.get(selectMenuItem));

	}
}
