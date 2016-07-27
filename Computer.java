/**
 * this application for Play game between Player(Human) and Player(Computer)
 * @author pratap
 * */
import java.util.InputMismatchException;
import java.util.Random;
import java.util.Scanner;


public class Computer {

	Rule rules;
	Scanner sv;
	UserInputValidation uiv;
	Random rand;
	int  computerTurn;
	char marker = ' ';

	public Computer(){
		rules = new Rule();
		sv = new Scanner(System.in);
		rand = new Random();			// to generate random number



	}
	public void play(){
		int markAt,turn;
		turn = 1;
		marker =' ';
		System.out.println("Player 1 as O");
		System.out.println("Player(Computer) 2 as X");

		while(!rules.winCheck(TicTacToe.board, marker) && !rules.tieCheck(TicTacToe.board)){		// Can Player plays the Game

			TicTacToe.displayBoard(TicTacToe.board);
			System.out.print("Player "+(3-turn) );
			System.out.print(" Mark at ");
			do{
				if(turn == 1){						//for Player One
					try{
						markAt = sv.nextInt();
						throw new InputMismatchException();
					}catch(InputMismatchException e){
						System.out.print("Error enter valid type input");
					}
				}
				else{								// for computer
					markAt = rand.nextInt(10) + 1;
				}

			}while( !uiv.isInteger( ""+markAt ) &&  !rules.isValidMove(TicTacToe.board, markAt)); 		// checking for valid move from user also check that given input is Integer or not

			if(turn == 1){										// selecting player for taking move
				marker = 'O'; turn =2;
			}else{
				marker = 'X'; turn =1;
			}
			rules.move(TicTacToe.board, markAt, marker);		// taking move
			System.out.println();
		}
		TicTacToe.displayBoard(TicTacToe.board);				// displaying board

		/*
		 * checking who wins or match is tie
		 * */

		if(rules.winCheck(TicTacToe.board, marker)){
			if(turn==2){
				System.out.println("Player One Wins Congrats");
			}
			else{
				System.out.println("Computer Wins Congrats");
			}
		}
		else{
			System.out.println("Match Tie");
		}

	}

}
