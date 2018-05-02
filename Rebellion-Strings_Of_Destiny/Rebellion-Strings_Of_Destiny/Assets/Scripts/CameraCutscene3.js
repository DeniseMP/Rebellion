#pragma strict

var lilian : GameObject;
var lilianScript : playerLilian;
var zoth : GameObject;
var zothScript : playerZoth;
var arcanjo : GameObject;
var arcanjoScript : ArcanjoMovimentos;
var cage : GameObject;

var evento : int = 0;
var cameraMode:int=0;
var blinker:GameObject;
//var blinked:int;

var timerLigado:boolean = false;
var timer : float = 0;
var timer2 : float = 0;

private var posAux : Vector3;
private var oldPos : Vector3; // Guarda a posição antiga da câmera;
private var oldRot : Quaternion; // Guarda a rotação antiga da câmera (Matriz de rotação);
var skin : GUISkin;
var skin2 : GUISkin;
var skin3 : GUISkin;

//var som1 : AudioClip;


function Start () {
	lilian = GameObject.Find("Player");
	lilianScript = lilian.GetComponent("playerLilian");
	zoth = GameObject.Find("Zoth");
	zothScript = zoth.GetComponent("playerZoth");
	blinker = GameObject.Find("Blinker");
	arcanjo = GameObject.Find("Arcanjo");
	cage = GameObject.Find("cage-monte");
	//arcanjoScript = arcanjo.GetComponent("ArcanjoMovimentos");
	//som = GetComponent("AudioSource");
	//audio.clip = som1;
	
	timerLigado = true; // Inicializa a Cutscene;
}

function Update () {	
	if(timerLigado){
		timer += Time.deltaTime; // Incrementa o contador;
		timer2 += Time.deltaTime;
	}
	
	if(cameraMode == 0){ // Centralizada entre os personagens;
		if(lilian.transform.position.x > zoth.transform.position.x)
			transform.position.x = lilian.transform.position.x - ((lilian.transform.position.x - zoth.transform.position.x) / 2);
		if(lilian.transform.position.x < zoth.transform.position.x)
			transform.position.x = zoth.transform.position.x - ((zoth.transform.position.x - lilian.transform.position.x) / 2);
	} else if(cameraMode == 1){ // Centralizada na Lilian;
		transform.position.x = lilian.transform.position.x;
	} else if(cameraMode == 2){
		if(lilian.transform.position.x > arcanjo.transform.position.x)
			transform.position.x = lilian.transform.position.x - ((lilian.transform.position.x - arcanjo.transform.position.x) / 2);
		if(lilian.transform.position.x < zoth.transform.position.x)
			transform.position.x = arcanjo.transform.position.x - ((arcanjo.transform.position.x - lilian.transform.position.x) / 2);
	}
	
	switch(evento){
		case 0:
			cameraMode = 0;
			if(timer2 > 0.05){
				blinker.renderer.material.color.a -= 0.05;
				timer2 = 0;
			}
			lilianScript.acao = 2;
			if(blinker.renderer.material.color.a <= 0){
				timer = 0;
				timer2 = 0;
				evento++;
			}
			break;
	}
}

function OnGUI(){
	switch(evento){
		case 1:
			lilianScript.acao = 2;
			posAux = camera.WorldToScreenPoint(lilian.transform.position); // Converter coordenadas do mundo em coordenadas de tela;
			posAux.y = Screen.height - posAux.y; // Inverter o Y (Por causa do OpenGL);
//			GUI.skin = skin;
//			GUI.Box(Rect(posAux.x - (100 / 2), posAux.y - 100, 100, 50), "\nZoth!!!");
			if(timer >= 5){
				timer = 0;
				timer2 = 0;
				lilianScript.acao = 0;
				evento++;
			}
			break;
		case 2:
			if(timer2 >= 0.05){
				cage.transform.position.y += 0.05;
				timer2 = 0;
			}
			if(timer >= 8){
				timer = 0;
				timer2 = 0;
				evento++;
				zothScript.following = true;
				zothScript.sameLayer = true;
			}
			break;
		case 3:
			
//			posAux = camera.WorldToScreenPoint(lilian.transform.position); // Converter coordenadas do mundo em coordenadas de tela;
//			posAux.y = Screen.height - posAux.y; // Inverter o Y (Por causa do OpenGL);
//			GUI.skin = skin;
//			GUI.Box(Rect(posAux.x - (160 / 2), posAux.y - 100, 160, 50), "Ei você! \nSolte ele imediatamente!");
			if(timer2 >= 0.5){
				blinker.renderer.material.color.a += 0.05;
				blinker.audio.volume -= 0.05;
				timer2 = 0;
			}
			if(blinker.audio.volume <= 0)
				Application.LoadLevel("Creditos");
			break;
	}
}