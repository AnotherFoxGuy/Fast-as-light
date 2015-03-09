#pragma strict

var moveSpeed = 1;
var MainCamera: GameObject;
var Meteor: GameObject[];
var sensitivity = 1;

private var Timer: float = 0;
private var r_x = 0F;
private var r_y = 0F;
private	var rb : Rigidbody;
private	var hit = false;

function Start () {
	rb = this.GetComponent(Rigidbody);
}

function Update () {
	if(!hit){
		//this.transform.position += transform.TransformDirection(Vector3.forward * moveSpeed);
		r_x += Input.GetAxis("Mouse X") * sensitivity;
		r_y += Input.GetAxis("Mouse Y") * sensitivity;
		this.transform.position = Vector3(r_x, r_y, 0);
		if (Time.time > Timer) {
			Timer = Time.time + Random.Range(0.5, 1.5);
			generateMeteorField(Random.Range(100, 200));
		}
	}
	if (!hit && Physics.Raycast(this.transform.position, Vector3.forward, 25)) {
   	var Meteors = GameObject.FindGameObjectsWithTag("Meteor");
	  for(var m : GameObject in Meteors){
			m.SendMessage("Stop");
		}
		print ("hit");
    hit = true;
    rb.velocity = Vector3(1,0,moveSpeed);
		rb.isKinematic = false;
    this.transform.DetachChildren();
    MainCamera.transform.position = Vector3(this.transform.position.x - 1, this.transform.position.y, this.transform.position.z - 1);
    MainCamera.transform.localEulerAngles.y = 30;
	}
}

function generateMeteorField(amount : int){
	for(var i = 0; i <= amount; i++ ){
		var ox = Random.Range(this.transform.position.x - 1000, this.transform.position.x + 1000);
		var oy = Random.Range(this.transform.position.y - 1000, this.transform.position.y + 1000);
		var oz = Random.Range(this.transform.position.z, this.transform.position.z + 1000);
    var clone: GameObject;
		clone = Instantiate(Meteor[Random.Range(0, Meteor.length)], Vector3(ox ,oy, oz + 50000), Random.rotation);
    Destroy(clone, 5);
	}
}