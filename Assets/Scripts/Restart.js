#pragma strict

function OnTriggerStay (otherObj : Collider) {
	Destroy(otherObj.gameObject);
}
