#pragma strict

var lilian : GameObject;
var lilianScript : playerLilian;
var zoth : GameObject;
var zothScript : playerZoth;
var arcanjo : GameObject;
var arcanjoScript : ArcanjoMovimentos;

var evento : int = 0;
var cameraMode:int=0;
var blinker:GameObject;
var blinked:int;

var timerLigado:boolean = false;
var timer : float = 0;
var timer2 : float = 0;
var color1 : Color;
var colorDefault : Color;
var marcadorCor = 0;
var r:float = 0.0;
var g:float = 0.0;
var b:float = 0.0;
var a:float = 1.0;
private var posAux : Vector3;
private var oldPos : Vector3; // Guarda a posição antiga da câmera;
private var oldRot : Quaternion; // Guarda a rotação antiga da câmera (Matriz de rotação);
var skin : GUISkin;
var skin2 : GUISkin;

var som1 : AudioClip;
//var som2 : AudioClip;


function BlinkScreen(modeOfBlink : int):boolean{ // Retorna true se o ciclo tiver acabado; // modeOfBlink = tipo de piscadas na tela;
	if(modeOfBlink == 0){
		if(marcadorCor == 0){ // Clareia iluminação ambiente;
			if(timer >= 0.01){
				r += 1.0;
				g += 1.0;
				b += 1.0;
				color1 = Color(r,g,b,a);
				timer = 0;
			}
			if(r >= 10)
				marcadorCor = 1;
		} else if(marcadorCor == 1){ // Escurece iluminação ambiente;
			if(timer >= 0.05){
				r -= 1.0;
				g -= 1.0;
				b -= 1.0;
				color1 = Color(r,g,b,a);
				timer = 0;
			}
			if(r <= 1){
				marcadorCor = 2;
			}
		} else if(marcadorCor == 2){ // Clareia iluminação ambiente;
			if(timer >= 0.01){
				r += 1.0;
				g += 1.0;
				b += 1.0;
				color1 = Color(r,g,b,a);
				timer = 0;
			}
			if(r >= 10)
				marcadorCor = 3;
		} else if(marcadorCor == 3){ // Reset iluminação ambiente;
			if(timer >= 0.05){
				r -= 1.0;
				g -= 1.0;
				b -= 1.0;
				color1 = Color(r,g,b,a);
				timer = 0;
			}
			if(r <= colorDefault.r){
				color1 = colorDefault;
			}
		}
	} else if(modeOfBlink == 1){
		if(marcadorCor == 0){ // Clareia iluminação ambiente;
			if(timer >= 0.01){
				r += 1.0;
				g += 1.0;
				b += 1.0;
				color1 = Color(r,g,b,a);
				timer = 0;
			}
			if(r >= 10)
				marcadorCor = 1;
		} else if(marcadorCor == 1){
			if(timer >= 0.05){
				r -= 1.0;
				g -= 1.0;
				b -= 1.0;
				color1 = Color(r,g,b,a);
				timer = 0;
			}
			if(r <= colorDefault.r){
				color1 = colorDefault;
				marcadorCor = 2;
			}
		}
	}
	RenderSettings.ambientLight = color1;
	if(color1 == colorDefault && marcadorCor == 2){
		marcadorCor = 0;
		return true;
	} else
		return false;
}


function Start () {
	lilian = GameObject.Find("Player");
	lilianScript = lilian.GetComponent("playerLilian");
	zoth = GameObject.Find("Zoth");
	zothScript = zoth.GetComponent("playerZoth");
	blinker = GameObject.Find("Blinker");
	arcanjo = GameObject.Find("Arcanjo");
	//arcanjoScript = arcanjo.GetComponent("ArcanjoMovimentos");
	//som = GetComponent("AudioSource");
	audio.clip = som1;
	
	timerLigado = true; // Inicializa a Cutscene;
	
	color1 = colorDefault = RenderSettings.ambientLight;
	r = color1.r;
	g = color1.g;
	b = color1.b;
	marcadorCor = 0;
	blinked = 0;
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
	}
	
	switch(evento){
		case 0:
			if(timer2 > 0.05){
				blinker.renderer.material.color.a -= 0.05;
				timer2 = 0;
			}
			lilianScript.acao = 2;
			if(timer >= 3){
				timer = 0;
				evento++;
				audio.Play();
			}
			break;
		case 1:
			lilianScript.acao = 0;
			if(BlinkScreen(0)){
				blinked++;
			}
			if(blinked >= 2){
				if(!audio.isPlaying){
					audio.Play();
				}
				evento++;
				blinked = 0;
				timer = 0;
			}
			break;
//		case 2:
//			//initFalas = true;
//			evento++;
//			break;
	}
	
	// APAGAR O CÓDIGO ABAIXO, POIS É SOMENTE PARA TESTE:
//	if(Input.GetKey(KeyCode.UpArrow))
//		lilianScript.acao = 1;
//	if(Input.GetKey(KeyCode.DownArrow))
//		lilianScript.acao = 2;
//	if(Input.GetKey(KeyCode.LeftArrow))
//		lilianScript.acao = 3;
//	if(Input.GetKey(KeyCode.RightArrow))
//		lilianScript.acao = 4;
	/////////////
}

function OnGUI(){
	switch(evento){
		case 2:
			posAux = camera.WorldToScreenPoint(lilian.transform.position); // Converter coordenadas do mundo em coordenadas de tela;
			posAux.y = Screen.height - posAux.y; // Inverter o Y (Por causa do OpenGL);
			GUI.skin = skin;
			GUI.Box(Rect(posAux.x - (200 / 2), posAux.y - 200, 200, 50), "\nZoth olhe!");
			if(timer >= 3){
				timer = 0;
				evento++;
			}
			break;
		case 3:
			posAux = camera.WorldToScreenPoint(zoth.transform.position); // Converter coordenadas do mundo em coordenadas de tela;
			posAux.y = Screen.height - posAux.y; // Inverter o Y (Por causa do OpenGL);
			GUI.skin = skin2;
			GUI.Box(Rect(posAux.x - (110 / 2), posAux.y - 200, 110, 50), "\nO que será?"); // Posicionar sobre o player (Na cabeça dele);
			if(timer >= 3){
				timer = 0;
				evento++;
			}
			break;
		case 4:
			posAux = camera.WorldToScreenPoint(lilian.transform.position); // Converter coordenadas do mundo em coordenadas de tela;
			posAux.y = Screen.height - posAux.y; // Inverter o Y (Por causa do OpenGL);
			GUI.skin = skin;
			GUI.Box(Rect(posAux.x - (300 / 2), posAux.y - 200, 300, 100), "\nNão sei, \nmas parece que tem algo vindo de lá, \nnesta direção.");
			if(timer >= 6){
				timer = 0;
				evento++;
				oldPos = transform.position;
				oldRot = transform.rotation;
				//cameraMode = 1;
				//var dist = Vector3.Distance( transform.position, arcanjo.transform.position); // calcular distância;
				//transform.position = arcanjo.transform.position;
				//transform.position.z -= 50;
				//transform.position = lilian.transform.position;
				transform.position.z = lilian.transform.position.z;
				transform.position.y -= 1;
				transform.position.z -= 1;
				arcanjoScript.estado = 1;
				//transform.LookAt(arcanjo.transform.position); // Olha para o Arcanjo
			}
			break;
		case 5:
			transform.LookAt(arcanjo.transform.position); // Olha para o Arcanjo
			if(timer >= 5.5){
				timer = 0;
				evento++;
				transform.position = oldPos;
				transform.rotation = oldRot;
				//cameraMode = 0;
			}
			break;
		case 6:
			posAux = camera.WorldToScreenPoint(lilian.transform.position);
			posAux.y = Screen.height - posAux.y;
			GUI.skin = skin;
			GUI.Box(Rect(posAux.x - (200 / 2), posAux.y - 200, 200, 50), "\nFique atrás de mim!");
			if(timer >= 3){
				timer = 0;
				transform.position.z = lilian.transform.position.z;
				transform.position.y -= 1;
				transform.position.z -= 1;
				arcanjoScript.estado = 2;
				cameraMode = -1;
				evento++;
			}
			break;
		case 7:
			transform.LookAt(arcanjo.transform.position); // Olha para o Arcanjo
			if(timer >= 3){
				timer = 0;
				evento++;
				//cameraMode = 0;
			}
			break;
		case 8:
			if(BlinkScreen(1)){
//				transform.position = oldPos;
				//arcanjo.audio.Stop();
				transform.rotation = oldRot;
				evento++;
			}
			break;
		case 9:
			transform.position = Vector3( lilian.transform.position.x, 7.265993,-3.84);
			audio.volume -= 0.00000001;//blinker.audio.volume = 0.5;
			posAux = camera.WorldToScreenPoint(lilian.transform.position);
			posAux.y = Screen.height - posAux.y;
			GUI.skin = skin;
			if(lilianScript.acao != 3) GUI.Box(Rect(posAux.x - (200 / 2), posAux.y - 500, 200, 50), "\nO que será que foi aquilo?");
			if(timer >= 3 && lilianScript.acao != 3){
				lilianScript.acao = 3; // Vira para esquerda;
				zoth.transform.position = Vector3(0,0,-99);
				blinker.audio.Stop();
			} else if(timer >= 4){
				timer = 0;
				evento++;
				transform.position = oldPos;
				transform.rotation = oldRot;
				cameraMode = 1;
				//GameObject.Destroy(zoth);
			}
			break;
		case 10:
			posAux = camera.WorldToScreenPoint(lilian.transform.position);
			posAux.y = Screen.height - posAux.y;
			GUI.skin = skin;
			GUI.Box(Rect(posAux.x - (100 / 2), posAux.y - 200, 100, 50), "\nZoth!!!");
			if(timer >= 3){
				timer = 0;
				evento++;
				if(!audio.isPlaying){
					audio.Play();
				}
			}
			break;
		case 11:
			if(BlinkScreen(0)){
				lilianScript.acao = 4;
				evento++;
			}
			break;
		case 12:
			if(timer >= 2){
				evento++;
				timer = 0;
				if(!audio.isPlaying){
					audio.Play();
				}
			}
			break;
		case 13:
			if(BlinkScreen(1)){
				evento++;
				timer = 0;
				timer2 = 0;
			}
			break;
		case 14:
			if(timer2 > 0.05){
				blinker.renderer.material.color.a += 0.05;
				timer2 = 0;
			}
			if(blinker.renderer.material.color.a >= Color.black.a){
				evento++;
				timer = 0;
				Application.LoadLevel(Application.loadedLevel+1);
			}
			//break;
	}
}