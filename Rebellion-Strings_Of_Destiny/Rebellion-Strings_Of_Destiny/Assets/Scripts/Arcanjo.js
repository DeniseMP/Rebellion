#pragma strict


var gravidade = 9.8;
var noChao = 0;

var trigger : GameObject;
var script: Trigger;

var aranh : GameObject;

var controlador : GameObject;
var scriptc : ControlaVidas;

var particulas : GameObject;

var tempozero = false;

var timer:float = 0;

var tempo = false;


function Start(){
	
	trigger = GameObject.Find("Trigger");
	script = trigger.GetComponent("Trigger");
	
	controlador = GameObject.Find("Controle");
    scriptc = controlador.GetComponent("ControlaVidas");
    
    particulas = GameObject.Find("particulas");
    

}


function Update(){
	
	if(tempo)
	{
	timer += Time.deltaTime;
	}
	if(script.controlando == 1 && script.timer > 4 && script.descontou == 1)
	{
	tempo = true;
	audio.Play();
	scriptc.saude -= Random.Range(150,600);
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

	if(scriptc.arclife <= 0)
	{
	scriptc.arclife = 0;
	script.dentro = false;
	script.apertou = 1;
	transform.position = Vector3(1000,1000,1000);
	if(tempozero == false)
		{
			script.timer = 0;
			tempozero = true;
		}
	if(script.timer > 3)
		{
		Application.LoadLevel(Application.loadedLevel+1);
		}
	
	}
	
}