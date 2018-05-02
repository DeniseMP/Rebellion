#pragma strict

var player : GameObject; // Jogador;


function Start () {
	player = GameObject.Find("Player"); // Encontra o objeto Player;
}

function Update () {
	
	if(Input.GetKeyDown(KeyCode.E)) // Sacar Espada;
	{	
		transform.localEulerAngles = Vector3(7.429743, 278.0547, 80.94175); // Rotação Local;
		transform.localPosition = Vector3(79.617, 126.7557, 263.92443); // Posição Local;
	}
	
	if(Input.GetKeyDown(KeyCode.W)) // Guardar Espada;
	{
		transform.localEulerAngles = Vector3(0,0,0); // Redefine (reset) a rotação;
		transform.localPosition = Vector3(0,0,0); // Redefine a posição (Local, pois é em relação ao objeto pai, sendo assim, volta a posição original);
	}
}
