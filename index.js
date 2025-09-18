const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
handlebars.RuntimeOptions = {
	allowProtoPropertiesByDefault: true,
	allowProtoMethodsByDefault: true,
};
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs"); // for date formatting
const CustomResponse = require("./src/utils/custom-response.js");
const CONSTANT = require("./src/utils/constant.js");
const UserService = require("./src/service/user-service.js");
const AppointmentService = require("./src/service/appointment-service.js");
const UserMiddleware = require("./src/middleware/user-middleware.js");
require("dotenv").config();
const port = process.env.PORT;

require("./database.js");

app.use("/dashboard", (req, res) => {
	res.sendFile(__dirname + "/public/dashboard.html");
});

app.use("/user", (req, res) => {
	res.sendFile(__dirname + "/public/user.html");
});

app.use("/slot", (req, res) => {
	res.sendFile(__dirname + "/public/slot.html");
});

app.use("/appointment", (req, res) => {
	res.sendFile(__dirname + "/public/appointment.html");
});
app.use("/prescription", (req, res) => {
	res.sendFile(__dirname + "/public/prescription.html");
});

app.use("/users", require("./src/controller/user-controller.js"));
app.use("/slots", require("./src/controller/slot-controller.js"));
app.use("/appointments", require("./src/controller/appointment-controller.js"));
// app.use(
// 	"/prescriptions",
// 	require("./src/controller/prescription-controller.js"),
// );
// console.log(process.env);

app.get(
	"/download-pdf/:id",
	UserMiddleware.isAuthenticate,
	async (req, res) => {
		try {
			const appointmentId = req.params.id;
			AppointmentService.detail(req.user, appointmentId)
				.then(async (result) => {
					// console.log("response from detail", result);
					// {
					// 	slots: { slot: '2:30 PM', slotId: new ObjectId('68cabf770e9400a8e9f7ab68') },
					// 	prescription: {
					// 	  diagnosis: 'Fever',
					// 	  medicine: [ [Object] ],
					// 	  investigations: [ [Object], [Object] ],
					// 	  followUpDate: 2025-09-23T00:00:00.000Z,
					// 	  notes: ''
					// 	},
					// 	_id: new ObjectId('68cabfd60e9400a8e9f7abe9'),
					// 	patientId: {
					// 	  age: '',
					// 	  _id: new ObjectId('68bf1ccac2e153958e3beb3d'),
					// 	  firstName: 'Ganesh',
					// 	  lastName: 'SN',
					// 	  phone: '+917876567656',
					// 	  dateOfBirth: 2001-05-19T18:30:00.000Z,
					// 	  gender: 'MALE',
					// 	  address: 'Simoga, Karnataka',
					// 	  bloodGroup: 'O+',
					// 	  status: 'OPEN',
					// 	  experience: [],
					// 	  isActive: true,
					// 	  role: 'PATIENT',
					// 	  otp: null,
					// 	  createdAt: 2025-09-08T18:13:30.788Z,
					// 	  __v: 0
					// 	},
					// 	doctorId: {
					// 	  age: '',
					// 	  _id: new ObjectId('68bd61081699376b0b647ba2'),
					// 	  firstName: 'Sree',
					// 	  lastName: 'Vidya',
					// 	  phone: '+918790987896',
					// 	  dateOfBirth: 1998-04-02T18:30:00.000Z,
					// 	  gender: 'FEMALE',
					// 	  address: 'Hindupur Andhra',
					// 	  bloodGroup: 'B+',
					// 	  email: 'sreevidya@gmail.com',
					// 	  status: 'OPEN',
					// 	  specialization: 'Cardiologist',
					// 	  qualifications: 'MS (Master of Surgery)',
					// 	  experience: [ [Object], [Object] ],
					// 	  consultationFee: 2000,
					// 	  isActive: true,
					// 	  role: 'DOCTOR',
					// 	  otp: null,
					// 	  createdAt: 2025-09-07T10:40:08.110Z,
					// 	  __v: 0
					// 	},
					// 	date: 2025-09-19T00:00:00.000Z,
					// 	status: 'INPROGRESS',
					// 	reason: 'General Checkup',
					// 	createdAt: 2025-09-17T14:04:06.862Z,
					// 	updatedAt: 2025-09-17T16:10:24.660Z,
					// 	__v: 0
					//   }
					const data = {
						clinicName: "Ganesh & Kulsum Hospital",
						clinicAddress: "123 Main Street, Shimoga, Karnataka",
						phone: "+91 98765 43210",
						email: "info@ganeshkulsum.com",

						patientName: `${result.patientId.firstName} ${result.patientId.lastName}`,
						age: dayjs().diff(dayjs(result.patientId.dateOfBirth), "year"),
						gender: result.patientId.gender,
						appointOn: dayjs(result.date).format("DD MMM YYYY"),
						date: dayjs(new Date()).format("DD MMM YYYY"),

						doctorName: `${result.doctorId.firstName} ${result.doctorId.lastName}`,
						specialization: `${result.doctorId.qualifications}, (${result.doctorId.specialization})`,

						slot: result.slots.slot,

						diagnosis: result.prescription.diagnosis,
						medicines: result.prescription.medicine,
						investigations: result.prescription.investigations,
						followUpDate: dayjs(result.prescription.followUpDate).format(
							"DD MMM YYYY",
						),
						notes: result.prescription.notes || "N/A",
					};
					console.log(JSON.stringify(data));

					// Compile Handlebars template
					const templatePath = path.join(__dirname, "prescription.hbs");
					const source = fs.readFileSync(templatePath, "utf-8");
					const template = handlebars.compile(source);
					const html = template(data, {
						allowProtoPropertiesByDefault: true,
						allowProtoMethodsByDefault: true,
					});

					// Generate PDF with Puppeteer
					const browser = await puppeteer.launch();
					const page = await browser.newPage();
					await page.setContent(html, { waitUntil: "networkidle0" });

					const pdfBuffer = await page.pdf({
						format: "A4",
						printBackground: true,
					});
					await browser.close();

					res.set({
						"Content-Type": "application/pdf",
						"Content-Disposition": "attachment; filename=prescription.pdf",
					});
					res.send(pdfBuffer);
					// res.send("hello");
				})
				.catch((error) => {});
			// Transform request object into template data
		} catch (err) {
			console.error(err);
			res.status(500).send("Error generating PDF");
		}
	},
);

app.use("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

let adminPayload = {
	firstName: "ADMIN",
	lastName: "USER",
	phone: 8792315230,
	dateOfBirth: "1995-09-09",
	gender: "OTHER",
	bloodGroup: "A+",
	email: process.env.EMAIL,
	address: "Other",
	role: "ADMIN",
	userName: process.env.USER_NAME,
	password: process.env.PASSWORD,
};

UserService.register(adminPayload, undefined)
	.then((result) => {
		console.log(
			CustomResponse.success(
				CONSTANT.HTTP_STATUS.CREATED,
				CONSTANT.USER.REGISTER,
				result,
			),
		);
	})
	.catch((error) => {
		console.log(
			CustomResponse.error(
				CONSTANT.HTTP_STATUS.INTERNAL_SERVER_ERROR,
				CONSTANT.COMMON.SERVER_ERROR,
				error,
			),
		);
	});

app.listen(port, () => {
	console.log(`Server started at the port ${port}.`);
});
