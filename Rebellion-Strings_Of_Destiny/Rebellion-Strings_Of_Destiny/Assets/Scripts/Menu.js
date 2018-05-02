#pragma strict

function Start () {

}

function Update () {

}

var skin1 : GUISkin;


var img_fundo : Texture2D;

var somClip: AudioClip;

var hover : String;

var controla = 0;


function OnGUI () {

	var posx = 0;
	var posy = 0;
	var tamx = 0;
	var tamy = 0;

	//mudar skin - estilo
	GUI.skin = skin1;

	//imagem fundo
	//GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height ), img_fundo);
		
	
		//BOX centro da tela
		tamx = 220;
		tamy = 200;
		posx = Screen.width/2 - tamx/2;
		posy = Screen.height/2- tamy/2;
		
	
		GUI.Box(Rect(posx, posy, tamx, tamy), " ");
		
		//BOTAO JOGAR
		posx += 10;		
		posy += 60;
		
		
		if (GUI.Button(Rect(posx, posy, 200, 30),GUIContent ("Novo Jogo", "NovoJogo"))) {
		
        
			//acao do botao
			Debug.Log("Apertou botao");
			
			//carregar mapa
			Application.LoadLevel(1);
		
		}
	
			
		//BOTAO Creditos
		posy += 40;
		if (GUI.Button(Rect(posx, posy, 200, 30), GUIContent ("Créditos", "Creditos"))) {
			//acao do botao
			//Debug.Log("Apertou botao");
			//SAIR 
			//Application.Quit();
			//Application.OpenURL("http://www.invent4.com");
			Application.LoadLevel("Creditos");
			
		}
		
			//BOTAO Sair
		posy += 40;
		if (GUI.Button(Rect(posx, posy, 200, 30), GUIContent ("Sair", "Sair"))) {
			//acao do botao
			//Debug.Log("Apertou botao");
			//Application.Quit();
			if(!Application.isWebPlayer){
				Application.Quit();
			} else{
				Application.LoadLevel("Creditos");
			}
		
		}	
		
			hover = GUI.tooltip;
			
				if(hover == "NovoJogo" || hover == "Creditos" || hover == "Sair")
				{
						audio.clip = somClip; 
        				audio.Play(); 
				}	
				
				if(hover == "NovoJogo" || hover == "Creditos" || hover == "Sair")
				{
				controla = 1;
				}
				if(hover != "NovoJogo" && hover != "Creditos" && hover != "Sair")
				{
				controla = 0;
				}
				
				if(controla == 1)
				{
				particleSystem.Play();
				particleSystem.enableEmission = true;
				
				}
				if(controla == 0)
				{
				particleSystem.enableEmission = false;
				
				}

				
	
}