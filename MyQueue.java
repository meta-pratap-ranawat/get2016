
public class MyQueue<E> {

	Object[] array;

	int front,rear;

	public MyQueue() {

		array = new Object[20];

		front = rear = 0;

	}



	public void enqueue(Object element){

		if(rear<array.length){

			array[rear++] = element;

		}else{

			gotException("Queue is OverFlow");
		}
	}


	public void makeEmpty(){

		front = rear = 0;

	}


	public Object dequeue(){

		if(front<rear){

			return array[front++];

		}else{

			gotException("Queue is UnderFlow");

			return null;
		}


	}

	public void gotException(String message){

		try{

			throw new MyException(message);

		}catch(MyException e){

			e.printStackTrace();

		}

	}

	public Object getFront(){
		
		if(front!=0&&rear!=0){
			
			return array[front];
			
		}else{
			
			gotException("Queue is UnderFlow");
			
			return null;
			
		}
	}

}
