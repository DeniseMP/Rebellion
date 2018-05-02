using UnityEngine;
using System.Collections;
[RequireComponent(typeof(Animator))]

public class AvatarController : MonoBehaviour {
	protected Animator animator;
	public float DirectionDampTime = .25f;
	
	bool tStartAnim = false;
	float time = 0;
	//GameObject player;
	//CharacterController cc;
	// Use this for initialization
	void Start () {
		animator = GetComponent<Animator>();
		//player = GameObject.Find("Player");
		//cc = player.GetComponent<CharacterController>();
	}
	
	// Update is called once per frame
	void Update () {
		animator.SetBool("Jump", Input.GetKey(KeyCode.Space));
		
		float h = 0;// = Input.GetAxis("Horizontal");
//		Debug.Log(h);
		if(Input.GetKey(KeyCode.LeftArrow)){
			h += 1;//Time.deltaTime;	
		} else if(Input.GetKey(KeyCode.RightArrow)){
			h += 1;//Time.deltaTime;
		}
		if(animator.GetInteger("Attack") == 1){
			h += 1;
		}
		if(h > 1){
			h = 1;	
		}
		
		
		animator.SetFloat("Speed", h);
		if(h < 0){
			animator.SetFloat("Speed", (h * -1));
		}
		animator.SetFloat("Direction", 0, DirectionDampTime, Time.deltaTime);
		
		if(tStartAnim)
			time += Time.deltaTime;
		
		if(animator.GetBool("LA")){
			animator.SetBool("LA", false);
			animator.SetInteger("Attack", 1);
			animator.SetBool("AuxLuta", true);
			tStartAnim = true;
		} /*else if(Input.GetKeyDown("s")){
			animator.SetInteger("Attack", 2) ;
		}*/ else if(time > 2.6){
			animator.SetInteger("Attack", 0);
			tStartAnim = false;
			time = 0;
			animator.SetBool("Lutou", true);
		}
		
		//Vector3 posicaoAtual = animator.rootPosition;
		//Vector3 vet = animator.gameObject.transform.position;
		//animator.rootPosition = player.transform.position;
		//cc.Move(animator.deltaPosition * 10);
		
//		Debug.Log("Direction(myScript) = " + h);
//		Debug.Log("Direction = " + animator.direction);
//		Debug.Log("Speed = " + (h*h+v*v));
//		if(animator.speed < 1 && animator.speed >= 0.25)
//			Debug.Break();
	}
}
