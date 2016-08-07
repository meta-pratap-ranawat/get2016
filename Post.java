/**
 * this application is to setup post
 * @author pratap
 * */
import java.io.Serializable;


class Post implements  Serializable{
	String username;
	String content;
	
	
	public Post(String username, String content) {
		super();
		this.username = username;
		this.content = content;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getUsername() {
		return username;
	}
	public String getContent() {
		return content;
	}
	@Override
	public String toString() {
		return "Post [username=" + username + ", content=" + content + "]";
	}


}
