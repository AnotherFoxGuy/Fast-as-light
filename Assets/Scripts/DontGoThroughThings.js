/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This file is part of Fast-as-light

Copyright (c) 2015 AnotherFoxGuy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@file DontGoThroughThings.js
@author AnotherFoxGuy
@date: 3/2015

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


#pragma strict 
 
var layerMask : LayerMask; //make sure we aren't in this layer 
var skinWidth : float = 0.1; //probably doesn't need to be changed 
private var minimumExtent : float; 
private var partialExtent : float; 
private var sqrMinimumExtent : float; 
private var previousPosition : Vector3; 
private var myRigidbody : Rigidbody; 
//initialize values 
function Awake() { 
   myRigidbody = GetComponent.<Rigidbody>(); 
   previousPosition = myRigidbody.position; 
   minimumExtent = Mathf.Min(Mathf.Min(GetComponent.<Collider>().bounds.extents.x, GetComponent.<Collider>().bounds.extents.y), GetComponent.<Collider>().bounds.extents.z); 
   partialExtent = minimumExtent*(1.0 - skinWidth); 
   sqrMinimumExtent = minimumExtent*minimumExtent; 
} 
 
function FixedUpdate() { 
   //have we moved more than our minimum extent? 
   var movementThisStep : Vector3 = myRigidbody.position - previousPosition; 
   var movementSqrMagnitude : float = movementThisStep.sqrMagnitude;
   if (movementSqrMagnitude > sqrMinimumExtent) { 
      var movementMagnitude : float = Mathf.Sqrt(movementSqrMagnitude);
      var hitInfo : RaycastHit; 
      //check for obstructions we might have missed 
      if (Physics.Raycast(previousPosition, movementThisStep, hitInfo, movementMagnitude, layerMask.value)) 
         myRigidbody.position = hitInfo.point - (movementThisStep/movementMagnitude)*partialExtent; 
   } 
   previousPosition = myRigidbody.position; 
}