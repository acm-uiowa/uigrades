const {getAllCourses, getCourse, getSimilarCourses, checkAdmin} = require("../controllers/apiController")
const router = require('express').Router()

router.get("/courses", getAllCourses)
router.get("/courses/:id", getCourse)
router.get("/similar-courses/:id", getSimilarCourses);
router.post("/admin/login", checkAdmin);

module.exports = router;