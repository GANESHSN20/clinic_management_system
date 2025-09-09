// console.log('admin page js');
let empList = [];
// let filterList = null;
let typeList = ["GENERAL", "TRAVEL", "FOOD", "STATIONARY", "TOOLS"];
let activeList = ["ACTIVE", "INACTIVE"];
// let todayDate = new Date()
// 	.toLocaleDateString("en-us", {
// 		year: "numeric",
// 		month: "long",
// 		day: "numeric",
// 	})
// 	.replace(",", "")
// 	.split(" ");
// console.log({ todayDate });
let role = localStorage.getItem("role");
let roleList = [];
if (role == "ADMIN") roleList = ["RECEPTIONIST", "DOCTOR", "ADMIN"];
else if (role == "RECEPTIONIST") roleList = ["PATIENT"];
let avilableSlotList = [];
// let yearList = [];
// for (let i = 1950; i <= new Date().getFullYear(); i++) {
// 	yearList.push(i);
// }

// let monthList = [
// 	"January",
// 	"February",
// 	"March",
// 	"April",
// 	"May",
// 	"June",
// 	"July",
// 	"August",
// 	"September",
// 	"October",
// 	"November",
// 	"December",
// ];
let durationList = [20, 30];
let startTimeList = [
	"9:00 AM",
	"9:30 AM",
	"10:00 AM",
	"10:30 AM",
	"11:00 AM",
	"11:30 AM",
	"12:00 PM",
	"12:30 PM",
	"1:00 PM",
	"1:30 PM",
	"2:00 PM",
	"2:30 PM",
	"3:00 PM",
	"3:30 PM",
	"4:00 PM",
	"4:30 PM",
	"5:00 PM",
	"5:30 PM",
	"6:00 PM",
	"6:30 PM",
];
let endTimeList = [
	"9:30 AM",
	"10:00 AM",
	"10:30 AM",
	"11:00 AM",
	"11:30 AM",
	"12:00 PM",
	"12:30 PM",
	"1:00 PM",
	"1:30 PM",
	"2:00 PM",
	"2:30 PM",
	"3:00 PM",
	"3:30 PM",
	"4:00 PM",
	"4:30 PM",
	"5:00 PM",
	"5:30 PM",
	"6:00 PM",
	"6:30 PM",
];
let experience = [
	"0-1 years",
	"1-2 years",
	"2-3 years",
	"3-4 years",
	"4-5 years",
];
const hospital = [
	"AIIMS, New Delhi",
	"Apollo Hospitals, Chennai",
	"Fortis Memorial Research Institute, Gurugram",
	"Medanta – The Medicity, Gurugram",
	"Christian Medical College (CMC), Vellore",
	"Narayana Health, Bengaluru",
	"Manipal Hospitals, Bengaluru",
	"Tata Memorial Hospital, Mumbai",
	"PD Hinduja National Hospital, Mumbai",
	"Care Hospitals, Hyderabad",
	"Continental Hospitals, Hyderabad",
	"Yashoda Hospitals, Hyderabad",
	"Safdarjung Hospital, New Delhi",
];
let specializationList = [
	"General Physician",
	"Cardiologist",
	"Dermatologist",
	"Neurologist",
	"Psychiatrist",
	"Gynecologist",
	"ENT Specialist",
	"Ophthalmologist",
	"Dentist",
];
let expList = [];
let qualificationList = [
	"MBBS (Bachelor of Medicine, Bachelor of Surgery)",
	"BDS (Bachelor of Dental Surgery)",
	"BAMS (Bachelor of Ayurvedic Medicine and Surgery)",
	"BHMS (Bachelor of Homeopathic Medicine and Surgery)",
	"BUMS (Bachelor of Unani Medicine and Surgery)",
	"BSMS (Bachelor of Siddha Medicine and Surgery)",
	"MD (Doctor of Medicine)",
	"MS (Master of Surgery)",
	"DM (Doctorate of Medicine - Super Specialty)",
	"MCh (Master of Chirurgiae - Super Specialty Surgery)",
	"DNB (Diplomate of National Board)",
	"PhD (Doctor of Philosophy in Medical Sciences)",
	"MDS (Master of Dental Surgery)",
	"M.Pharm (Master of Pharmacy - for clinical practice/research)",
	"MPH (Master of Public Health)",
	"Diploma in Clinical Pathology",
	"Diploma in Child Health",
	"Diploma in Orthopedics",
	"Fellowship in Cardiology",
	"Fellowship in Oncology",
];
let doctorList = "";
let patientList = [];
(function () {
	if (!localStorage.getItem("token")) window.location.href = "/login";
	$("#setName").text(`Hi ${localStorage.getItem("name")}`);
	let role = localStorage.getItem("role");
	if (role != "DOCTOR") {
		$("#showSlotAdd").css("display", "block");
	} else {
		$("#showSlotAdd").css("display", "none");
	}
	//  showToastMessage('Welcome to Client Page','info',true);
	getEmployeeList();
	getSlotList();
	// getDoctorList();req.is('type');
})();

let availableSlotsListByDate = [];
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

	for (let item of doctorList) {
		$("#doctor").append($(`<option>`).val(item).text(item));
	}
	// for (let item of startMeridiemList) {
	// 	$("#startPeriod").append($(`<option>`).val(item).text(item));
	// }
	for (let item of startTimeList) {
		$("#startTime").append($(`<option>`).val(item).text(item));
	}
	// for (let item of endMeridiemList) {
	// 	$("#endPeriod").append($(`<option>`).val(item).text(item));
	// }
	for (let item of endTimeList) {
		$("#endTime").append($(`<option>`).val(item).text(item));
	}
	for (let item of qualificationList) {
		$("#qualification").append($(`<option>`).val(item).text(item));
	}
	for (let item of durationList) {
		$("#duration").append($(`<option>`).val(item).text(item));
	}

	// for (let item of bloodGroupList) {
	// 	$("#bloodGroup").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of hospital) {
	// 	$("#hospital").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of experience) {
	// 	$("#expYears").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of gender) {
	// 	$("#gender").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of specializationList) {
	// 	$("#specialization").append($(`<option>`).val(item).text(item));
	// }

	for (let item of roleList) {
		// let selectedYear = item == todayDate[2] ? true : false;
		$("#role").append($(`<option>`).val(item).text(item));
	}

	// for (let item of dayList) {
	// 	let option = item < 10 ? `0${item}` : item;

	// 	$("#day").append($(`<option>`).val(option).text(option));
	// }
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
	for (let item of doctorList) {
		$("#doctor").append($(`<option>`).val(item).text(item));
	}
	// for (let item of startMeridiemList) {
	// 	$("#startPeriod").append($(`<option>`).val(item).text(item));
	// }
	for (let item of startTimeList) {
		$("#startTime").append($(`<option>`).val(item).text(item));
	}
	// for (let item of endMeridiemList) {
	// 	$("#endPeriod").append($(`<option>`).val(item).text(item));
	// }
	for (let item of endTimeList) {
		$("#endTime").append($(`<option>`).val(item).text(item));
	}
	for (let item of qualificationList) {
		$("#qualification").append($(`<option>`).val(item).text(item));
	}
	for (let item of durationList) {
		$("#duration").append($(`<option>`).val(item).text(item));
	}
	// for (let item of bloodGroupList) {
	// 	$("#bloodGroup").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of gender) {
	// 	$("#gender").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of specializationList) {
	// 	$("#specialization").append($(`<option>`).val(item).text(item));
	// }
	for (let item of roleList) {
		// let selectedYear = item == todayDate[2] ? true : false;
		$("#role").append($(`<option>`).val(item).text(item));
	}
	for (let item of hospital) {
		$("#hospital").append($(`<option>`).val(item).text(item));
	}
	for (let item of experience) {
		$("#expYears").append($(`<option>`).val(item).text(item));
	}
	// for (let item of dayList) {
	// 	let option = item < 10 ? `0${item}` : item;

	// 	$("#day").append($(`<option>`).val(option).text(option));
	// }
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
	console.log("showmodle with select", data);
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

	$("#doctor").val(
		`${doctorList.firstName} ${doctorList.lastName} - ${doctorList.specialization} - ${doctorList.qualifications} - ${doctorList.consultationFee}`,
	);
	/*   >Name - Gender - Date of Birth - Blood Group</  */
	console.log({ patientList });

	for (let item of patientList) {
		let patientDetail = `${item.firstName} ${item.lastName} - ${
			item.gender
		} - ( ${formatDate(new Date(item.dateOfBirth))} ) - ( ${item.bloodGroup} )`;
		$("#patients").append($(`<option>`).val(item._id).text(patientDetail));
	}
	// for (let item of startMeridiemList) {
	// 	$("#startPeriod").append($(`<option>`).val(item).text(item));
	// }

	for (let item of startTimeList) {
		$("#startTime").append($(`<option>`).val(item).text(item));
	}
	// for (let item of endMeridiemList) {
	// 	$("#endPeriod").append($(`<option>`).val(item).text(item));
	// }
	for (let item of endTimeList) {
		$("#endTime").append($(`<option>`).val(item).text(item));
	}
	for (let item of availableDateList) {
		$("#dates").append(
			$(`<option>`)
				.val(JSON.stringify(item))
				.text(formatDate(new Date(item.date))),
		);
	}
	$("#dates").trigger("change");

	for (let item of durationList) {
		$("#duration").append($(`<option>`).val(item).text(item));
	}
	// for (let item of bloodGroupList) {
	// 	$("#bloodGroup").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of gender) {
	// 	$("#gender").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of specializationList) {
	// 	$("#specialization").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of hospital) {
	// 	$("#hospital").append($(`<option>`).val(item).text(item));
	// }
	// for (let item of experience) {
	// 	$("#expYears").append($(`<option>`).val(item).text(item));
	// }

	// for (let item of dayList) {
	// 	let option = item < 10 ? `0${item}` : item;

	// 	$("#day").append($(`<option>`).val(option).text(option));
	// }
	for (let item of roleList) {
		$("#role").append($(`<option>`).val(item).text(item));
	}
	$("#role").prop("disabled", false);

	// $("#month").val(todayDate[0]);
	// $("#year").val(todayDate[2]);
	// $("#day").val(todayDate[1] < 10 ? `0${todayDate[1]}` : todayDate[1]);
	$("#role").val(roleList[0]);
	$("#active-check").prop("disabled", true);
	let roleData = $("#role").val();
	if (roleData === "DOCTOR") $("#isDoctor").css("display", "block");
	else $("#isDoctor").css("display", "none");
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
	let filterList = {};
	if (filterObj) {
		for (let item in filterObj) filterList[item] = filterObj[item];
	}

	getDataList("users", null, filterList, function (result, error) {
		if (error) console.log(error);

		if (result.data.length == 0) showToastMessage(result.message, "info");
		console.log("---", result.data);

		let str = "";
		let loggedInRole = localStorage.getItem("role");

		if (loggedInRole == "RECEPTIONIST") {
			console.log(
				"patientList---",
				result.data.filter((item) => item.role == "PATIENT"),
			);

			doctorList = result.data.find((item) => item.role == "DOCTOR");
			patientList = result.data.filter((item) => item.role == "PATIENT");
			console.log({ patientList });

			localStorage.setItem("doctorId", doctorList._id);
			// for (let it of doctorList) {

			// }
		}

		// str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
	});
}

function selectSlotFromList(slotParentId, slot, id) {
	console.log(slotParentId, slot, id);
	$(`#${id}`).css("border-left", "5px #229f96 solid");
	$(`#${id}`).css("border-right", "5px #229f96 solid");
	$("#selectedSlot").val(slot);
}

$("#dates").on("change", function () {
	console.log($(this).val());
	$("#selectedSlot").val("");
	availableSlotsListByDate = JSON.parse($(this).val());
	document.getElementById("addSlot").innerHTML = "";
	let str = `<p style="clear: both">Select slot from list below:</p>`;
	for (let item of availableSlotsListByDate.slots) {
		console.log(item.status);

		str += `<div class="form-group col-md-1" onclick="selectSlotFromList('${availableSlotsListByDate._id}','${item.slot}','${item._id}')">
        
            <label class="radio-as-input">
    <input id="${item._id}"
            type="radio"
            name="gender"
            value="${item.slot}" />
    <span>${item.slot}</span>
  </label>
        
    </div>`;
	}
	$("#addSlot").append(str);
	for (let item of availableSlotsListByDate.slots) {
		if (!item.status) {
			// :
			$(`#${item._id}`).css("color", "#fff");
			$(`#${item._id}`).css("border-left", "3px #48bf36 solid");
			$(`#${item._id}`).css("background-color", "#48bf36");
			$(`#${item._id}`).css("cursor", "pointer");
			$(`#${item._id}`).hover(
				function () {
					// mouse enter
					$(this).css({
						"background-color": "#0faf74",
					});
				},
				function () {
					// mouse leave
					$(this).css({
						"background-color": "#48bf36",
					});
				},
			);
		} else {
			$(`#${item._id}`).css("background-color", "grey");
			$(`#${item._id}`).css("color", "#fff");
		}
	}
});
function getSlotList(filterObj) {
	let filterList = {};
	if (filterObj) {
		for (let item in filterObj) filterList[item] = filterObj[item];
	}
	$("#tableList").html("");

	$("#show-main-loader").css("display", "block");
	$("#showTableDesc").html("Slot List");
	getDataList("slots", null, filterList, function (result, error) {
		if (error) console.log(error);

		if (result.data.length == 0) showToastMessage(result.message, "info");

		let str = "";
		// let loggedInRole = localStorage.getItem("role");
		availableDateList = result.data.map((item) => {
			return { _id: item._id, slots: item.slots, date: item.date };
		});

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
function getAppointmentList(filterObj) {
	let filterList = {};
	if (filterObj) {
		for (let item in filterObj) filterList[item] = filterObj[item];
	}
	$("#tableList").html("");

	$("#show-main-loader").css("display", "block");
	$("#showTableDesc").html("Slot List");
	getDataList("slots", null, filterList, function (result, error) {
		if (error) console.log(error);

		if (result.data.length == 0) showToastMessage(result.message, "info");

		let str = "";
		// let loggedInRole = localStorage.getItem("role");
		let finalList = result.data;
		for (let it of finalList) {
			let availableSlot = it.slots.filter((item) => item.status == false);
			let bookedSlot = it.slots.filter((item) => item.status == true);
			// count = count + 1;

			/*
			<th>Doctor Name</th>
							<th>Date</th>
							<th>Start Time</th>
							<th>End Time</th>
							<th>Duration</th>
							<th>Booked Slot</th>
							<th>Available Slot</th>
							<th>Total slot</th>
							<th>Action</th>
			*/
			str += `<tr>
			<td>
                    ${it.doctorId.firstName} ${it.doctorId.lastName}</td>
                    <td>
                    ${formatDate(new Date(it.date))}</td>
                    <td>${it.startTime}</td>
                    <td>${it.endTime}</td>
                    
                    
					
            <td>${it.duration}</td>
			<td>${bookedSlot.length}</td>
			<td>${availableSlot.length}</td>
            <td>${it.slots.length}</td>
            
                    
                    
                <td><span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px;font-size:16px;" onclick="viewData('${
									it.doctorId.firstName
								} ${it.doctorId.lastName}','${it.date}','${it.startTime}','${
				it.endTime
			}','${it.duration}','${
				it.slots
			}')"><i class="fa fa-eye" aria-hidden="true"></i>

                </span><span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px;font-size:16px;" onclick="showData('${
									it.doctorId.firstName
								} ${it.doctorId.lastName}','${it.date}','${it.startTime}','${
				it.endTime
			}','${it.duration}','${
				it.slots
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
// function getDoctorList(filterObj) {
// 	let filterList = {};
// 	if (filterObj) {
// 		for (let item in filterObj) filterList[item] = filterObj[item];
// 	}

// 	$("#show-main-loader").css("display", "block");
// 	// $("#showTableDesc").html("User List");
// 	getDataList("users", null, filterList, function (result, error) {
// 		if (error) console.log(error);

// 		if (result.data.length == 0) showToastMessage(result.message, "info");

// 		let str = "";
// 		for (let it of result.data) {
// 			// count = count + 1;
// 			str += `<tr>
//                     <td>
//                     ${it.userName}</td>
//                     <td>${it.firstName} ${it.lastName}</td>

//             <td>${it.phone}</td>
// 			<td>${it.gender}</td>
// 			<td>${it.bloodGroup}</td>
//             <td>${it.role}</td>
// 			<td>${it.status}</td>
//             <td>${
// 							!it.active
// 								? '<span style="color:#48bf36; font-size:16px;text-align:center;"onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
// 								: '<span style="color:#FF4949; font-size:16px;text-align:center;" onclick=""><i class="fa fa-circle" aria-hidden="true"></i></span>'
// 						}</td>

//                 <td><span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px;font-size:16px;" onclick="viewData('${
// 									it.firstName
// 								}','${it.lastName}','${it.userName}','${it.email}','${
// 				it.salary
// 			}','${it.phone}','${it.address}',${it.active},'${it.year}','${
// 				it.month
// 			}','${it.day}','${it.role}')"><i class="fa fa-eye" aria-hidden="true"></i>

//                 </span>${
// 									it.active && it.role == "EMPLOYEE"
// 										? `<span style="cursor:pointer;color:#FF4949;padding:5px;margin:5px; font-size:16px;"onclick="showToastConfirmMessage('Are you sure want to delete ?','error','${it.userName}');"><i class="fa fa-trash-o" aria-hidden="true"></i></span>`
// 										: `<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px; font-size:16px;visibility:hidden" onclick=""><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>`
// 								}<span style="cursor:pointer;color:#48bf36;padding:5px;margin:5px;font-size:16px;" onclick="showData('${
// 				it.firstName
// 			}','${it.lastName}','${it.userName}','${it.email}','${it.salary}','${
// 				it.phone
// 			}','${it.address}',${it.active},'${it.year}','${it.month}','${it.day}','${
// 				it.role
// 			}')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
//                 </span></td></tr>`;
// 		}
// 		// str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
// 		$("#tableList").append(str);
// 		if (!$("#active").val()) {
// 			$("#active").empty();

// 			for (let item of activeList) {
// 				// let selectedYear = item == todayDate[2] ? true : false;
// 				$("#active").append($(`<option>`).val(item).text(item));
// 			}
// 			$("#active").val(activeList[0]);
// 		}
// 		// if (!$("#filterMonth").val()) {
// 		// 	$("#filterMonth").empty();

// 		// 	for (let item of monthList) {
// 		// 		// let selectedYear = item == todayDate[2] ? true : false;
// 		// 		$("#filterMonth").append($(`<option>`).val(item).text(item));
// 		// 	}
// 		// 	$("#filterMonth").val(activeList[0]);
// 		// }
// 		//

// 		$("#show-main-loader").css("display", "none");
// 	});
// }
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
function onRoleChange(event) {
	let value = event.target.value;
	console.log(value);
	if (value === "DOCTOR") $("#isDoctor").css("display", "block");
	else $("#isDoctor").css("display", "none");
}
function register() {
	//let active = Boolean(document.getElementById("active-check").value);

	let obj = {
		doctorId: localStorage.getItem("doctorId"),
		date: new Date(document.getElementById("dates").value.trim()),
		startTime: document.getElementById("startTime").value.trim(),
		endTime: document.getElementById("endTime").value.trim(),
		duration: parseInt(document.getElementById("duration").value.trim()),
	};

	let isFormValid = formValidation(obj);
	if (!isFormValid) return false;

	$("#register-loader").css("visibility", "visible");

	postData("slots", obj, null, null, function (result, error) {
		if (error) console.log(error);
		console.log({ "data received from": result });
		$("#register-loader").css("visibility", "hidden");
		showToastMessage(result.message, "success");
		$("#registerClient").trigger("reset");
		$("#myModal").modal("hide");
		// getEmployeeList();
		setTimeout(() => {
			// getSlotList();
		}, 2000);
	});
}

function addExperience() {
	if (expList.length == 3) {
		showErrorMessage("Limit reached for experience", true);
		return;
	}

	let hospital = $("#hospital").val();
	let expYear = $("#expYears").val();
	console.log(hospital, expYear);
	expList.push({ hospitalName: hospital, years: expYear });
	let str = `<div class="form-group col-md-4">
												<label for="expYear"></label>
												<input
													type="text"
													autocomplete="false"
													class="form-control"
													value="${hospital}-${expYear}"
													readonly />
											</div>`;

	$("#addExp").append(str);
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
	// $("#month").val(todayDate[0]);
	// $("#year").val(todayDate[2]);
	// $("#day").val(todayDate[1]);
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
