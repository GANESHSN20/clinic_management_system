function navigateTo(pageName) {
	switch (pageName) {
		case "DASHBOARD": {
			window.location.href = "/dashboard";
			break;
		}
		case "CLIENT": {
			window.location.href = "/client";
			break;
		}
		case "INCOME": {
			window.location.href = "#"; //"/investment";
			break;
		}
		case "BILLS": {
			window.location.href = "#"; //"/bill";
			break;
		}
		case "EXPENSE": {
			window.location.href = "#"; //"/expense";
			break;
		}
		case "SALARY": {
			window.location.href = "#"; //"/salary";
			break;
		}
		case "PATIENT": {
			window.location.href = "/patient";
			break;
		}
		case "REPORT": {
			window.location.href = "#"; // "/report";
			break;
		}
	}
}
function logout() {
	localStorage.removeItem("token");
	window.location.href = "/";
}
