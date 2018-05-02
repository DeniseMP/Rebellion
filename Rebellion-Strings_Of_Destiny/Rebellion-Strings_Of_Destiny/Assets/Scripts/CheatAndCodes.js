#pragma strict

function Start () {

}

function Update () {
	if(Input.GetKeyDown(","))
	{
		Application.LoadLevel(Application.loadedLevel-1);
	}
	if(Input.GetKeyDown("."))
	{
		Application.LoadLevel(Application.loadedLevel+1);
	}
}