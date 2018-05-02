#pragma strict

var forca : Vector3 = Vector3(0.0,0.0,0.0); // Forças da movimentação;
var velocidade = 10.0;
var gravidade = 9.8;
var noChao = 0; // Detecta chão;
var cc: CharacterController; // Variavel do tipo CharacterController;
var foto : Texture2D;

//var aranha : GameObject;
//var aranha_script : aranha;
var animator : Animator;
//var DirectionDampTime : float = 0.25;
var juliet : GameObject;
var oldPos : Vector3;
//var ativ : boolean = false;


//skin
var skin2 : GUISkin;

//controle das vidas
var controle: GameObject;
var script: ControlaVidas;

var triggerdentro: GameObject;
var triggerscript: Trigger;




function Start () {


	controle = GameObject.Find("Controle");
	script = controle.GetComponent("ControlaVidas");
	
	triggerdentro = GameObject.Find("Trigger");
	triggerscript = triggerdentro.GetComponent("Trigger");

	
	// Localiza CharacterController:
	cc = GetComponent("CharacterController"); // CharacterController do próprio jogador;
	
	
	//aranha = GameObject.Find("Aranha");
	
	//aranha_script = aranha.GetComponent("aranha");
	juliet = GameObject.Find("Juliet"); //GetComponent("Juliet");
	animator = juliet.GetComponent("Animator"); // Pega o componente animador;
}

function Update () {
//	var h = Input.GetAxis("Vertical");
//	animator.SetFloat("Speed", h*h + 30);
//	animator.SetFloat("Direction", h, DirectionDampTime, Time.deltaTime);
	if(script.saude <= 0){
		animator.SetBool("Dead", true);
	}
	
	if(Input.GetKey(KeyCode.LeftArrow)){ // Para esquerda;
		if(triggerscript.dentro == false)
		{
		transform.eulerAngles.y = 180;
		forca.x = -velocidade;	
		}		
	}
	if(Input.GetKey(KeyCode.RightArrow)){ // Para direita;
		if(triggerscript.dentro == false)
		{
		transform.eulerAngles.y = 360;
		forca.x = velocidade;
		}
	}
	
	if(animator.GetBool("AuxLuta")){ // AuxLuta é uma flag para marcar a primeira vez que a luta é iniciado em um ciclo;
		oldPos = transform.position;
		animator.SetBool("AuxLuta", false);//ativ = false;
	}
	if(animator.GetInteger("Attack") == 1){
		if(transform.eulerAngles.y > 180){
			forca.x = -velocidade;
		} else if(transform.eulerAngles.y <= 180){
			forca.x = velocidade;
		}
	}
	if(animator.GetBool("Lutou")){
		transform.position = oldPos;
		animator.SetBool("Lutou", false);
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

// Character Controller - função de colisão:

function OnControllerColliderHit(quem: ControllerColliderHit){
	
	var nome = quem.gameObject.name; // Nome do objeto que colidiu;
	
	
	//Debug.Log("Bateu no objeto: '" + nome + "'");
}

function OnGUI() {


	GUI.skin = skin2;

	//BARRA ABAIXO DA TELA
	var posx = 0;
	var posy = 0;
	var tamx = 0;
	var tamy = 0;
	
	posx = 0;
	posy = 0;
	
	tamx = Screen.width/2.8;
	tamy = 65;
	
	//BOX - BARRA
	GUI.Box(Rect(posx, posy, tamx, tamy), "");
	
	//MOSTRAR FOTO DO PLAYER
	posy= 10;
	posx += 10;
	tamx = 50;
	tamy = 50;
	GUI.DrawTexture(Rect(posx, posy, tamx, tamy), foto);
	
	//MOSTRAR SAUDE / LABEL
	posx += 65;
	posy += 10;
	GUI.Label(Rect(posx, posy, 100, 50), "Saude: " + script.saude);
	
	//MOSTRAR SAUDE / LABEL
	posx += 100;
	GUI.Label(Rect(posx, posy, 100, 50), "Sp: " + script.sp);



	//BUTTON - botoes
	posx = 230;
	posy = 15;
	tamx = 100;
	tamy = 30;
	
	//botoes em if 
	if (GUI.Button(Rect(posx, posy, tamx, tamy), "Menu")) {
		//se pressionou
		//Debug.Log("Pressionou Botao");
		//vai mapa menu
		Application.LoadLevel(0);
	}
}