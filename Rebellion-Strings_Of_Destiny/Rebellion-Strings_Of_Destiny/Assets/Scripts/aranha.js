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

var aranh : GameObject;

var controlador : GameObject;
var scriptc : ControlaVidas;

var particulas : GameObject;




function Start(){
	cc = GetComponent("CharacterController");
	
	trigger = GameObject.Find("Trigger");
	script = trigger.GetComponent("Trigger");
	
	aranh = GameObject.Find("Spider_all_anims");
	
	controlador = GameObject.Find("Controle");
    scriptc = controlador.GetComponent("ControlaVidas");
    
    particulas = GameObject.Find("particulas");

}


function Update(){

	if(scriptc.aranhalife <= 0)
	{
	scriptc.aranhalife = 0;
	script.dentro = false;
	script.apertou = 1;
	GameObject.Destroy(gameObject, 1.0);
	aranh.animation.CrossFade("Death", 0.2);
	}
	if(distAndada < esqFinal && script.dentro == true) // se chegar ao máximo da esquerda;
	{ 
		velocidade = 0;
		//aranh.animation.Stop();
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
		
	if(script.controlando == 1 && script.timer > 4 && script.descontou == 1)
	{
	
	aranh.animation.PlayQueued("Attack", QueueMode.PlayNow);
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
}

//var player: GameObject; // Ref do jogador;
//var forca: Vector3;
//var velocidade_robo = 3.0; // Vel de movimento;
//var estado = 1; // Estado do robô (Maquina de estados);
//var distancia_player: int;
//var posicao_base: Vector3 = Vector3(509.9976, 0.7853947, 446.0647);
//var player_script : move_cc; // Pega o script;
//var espera_ataque = 0.0; // Timer para novos ataques;
//
//
//function Start () {
//	player = GameObject.Find("Player");
//	player_script = player.GetComponent("move_cc");
//}
//
//function Update () {
//	// Calcula distância do player:
//	distancia_player = Vector3.Distance(transform.position, player.transform.position);
//	
//	// Estado 1. PATRULHA:
//	if(estado == 1){
//		transform.eulerAngles.y += 10 * Time.deltaTime;
//		
//		//REGRA DE MUDANÇA DE ESTADO:
//		//Distancia - próximo vai perseguir
//		if(distancia_player < 30){
//			estado = 2;
//		}
//	}
//	// Estado 2. PERSEGUE:
//	if(estado == 2){
//		transform.LookAt(player.transform.position); // Mantém a câmera focada no player;
//		
//		forca.x = 0;
//		forca.y = 0;
//		forca.z = velocidade_robo;
//		
//		forca *= Time.deltaTime; // Corrigir para não diferenciar por FPS;
//		
//		transform.Translate(forca); // Andar pra frente;
//		
//		//REGRA DE MUDANÇA DE ESTADO:
//		if(distancia_player > 50){
//			estado = 3;
//		}
//		if(distancia_player < 2){
//			estado = 4;
//		}
//	}
//	// Estado 3. VOLTA POSTO:
//	if(estado == 3){
//		transform.LookAt(posicao_base); // Mantém a câmera focada no player;
//		
//		forca.x = 0;
//		forca.y = 0;
//		forca.z = velocidade_robo;
//		
//		forca *= Time.deltaTime; // Corrigir para não diferenciar por FPS;
//		
//		transform.Translate(forca); // Andar pra frente;
//		
//		//REGRA DE MUDANÇA DE ESTADO:
//		if(Vector3.Distance(transform.position, posicao_base) < 3){
//			estado = 1;
//		}
//	}
//	// Estado 4. ATACA - TIRA SAÚDE:
//	if(estado == 4){
//		player_script.saude -= 10; // Player perde vida;
//		player_script.forca.y = 2; // Player pula;
//		
//		//REGRA DE MUDANÇA DE ESTADO:
//		estado = 5;
//		
//		// Zerar temporizador:
//		espera_ataque = 0;
//	}
//	// Estado 5. ATACA - animação / espera:
//	if(estado == 5){
//		espera_ataque += Time.deltaTime; // calcula tempo de espera;
//		// Espera 2 segundos e volta a seguir:
//		if(espera_ataque >= 2){
//			estado = 2;
//		}
//	}
//}
