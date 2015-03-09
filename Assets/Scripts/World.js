#pragma strict

function Start () {

}

function Update () {
	this.transform.position.z -= Time.deltaTime / 10;
}