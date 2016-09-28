/**
 * 
 */
package com.model.vo;

/**
 * @author Pratap
 *
 */
public class CarVO extends VehicleVO {
	int id=0;
	String updateTime;
	String updatedBy;
	int  ac, powerSteering, accessoryKit ;
	
	@Override
	public int getId() {
		return id;
	}
	
	@Override
	public void setId(int id) {
		this.id = id;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	
	@Override
	public String getMake() {
		return getMake();
	}
	
	@Override
	public void setMake(String make) {
		super.setMake(make);
	}
	
	@Override
	public String getModel() {
		return getModel();
	}
	
	@Override
	public void setModel(String model) {
		super.setModel(model);
	}
	
	@Override
	public int getEngineInCC() {
		return getEngineInCC();
	}
	
	@Override
	public void setEngineInCC(int engineInCC) {
		super.setEngineInCC(engineInCC);
	}
	
	public void setFuelCapacity(int fuelCapacity) {
		super.setFuelCapacity(fuelCapacity);
	}
	
	public void setMilage(int milage) {
		super.setMilage(milage);
	}
	
	public void setPrice(int price) {
		super.setPrice(price);
	}
	
	
	@Override
	public double getFuelCapacity() {
		return getFuelCapacity();
	}
	
	
	@Override
	public double getMilage() {
		return getMilage();
	}
	
	
	@Override
	public double getPrice() {
		return getPrice();
	}
	public void setRoadTax(int roadTax) {
		super.setRoadTax(roadTax);
	}
	public int getAc() {
		return ac;
	}
	public void setAc(int ac) {
		this.ac = ac;
	}
	public int getPowerSteering() {
		return powerSteering;
	}
	public void setPowerSteering(int powerSteering) {
		this.powerSteering = powerSteering;
	}
	public int getAccessoryKit() {
		return accessoryKit;
	}
	public void setAccessoryKit(int accessoryKit) {
		this.accessoryKit = accessoryKit;
	}
	
	@Override
	 public int calculateOnRoadPrice(){
		  return (int) (this.getRoadTax()+this.getPrice());
	  }
	

}
