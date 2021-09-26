let params = new URLSearchParams(document.location.search.substring(1));
var refCode = params.get("refCode");
//console.log('refCode', refCode);
if(refCode){
    document.getElementById('referredFrom').value = Number(refCode)
}
$("#contactForm")
    .validator()
    .on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var mobile = $("#mobile").val();
    var plan = $("#plan").val();
    var address = $("#address").val();
    var referredFrom = $("#referredFrom").val();
    var terms = document.getElementById("terms").checked;
    $("#modal-message").text("Loading...");

    if (mobile.length < 10) {
        showSuccessModal(true, "Please enter 10 digit mobile number.");
        formError();
        return;
    }
    if (!plan) {
        showSuccessModal(true,  "Please select your Tiffin Plan to continue.")
        formError();
        return;
    }
    if (referredFrom&&referredFrom.length < 10) {
        showSuccessModal(true, "Please enter correct referral mobile number.");
        formError();
        return;
    }
    if (!terms) {
        showSuccessModal(true, "Please accept Foodraj Terms and Conditions to continue.");
        formError();
        return;
    }

    $.ajax({
        type: "POST",
        url: "https://admin.qeedagame.com/api/foodraj/enquiry",
        //url: "http://localhost:1337/api/foodraj/enquiry",
        data: "name=" + name + "&mobile=" + mobile + "&referredFrom=" + referredFrom + "&plan=" + plan + "&address=" + address,
        success: function (text) {
            if (text == "success") {
                //formSuccess();
                showSuccessModal(false, "Submitted successfully! Our representative will call you within 12 hours.");
            } else {
                formError();
                showSuccessModal(true, text);
                //submitMSG(false, "Something went wrong! Try again later.");
            }
        }
    });
}

function showSuccessModal(isError, msg){
    console.log('msg', msg);
    if(isError){
     $("#successModalLabel").text("Error");
     $("#successModalLabel").attr("style","color:red");
    }else{
    $("#contactForm")[0].reset();
     $("#successModalLabel").text("Success");
     $("#successModalLabel").attr("style","color:black");
    }
    $("#modal-message").text(msg);
    // $('#successModal').modal('show');
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Submitted successfully! Our representative will call you within 12 hours.");
}

function formError() {
    $("#contactForm")
        .removeClass()
        .addClass("shake animated")
        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            $(this).removeClass();
        });
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
