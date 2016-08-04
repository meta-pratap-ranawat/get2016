import java.util.List;


public class GuestHouse {

	private Integer totalRooms;

	private String nameOfHouse;
	public String[] allocated;

	public GuestHouse() {
		totalRooms=0;
		nameOfHouse = null;
	}


	public GuestHouse(String nameOfHouse, Integer totalRooms){

		this.nameOfHouse = nameOfHouse;

		this.totalRooms = totalRooms;

		allocated = new String[totalRooms];
	}



	public void roomAllocation(List<Guest> guestList){


		for( Guest guest : guestList ){

			if(allocated[guest.getGuestAge()].equals(null) ){

				allocated[guest.getGuestAge()]= guest.getGuestName();

			}else{

				Integer age = guest.getGuestAge();

				while( !allocated[++age].equals(null) );

				allocated[age]= guest.getGuestName();

			}
		}
	}


	public void roomAllocatedList(List<Guest> guestList){

		for( Guest guest : guestList ){

			if(allocated[guest.getGuestAge()].equals(guest.getGuestName()) ){

				System.out.println(" Room Number "+guest.getGuestAge()+" is allocated to Mr/Ms. "+guest.getGuestName());

			}else{

				Integer age = guest.getGuestAge();

				while( !allocated[++age].equals(null) );

				System.out.println(" Room Number "+age+" is allocated to Mr/Ms. "+guest.getGuestName());

			}
		}

	}
}
