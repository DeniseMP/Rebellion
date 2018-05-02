#pragma strict

var forca: Vector3;
var cc : CharacterController;
var velocidade = 10.0;
var gravidade = 9.8;
var noChao = 0;
var esqFinal = -10; // Direção final esquerda;
var dirFinal = 10; //    ||     ||  direita;
var distAndada : float = 0; // Distancia em relação a posição de nascimento;
var go = true; // Quando true, vai pra esquerda, false vai pra direita;

var trigger : GameObject;
var script: Trigger;

var vidas = 500;

var posx;
var posy;
var tamx;
var tamy;

var controlador : GameObject;
var scriptc : ControlaVidas;

var particulas : GameObject;


function Start(){

	particulas = GameObject.Find("particulas");
	    
	cc = GetComponent("CharacterController");
	
	trigger = GameObject.Find("Trigger");
	script = trigger.GetComponent("Trigger");
	
	controlador = GameObject.Find("Controle");
    scriptc = controlador.GetComponent("ControlaVidas");

}


function Update(){

	if(scriptc.turretlife <= 0)
	{
	scriptc.turretlife = 0;
	script.dentro = false;
	GameObject.Destroy(gameObject, 1.0);
	//aranh.animation.CrossFade("Death", 0.2);
	}
	
	if(script.controlando == 1 && script.timer > 4 && script.descontou == 1)
	{
	//aranh.animation.PlayQueued("Attack", QueueMode.PlayNow);
	scriptc.saude -= Random.Range(100,200);
	script.descontou = 0;
	script.apertou = 0;
	script.controlando = 0;
	
	if(script.especial == 1)
	{
	if(script.timer > 1.5)
	{
	particulas.particleSystem.enableEmission = false;
	script.especial = 0;
	}
	}
	
	}
	
	if(distAndada < esqFinal && script.dentro == true) // se chegar ao máximo da esquerda;
	{ 
		velocidade = 0;
	}
	if(distAndada < esqFinal && script.dentro == false) // se chegar ao máximo da esquerda;
	{ 
		go = false; // vai pra direita;
		transform.eulerAngles = Vector3(0, 180, 0);
	}
	else if(distAndada > dirFinal){ // se chegar ao máximo da direita;
		go = true; // vai pra esquerda;
		transform.eulerAngles = Vector3(0, 0, 0);
	}
	
	if(go){ // Para esquerda;
		forca.x = -velocidade;
		distAndada -= velocidade * Time.deltaTime;
	}
	if(!go){ // Para direita;
		forca.x = velocidade;
		distAndada += velocidade * Time.deltaTime;//distAndada++;
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
