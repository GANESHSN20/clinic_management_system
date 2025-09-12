function navigateTo(pageName) {
	switch (pageName) {
		case "DASHBOARD": {
			window.location.href = "/dashboard";
			break;
		}
		case "SLOT": {
			window.location.href = "/slot";
			break;
		}
		case "APPOINTMENT": {
			window.location.href = "/appointment"; //"/investment";
			break;
		}
		case "PRESCRIPTION": {
			window.location.href = "/prescription"; //"/investment";
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
		case "USER": {
			window.location.href = "/user";
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
