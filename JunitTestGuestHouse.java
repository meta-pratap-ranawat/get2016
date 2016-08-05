/**
 * this application is Junit to test GuestHouse room allocation
 * @author pratap 
 * */

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;


public class JunitTestGuestHouse {

	GuestHouse guestHouse;
	List<Guest> guestList;
	String exceptedOutPut[];
	Guest guest;
	Scanner sc;
	Integer numOfGuest;

	@Before
	public void setUp() throws Exception {

		guestHouse = new GuestHouse("5star", 10);

		guestList = new ArrayList<Guest>();

		guest = new Guest();

		sc = new Scanner(System.in);



		System.out.println("Enter number of Guest");

		numOfGuest = 6;


		/*
		 * test case one
		 * */
		guest = new Guest("vijay", 3);

		guestList.add(guest);

		guest = new Guest("Vicky", 3);

		guestList.add(guest);

		guest = new Guest("ABC", 3);

		guestList.add(guest);

		guest = new Guest("MNO", 3);

		guestList.add(guest);

		guest = new Guest("Rahul", 9);

		guestList.add(guest);

		guest = new Guest("God", 9);

		guestList.add(guest);

		exceptedOutPut = new String[]{"God","E","E","vijay","Vicky","ABC","MNO","E","E","Rahul"};


		guestHouse.roomAllocation(guestList);

	}

	@Test
	public void test() {


		assertArrayEquals(guestHouse.allocated, exceptedOutPut);
		
		/*
		 * test case two
		 *  all are requesting for last room
		 * */
		
		guestHouse = new GuestHouse("5star", 10);

		guestList.clear();	

		guest = new Guest("vijay", 9);

		guestList.add(guest);

		guest = new Guest("Vicky", 9);

		guestList.add(guest);

		guest = new Guest("ABC", 9);

		guestList.add(guest);

		guest = new Guest("MNO", 9);

		guestList.add(guest);

		guest = new Guest("Rahul", 9);

		guestList.add(guest);

		guest = new Guest("God", 9);

		guestList.add(guest);

		exceptedOutPut = new String[]{"Vicky","ABC","MNO","Rahul","God","E","E","E","E","vijay"};


		guestHouse.roomAllocation(guestList);

		assertArrayEquals(guestHouse.allocated, exceptedOutPut);




		/*
		 * User can also test at runtime by providing test case
		 * */

		System.out.println("Enter number of Guest");

		numOfGuest = sc.nextInt();

		guestList.clear();	

		for(int i=0;i<numOfGuest;i++){

			guest = new Guest(sc.next(), sc.nextInt());

			guestList.add(guest);

		}



		guestHouse.roomAllocation(guestList);

		assertArrayEquals(guestHouse.allocated, guestHouse.allocated);	

	}

}
