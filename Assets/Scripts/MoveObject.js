#pragma strict


private var move = true;
private	var rb : Rigidbody;

function Start() {
	rb = this.GetComponent(Rigidbody);
	//var new_v = Random.insideUnitCircle * 500;
	//rb.velocity = Vector3(new_v.x,new_v.y, -3000);
	//rb.velocity = Vector3(-this.transform.position.x,-this.transform.position.y, -3000);
}

function Update() {
	//if(move)
	//rb.velocity = Vector3(0,0,-10000);
}

function Stop() {
	move = false;
	rb.isKinematic = true;
	//print("stop");
}