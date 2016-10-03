package com.customer;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "cutomer")
public class Customer {
	
	 private int id;
	   private String firstName,lastName;
	   private String email;
	   private String address;
	   private Integer numberOfOrders;

	   public Customer(){}
	   
	   public Customer(int id, String firstName, String lastName, String email, String address, Integer numberOfOrders){
	      this.id = id;
	      this.firstName = firstName;
	      this.lastName = lastName;
	      this.email = email;
	      this.address = address;
	      this.numberOfOrders = numberOfOrders;
	   }

	   public int getId() {
	      return id;
	   }

	   @XmlElement
	   public void setId(int id) {
	      this.id = id;
	   }
	   
	   
	   public String getFirstName() {
	      return firstName;
	   }
	   
	   @XmlElement
	   public void setFirstName(String firstName) {
	      this.firstName = firstName;
	   }
	   
	   
	   public String getLastName() {
	      return lastName;
	   }
	   
	   @XmlElement
	   public void setLastName(String lastName) {
	      this.lastName = lastName;
	   }
	   
	  
	   
	   public String getEmail() {
		      return email;
		   }
	   
	   @XmlElement
	   public void setEmail(String email) {
	      this.email = email;
	   }
	   
	   
	   public  String getAddress(){
		   
		   return address;
	   }
	   @XmlElement
	   public void setAddress(String address) {
	      this.address = address;
	   }
	   public Integer getNumberOfOrders() {
	      return numberOfOrders;
	   }
	   @XmlElement
	   public void setNumberOfOrders(Integer numberOfOrders) {
	      this.numberOfOrders = numberOfOrders;
	   }		

}
