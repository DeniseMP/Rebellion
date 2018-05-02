#pragma strict

var player: GameObject;
var script: playerScript;

var desenha = 0;

var dentro = false;


var skin2 : GUISkin;


var animator : Animator;
var juliet : GameObject;

var controlador : GameObject;
var scriptc : ControlaVidas;

var aranha : GameObject;
var scripta : aranha;

var particulas : GameObject;

var ar : Texture2D;
var turr : Texture2D;
var vs : Texture2D;
var ac : Texture2D;

var apertou = 0;

var tigger = 0;

var timer:float = 0;

var controlando = 0;

var descontou = 0;

var especial = 0;



function Start () {
particulas = GameObject.Find("particulas");

controlador = GameObject.Find("Controle");
scriptc = controlador.GetComponent("ControlaVidas");

player = GameObject.Find("Player");
script = player.GetComponent("playerScript");


juliet = GameObject.Find("Juliet"); //GetComponent("Juliet");
animator = juliet.GetComponent("Animator"); // Pega o componente animador;

aranha = GameObject.Find("Aranha");
scripta = aranha.GetComponent("Spider_All_Anims");

}

function Update(){

timer += Time.deltaTime;


		if(Application.loadedLevel == 2 && apertou == 1 && timer > 1.8 && descontou == 0)
	{					
			if(especial == 1 && scriptc.sp > 0)
			{
			scriptc.aranhalife -= 800;
			particulas.particleSystem.Play();
	        particulas.particleSystem.enableEmission = true;
			scriptc.sp -=500;
			descontou = 1;
			controlando = 1;
			}
			else
			{
			if(especial == 1)
			{
			descontou = 1;
			controlando = 1;
			}
			else
			{
			scriptc.aranhalife -= Random.Range(250,550);
			descontou = 1;
			controlando = 1;
			}
			}

	}
		if(Application.loadedLevel == 3 && apertou == 1 && timer > 1.8 && descontou == 0)
	{
			if(especial == 1 && scriptc.sp > 0)
			{
			particulas.particleSystem.Play();
			particulas.particleSystem.enableEmission = true;
			scriptc.turretlife -= 800;
			scriptc.sp -=500;
			descontou = 1;
			controlando = 1;
			}
			else
			{
			if(especial == 1)
			{
			descontou = 1;
			controlando = 1;
			}
			else{
			scriptc.turretlife -= Random.Range(250,550);
			descontou = 1;
			controlando = 1;
			}
			}
	}
	
			if(Application.loadedLevel == 5 && apertou == 1 && timer > 1.8 && descontou == 0)
	{
			if(especial == 1 && scriptc.sp > 0)
			{
			particulas.particleSystem.Play();
			particulas.particleSystem.enableEmission = true;
			scriptc.arclife -= 800;
			scriptc.sp -=500;
			descontou = 1;
			controlando = 1;
			}
			else
			{
			if(especial == 1)
			{
			descontou = 1;
			controlando = 1;
			}
			else
			{
			scriptc.arclife -= Random.Range(250,550);
			descontou = 1;
			controlando = 1;
			}
			}
	}


///if(Application.loadedLevel == 2 && scriptc.sp > 0)
		//{
		//animator.SetBool("LA", true);
		///scriptc.aranhalife -= Random.Range(500,1000);
		//scriptc.sp -= 250;
		//}
		//if(Application.loadedLevel == 3 && scriptc.sp >0)
		//{
	///	animator.SetBool("LA", true);
		//scriptc.turretlife -= Random.Range(500, 1000);
		//scriptc.sp -= 250;
		//}
		//if(Application.loadedLevel == 5 && scriptc.sp >0)
		//{
		//animator.SetBool("LA", true);
		//scriptc.arclife -= Random.Range(500,1000);
		//scriptc.sp -= 250;
		//}




}


function OnGUI()
{
	
	if (desenha == 1)
   {
   
   	GUI.skin = skin2;
   	
	//ABRE O MENU PARA O MODO BATALHA
	if(apertou == 0)
	{
	var posx = 0;
	var posy = 0;
	var tamx = 0;
	var tamy = 0;
	
	posx = player.transform.position.x + Screen.width/4;
	posy = Screen.width/3.8 + player.transform.position.y;
	
	tamx = 100;
	tamy = 60;
	

	GUI.Box(Rect(posx, posy, tamx, tamy), "");
	
	//BUTTON - botoes
	posx = player.transform.position.x + Screen.width/4;
	posy = Screen.width/3.8 + player.transform.position.y;
	tamx = 100;
	tamy = 30;
	
	//botoes em if 
	if (GUI.Button(Rect(posx, posy, tamx, tamy), "Atacar")) {
		//se pressionou
		animator.SetBool("LA", true);
		apertou = 1;
		timer = 0;		
		//Debug.Log("Pressionou Botao");
      }
      
	posx = player.transform.position.x + Screen.width/4;
	posy = Screen.width/3.8 + 30 + player.transform.position.y;
	tamx = 100;
	tamy = 30;
	
	if (GUI.Button(Rect(posx, posy, tamx, tamy), "Especial")) {
		//se pressionou
		//Debug.Log("Pressionou Botao");
		
		animator.SetBool("LA", true);
		apertou = 1;
		timer = 0;	
		especial = 1;	

      }
      
    }
	posx = player.transform.position.x + Screen.width/4;
	posy = Screen.width/3.8 + 60 + player.transform.position.y;
	tamx = 100;
	tamy = 30;
      
    
    if(Application.loadedLevel == 2 && scriptc.aranhalife > 0)
    {
    	GUI.DrawTexture(Rect(Screen.width-Screen.width/1.9, 0, 100, 100), vs);
      
 		GUI.Box(Rect(Screen.width-Screen.width/2.8, 0, Screen.width/2.8, 65), "");
 	
    	GUI.DrawTexture(Rect(Screen.width-Screen.width/3, 10, 50, 50), ar);
    	 	
    	GUI.Label(Rect(Screen.width-Screen.width/5, 20, 100, 50), "Vidas: " + scriptc.aranhalife);
    	
    	GUI.Label(Rect(Screen.width-Screen.width/5+100, 20, 100, 50), "Timer: " + timer);
    }
    
    if(Application.loadedLevel == 3 && scriptc.turretlife > 0)
    {
    	GUI.DrawTexture(Rect(Screen.width-Screen.width/1.9, 0, 100, 100), vs);
      
 		GUI.Box(Rect(Screen.width-Screen.width/2.8, 0, Screen.width/2.8, 65), "");
 		
        GUI.DrawTexture(Rect(Screen.width-Screen.width/3, 10, 50, 50), turr);
    	 	
    	GUI.Label(Rect(Screen.width-Screen.width/5, 20, 100, 50), "Vidas: " + scriptc.turretlife);
    	
    	GUI.Label(Rect(Screen.width-Screen.width/5+100, 20, 100, 50), "Timer: " + timer);
    }
    
        if(Application.loadedLevel == 5 && scriptc.arclife > 0)
    {
        GUI.DrawTexture(Rect(Screen.width-Screen.width/1.9, 0, 100, 100), vs);
      
 		GUI.Box(Rect(Screen.width-Screen.width/2.8, 0, Screen.width/2.8, 65), "");
        
        GUI.DrawTexture(Rect(Screen.width-Screen.width/3, 10, 50, 50), ac);
    	 	
    	GUI.Label(Rect(Screen.width-Screen.width/5, 20, 100, 50), "Vidas: " + scriptc.arclife);
    	
    	GUI.Label(Rect(Screen.width-Screen.width/5+100, 20, 100, 50), "Timer: " + timer);
    }
    
		
   }
}





//IDENTIFICA A COLISÃO COM O TRIGGER

function OnTriggerEnter (other : Collider) 
{

	//AVISA QUE PERSONAGEM ENTROU NO TRIGGER
	Debug.Log("Trigger");
	
	//DESENHA O MENU
	desenha = 1;
	
	
	
	// CONTROLA A PAUSA DO PERSONAGEM E DO INIMIGO. ESSA VARIÁVEL É ACESSADA NOS CÓDIGOS PLAYERSCRIPT E ARANHA
	dentro = true;
	
	
}
