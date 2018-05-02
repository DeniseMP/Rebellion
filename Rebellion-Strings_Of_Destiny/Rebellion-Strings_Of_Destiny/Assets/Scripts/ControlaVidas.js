#pragma strict

var saude = 2000.0;
var sp = 500.0;
var aranhalife = 500;
var turretlife = 1000;
var arclife = 2500;

var trigger : GameObject;
var script: Trigger;

var tempozero = false;

var timer:float = 0;

function Start () {

DontDestroyOnLoad(transform.gameObject);

trigger = GameObject.Find("Trigger");
script = trigger.GetComponent("Trigger");

}

function Update () {

timer += Time.deltaTime;

if(saude <= 0 )
{
saude = 0;
script.apertou =1;

if(tempozero == false)
{
timer = 0;
tempozero = true;
}

if(timer > 3)
{
Application.LoadLevel("Creditos");
//timer = 0;
}
}

}