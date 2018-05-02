#pragma strict

//var velocidade = 5;
var velocidade: int = 5;
var forca: Vector3;
var velRotacao: int = 90;


function Start () {




}

function Update () {

	forca = Vector3(0, 0, 0); //Zerando força; Utilizando um vetor temporário (que foi criado somente para setar os valores do novo vetor, "Vector3(0, 0, 0);" equivale a: "forca.x = 0; forca.y = 0; forca.z = 0;");

	// MOVIMENTAÇÃO:

	if(Input.GetKey("d") || Input.GetKey(KeyCode.RightArrow)){
		//transform.position.x -= velocidade * Time.deltaTime;
		forca.x = velocidade;
	}
	if(Input.GetKey("a") || Input.GetKey(KeyCode.LeftArrow)){
		//transform.position.z += velocidade * Time.deltaTime;
		forca.x = velocidade * -1;
	}
	if(Input.GetKey("w") || Input.GetKey(KeyCode.UpArrow)){
		//transform.position.x += velocidade * Time.deltaTime;
		forca.z = velocidade;
	}
	if(Input.GetKey("s") || Input.GetKey(KeyCode.DownArrow)){
		//transform.position.z -= velocidade * Time.deltaTime;
		forca.z = velocidade * -1;
	}
	
	forca *= Time.deltaTime; // Corrigindo pelo tempo em 1 segundo;
	transform.Translate(forca); // Passando um vetor3 direto;
	
	// Rotacionando através do Mouse;
	transform.eulerAngles.y += Input.GetAxis("Mouse X") * velRotacao * Time.deltaTime;
	transform.eulerAngles.x -= Input.GetAxis("Mouse Y") * velRotacao * Time.deltaTime;
	
	// COLISÃO:
	
	rigidbody.AddRelativeForce(forca);

}