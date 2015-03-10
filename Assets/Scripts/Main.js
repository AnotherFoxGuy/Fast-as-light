#pragma strict

var moveSpeed = 1;
var MainCamera: GameObject;
var Meteor: GameObject[];
var bonus: GameObject;
var particle_system: GameObject;
var sensitivity = 1;

private var Timer: float = 0;
private var r_x = 0F;
private var r_y = 0F;
private	var rb : Rigidbody;
private	var hit = false;
private	var points = 0;
private var tulr = Mathf.Infinity;//TimeUntilLevelReload
private	var GodMode = false;
private var GodModeProgress = 0;
private var CheatDelay = 0f;


function Start() {
	rb = this.GetComponent(Rigidbody);
}

function Update() {
	UpdateCheats();

	if (!hit) {
  	points += Time.deltaTime * 100;
		//this.transform.position += transform.TransformDirection(Vector3.forward * moveSpeed);
		r_x += Input.GetAxis("Horizontal") * sensitivity;
		r_y += Input.GetAxis("Vertical") * sensitivity;
		this.transform.position = Vector3(r_x, r_y, 0);
		if (Time.time > Timer) {
			Timer = Time.time + Random.Range(0.2, 0.7);
			generateMeteorField(Random.Range(25, 50));
		}
	}
	if (Time.time > tulr) {
		Application.LoadLevel(Application.loadedLevel);
	}
  if (Input.GetKeyDown ("="))
		PlayerPrefs.SetInt("Score", 0);
}

function OnCollisionEnter(collision: Collision) {
	if (!GodMode) {
		if (collision.gameObject.tag == "Meteor") {
			for (var contact: ContactPoint in collision.contacts) {
				Instantiate(particle_system, contact.point, Random.rotation);
			}
      kill();
		} else {
			Destroy(collision.gameObject);
			points += 5000;
		}
	}
}

function kill() {
	//Application.LoadLevel(Application.loadedLevel);
	var Meteors = GameObject.FindGameObjectsWithTag("Meteor");
	Meteors += GameObject.FindGameObjectsWithTag("World");
	for (var m: GameObject in Meteors) {
		m.SendMessage("Stop");
	}
	print("hit");
	hit = true;
	this.transform.DetachChildren();
	MainCamera.transform.position = Vector3(this.transform.position.x - 150, this.transform.position.y, this.transform.position.z - 150);
	MainCamera.transform.localEulerAngles.y = 30;
	tulr = Time.time + 3;
	if (PlayerPrefs.GetInt("Score") < points)
		PlayerPrefs.SetInt("Score", points);
}

function generateMeteorField(amount: int) {
	for (var i = 0; i <= amount; i++) {
		var rans = Random.insideUnitSphere * 6000;
		var clone: GameObject;
		clone = Instantiate(Meteor[Random.Range(0, Meteor.length)], Vector3(rans.x + r_x, rans.y + r_y, rans.z + 10000), Random.rotation);
		clone.GetComponent(Rigidbody).velocity = Vector3(-rans.x / 6, -rans.y / 6, -3000);
		Destroy(clone, 8);
	}
	var ransb = Random.insideUnitSphere * 3000;
	var cloneb: GameObject;
	cloneb = Instantiate(bonus, Vector3(ransb.x + r_x, ransb.y + r_y, ransb.z + 10000), Random.rotation);
	cloneb.GetComponent(Rigidbody).velocity = Vector3(-ransb.x / 6, -ransb.y / 6, -3000);
	Destroy(cloneb, 8);
}

function OnGUI() {
	if (hit) {
		GUI.Box(Rect(Screen.width / 2 - 100, Screen.height / 2 - 15, 200, 100), "Score: " + points + "\n max: " + PlayerPrefs.GetInt("Score"));
	} else {
		GUI.Box(Rect(10, 10, 100, 90), "" + points);
	}
}

function UpdateCheats() {
	if (CheatDelay > 0.0) {
		CheatDelay -= Time.deltaTime;
		if (CheatDelay <= 0.0) {
			CheatDelay = 0.0;
			GodModeProgress = 0;
		}
	}
	if (GodModeProgress == 0 && Input.GetKeyDown('e')) {
		++GodModeProgress;
		CheatDelay = 1.0;
	} else if (GodModeProgress == 1 && Input.GetKeyDown('d')) {
		++GodModeProgress;
		CheatDelay = 1.0;
	} else if (GodModeProgress == 2 && Input.GetKeyDown('g')) {
		++GodModeProgress;
		CheatDelay = 1.0;
	} else if (GodModeProgress == 3 && Input.GetKeyDown('a')) {
		++GodModeProgress;
		CheatDelay = 1.0;
	} else if (GodModeProgress == 4 && Input.GetKeyDown('r')) {
		GodModeProgress = 0;
		GodMode = !GodMode;
		print("GodMode On!");
	}
}
