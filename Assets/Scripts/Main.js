#pragma strict

var moveSpeed = 1;
var MainCamera: GameObject;
var Meteor: GameObject[];
var bonus: GameObject;
var particle_system: GameObject;

private var Timer: float = 0;
private var r_x = 0F;
private var r_y = 0F;
private	var rb : Rigidbody;
private	var hit = false;
private	var points = 0;
private	var Maxpoints = 0;
private var tulr = Mathf.Infinity;//TimeUntilLevelReload
private	var GodMode = false;
private var GodModeProgress = 0;
private var CheatDelay = 0f;


function Start() {
	rb = this.GetComponent(Rigidbody);
  Maxpoints = PlayerPrefs.GetInt("Score");
}

function Update() {
	UpdateCheats();

	if (!hit) {
  	points += Time.deltaTime * 100;
		//this.transform.position += transform.TransformDirection(Vector3.forward * moveSpeed);
		r_x += Input.GetAxis("Horizontal") * 25;
		r_y += Input.GetAxis("Vertical") * 25;
		this.transform.position = Vector3(r_x, r_y, 0);
		if (Time.time > Timer) {
			Timer = Time.time + Random.Range(0.2, 0.7);
			generateMeteorField(Random.Range(100, 150));
		}
	}
	if (Time.realtimeSinceStartup > tulr) {
  	Time.timeScale = 1;
		Application.LoadLevel(Application.loadedLevel);
	}
	if (points > Maxpoints)
  	Maxpoints = points;
  if (Input.GetKeyDown ("=")){
  	Maxpoints = 0;
		print("Score cleaned");
		PlayerPrefs.SetInt("Score", 0);
	}
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
	if (PlayerPrefs.GetInt("Score") < Maxpoints)
		PlayerPrefs.SetInt("Score", Maxpoints);
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
	tulr = Time.realtimeSinceStartup + 3;
  Time.timeScale = 0;
}

function generateMeteorField(amount: int) {
	for (var i = 0; i <= amount; i++) {
		var rans = Random.insideUnitSphere * 20000;
		var clone: GameObject;
		clone = Instantiate(Meteor[Random.Range(0, Meteor.length)], Vector3(rans.x + r_x, rans.y + r_y, rans.z + 30000), Random.rotation);
		clone.GetComponent(Rigidbody).velocity = Vector3(-rans.x / 5.5, -rans.y / 5.5, -10000);
		var rs = Random.Range(90, 150);
    clone.transform.localScale = Vector3(rs,rs,rs);
		Destroy(clone, 6);
	}
	var ransb = Random.insideUnitSphere * 3000;
	var cloneb: GameObject;
	cloneb = Instantiate(bonus, Vector3(ransb.x + r_x, ransb.y + r_y, ransb.z + 30000), Random.rotation);
	cloneb.GetComponent(Rigidbody).velocity = Vector3(-ransb.x / 5.5, -ransb.y / 5.5, -10000);
	Destroy(cloneb, 6);
}

function OnGUI() {
	if (hit) {
		GUI.Box(Rect(Screen.width / 2 - 100, Screen.height / 2 - 15, 200, 100), "Score: " + points + "\n max: " + Maxpoints);
	} else {
		GUI.Box(Rect(10, 10, 100, 90), points+"\n"+Maxpoints);
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
