// console.log('admin page js');
let empList = [];
// let filterList = null;
let typeList = ["GENERAL", "TRAVEL", "FOOD", "STATIONARY", "TOOLS"];
let activeList = ["ACTIVE", "INACTIVE"];
let todayDate = new Date()
	.toLocaleDateString("en-us", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
	.replace(",", "")
	.split(" ");
let dayList = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, 26, 27, 28, 29, 30, 31,
];
let roleList = ["EMPLOYEE", "ADMIN", "SUPER-ADMIN"];
let yearList = [
	"2023",
	"2024",
	"2025",
	"2026",
	"2027",
	"2028",
	"2029",
	"2030",
	"2031",
	"2032",
	"2033",
	"2034",
	"2035",
	"2036",
	"2037",
	"2038",
	"2039",
	"2040",
];
let monthList = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
let bloodGroupList = ["A+", "AB+"];

(function () {
	if (!localStorage.getItem("token")) window.location.href = "/login";
	//   $('#setName').text(`Hi ${localStorage.getItem('name')}`);
	//  showToastMessage('Welcome to Client Page','info',true);
	getEmployeeList();
})();

/*
for (let i of [
		"firstName",
		"lastName",
		"userName",
		"email",
		"salary",
		"phone",
		"address",
		"year",
		"month",
		"day",
	]) {
		$(`#${i}`).css("border-left", "3px #434242 solid");
		$(`#${i}`).prop("readonly", true);
	}

	$("#myModal").modal("show");
	$("#addbtn").css("display", "none");
	$("#updatebtn").css("display", "none");

	$("#year").prop("disabled", true);
	$("#month").prop("disabled", true);
	$("#day").prop("disabled", true);
	$("#active-check").prop("disabled", true);
*/

function showData(...data) {
	console.log("data to view ", data);

	let [
		firstName,
		lastName,
		userName,
		email,
		salary,
		phone,
		address,
		active,
		year,
		month,
		day,
		role,
	] = data;
	for (let i of [
		"firstName",
		"lastName",
		"userName",
		"email",
		"salary",
		"phone",
		"address",
		"year",
		"month",
		"day",
	]) {
		$(`#${i}`).css("border-left", "3px #434242 solid");
		$(`#${i}`).prop("readonly", false);
	}

	$("#myModal").modal("show");
	$("#addbtn").css("display", "none");
	$("#updatebtn").css("display", "block");
	$("#registerClient").trigger("reset");
	$("#year").prop("disabled", false);
	$("#month").prop("disabled", false);
	$("#day").prop("disabled", false);
	$("#active-check").prop("disabled", false);
	$("#year").empty();
	$("#month").empty();
	$("#day").empty();
	$("#userName").prop("readonly", true);

	for (let item of monthList) {
		$("#month").append($(`<option>`).val(item).text(item));
	}
	for (let item of bloodGroupList) {
		$("#bloodGroup").append($(`<option>`).val(item).text(item));
	}
	for (let item of yearList) {
		// let selectedYear = item == todayDate[2] ? true : false;
		$("#year").append($(`<option>`).val(item).text(item));
	}
	for (let item of roleList) {
		// let selectedYear = item == todayDate[2] ? true : false;
		$("#role").append($(`<option>`).val(item).text(item));
	}

	for (let item of dayList) {
		let option = item < 10 ? `0${item}` : item;

		$("#day").append($(`<option>`).val(option).text(option));
	}
	document.getElementById("firstName").value = firstName;
	document.getElementById("lastName").value = lastName;
	document.getElementById("email").value = email;
	document.getElementById("phone").value = phone;
	document.getElementById("address").value = address;
	document.getElementById("userName").value = userName;
	document.getElementById("salary").value = salary;
	document.getElementById("year").value = year;
	document.getElementById("month").value = month;
	document.getElementById("day").value = day;
	document.getElementById("role").value = role;
	$("#role").attr("disabled", true);
	// $('#active-check').checked()
	$("#active-check").prop("checked", active);
	// let color= (active)?'#c3fabb':'#f8b5b5';
	// let textColor = active ? "#48bf36" : "#FF4949";
	// let status = active ? "T" : "F";
	// // $('#status').css('background-color',color);
	// $("#status").css("color", textColor);

	// document.getElementById("status").value = status;
	if (role == "SUPER-ADMIN" || role == "ADMIN")
		$("#active-check").prop("disabled", true);
	else $("#active-check").prop("disabled", false);
}
function viewData(...data) {
	console.log("data to view ", data);
	let [
		firstName,
		lastName,
		userName,
		email,
		salary,
		phone,
		address,
		active,
		year,
		month,
		day,
		role,
	] = data;
	for (let i of [
		"firstName",
		"lastName",
		"userName",
		"email",
		"salary",
		"phone",
		"address",
		"year",
		"month",
		"day",
	]) {
		$(`#${i}`).css("border-left", "3px #434242 solid");
		$(`#${i}`).prop("readonly", true);
	}

	$("#myModal").modal("show");
	$("#addbtn").css("display", "none");
	$("#updatebtn").css("display", "none");

	$("#year").empty();
	$("#year").prop("disabled", true);
	$("#month").empty();
	$("#month").prop("disabled", true);
	$("#day").empty();
	$("#day").prop("disabled", true);
	$("#active-check").prop("checked", active);
	$("#active-check").prop("disabled", true);
	for (let item of monthList) {
		$("#month").append($(`<option>`).val(item).text(item));
	}

	for (let item of bloodGroupList) {
		$("#bloodGroup").append($(`<option>`).val(item).text(item));
	}

	for (let item of yearList) {
		// let selectedYear = item == todayDate[2] ? true : false;
		$("#year").append($(`<option>`).val(item).text(item));
	}
	for (let item of roleList) {
		// let selectedYear = item == todayDate[2] ? true : false;
		$("#role").append($(`<option>`).val(item).text(item));
	}

	for (let item of dayList) {
		let option = item < 10 ? `0${item}` : item;

		$("#day").append($(`<option>`).val(option).text(option));
	}
	document.getElementById("firstName").value = firstName;
	document.getElementById("lastName").value = lastName;
	document.getElementById("email").value = email;
	document.getElementById("phone").value = phone;
	document.getElementById("address").value = address;
	document.getElementById("userName").value = userName;
	document.getElementById("salary").value = salary;
	document.getElementById("year").value = year;
	document.getElementById("month").value = month;
	document.getElementById("day").value = day;
	document.getElementById("role").value = role;
	$("#role").attr("disabled", true);
	// $('#active-check').checked()
	// let color= (active)?'#c3fabb':'#f8b5b5';
	// let textColor = active ? "#48bf36" : "#FF4949";
	// let status = active ? "T" : "F";
	// // $('#status').css('background-color',color);
	// $("#status").css("color", textColor);

	// document.getElementById("status").value = status;
}
function updateData() {
	let activeCheck = document.getElementById("active-check").value;
	console.log("activeCheck", activeCheck);
	let active = activeCheck == "on" || activeCheck ? true : false;

	// let active = "";
	// if (status == "T" || status == "t") {
	//   active = true;
	// } else if (status == "F" || status == "f") {
	//   active = false;
	// } else {
	//   active = true;
	// }
	// console.log("---", status);
	// $();
	let obj = {
		firstName: document.getElementById("firstName").value,
		lastName: document.getElementById("lastName").value,
		email: document.getElementById("email").value,
		phone: document.getElementById("phone").value,
		address: document.getElementById("address").value,
		salary: document.getElementById("salary").value,
		year: document.getElementById("year").value,
		month: document.getElementById("month").value,
		day: document.getElementById("day").value,
		active,
	};
	let isFormValid = formValidation(obj);
	if (!isFormValid) return false;
	let params = document.getElementById("userName").value;
	$("#register-loader").css("visibility", "visible");
	patchData("update_employees", obj, null, params, function (result, error) {
		if (error) console.log(error);
		console.log({ "data received from": result });
		$("#register-loader").css("visibility", "hidden");
		showToastMessage(result.message, "success");
		$("#registerClient").trigger("reset");
		$("#myModal").modal("hide");
		$("#active").empty();
		// getEmployeeList();
		setTimeout(() => {
			getEmployeeList();
		}, 2000);
	});
}

function showModalWithSelect(data) {
	for (let i of data) {
		$(`#${i}`).css("border-left", "3px #434242 solid");
		$(`#${i}`).prop("readonly", false);
	}
	$("#addbtn").css("display", "block");
	$("#updatebtn").css("display", "none");
	$("#status").css("color", backgrndColor["success"]);
	$("#status").val("T");
	$("#registerClient").trigger("reset");
	$("#display-message").css("visibility", "hidden");
	$("#year").empty();
	$("#month").empty();
	$("#day").empty();
	$("#role").empty();

	$("#year").prop("disabled", false);
	$("#userName").prop("readonly", true);
	$("#month").prop("disabled", false);
	$("#day").prop("disabled", false);
	$("#active-check").prop("disabled", false);
	// $("#active-check").empty();

	for (let item of monthList) {
		$("#month").append($(`<option>`).val(item).text(item));
	}

	for (let item of yearList) {
		let selectedYear = item == todayDate[2] ? true : false;
		$("#year").append($(`<option>`).val(item).text(item));
	}
	for (let item of bloodGroupList) {
		$("#bloodGroup").append($(`<option>`).val(item).text(item));
	}
	for (let item of dayList) {
		let option = item < 10 ? `0${item}` : item;

		$("#day").append($(`<option>`).val(option).text(option));
	}
	for (let item of roleList) {
		$("#role").append($(`<option>`).val(item).text(item));
	}
	$("#role").prop("disabled", false);

	$("#month").val(todayDate[0]);
	$("#year").val(todayDate[2]);
	$("#day").val(todayDate[1] < 10 ? `0${todayDate[1]}` : todayDate[1]);
	$("#role").val(roleList[0]);
	$("#active-check").prop("disabled", true);
}
// $("#active").mousedown(function () {
//   //if (!$(this).is(':checked')) {
//   //this.checked = confirm("Are you sure?");
//   //  $(this).trigger("change");
//   //}
//   console.log($("#active").val());
// });
function getCheckedData(e, checkboxId) {
	$("#active-check").val(e.target.checked);
}
function getEmployeeList(filterObj) {
	let filterList = {
		role: "OPERATOR",
		active: true,
	};
	if (filterObj) {
		for (let item in filterObj) filterList[item] = filterObj[item];
	}
	$("#tableList").html("");

	$("#show-main-loader").css("display", "block");
	$("#showTableDesc").html("Employee List");
	getDataList("employees", null, filterList, function (result, error) {
		if (error) console.log(error);

		if (result.data.length == 0) showToastMessage(result.message, "info");

		let str = "";
		// let count = 0;
		for (let it of result.data) {
			// count = count + 1;
			str += `<tr>
                    <td>
                    ${it.userName}</td>
                    <td>${it.firstName} ${it.lastName}</td>
                    
                    <td>${it.salary}</td>
                    
                    <td>${it.month} ${it.day}, ${it.year}</td>
            <td>${it.phone}</td>
            <td style="color:${
							it.role != "EMPLOYEE" ? "#0f5787" : ""
						};font-weight:${it.role != "EMPLOYEE" ? "bold" : ""}">${
				it.role != "EMPLOYEE" ? "ADM" : "EMP"
			}</td>
            <td>${
							it.active
								? '<span style="color:#48bf36; font-size:16px;text-align:center;"onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
								: '<span style="color:#FF4949; font-size:16px;text-align:center;" onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
						}</td>
            
                    
                    
                <td><span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px;font-size:16px;" onclick="viewData('${
									it.firstName
								}','${it.lastName}','${it.userName}','${it.email}','${
				it.salary
			}','${it.phone}','${it.address}',${it.active},'${it.year}','${
				it.month
			}','${it.day}','${it.role}')"><i class="fa fa-eye" aria-hidden="true"></i>

                </span>${
									it.active && it.role == "EMPLOYEE"
										? `<span style="cursor:pointer;color:#FF4949;padding:5px;margin:5px; font-size:16px;"onclick="showToastConfirmMessage('Are you sure want to delete ?','error','${it.userName}');"><i class="fa fa-trash-o" aria-hidden="true"></i></span>`
										: `<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px; font-size:16px;visibility:hidden" onclick=""><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>`
								}<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px;font-size:16px;" onclick="showData('${
				it.firstName
			}','${it.lastName}','${it.userName}','${it.email}','${it.salary}','${
				it.phone
			}','${it.address}',${it.active},'${it.year}','${it.month}','${it.day}','${
				it.role
			}')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </span></td></tr>`;
		}
		// str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
		$("#tableList").append(str);
		if (!$("#active").val()) {
			$("#active").empty();

			for (let item of activeList) {
				// let selectedYear = item == todayDate[2] ? true : false;
				$("#active").append($(`<option>`).val(item).text(item));
			}
			$("#active").val(activeList[0]);
		}
		// if (!$("#filterMonth").val()) {
		// 	$("#filterMonth").empty();

		// 	for (let item of monthList) {
		// 		// let selectedYear = item == todayDate[2] ? true : false;
		// 		$("#filterMonth").append($(`<option>`).val(item).text(item));
		// 	}
		// 	$("#filterMonth").val(activeList[0]);
		// }
		//

		$("#show-main-loader").css("display", "none");
	});
}
function deleteData() {
	$("#delete-loader").css("visibility", "visible");
	let params = $("#dataToDelete").html();
	let obj = {
		active: false,
	};
	// $('#register-loader').css('visibility','visible');
	patchData("delete_employees", obj, null, params, function (result, error) {
		if (error) console.log(error);
		console.log({ "data received from": result });
		$("#delete-loader").css("visibility", "hidden");
		hideConfirmToast();
		showToastMessage(result.message, "success");

		// getEmployeeList();
		setTimeout(() => {
			getEmployeeList();
		}, 2000);
	});
}
function register() {
	// showToastMessage('Good Morning','success');
	// let status = document.getElementById("status").value;
	// let active = "";
	// if (status == "T" || status == "t") {
	//   active = true;
	// } else if (status == "F" || status == "f") {
	//   active = false;
	// } else {
	//   active = true;
	// }
	let active = Boolean(document.getElementById("active-check").value);
	let obj = {
		firstName: document.getElementById("firstName").value.trim(),
		lastName: document.getElementById("lastName").value.trim(),
		email: document.getElementById("email").value.trim(),
		phone: document.getElementById("phone").value.trim(),
		address: document.getElementById("address").value.trim(),
		salary: document.getElementById("salary").value.trim(),
		year: document.getElementById("year").value,
		month: document.getElementById("month").value,
		day: document.getElementById("day").value,
		password: "asdf1234",
		active,
		status:
			document.getElementById("role").value != "EMPLOYEE"
				? "APPROVED"
				: "INPROGRESS",
		role: document.getElementById("role").value,
	};
	let isFormValid = formValidation(obj);
	if (!isFormValid) return false;

	$("#register-loader").css("visibility", "visible");

	postData("employees", obj, null, null, function (result, error) {
		if (error) console.log(error);
		console.log({ "data received from": result });
		$("#register-loader").css("visibility", "hidden");
		showToastMessage(result.message, "success");
		$("#registerClient").trigger("reset");
		$("#myModal").modal("hide");
		// getEmployeeList();
		setTimeout(() => {
			getEmployeeList();
		}, 2000);
	});
}

{
	/* <label class="switch">
            <input type="checkbox" class="active-check" onclick="getCheckedData(event,'${
              it.userName
            }')" id="${it.userName}" ${it.active ? "checked" : ""}>
            <span class="slider round"></span>
          </label> */
}
// function assignTechy() {
//   let obj = {
//     assignedTo: $('#technicianList option:selected').val(),
//     status: 'ASSIGNED',
//   };
//   $('#loading').css('display', 'block');
//   $.ajax({
//     method: 'PUT',
//     url: `/serviceRequests/update/${
//       document.getElementById('hidden-id').innerHTML
//     }`,
//     contentType: 'application/json',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'PATCH',
//       'Access-Control-Allow-Headers': 'application/json',
//       contentType: 'application/json',
//       Authorization: localStorage.getItem('token'),
//     },
//     data: JSON.stringify(obj),
//     dataType: 'json',
//     success: function (response) {
//       $('#loading').css('display', 'none');
//       //if request if made successfully then the response represent the data
//       changePage('SERVICE');
//       console.log('response', response);
//       if (response.status == 200) {
//         $('#showMessage').css('display', 'block');
//         $('#message').text(response.message);

//         // localStorage.setItem('token',response.token);
//         setTimeout(() => {
//           $('#showMessage').css('display', 'none');
//           $('#tableData').html('');
//           // onLoad();
//           // window.location.href = '/home';
//         }, 2000);
//       }
//     },
//     error: function (error) {
//       console.log('error', error);
//       $('#loading').css('display', 'none');

//       //let data = JSON.stringify(error.responseJSON.message.message));
//       $('#showMessage').css('display', 'block');
//       $('#message').text(error.responseJSON.message);
//       setTimeout(() => {
//         $('#showMessage').css('display', 'none');
//       }, 3000);
//     },
//   });
// }
// function changePage(pageName) {
//   switch (pageName) {
//     case 'USER': {
//       $('#right-side').css('display', 'block');
//       $('.userMenu').css('color', 'cadetblue');
//       $('.userMenu').css('background', 'whitesmoke');

//       $('#service-side').css('display', 'none');
//       $('.serviceMenu').css('background', 'cadetblue');
//       $('.serviceMenu').css('color', 'whitesmoke');

//       break;
//     }
//     case 'SERVICE': {
//       $('#serviceData').html('');
//       $('#detail-view').css('display', 'none');
//       $('#right-side').css('display', 'none');
//       $('#service-side').css('display', 'block');
//       $('.serviceMenu').css('color', 'cadetblue');
//       $('.serviceMenu').css('background', 'whitesmoke');
//       $('.userMenu').css('color', 'whitesmoke');
//       $('.userMenu').css('background', 'cadetblue');
//       $('#loading').css('display', 'block');

//       $.ajax({
//         method: 'GET',
//         url: '/serviceRequests/getListByUserId',
//         contentType: 'application/json',
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'GET',
//           'Access-Control-Allow-Headers': 'application/json',
//           contentType: 'application/json',
//           Authorization: localStorage.getItem('token'),
//         },
//         dataType: 'json',
//         success: function (response) {
//           //if request if made successfully then the response represent the data

//           console.log('response', response);
//           if (response.status == 200) {
//             $('#loading').css('display', 'none');

//             // if(response.data && response.data.items && response.data.items.length>0){
//             // items = response.data;

//             let str = '';

//             //   {
//             //     "_id": "654de80e6ff9f63c2b1aefb0",
//             //     "userId": "654c10834081654b04a3bdba",
//             //     "title": "Pipe got damaged",
//             //     "date": "2023-11-10T08:19:41.777Z",
//             //     "description": "pipe got very damanged",
//             //     "pics": "uploads/1699604000072-imgback.jpg",
//             //     "status": "PENDING",
//             //     "__v": 0
//             // }
//             for (let it of response.data) {
//               str += `<tr>
//                             <td>${new Date(it.date).toLocaleDateString(
//                               'en-us',
//                               {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                               }
//                             )}</td>
//                             <td>${it.title}</td>
//                             <td>${it.description}</td>
//                             <td><img src=uploads/${
//                               it.pics
//                             } alt='not found' width='50px' height='50px'/></td>

//                     <td>${it.status}</td>
//                     <td>${it.assignedTo?.firstName || ''} ${
//                 it.assignedTo?.lastName || ''
//               }</td>

//                         <td>${
//                           it.status == 'PENDING'
//                             ? `<span style="cursor:pointer;color:#2a59a2; font-size:16px;"onclick="changeStatus(\'${it._id}\','PENDING')"><i class="fa fa-check-square-o" aria-hidden="true"></i> accept</span>`
//                             : it.status == 'ACCEPTED'
//                             ? `<span style="cursor:pointer;color:blue; font-size:16px;" onclick="changeStatus(\'${it._id}\','ACCEPTED',\'${it.title}\',\'${it.description}\',\'${it.pics}\')"><i class="fa fa-pencil-square-o" aria-hidden="true"> assign</i></span>`
//                             : `<span style="cursor:pointer;color:green; font-size:16px;" >${
//                                 it.status == 'ASSIGNED'
//                                   ? '<i class="fa fa-male" aria-hidden="true"></i>'
//                                   : ''
//                               }${
//                                 it.status == 'ASSIGNED'
//                                   ? ' assigned'
//                                   : ' closed'
//                               }</span>`
//                         }</td></tr>`;
//             }

//             // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
//             $('#serviceData').append(str);

//             // $('#totalAmount').val(response.data.totalAmount)

//             // localStorage.setItem('token',response.token);
//           }
//         },
//         error: function (error) {
//           console.log('error', error);

//           //let data = JSON.stringify(error.responseJSON.message.message));
//           $('#showMessage').css('display', 'block');
//           $('#message').text(error.responseJSON.message);
//           setTimeout(() => {
//             $('#loading').css('display', 'none');

//             $('#showMessage').css('display', 'none');
//           }, 3000);
//         },
//       });
//     }
//   }
// }

// function changeStatus(id, status, title, description, pics) {
//   console.log('chnage-', id, status, title, description, pics);
//   let obj = {};
//   if (status == 'PENDING') {
//     obj['status'] = 'ACCEPTED';
//   }
//   if (status != 'ACCEPTED') {
//     $('#loading').css('display', 'block');

//     $.ajax({
//       method: 'PATCH',
//       url: `/serviceRequests/changeReqStatus/${id}`,
//       contentType: 'application/json',
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'PATCH',
//         'Access-Control-Allow-Headers': 'application/json',
//         contentType: 'application/json',
//         Authorization: localStorage.getItem('token'),
//       },
//       data: JSON.stringify(obj),
//       dataType: 'json',
//       success: function (response) {
//         //if request if made successfully then the response represent the data
//         changePage('SERVICE');
//         console.log('response', response);
//         if (response.status == 200) {
//           $('#showMessage').css('display', 'block');
//           $('#message').text(response.message);

//           // localStorage.setItem('token',response.token);
//           setTimeout(() => {
//             $('#showMessage').css('display', 'none');
//             $('#tableData').html('');
//             $('#loading').css('display', 'none');

//             // onLoad();
//             // window.location.href = '/home';
//           }, 2000);
//         }
//       },
//       error: function (error) {
//         console.log('error', error);
//         //let data = JSON.stringify(error.responseJSON.message.message));
//         $('#showMessage').css('display', 'block');
//         $('#message').text(error.responseJSON.message);
//         setTimeout(() => {
//           $('#showMessage').css('display', 'none');
//           $('#loading').css('display', 'none');
//         }, 3000);
//       },
//     });
//   } else if (status == 'ACCEPTED') {
//     $('#loading').css('display', 'block');

//     $.ajax({
//       method: 'GET',
//       url: '/users/getUserList',
//       contentType: 'application/json',
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET',
//         'Access-Control-Allow-Headers': 'application/json',
//         contentType: 'application/json',
//         Authorization: localStorage.getItem('token'),
//       },
//       dataType: 'json',
//       success: function (response) {
//         //if request if made successfully then the response represent the data

//         console.log('response', response);
//         if (response.status == 200) {
//           $('#detail-view').css('display', 'block');
//           $('#loading').css('display', 'none');

//           $('#title').html(title);
//           $('#hidden-id').html(id);
//           $('#description').html(description);
//           $('#screenshot').attr('src', `uploads/${pics}`);
//           $('#technicianList').html('');
//           let techOption = '';
//           for (let i of response.data) {
//             techOption += `<option value="${i._id}">${
//               i.firstName
//             }-${i.skills.join(',')}</option>`;
//           }
//           $('#technicianList').append(techOption);
//           // $('#screenshot').html(title);

//           // $('#showMessage').css('display', 'block');
//           // $('#message').text(response.message);
//           // // localStorage.setItem('token',response.token);
//           // setTimeout(() => {
//           //   $('#showMessage').css('display', 'none');
//           //   $('#tableData').html('');
//           //   onLoad();
//           //   // window.location.href = '/home';
//           // }, 2000);
//         }
//       },
//       error: function (error) {
//         console.log('error', error);
//         //let data = JSON.stringify(error.responseJSON.message.message));
//         $('#showMessage').css('display', 'block');
//         $('#message').text(error.responseJSON.message);
//         setTimeout(() => {
//           $('#showMessage').css('display', 'none');
//           $('#loading').css('display', 'none');
//         }, 3000);
//       },
//     });
//   }
// }

// function getStatus(status) {
//   if (status == 'PENDING') return 'CONFIRM';
//   else if (status == 'CONFIRMED' || status == 'GETTING_READY')
//     return 'WAITING CHEF ACTION';
//   else if (status == 'READY_TO_SERVE') return 'WAITING FOR BILL';
//   else if (status == 'GET_BILL') return 'CLOSE';
//   else if (status == 'CLOSED') return 'CLOSED';
// }
// function getItemName(items) {
//   let str = '';
//   for (let i of items) {
//     str += `[${i.item.name}-${i.quantity}]\t\t`;
//   }
//   return str;
// }
// function approveUser(id) {
//   $('#loading').css('display', 'block');

//   $.ajax({
//     method: 'PATCH',
//     url: `/users/approve/${id}`,
//     contentType: 'application/json',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'PATCH',
//       'Access-Control-Allow-Headers': 'application/json',
//       contentType: 'application/json',
//       Authorization: localStorage.getItem('token'),
//     },
//     dataType: 'json',
//     success: function (response) {
//       //if request if made successfully then the response represent the data

//       console.log('response', response);
//       if (response.status == 200) {
//         $('#tableData').html('');
//         onLoad();
//         // if(response.data && response.data.items && response.data.items.length>0){
//         // items = response.data;

//         // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
//         // $('#tableData').append(str);

//         // $('#totalAmount').val(response.data.totalAmount)

//         // localStorage.setItem('token',response.token);
//       }
//     },
//     error: function (error) {
//       console.log('error', error);
//       //let data = JSON.stringify(error.responseJSON.message.message));
//       $('#showMessage').css('display', 'block');
//       $('#message').text(error.responseJSON.message);
//       setTimeout(() => {
//         $('#showMessage').css('display', 'none');
//         $('#loading').css('display', 'none');
//       }, 3000);
//     },
//   });
// }
// function onLoad() {
//   $('#loading').css('display', 'block');

//   console.log('getname', localStorage.getItem('name'));
//   document.getElementById('setName').innerText = `Hi ${localStorage.getItem(
//     'name'
//   )}`;
//   $.ajax({
//     method: 'GET',
//     url: '/users/getUserList?role=ADMIN',
//     contentType: 'application/json',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET',
//       'Access-Control-Allow-Headers': 'application/json',
//       contentType: 'application/json',
//       Authorization: localStorage.getItem('token'),
//     },
//     dataType: 'json',
//     success: function (response) {
//       //if request if made successfully then the response represent the data

//       console.log('response', response);
//       if (response.status == 200) {
//         $('#loading').css('display', 'none');

//         // if(response.data && response.data.items && response.data.items.length>0){
//         // items = response.data;
//         if (localStorage.getItem('profilePic')) {
//           // $('#profileImage').src('')
//           $('#profileImage').attr(
//             'src',
//             `uploads/${localStorage.getItem('profilePic')}`
//           );
//         }
//         let str = '';
//         for (let it of response.data) {
//           str += `<tr>
//                         <td>${new Date(it.date).toLocaleDateString('en-us', {
//                           year: 'numeric',
//                           month: 'short',
//                           day: 'numeric',
//                         })}</td>
//                         <td>${it.firstName}</td>
//                         <td>
//                         ${it.email}</td>
//                         <td>${it.phone}</td>
//                 <td>${it.role}</td>
//                 <td>${it.profilePic}</td>
//                 <td>${it.skills.join(' ')}</td>
//                 <td>${it.status}</td>

//                     <td>${
//                       it.status == 'INPROGRESS'
//                         ? `<span style="cursor:pointer;color:#2a59a2; font-size:16px;" onclick="approveUser(\'${it._id}\')"><i class="fa fa-check" aria-hidden="true"></i></span>`
//                         : '<span style="cursor:pointer;color:green; font-size:16px;" ><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>'
//                     }</td></tr>`;
//         }
//         // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
//         $('#tableData').append(str);

//         // $('#totalAmount').val(response.data.totalAmount)

//         // localStorage.setItem('token',response.token);
//       }
//     },
//     error: function (error) {
//       console.log('error', error);
//       //let data = JSON.stringify(error.responseJSON.message.message));
//       $('#showMessage').css('display', 'block');
//       $('#message').text(error.responseJSON.message);
//       setTimeout(() => {
//         $('#showMessage').css('display', 'none');
//       }, 3000);
//     },
//   });
// }

function closeEmployeeModal() {
	$("#registerClient").trigger("reset");
	$("#display-message").css("visibility", "hidden");
	$("#salary").val("");
	$("#month").val(todayDate[0]);
	$("#year").val(todayDate[2]);
	$("#day").val(todayDate[1]);
	$("#active-check").prop("checked", true);
	$("#active-check").prop("disabled", false);
	$("#role").prop("disabled", false);
}
$("#active").on("change", function () {
	let activeState = $("#active").val();
	let obj = {};
	if (activeState == "ACTIVE") obj["active"] = true;
	else obj["active"] = false;
	getEmployeeList(obj);
});
// $("#filterMonth").on("change", function () {
// 	let activeMonth = $("#filterMonth").val();
// 	let obj = { month: activeMonth };

// 	getEmployeeList(obj);
// });
