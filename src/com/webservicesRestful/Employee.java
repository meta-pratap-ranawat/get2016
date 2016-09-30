package com.webservicesRestful;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "employee")
public class Employee {
	
	 private int id;
	   private String name;
	   private String email;
	   private String address;
	   private String profession;

	   public Employee(){}
	   
	   public Employee(int id, String name, String email, String address, String profession){
	      this.id = id;
	      this.name = name;
	      this.email = email;
	      this.address = address;
	      this.profession = profession;
	   }

	   public int getId() {
	      return id;
	   }

	   @XmlElement
	   public void setId(int id) {
	      this.id = id;
	   }
	   
	   
	   public String getName() {
	      return name;
	   }
	   
	   @XmlElement
	   public void setName(String name) {
	      this.name = name;
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
	   public String getProfession() {
	      return profession;
	   }
	   @XmlElement
	   public void setProfession(String profession) {
	      this.profession = profession;
	   }		

}
