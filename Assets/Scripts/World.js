#pragma strict

var DistanceObject: GameObject;
var m: GameObject;
private var move = true;

function Start() {

}

function Update() {
	if (move) {
		this.transform.position.z -= Time.deltaTime / 10;
		var dist = Vector3.Distance(this.transform.position, DistanceObject.transform.position);
		if (dist < 0.51) {
			print("Win!");
      m.SendMessage("kill");
			//Application.LoadLevel(Application.loadedLevel);
		}
	}
}

function Stop() {
	Destroy(this.gameObject);
}