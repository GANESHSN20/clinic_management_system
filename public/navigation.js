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
			window.location.href = "/appointment"; 
			break;
		}
		case "PRESCRIPTION": {
			window.location.href = "/prescription"; 
			break;
		}
		
		case "USER": {
			window.location.href = "/user";
			break;
		}
		
	}
}
function logout() {
	localStorage.removeItem("token");
	window.location.href = "/";
}
