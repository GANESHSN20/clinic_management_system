let backgrndColor = {
  error: "#FF4949",
  success: "#48bf36",
  info: "#2793dc",
  warning: "#f3a827"
};
let borderLeftColor = {
  error: "4px #b70c0c solid;",
  success: "4px #208211 solid",
  info: "4px #0f5787 solid",
  warning: "4px #b3750b solid"
};
let api_url_list = {
  get: {
    clients: "/clients/getClientList",
    employees: "/users/getEmployeeList",
    bills: "/client-bills/getBillByUserName",
    expenses: "/expenses/getExpensesByCondition",
    investments: "/investments/getInvestmentsByCondition",
    salaries: "/salaries/getSalariesByUserName"
  },
  post: {
    clients: "/clients/register",
    employees: "/users/register",
    bills: "/client-bills/addBill",
    expenses: "/expenses/expenseAdd",
    investments: "/investments/investmentAdd",
    salaries: "/salaries/salaryPaid"
  },
  patch: {
    delete_client: "/clients/deleteData",
    update_clients: "/clients/updateData",
    update_employees: "/users/updateData",
    delete_employees: "/users/deleteData",
    update_salaries: "/salaries/updateData",
    delete_salaries: "/salaries/deleteData",
    update_bills: "/client-bills/updateData",
    delete_bills: "/client-bills/deleteData",
    update_expenses: "/expenses/updateData",
    delete_expenses: "/expenses/deleteData",
    employees: "/users/register",
    bills: "/client-bills/addBill",
    expenses: "/expenses/expenseAdd",
    investments: "/investments/investmentAdd",
    salaries: "/salaries/salaryPaid"
  }
};

function getQueryData(obj) {
  let str = "?";
  for (let item in obj) {
    str += `${item}=${obj[item]}&`;
  }
  let finalQuery = str.replace(/&$/, "").replace(/ /g, "%20");

  return finalQuery;
}
function hideToast() {
  $("#toast").css("animation", "slideOut 0.6s forwards");
}
function showToastMessage(message, color) {
  $("#toast").css("background-color", backgrndColor[color]);
  $("#toast").css("border-left", borderLeftColor[color]);
  $("#toast").css("visibility", "visible");
  $("#toast-message").text(message);

  $("#toast").css("animation", "");
  $("#toast").css("animation", "slideIn 0.6s forwards");

  setTimeout(function () {
    hideToast();
  }, 2000);
}
function hideErrorMessage() {
  $("#display-message").css("animation", `slideOutError 0.8s forwards`);
}
function showErrorMessage(message, color, slideOutTime = 2000) {
  $("#display-message").css("visibility", "visible");
  $("#display-message").css("background-color", backgrndColor[color]);
  $("#display-message").css("border-left", borderLeftColor[color]);
  $("#display-message").css("visibility", "visible");
  $("#display-message").text(message);

  $("#display-message").css("animation", "");

  $("#display-message").css("animation", `slideInError 0.8s forwards`);

  setTimeout(function () {
    hideErrorMessage();
  }, slideOutTime);
}
function hideConfirmToast() {
  $("#toast-confirm").css("animation", "slideOut 0.6s forwards");
}

function showToastConfirmMessage(message, color, userId) {
  $("#toast-confirm").css("background-color", "#FFF");
  $("#toast-confirm").css("color", backgrndColor[color]);
  $("#toast-confirm").css("border-left", borderLeftColor[color]);

  $("#dataToDelete").html(userId);
  $("#toast-confirm").css("visibility", "visible");
  $("#toast-confirm-message").text(message);

  $("#toast-confirm").css("animation", "");
  $("#toast-confirm").css("animation", "slideIn 0.6s forwards");

  setTimeout(function () {
    hideToast();
  }, 2000);
}

// function getDataList(){

// }
function getDataList(url, params, query, callback) {
  let path = api_url_list.get[url];
  if (params) path += `/${params}`;
  if (query) path += getQueryData(query);

  $.ajax({
    method: "GET",
    url: path,
    contentType: "application/json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "application/json",
      contentType: "application/json",
      Authorization: localStorage.getItem("token")
    },
    dataType: "json",
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log("response", response);
      if (response.status == 200) {
        return callback(response, null);

        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;

        // $('#totalAmount').val(response.data.totalAmount)

        // localStorage.setItem('token',response.token);
      }
    },
    error: function (error) {
      console.log("error", error);
      callback(null, error);
      //let data = JSON.stringify(error.responseJSON.message.message));
    }
  });
}
$("input").focus(function () {
  $(this).css("border-left", "3px #36d874 solid");
});
function regexValidation(field, regex, data, format) {
  console.log(field, regex, data, format);
  let regexExp = new RegExp(regex);
  let message = "";
  if (!regexExp.test(data)) {
    $(`#${field}`).css("border-left", "3px #FF4949 solid");
    message = `Invalid ${field.toUpperCase()} format. ${field.toUpperCase()} should be ${format}.`;

    showErrorMessage(message, "error");
    return false;
  }
  return true;
}
function formValidation(data) {
  let message = "";
  for (let i in data) {
    $(`#${i}`).css("border-left", "3px #434242 solid");
  }

  for (let i in data) {
    if (!data[i] && typeof data[i] != "boolean") {
      $(`#${i}`).css("border-left", "3px #FF4949 solid");
      message = `${i.toUpperCase()} is required.`;

      showErrorMessage(message, "error");

      return false;
    } else {
      $(`#${i}`).css("border-left", "3px #434242 solid");
    }
    let regex = "";
    let format = "";
    if (i == "email") {
      regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
      format = "<xxx@xxx.xx>";
    }
    if (i == "phone") {
      regex = "^([+]\\d{2})?\\d{10}$";
      format = "10 digits.";
    }
    if (i == "email" || i == "phone") {
      let result = regexValidation(i, regex, data[i], format);
      if (!result) return false;
    }
  }
  return true;
}

function postData(url, body, query, params, callback) {
  $.ajax({
    method: "POST",
    url: api_url_list.post[url],
    contentType: "application/json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "application/json",
      contentType: "application/json"
    },
    dataType: "json",
    data: JSON.stringify(body),
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log("response", response);
      if (response.status == 201) {
        return callback(response, null);

        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;

        // $('#totalAmount').val(response.data.totalAmount)

        // localStorage.setItem('token',response.token);
      }
    },
    error: function (error) {
      console.log("error", error);
      callback(null, error);
      //let data = JSON.stringify(error.responseJSON.message.message));
    }
  });
}

function patchData(url, body, query, params, callback) {
  let url_path = api_url_list.patch[url];
  if (params) {
    url_path = `${url_path}/${params}`;
  }
  $.ajax({
    method: "PATCH",
    url: url_path,
    contentType: "application/json",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PATCH",
      "Access-Control-Allow-Headers": "application/json",
      contentType: "application/json"
    },
    dataType: "json",
    data: JSON.stringify(body),
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log("response", response);
      if (response.status == 200) {
        return callback(response, null);

        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;

        // $('#totalAmount').val(response.data.totalAmount)

        // localStorage.setItem('token',response.token);
      }
    },
    error: function (error) {
      console.log("error", error);
      callback(null, error);
      //let data = JSON.stringify(error.responseJSON.message.message));
    }
  });
}

function calcSalaryRemaining(inp1, inp2, inp3, event, salary) {
  let totalPaid =
    parseInt(inp1 || 0) + parseInt(inp2 || 0) + parseInt(inp3 || 0);
  console.log("totalpaid--", totalPaid);
  // if (event.keyCode != 8) {
  setTimeout(() => {
    let leftAmount = salary - totalPaid;
    if (totalPaid <= salary)
      showErrorMessage(
        `Remaining: ${leftAmount} out of ${salary} salary. `,
        "info",
        3000
      );
    else if (totalPaid > salary)
      showErrorMessage(
        `Warning !! ( ${-leftAmount} ) more than salary.`,
        "warning",
        5000
      );
  }, 1200);

  // }
}
