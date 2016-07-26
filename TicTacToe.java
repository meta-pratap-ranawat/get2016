import java.util.Scanner;

public class TicTacToe {
	
	static char[][] board = new char[][]{{'_','_','_'},
										{'_','_','_'},
										{'_','_','_'}};
	Scanner sc;									
	public TicTacToe(){
		sc = new Scanner(System.in);
	}
	public void startGame(){
		
		System.out.println("Welcome To the Tic Tac Toe");
		displayBoard(board);
		System.out.println("Enter option to play");
		System.out.println("  1. Two Player");
		System.out.println("  2. Player and Computer");
		int gameWith = sc.nextInt();
		
		if(gameWith == 1){
			new Player();
			
		}else{
			new Computer();
		}
	}
	
	public void displayBoard(char[][] board){
		int cnt =0;
		System.out.println("==================");
		for(int i=0;i<3;i++){
			for(int j=0;j<3;j++){
				System.out.print( board[i][j]+" ");
			}
			for(int j=0;j<3;j++){
				System.out.print("  ");
			}
			for(int j=0;j<3;j++){
				System.out.print(++cnt +" ");
			}
			System.out.println();
		}
		System.out.println("==================");
	}

	public static void main(String[] args) {
		TicTacToe ttt = new TicTacToe();
		ttt.startGame();
	}

}
