#pragma strict

private var Timer: float = 0;
var clone: GameObject;
var sensitivity = 1;
var moveSpeed = 1;

function Start () {

}

function Update () {
	this.transform.position += transform.TransformDirection(Vector3.forward * moveSpeed);
	var r_x = this.transform.localEulerAngles.x;
	var r_y = this.transform.localEulerAngles.y;
	this.transform.localEulerAngles.y += Input.GetAxis("Mouse X") * sensitivity;
	this.transform.localEulerAngles.x += Input.GetAxis("Mouse Y") * sensitivity;

	if (Time.time > Timer) {
		Timer = Time.time + 2;
		var PosTMP1 = Vector3(this.transform.position.x, this.transform.position.y, this.transform.position.z + 100);
		Instantiate(clone, PosTMP1, Quaternion.identity);
	}

}