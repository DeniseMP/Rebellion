#pragma strict

var d : float = 10;
var skin : GUISkin;
var skin2 : GUISkin;

function Start () {
	
}

function Update () {
	
}

function OnGUI(){
	GUI.skin = skin;
	GUI.Label(Rect((Screen.width / 2) - 200, (Screen.height / 2) - 200 + d, 200, 200), "Programadores/Desenvolvedores:");
	GUI.skin = skin2;
	GUI.Label(Rect((Screen.width - (Screen.width / 2)) - 300, (Screen.height / 2) - 200 + (d * 2), 300, 200), "Adriano L. Kerber \n(Site: adrianomaddog.webuda.com)");
	GUI.Label(Rect((Screen.width - (Screen.width / 4.5)) - 300, (Screen.height / 2) - 200 + (d * 2), 300, 200), "Denise Pinho (Blog: http://yukigames.blog.com)");
	
	GUI.skin = skin;
	if(GUI.Button(Rect(Screen.width / 2 + (Screen.width / 3), Screen.height / 2 + (Screen.height / 3), 50,50), "Voltar")){
		Application.LoadLevel(0); // Vai para o Menu
	}
}