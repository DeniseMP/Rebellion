#pragma strict

var velocidade = 5;		//int 
//var velocidade : int;
//var com_virgula = 1.0;		//float
//var valor_float : float;
//var nome = "meu nome";		//string

var forca : Vector3;

var material1 : Material;
var material2 : Material;


function Start () {
	Reset_player();
}

function Update () {

	//ex reset do player
	if (Input.GetKeyDown(KeyCode.Return)) {
		//transform.position.x = -3;
		//transform.position.y = 5;
		//transform.position.z = 12;
		//ou - mesma coisa passando vetor direto
		//transform.position = Vector3(-3, 5, 12);
		//transform.eulerAngles = Vector3(0,0,0);
		Reset_player();
		
		
	}
	

	//ex. troca de materiais
	if (Input.GetKeyDown("1")) {
		renderer.material = material1;
	}
	if (Input.GetKeyDown("2")) {
		renderer.material = material2;
	}
	

	//LIGA DESLIGA VISUAL / RENDERER
	if (Input.GetKeyDown("o")) {
		// se ligado = desliga
		if (renderer.enabled) {
			renderer.enabled = false;
		}
		else {
			renderer.enabled = true;
		}
	}
	
	


	if (Input.GetKey("d") || Input.GetKey(KeyCode.RightArrow)) {
		//transform.position.x += velocidade * Time.deltaTime;
		forca.x = velocidade;
	}
	if (Input.GetKey("a") || Input.GetKey(KeyCode.LeftArrow)) {
		//transform.position.x -= velocidade * Time.deltaTime;
		forca.x = -velocidade; // * -1
	}
	if (Input.GetKey("w") || Input.GetKey(KeyCode.UpArrow)) {
		//transform.position.z += velocidade * Time.deltaTime;
		forca.z = velocidade;
	}	
	if (Input.GetKey("s") || Input.GetKey(KeyCode.DownArrow)) {
		//transform.position.z -= velocidade * Time.deltaTime;
		forca.z = -velocidade;
	}
	
	//ROTACOES BASICAS
	if (Input.GetKey("e")) {
		transform.eulerAngles.y += 90 * Time.deltaTime;
	}
	if (Input.GetKey("q")) {
		transform.eulerAngles.y -= 90 * Time.deltaTime;
	}
	
	if (Input.GetKey("r")) {
		transform.eulerAngles.x += 90 * Time.deltaTime;
	}
	if (Input.GetKey("f")) {
		transform.eulerAngles.x -= 90 * Time.deltaTime;
	}
	
	//ROTACAO PELO MOVIMENTO DO MOUSE
	transform.eulerAngles.y += Input.GetAxis("Mouse X") * 90 * Time.deltaTime;

	//transform.eulerAngles.x += Input.GetAxis("Mouse Y") * 90 * Time.deltaTime;
	transform.eulerAngles.x -= Input.GetAxis("Mouse Y") * 90 * Time.deltaTime;
			
	
	//CORRIGIR PELO TEMPO
	forca *= Time.deltaTime;
	
	//MOVER via TRANSLATE
	transform.Translate(forca);
	
	
	
	//erro
	//if (1) {
	
}


function Reset_player() {
	transform.position = Vector3(-3, 5, 12);
	transform.eulerAngles = Vector3(0,0,0);
}













