#pragma strict

var forca : Vector3 = Vector3(0.0,0.0,0.0); // Forças da movimentação;
var velocidade = 10.0;
var gravidade = 9.8;
var noChao = 0; // Detecta chão;
var cc: CharacterController; // Variavel do tipo CharacterController;
var saude = 2000.0;
var sp = 500.0;
var foto : Texture2D;

var juliet : GameObject;
var oldP:Vector3;
var following : boolean = true;
var sameLayer:boolean;


function Start () {
	// Localiza CharacterController:
	cc = GetComponent("CharacterController"); // CharacterController do próprio jogador;
	
	
	
	//aranha_script = aranha.GetComponent("aranha");
	juliet = GameObject.Find("Juliet"); //GetComponent("Juliet");
	//animator = juliet.GetComponent("Animator"); // Pega o componente animador;
	sameLayer = false;
}

function Update () {
//	var h = Input.GetAxis("Vertical");
//	animator.SetFloat("Speed", h*h + 30);
//	animator.SetFloat("Direction", h, DirectionDampTime, Time.deltaTime);
	
	if(following){
		if(juliet.transform.position.x <= transform.position.x - 8){ // Para esquerda;
			transform.eulerAngles.y = 180;
			forca.x = -velocidade;
		} else if(juliet.transform.position.x > transform.position.x + 8){ // Para direita;
			transform.eulerAngles.y = 360;
			forca.x = velocidade;
		}
		if(oldP == juliet.transform.position){
			if(juliet.transform.position.x <= transform.position.x - 3){
				transform.eulerAngles.y = 180;
				forca.x = -velocidade;
			} else if(juliet.transform.position.x > transform.position.x + 3){
				transform.eulerAngles.y = 360;
				forca.x = velocidade;
			}
		}
		oldP = juliet.transform.position;
	}
	if(sameLayer){ // Mesma camada, profundidade é igualada;
		var dist:float;
		if(transform.position.z > juliet.transform.position.z){
			dist = transform.position.z - juliet.transform.position.z;
			if(dist <= 0.5){
				transform.position.z = juliet.transform.position.z;
				sameLayer = false; // Desativa este modo, pois já estão na mesma camada;
			} else if(transform.position.z > juliet.transform.position.z){
				forca.z -= velocidade;
			}
		} else if(transform.position.z < juliet.transform.position.z){
			dist = juliet.transform.position.z - transform.position.z;
			if(dist <= 0.5){
				transform.position.z = juliet.transform.position.z;
				sameLayer = false; // Desativa este modo, pois já estão na mesma camada;
			} else if(transform.position.z < juliet.transform.position.z){
				forca.z += velocidade;
			}
		}
	}
	
	if(juliet.transform.position.x > transform.position.x)
		transform.eulerAngles.y = 360;
	else if(juliet.transform.position.x < transform.position.x)
		transform.eulerAngles.y = 180;
	
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

/*function OnGUI() {



	//BARRA ABAIXO DA TELA
	var posx = 0;
	var posy = 0;
	var tamx = 0;
	var tamy = 0;
	
	posx = 0;
	posy = 0;
	
	tamx = Screen.width/3.5;
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
	GUI.Label(Rect(posx, posy, 100, 50), "Saude: " + saude);
	
	//MOSTRAR SAUDE / LABEL
	posx += 100;
	GUI.Label(Rect(posx, posy, 100, 50), "Sp: " + sp);



	//BUTTON - botoes
	posx = 250;
	posy = 10;
	tamx = 100;
	tamy = 30;
	
	//botoes em if 
	if (GUI.Button(Rect(posx, posy, tamx, tamy), "Menu")) {
		//se pressionou
		//Debug.Log("Pressionou Botao");
		//vai mapa menu
		Application.LoadLevel(0);
	}
}*/