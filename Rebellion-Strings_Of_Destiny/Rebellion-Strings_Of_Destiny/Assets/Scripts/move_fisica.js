#pragma strict

var forca : Vector3;
var velocidade = 100;
var pontos = 0;
var vidas = 3;
//var velocidade_atual = 0.0;
var velocidade_atual : float = 0.0;


function Start () {

}

function Update () {


	//ex: leitura mapa
	if (Input.GetKeyDown("1")) {
		Application.LoadLevel("mapa1");
	}
	if (Input.GetKeyDown("2")) {
		Application.LoadLevel("mapa2");
	}
	


	//velocidade do rigidbody
	velocidade_atual = rigidbody.velocity.magnitude;
	
	//zerar forca
	forca = Vector3(0,0,0);

	if (Input.GetKey("d") || Input.GetKey(KeyCode.RightArrow)) {
		forca.x = velocidade;
	}
	if (Input.GetKey("a") || Input.GetKey(KeyCode.LeftArrow)) {
		forca.x = -velocidade; // * -1
	}
	if (Input.GetKey("w") || Input.GetKey(KeyCode.UpArrow)) {
		forca.z = velocidade;
	}	
	if (Input.GetKey("s") || Input.GetKey(KeyCode.DownArrow)) {
		forca.z = -velocidade;
	}
	
	//ROTACAO PELO MOVIMENTO DO MOUSE
	transform.eulerAngles.y += Input.GetAxis("Mouse X") * 90 * Time.deltaTime;

	
	//rigidbody
	//ADD force pelos eixos do mundo
	//rigidbody.AddForce(forca);
	
	
	//FORCA PELOS EIXOs DO OBJETO
	rigidbody.AddRelativeForce(forca);
}

//COLISAO OBJS SOLIDOS
function OnCollisionEnter(quem : Collision) {

	//pega nome obj q colidiu
	var nome = quem.gameObject.name;

	Debug.Log("Bati em: " + nome);
	
	
	//virus2 - acessa o script dele
	if (nome == "Virus2") {	
		//acessar script = cria var do tipo do script
		var virus_script : virus2;
		//objeto que bateu
		var virus_obj = quem.gameObject;
		//localiza o component script
		virus_script = virus_obj.GetComponent("virus2");
		//pode-se acessar todas vars do script do obj
		virus_script.vidas -= 1;
		
		if (virus_script.vidas <= 0) {
			Destroy(virus_obj);
		}
	}
	
	
	//ex : colide em obj
	if (nome == "Salto") {
		//aplica forca para saltar
		rigidbody.AddForce(Vector3(0, 200, 0));
	}
	
	//ex: bonus
	if (nome == "Bonus") {
		pontos += 10;
		//destroi obj que colidiu
		Destroy(quem.gameObject);
	}
	//ex: bonus
	if (nome == "Bomba") {
		vidas -= 1;
		
		//bateu bomba vai cima e tras
		rigidbody.AddRelativeForce(Vector3(0, 300, -400));
		
		//destroi obj que colidiu
		Destroy(quem.gameObject);
	}

	//ex: bola
	if (nome == "Bola") {
	
		//testa se obj tem rigidbody
		if (quem.rigidbody) {
			//da forca no obj q colidiu
			quem.rigidbody.AddForce(Vector3(0,1500, 800));
		}

	}

}

//colisao Triggers
function OnTriggerEnter(quem : Collider) {
	var nome = quem.gameObject.name;

	Debug.Log("Entrei em Trigger: " + nome);
	
	//ex: teletransporte
	if (nome == "Area1") {
	
		Application.LoadLevel("mapa2");
		
	
	/*
		//levo para nova posicao
		transform.position = Vector3(-43, 5, 36);
		
		//zerar velocidades do player
		rigidbody.velocity = Vector3(0,0,0);
		//zerar velocidade angular
		rigidbody.angularVelocity = Vector3(0,0,0);
	*/
		
	}

	//ex: teletransporte
	if (nome == "Area2") {
		Application.LoadLevel("mapa1");
	}
			
	
	
}

function OnTriggerStay(quem : Collider) {
	var nome = quem.gameObject.name;
	
	//ex. reduz velo se em trigger
	if (nome == "Sala") {
		//reduz para metade a velo 50%
		//rigidbody.velocity *= 0.5;
		
		//amplia a velo para 150%
		//rigidbody.velocity *= 1.5;
		
		//ex: recebe forca para cima / limitada
		if (rigidbody.velocity.y < 3) {
			rigidbody.AddForce(Vector3(0, 200, 0));
		}
		
		
	}
	
	//Debug.Log("Estou em Trigger");
}

function OnTriggerExit(quem : Collider) {
	var nome = quem.gameObject.name;
	Debug.Log("Sai do Trigger: " + nome);
}
















