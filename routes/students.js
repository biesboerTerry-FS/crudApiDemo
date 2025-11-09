const express = require("express");
const router = express.Router();

const Student = require("../models/student.js");

const getStudent = async (request, response, next) => {
	let student;
	try {
		student = await Student.findById(request.params.id);
		if (student === null) {
			return response.status(404).json({
				message: `Student ID: ${request.params.id} not found`,
			});
		}
	} catch (error) {
		response.status(500).json({
			message: error.message,
		});
	}
	response.student = student;
	next();
};

//^ RESTFUL Endpoints
//^ GET, PATCH, POST, DELETE

//# GET all
router.get("/", async (request, response) => {
	try {
		const students = await Student.find();
		response.json(students);
	} catch (error) {
		response.status(500).json({
			message: error.message,
		});
	}
});

// * GET One
router.get("/:id", getStudent, async (request, response) => {
	response.json(response.student);
});

// * POST/CREATE
router.post("/", async (request, response) => {
	const student = new Student({
		name: request.body.name,
		class: request.body.class,
	});
	try {
		const newStudent = await student.save();
		response.status(201).json(newStudent);
	} catch (error) {
		response.status(400).json({
			message: error.message,
		});
	}
});

// * PATCH/UPDATE
// & PATCH allows edits of one key:value pair, PUT requires all edited pairs
router.patch("/:id", getStudent, async (request, response) => {
	if (request.body.name !== null) {
		response.student.name = request.body.name;
	}
	if (request.body.class !== null) {
		response.student.class = request.body.class;
	}
	try {
		const updatedStudent = await response.student.save();
		response.json(updatedStudent);
	} catch (error) {
		response.status(400).json({
			message: error.message,
		});
	}
});

// * DELETE
router.delete("/:id", getStudent, async (request, response) => {
	try {
		await response.student.deleteOne();
		response.json({
			message: "Removed student",
		});
	} catch (error) {
		response.status(500).json({
			message: error.message,
		});
	}
});

module.exports = router;
