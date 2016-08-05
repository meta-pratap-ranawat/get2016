/**
 * this application is for GuestHouse System
 * @author pratap
 * 
 * */

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


public class GuestHouse {

	private Integer totalRooms;

	private String nameOfHouse;
	public String[] allocated;

	public GuestHouse() {
		totalRooms=0;
		nameOfHouse = null;
	}

	/*
	 * Initializing GuestHouse name and its capacity
	 * */
	public GuestHouse(String nameOfHouse, Integer totalRooms){

		this.nameOfHouse = nameOfHouse;

		this.totalRooms = totalRooms;

		allocated = new String[totalRooms];

		for(int i=0;i<totalRooms;i++){

			allocated[i] = "E";
		}
	}

	
	/*
	 * check for empty room
	 * */
	private boolean isEmpty(){

		for(int i=0;i<totalRooms;i++){

			if(allocated[i].equals("E")){

				return true;

			}
		}

		return false;
	}

	
	
	/*
	 * allocating rooms to Guests available at counter
	 * */
	public void roomAllocation(List<Guest> guestList){


		for( Guest guest : guestList ){

			if(allocated[guest.getGuestAge()].equals("E") ){

				allocated[guest.getGuestAge()]= guest.getGuestName();

			}else{

				Integer age = guest.getGuestAge();

				if(isEmpty()){

					while( !allocated[age].equals("E") ){

						if(age >=(totalRooms-1)){

							age =-1;

						} 

						age++;

					}

					allocated[age]= guest.getGuestName();

				}

				else{
					gotException("No Room Availbe");
				}

			}
		}
	}

	
	
	public void gotException(String message){

		try{

			throw new MyException(message);

		}catch(MyException e){

			System.out.println(e.getMessage());
			//e.printStackTrace();

		}

	}


	
	/*
	 * show about Guest which room they got
	 * 
	 * */
	public void roomAllocatedList(List<Guest> guestList){

		for( Guest guest : guestList ){

			if(allocated[guest.getGuestAge()].equals(guest.getGuestName()) ){

				System.out.println(" Room Number "+guest.getGuestAge()+" is allocated to Mr/Ms. "+guest.getGuestName());

			}else{

				Integer age = guest.getGuestAge();

				//	while( !allocated[++age].equals(guest.getGuestName()) );

				while( !allocated[age].equals(guest.getGuestName()) ){
					
					if(age >=(totalRooms-1)){
						
						age =-1;
						
					} 
					
					age++;
					
				}

				System.out.println(" Room Number "+age+" is allocated to Mr/Ms. "+guest.getGuestName());

			}
		}

	}
/*
	public static void main(String[] args){

		GuestHouse guestHouse;
		
		List<Guest> guestList;
		
		String exceptedOutPut[];
		
		Guest guest;
		
		Scanner sc;
		
		Integer numOfGuest;

		guestHouse = new GuestHouse("5star", 2);

		guestList = new ArrayList<Guest>();

		guest = new Guest();

		sc = new Scanner(System.in);

		exceptedOutPut = new String[100];

		System.out.println("Enter number of Guest");

		numOfGuest = sc.nextInt();

		for(int i=0;i<numOfGuest;i++){

			guest = new Guest(sc.next(), sc.nextInt());

			guestList.add(guest);

		}
		guestHouse.roomAllocation(guestList);

		guestHouse.roomAllocatedList(guestList);



		sc.close();
	}
	
	*/
}
