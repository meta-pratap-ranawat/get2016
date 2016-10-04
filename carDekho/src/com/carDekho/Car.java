package com.carDekho;

public class Car extends Vehicle {
	
	private int id;
	private int ac;
	private int powerSteering;
	private int accessoryKit;
	
	public Car() {
		
	}
	
	public Car(int id, int ac, int powerSteering, int accessoryKit) {
		this.id = id;
		this.ac = ac;
		this.powerSteering = powerSteering;
		this.accessoryKit = accessoryKit;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return id;
	}
	
	public void setAc(int i) {
		this.ac = i;
	}
	
	public int getAc() {
		return ac;
	}
	
	public void setPowerSteering(int i) {
		this.powerSteering = i;
	}
	
	public int getPowerSteering() {
		return powerSteering;
	}
	
	public void setAccessoryKit(int i) {
		this.accessoryKit = i;
	}
	
	public int getAccessoryKit() {
		return accessoryKit;
	}

}
