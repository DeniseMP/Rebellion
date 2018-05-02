#pragma strict

var player : GameObject;


function Start () {
	//localiza player - por nome 
	player = GameObject.Find("Player");
}

function Update () {
	//pos x = pos player
    transform.position.x = player.transform.position.x + 18;
	//pos y = pos player
	//transform.position.y = player.transform.position.y + (player.transform.position.y * 0.5);//6.919427;//29
	//pos z fixa
	transform.position.z = -25.29192;//-63
	//rot fixa
	transform.eulerAngles = Vector3(0,0,0); //35
}





