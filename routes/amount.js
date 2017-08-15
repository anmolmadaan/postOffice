module.exports=function(weight, distance)
{
	var  distanceFactor=0;
  var wAmount=0,dAmount,tAmount;
	if(distance < 50)
	{
		if(weight < 50)
		{
			dAmount=15;
		}
		else if(weight < 200 )
		{
			wAmount=10;
			dAmount=15;
		}
		else if(weight < 500)
		{
			wAmount=15;
			dAmount=15;
		}
		else if(weight >= 500)
		{

			distanceFactor = Math.floor(weight/500);
      wAmount = distanceFactor*10;
    dAmount = 30;
		//	dAmount = (distanceFactor*10) + 30;

		}
	}
	else if(distance < 200)
	{
		if(weight < 50)
		{
			dAmount=35;
		}
		else if(weight < 200 )
		{
			dAmount=35;
		}
		else if(weight < 500)
		{
			wAmount=15;
			dAmount=35;
		}
		else if(weight >= 500)
		{
			distanceFactor = Math.floor(weight/500);
      wAmount = distanceFactor*15;
			//dAmount = (distanceFactor*15) + 50;
      dAmount = 50;
		}
	}
	else if(distance < 1000)
	{
		if(weight < 50)
		{
			dAmount=35;
		}
		else if(weight < 200 )
		{
			dAmount=40;
		}
		else if(weight < 500)
		{
			wAmount=20;
			dAmount=40;
		}
		else if(weight >= 500)
		{
			distanceFactor = Math.floor(weight/500);
			//dAmount = (distanceFactor*30) + 60;
      wAmount = distanceFactor*30;
      dAmount = 60;
		}
	}
	else if(distance < 2000)
	{
		if(weight < 50)
		{
			dAmount=35;
		}
		else if(weight < 200 )
		{
			wAmount=25;
			dAmount=35;
		}
		else if(weight < 500)
		{
			wAmount=25;
			dAmount=55;
		}
		else if(weight >= 500)
		{
			distanceFactor = Math.floor(weight/500);
			//dAmount = (distanceFactor*40) + 80;
      wAmount = distanceFactor*40;
      dAmount = 80;
		}
	}
	else if(distance >= 2000)
	{
		if(weight < 50)
		{
			dAmount=35;
		}
		else if(weight < 200 )
		{
			dAmount=70;
		}
		else if(weight < 500)
		{
			wAmount=20;
			dAmount=70;
		}
		else if(weight >= 500)
		{
			distanceFactor = Math.floor(weight/500);
			//dAmount = (distanceFactor*50) + 90;
      wAmount = distanceFactor*50;
      dAmount = 90;
		}
	}
  tAmount = wAmount + dAmount;
  var amount = {
    "wAmount" : wAmount,
    "dAmount" : dAmount,
    "tAmount" : tAmount
  }
	return amount;
}
