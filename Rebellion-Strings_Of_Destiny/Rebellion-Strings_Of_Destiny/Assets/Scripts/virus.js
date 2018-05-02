#pragma strict

var player : GameObject;
var player_script : move_fisica;



function Start () {
	//encontra o objeto pelo nome
	player = GameObject.Find("Player");
	//no objto, procura component pelo nome
	player_script = player.GetComponent("move_fisica");
}

function Update () {

}

//colisao Triggers
function OnTriggerEnter(quem : Collider) {
	var nome = quem.gameObject.name;

	if (nome == "Sala") {
	
		//ACESSO O SCRIPT DO PLAYER
		player_script.pontos += 100;
		
	
		//Destroy virus
		Destroy(gameObject);	
	}
	
}
