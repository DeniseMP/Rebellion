
var animator : Animator;
var DirectionDampTime:float = .25f;

var tStartAnim : boolean = false;
var time:float = 0;
var lilian:GameObject;
var lScript:playerLilian;


function Start() {
	animator = GetComponent("Animator");
	lilian = GameObject.Find("Player");
	lScript = lilian.GetComponent("playerLilian");
}

function Update() {
	//animator.SetBool("Jump", Input.GetButton("Fire1"));
	
	var h:float = 0.0;
	if(lScript.acao == 1 || lScript.acao == 2){
		h += 1;
	}
//	if(animator.GetInteger("Attack") == 1){
//		h += 1;
//	}
	if(h > 1){
		h = 1;	
	}
	
	
	animator.SetFloat("Speed", h);
	if(h < 0){
		animator.SetFloat("Speed", (h * -1));
	}
	animator.SetFloat("Direction", 0, DirectionDampTime, Time.deltaTime);
	
//	if(tStartAnim)
//		time += Time.deltaTime;
//	
//	if(Input.GetKeyDown("a")){
//		animator.SetInteger("Attack", 1);
//		animator.SetBool("AuxLuta", true);
//		tStartAnim = true;
//	} else if(time > 2.6){
//		animator.SetInteger("Attack", 0);
//		tStartAnim = false;
//		time = 0;
//		animator.SetBool("Lutou", true);
//	}
}
