
public class FCFS {

	int[][] fcfsScheduling(int arrivalTime[], int jobSize[]) {
		
		int fcfs[][] = new int[arrivalTime.length][4];
		
		// recording into local variable 
		for (int i = 0; i < arrivalTime.length; i++) {
			fcfs[i][0] = arrivalTime[i];

		}
		
		for (int i = 0; i < arrivalTime.length; i++) {
			fcfs[i][1] = jobSize[i];

		}
		
		/*
		 * sorting all parameters of jobs by arrival time
		 * using bubble sort
		 * */
		int t=0;
		for (int i = 0; i < arrivalTime.length ; i++) {
			for (int j = 0; j < arrivalTime.length - 1; j++) {

				if (fcfs[j][0] > fcfs[j+1][0]) {   
					t = fcfs[j][0];
					fcfs[j][0] = fcfs[j + 1][0];
					fcfs[j + 1][0] = t;
					t = fcfs[j][1];
					fcfs[j][1] = fcfs[j + 1][1];
					fcfs[j + 1][1] = t;
					

				}
			}

		}
		
		int comp=0;
		for(int i=0;i<arrivalTime.length;i++)
		{
			if(i==0)
			{
				fcfs[0][2]=fcfs[0][0];
				fcfs[0][3]=fcfs[0][0]+fcfs[0][1];
				 comp=fcfs[0][3];
			}
			
			else
			{
				if(fcfs[i][0]<=comp)             
				{
					fcfs[i][2]=comp;          //start time 
					fcfs[i][3]=comp+fcfs[i][1];  //end time
					comp=fcfs[i][3];
				}
				else                          //arrival time may be less than current cpu cycle so that cpu will be idle for some time
				{
					fcfs[i][2]=fcfs[i][0];
					fcfs[i][3]=fcfs[i][2]+fcfs[i][1];
				}
				
			}
			
		}
		
		
		int fc[][]=new int [arrivalTime.length][5];
		for(int i=0;i<arrivalTime.length;i++)
		{
			fc[i][0]=i+1;                  //no. of job
			fc[i][1]=fcfs[i][0];            //arrival time of job
			fc[i][2]=fcfs[i][2]-fcfs[i][0];  //wait time of job
			fc[i][3]=fcfs[i][2];                //start time 
			fc[i][4]=fc[i][3]-1+fcfs[i][1];  //execution time of job
		}
		
		return fc;
		
	}

	
}
