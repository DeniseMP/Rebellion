#pragma strict

var forca : Vector3 = Vector3(0.0,0.0,0.0); // Forças da movimentação;
var velocidade = 10.0;
var gravidade = 9.8;
var noChao = 0; // Detecta chão;
var cc: CharacterController; // Variavel do tipo CharacterController;
var acao : int = 0; // Controla o movimento;


function Start () {
	cc = GetComponent("CharacterController"); // CharacterController do próprio jogador;
}

function Update () {
	if(acao == 1){ // Para esquerda;
		transform.eulerAngles.y = 180;
		forca.x = -velocidade;
	} else if(acao == 2){ // Para direita;
		transform.eulerAngles.y = 360;
		forca.x = velocidade;
	} else if(acao == 3){ // Virar para esquerda;
		transform.eulerAngles.y = 180;
	} else if(acao == 4){ // Virar para direita;
		transform.eulerAngles.y = 360;
	}
	
	// Gravidade:
	if(noChao == 0)
		forca.y -= gravidade;
		
	//Corrigir pelo tempo:
	forca *= Time.deltaTime;	
	
	// Mover = Move
	cc.Move(forca);
	
	//percebe chao;
	if(cc.isGrounded)
		noChao = 1;
	else
		noChao = 0;
}