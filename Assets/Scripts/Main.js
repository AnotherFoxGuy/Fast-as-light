#pragma strict

var moveSpeed = 1;
var MainCamera: GameObject;
var Meteor: GameObject[];
var bonus: GameObject;
var sensitivity = 1;

private var Timer: float = 0;
private var r_x = 0F;
private var r_y = 0F;
private	var rb : Rigidbody;
private	var hit = false;
private	var points = 0.0;

function Start () {
	rb = this.GetComponent(Rigidbody);
}

function Update () {
	points += Time.deltaTime;
	if(!hit){
		//this.transform.position += transform.TransformDirection(Vector3.forward * moveSpeed);
		r_x += Input.GetAxis("Horizontal") * sensitivity;
		r_y += Input.GetAxis("Vertical") * sensitivity;
		this.transform.position = Vector3(r_x, r_y, 0);
		if (Time.time > Timer) {
			Timer = Time.time + Random.Range(0.2, 0.7);
			generateMeteorField(Random.Range(25, 50));
		}
	}
}

function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.tag == "Meteor"){
	  	Application.LoadLevel(Application.loadedLevel);
	   	var Meteors = GameObject.FindGameObjectsWithTag("Meteor");
	    Meteors += GameObject.FindGameObjectsWithTag("World");
		  for(var m : GameObject in Meteors){
				m.SendMessage("Stop");
			}
			print ("hit");
	    hit = true;
	    rb.velocity = Vector3(0,0,500);
			rb.isKinematic = false;
	    this.transform.DetachChildren();
	    MainCamera.transform.position = Vector3(this.transform.position.x - 1, this.transform.position.y, this.transform.position.z - 1);
	    MainCamera.transform.localEulerAngles.y = 30;
	}
	else{
    Destroy(collision.gameObject);
    points += 1000;
	}
}

function generateMeteorField(amount : int){
	for(var i = 0; i <= amount; i++ ){
  	var rans = Random.insideUnitSphere * 6000;
    var clone: GameObject;
		clone = Instantiate(Meteor[Random.Range(0, Meteor.length)],Vector3(rans.x + r_x ,rans.y + r_y, rans.z + 10000) , Random.rotation);
    clone.GetComponent(Rigidbody).velocity = Vector3(-rans.x/6,-rans.y/6, -3000);
    Destroy(clone, 8);
	}
  var ransb = Random.insideUnitSphere * 6000;
  var cloneb: GameObject;
	cloneb = Instantiate(bonus,Vector3(ransb.x + r_x ,ransb.y + r_y, ransb.z + 10000) , Random.rotation);
  cloneb.GetComponent(Rigidbody).velocity = Vector3(-ransb.x/6,-ransb.y/6, -3000);
  Destroy(cloneb, 8);
}
function OnGUI () {
  GUI.Box (Rect (10,10,100,90), ""+points);
}