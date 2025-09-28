// console.log('admin page js');
let empList = [];
let typeList = ["GENERAL", "TRAVEL", "FOOD", "STATIONARY", "TOOLS"];
let activeList = ["ACTIVE", "INACTIVE"];

let role = localStorage.getItem("role");
let roleList = [];
if (role == "ADMIN") roleList = ["RECEPTIONIST", "DOCTOR", "ADMIN"];
else if (role == "RECEPTIONIST") roleList = ["PATIENT"];

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
(function () {
  if (!localStorage.getItem("token")) window.location.href = "/login";
  $("#setName").text(`Hi ${localStorage.getItem("name")}`);
  let role = localStorage.getItem("role");
  $("#setRole").text(role);
  if (role != "DOCTOR" && role != "PATIENT") {
    $("#showSlotAdd").css("display", "block");
  } else {
    $("#showSlotAdd").css("display", "none");
  }
  getUserList();
  getSlotList();
  // getDoctorList();
})();

let nextDates = getNextDates(3);

function showData(...data) {
  console.log("data to view ", data);

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

  for (let item of startTimeList) {
    $("#startTime").append($(`<option>`).val(item).text(item));
  }

  for (let item of endTimeList) {
    $("#endTime").append($(`<option>`).val(item).text(item));
  }
  for (let item of qualificationList) {
    $("#qualification").append($(`<option>`).val(item).text(item));
  }
  for (let item of durationList) {
    $("#duration").append($(`<option>`).val(item).text(item));
  }

  for (let item of roleList) {
    // let selectedYear = item == todayDate[2] ? true : false;
    $("#role").append($(`<option>`).val(item).text(item));
  }

  $("#role").attr("disabled", true);
  // $('#active-check').checked()
  $("#active-check").prop("checked", active);

  if (role == "SUPER-ADMIN" || role == "ADMIN")
    $("#active-check").prop("disabled", true);
  else $("#active-check").prop("disabled", false);
}
function viewData(...data) {
  console.log("data to view ", data);

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

  for (let item of startTimeList) {
    $("#startTime").append($(`<option>`).val(item).text(item));
  }

  for (let item of endTimeList) {
    $("#endTime").append($(`<option>`).val(item).text(item));
  }
  for (let item of qualificationList) {
    $("#qualification").append($(`<option>`).val(item).text(item));
  }
  for (let item of durationList) {
    $("#duration").append($(`<option>`).val(item).text(item));
  }

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

  $("#role").attr("disabled", true);
}

function showModalWithSelect(data) {
  console.log("showmodle with select", data);
  document.getElementById("startTime").innerHTML = "";
  document.getElementById("endTime").innerHTML = "";
  document.getElementById("duration").innerHTML = "";
  document.getElementById("dates").innerHTML = "";
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
    `${doctorList.firstName} ${doctorList.lastName} - ${doctorList.specialization} - ${doctorList.qualifications} - ${doctorList.consultationFee}`
  );

  for (let item of startTimeList) {
    $("#startTime").append($(`<option>`).val(item).text(item));
  }

  for (let item of endTimeList) {
    $("#endTime").append($(`<option>`).val(item).text(item));
  }
  for (let item of nextDates) {
    $("#dates").append($(`<option>`).val(item).text(item));
  }
  for (let item of durationList) {
    $("#duration").append($(`<option>`).val(item).text(item));
  }

  for (let item of roleList) {
    $("#role").append($(`<option>`).val(item).text(item));
  }
  $("#role").prop("disabled", false);

  $("#role").val(roleList[0]);
  $("#active-check").prop("disabled", true);
  let roleData = $("#role").val();
  if (roleData === "DOCTOR") $("#isDoctor").css("display", "block");
  else $("#isDoctor").css("display", "none");
}

function getCheckedData(e, checkboxId) {
  $("#active-check").val(e.target.checked);
}
function getUserList(filterObj) {
  let filterList = {};
  if (filterObj) {
    for (let item in filterObj) filterList[item] = filterObj[item];
  }

  getDataList("users", null, filterList, function (result, error) {
    if (error) console.log(error);

    if (result.data.length == 0) showToastMessage(result.message, "info");

    let str = "";
    let loggedInRole = localStorage.getItem("role");

    if (loggedInRole == "RECEPTIONIST") {
      doctorList = result.data.find((item) => item.role == "DOCTOR");
      localStorage.setItem("doctorId", doctorList._id);
      // for (let it of doctorList) {

      // }
    }

    // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
  });
}

function getUserList(filterObj) {
  let filterList = {};
  if (filterObj) {
    for (let item in filterObj) filterList[item] = filterObj[item];
  }

  getDataList("users", null, filterList, function (result, error) {
    if (error) console.log(error);

    if (result.data.length == 0) showToastMessage(result.message, "info");

    let str = "";
    let loggedInRole = localStorage.getItem("role");

    if (loggedInRole == "RECEPTIONIST") {
      doctorList = result.data.find((item) => item.role == "DOCTOR");
      localStorage.setItem("doctorId", doctorList._id);
      // for (let it of doctorList) {

      // }
    }

    // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
  });
}

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
    let finalList = result.data;
    for (let it of finalList) {
      let availableSlot = it.slots.filter((item) => item.status == false);
      let bookedSlot = it.slots.filter((item) => item.status == true);
      // count = count + 1;

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

    $("#show-main-loader").css("display", "none");
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
    // getUserList();
    setTimeout(() => {
      getSlotList();
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

function closeUserModal() {
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
  getUserList(obj);
});
