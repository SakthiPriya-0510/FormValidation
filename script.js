const sigCanvas = document.getElementById("signature");
const ctx = sigCanvas.getContext("2d");
let drawing = false;

sigCanvas.addEventListener("mousedown", () => drawing = true);
sigCanvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
});
sigCanvas.addEventListener("mousemove", draw);

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function clearSignature() {
    ctx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
}
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");
const cardPhoto = document.getElementById("cPhoto");

document.getElementById("regForm").addEventListener("submit", function(event) {
    event.preventDefault(); // stop form from refreshing

    let name = document.getElementById("name").value.trim();
    let dobIn = document.getElementById('dob');
    let dob = dobIn.value;
    let genderElement = document.querySelector('input[name="gender"]:checked');
    let gender = genderElement ? genderElement.value : "Not selected";
    let hobbies = [];
    document.querySelectorAll('input[name="hobbies"]:checked').forEach(function(checkbox) {
        if (checkbox.value === "Other") {
            let otherHobby = document.querySelector('input[name="otherHobby"]').value.trim();
            if (otherHobby !== "") {
                hobbies.push(otherHobby);
            }
        } else {
            hobbies.push(checkbox.value);
        }
    });

    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    let pincode = document.getElementById("pincode").value.trim();
    let course = document.getElementById("course").value.trim();
    let year = document.getElementById("year").value.trim();

    let name_regex = /^[a-zA-Z\s]{3,16}$/;
    let phone_regex = /^\d{10}$/;
    let pin_regex = /^[1-9][0-9]{2}\s[0-9]{3}$/;

    if (!name_regex.test(name)) {
        alert(`Please enter valid name(Containing only alphabets)`)
    }
    const birthDate = new Date(dob);
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    if (birthDate > today) {
        alert(`Date of birth cannot be in future`);
    }
    if (birthDate > minAge) {
        alert(`You must be atleast 18 years old`);
    }

    if (!phone_regex.test(phone)) {
        alert(`Please enter valid Phone number containing only 10 digits`)
    }

    if (!pin_regex.test(pincode)) {
        alert(`Please enter valid pincode in the format nnn nnn`)
    }


    // Update preview card
    document.getElementById("cName").innerText = name;
    document.getElementById("cDOB").innerText = dob;
    document.getElementById("cGender").innerText = gender;
    document.getElementById("cCourse").innerText = course;
    document.getElementById("cEmail").innerText = email;
    document.getElementById("cPhone").innerText = phone;
    document.getElementById("cAdd").innerText = address;
    document.getElementById("cHob").innerText = hobbies;
    document.getElementById("cPin").innerText = pincode;
    document.getElementById("signaturePreview").src = sigCanvas.toDataURL("image/png");

    document.getElementById("s2").scrollIntoView({
        behavior: "smooth"
    })
});
// Download card as PNG
function downloadCard() {
    html2canvas(document.getElementById("card")).then(canvas => {
        const link = document.createElement("a");
        link.download = "student-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
photoInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Show preview in form
            photoPreview.src = e.target.result;
            photoPreview.style.display = "block";

            // Show photo on card
            cardPhoto.src = e.target.result;
        };
        reader.readAsDataURL(file); // Convert file to Base64
            
    }
});