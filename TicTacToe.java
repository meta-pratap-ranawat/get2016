/**
 * this is main application from where game (TicTacToe) start
 * @author pratap
 * */

import java.io.IOException;
import java.util.Scanner;

public class TicTacToe {

	static char[][] board = new char[][]{{'_','_','_'},
		{'_','_','_'},
		{'_','_','_'}};			//creating check board
	Scanner sc;		
	Player pp;
	Computer cp;
	public TicTacToe()throws IOException{
		sc = new Scanner(System.in);
	}
	/*
	 * function start game and decide that who are playing game
	 *  two Player Or One Player and Computer
	 * */
	public void startGame(){

		System.out.println("Welcome To the Tic Tac Toe");

		System.out.println("Enter option to play");
		System.out.println("  1. Two Player");
		System.out.println("  2. Player and Computer");
		int gameWith = sc.nextInt();
		displayBoard(board);

		if(gameWith == 1){
			pp = new Player();
			pp.play();
		}else{
			cp = new Computer();
			cp.play();
		}
		sc.close();
	}


	/*
	 * function to display board
	 * */
	static public void displayBoard(char[][] board){
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

	/*
	 * main function to start game
	 * */
	public static void main(String[] args) {
		try{
			TicTacToe ttt = new TicTacToe();
			ttt.startGame();
		}catch(IOException e){
			System.out.print("Error in getting input");
		}

	}

}
