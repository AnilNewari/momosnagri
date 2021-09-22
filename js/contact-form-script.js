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

    if (mobile.length < 10) {
        alert("Please enter 10 digit mobile number.");
        return;
    }
    if (!plan) {
        alert("Please select your Tiffin Plan to continue.");
        return;
    }
    if (!terms) {
        alert("Please accept Foodraj Terms and Conditions to continue.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "https://admin.qeedagame.com/api/foodraj/enquiry",
        data: "name=" + name + "&mobile=" + mobile + "&referredFrom=" + referredFrom + "&plan=" + plan + "&address=" + address,
        success: function (text) {
            if (text == "success") {
                formSuccess();
            } else {
                formError();
                submitMSG(false, "Something went wrong! Try again later.");
            }
        }
    });
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
