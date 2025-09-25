(function () {
	if (localStorage.getItem("token")) window.location.href = "/dashboard";
})();

function login() {
	let obj = {
		userName: document.getElementById("userName").value,
		password: document.getElementById("password").value,
	};
	let isFormValid = formValidation(obj);
	if (!isFormValid) return false;
	$("#show-loader").css("visibility", "visible");

	// for (let i in obj) {
	//   if (obj[i] == "" || obj[i] == []) {
	//     $(`#${i}`).css("border", "1px red solid");
	//     $("#message").css("color", "red");

	//     $("#showMessage").css("display", "block");
	//     $("#showMessage").css("background", "#f2dede");
	//     let key = i[0].toUpperCase() + i.slice(1);
	//     $("#message").text(`${key} is Required.`);

	//     setTimeout(() => {
	//       $("#showMessage").css("display", "none");
	//       $(`#${i}`).css("border", "none");
	//       $("#message").css("color", "#1e81b0");

	//       // window.location.href = '/register';
	//     }, 3000);
	//     return;
	//   } else {
	//     $(`#${i}`).css("border", "none");
	//   }
	// }

	$.ajax({
		method: "POST",
		url: "/users/login",
		contentType: "application/json",
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST",
			"Access-Control-Allow-Headers": "application/json",
			contentType: "application/json",
		},
		data: JSON.stringify(obj),
		dataType: "json",
		success: function (response) {
			//if request if made successfully then the response represent the data

			console.log("response", response);
			if (response.statusCode == 200) {
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("name", response.data.firstName);
				localStorage.setItem("userName", response.data.userName);
				localStorage.setItem("role", response.data.role);
				localStorage.setItem("userId", response.data._id);
				showToastMessage(response.message, "success");
				$("#show-loader").css("visibility", "hidden");

				setTimeout(() => {
					window.location.href = "/dashboard";
				}, 1600);
			}
		},
		error: function (error) {
			console.log("error", error);
			//let data = JSON.stringify(error.responseJSON.message.message));

			showToastMessage(error?.responseJSON?.message, "error");

			$("#show-loader").css("visibility", "hidden");
			setTimeout(() => {
				$("#toast").css("display", "none");
			}, 3000);
		},
	});
}
