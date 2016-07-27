/**
 * this application defines Rules for game TicTacToe
 * @author pratap
 * */
public class Rule {

	/*
	 * checks for win
	 * */
	boolean winCheck(char[][] board, char marker){

		if( marker=='X' || marker == 'O'){
			if( ( (board[0][0]==board[0][1] && board[0][1]==board[0][2] && board[0][1]!= '_' ) || 
					(board[1][0]==board[1][1] && board[1][1]==board[1][2] && board[1][1]!= '_' )|| 
					(board[2][0]==board[2][1] && board[2][1]==board[2][2]&& board[2][1]!= '_' )||
					(board[0][0]==board[0][1] && board[0][1]==board[0][2] && board[0][1]!= '_' ) ||
					(board[0][1]==board[1][1] && board[1][1]==board[2][1] && board[1][1]!= '_' ) ||
					(board[0][2]==board[1][2] && board[1][2]==board[2][2] && board[1][2]!= '_' ) ||
					(board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[1][1]!= '_' ) ||
					(board[2][0]==board[1][1] && board[1][1]==board[0][2] && board[1][1]!= '_' ) ) ){
				return true;
			}}

		return false;
	}

	/*
	 *    game tie or not at the end 
	 * */
	boolean tieCheck(char[][] board){

		for(int i=0;i<3;i++){
			for(int j=0;j<3;j++){
				if( board[i][j] == '_' ){
					return false;
				}
			}
		}


		return true;
	}


	/*
	 * checking for valid move on board as per current condition 
	 * */
	boolean isValidMove(char[][] board, int markAt){
		if(markAt<=9){
			if(markAt<=3){
				return (board[0][markAt-1] == '_');
			}else{
				if(markAt<=6){
					return (board[1][markAt-4] == '_');
				}
				else{
					return (board[2][markAt-7] == '_');
				}

			}
		}
		else{
			return false;
		}

	}

	/*
	 *taking move by marking Player symbol( O/X ) at given position(markAt)
	 * */
	void move(char[][] board, int markAt, char marker){

		if(markAt<=3){
			board[0][markAt-1] = marker;
		}else{
			if(markAt<=6){
				board[1][markAt-4] = marker;
			}
			else{
				board[2][markAt-7] = marker;
			}

		}
	}
}
