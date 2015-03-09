#pragma strict


private var move = true;

function Start () {

}

function Update () {
	if(move)
		this.transform.position -= Vector3.forward * 500;
}

function Stop () {
  move = false;
}
