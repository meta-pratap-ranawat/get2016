/**
 * this is application is title Entity
 * @author pratap
 * */
public class Title {

	private String titleName;
	
	public Title() {
		
		titleName = null;

	}
	
	
	public Title(String titleName){
		
		this.titleName = titleName;
		
	}
	
	
	public void setTitleName(String titleName){
		
		this.titleName = titleName;
	}
	
	
	public String getTitleName(){
		
		return titleName;
		
	}

}
