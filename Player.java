/**
 * this application is for double player to play game 
 * @author pratap
 * */

import java.util.InputMismatchException;
import java.util.Scanner;


public class Player {

	Rule rules;
	Scanner sv;
	UserInputValidation uiv;
	char marker = ' ';

	public Player(){
		rules = new Rule();
		sv = new Scanner(System.in);

	}
	public void play(){
		int markAt,turn;
		turn = 1;
		marker =' ';
		System.out.println("Player 1 as X");
		System.out.println("Player 2 as O");

		while(!rules.winCheck(TicTacToe.board, marker) && !rules.tieCheck(TicTacToe.board)){			// Can Player plays the Game
			TicTacToe.displayBoard(TicTacToe.board);
			System.out.print("Player "+(3-turn) );
			System.out.print(" Mark at ");
			do{
				try{
					markAt = sv.nextInt();
					throw new InputMismatchException();
				}catch(InputMismatchException e){
					System.out.print("Error enter valid type input");
				}

			}while( !uiv.isInteger( ""+markAt ) &&  !rules.isValidMove(TicTacToe.board, markAt));  //if move is invalid then asking again for valid move
			//above code of line also check that given input is Integer or not

			if(turn == 1){										// selecting player
				marker = 'O'; turn =2;
			}else{
				marker = 'X'; turn =1;
			}
			rules.move(TicTacToe.board, markAt, marker);		// taking move
			System.out.println();
		}
		TicTacToe.displayBoard(TicTacToe.board);				//displaying board

		/*
		 * checking who wins or match is tie
		 * */
		if(rules.winCheck(TicTacToe.board, marker)){
			if(turn==1){
				System.out.println("Player One Wins Congrats");
			}
			else{
				System.out.println("Player Two Wins Congrats");
			}
		}
		else{
			System.out.println("Match Tie");
		}

	}

}
