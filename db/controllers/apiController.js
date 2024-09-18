const initSqlJs = require('sql.js/dist/sql-wasm');
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

let db;

initSqlJs().then(async SQL => {
    db = new SQL.Database();
    const initScript = await fs.promises.readFile('courses.sql');
    db.run(initScript.toString());

    const insertStatements = [];

    // old code to read from old data folder
    fs.readdir('./data', async (err, files) => {
        if (err) {
            console.error('Error reading directory:', err); 
            return;
        }

        const csvFiles = files.filter(file => file.endsWith('.csv'));

        for (const file of csvFiles) {
            try {
                await processCSVFile(file);
                console.log(`File ${file} processed.`);
            } catch (error) {
                console.error(`Error processing ${file}:`, error);
            }
        }

        try {
            // put them into the database after all files have been processed
            insertStatements.forEach(statement => {
                db.run(statement);
            });
        } catch (error) {
            console.error('Error inserting into database:', error);
        }
    });

    async function processCSVFile(file) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(`./data/${file}`)
                .pipe(csv())
                .on('data', row => {
                    const values = Object.values(row).map(value => {
                        if (typeof value === 'string') {
                            return `'${value.replace(/'/g, "''")}'`;
                        } else {
                            return value;
                        }
                    });

                    /* replace any null values given from data to N/A */
                    if (values[2] === "' '") {
                        values[2] = "'N/A'";
                    }

                    const insertStatement = `INSERT INTO courses (
                        SUBJECT_COURSE_SECTION,
                        COURSE_TITLE,
                        PRIMARY_INSTRUCTOR_NAME,
                        SECONDARY_INSTRUCTOR_NAME,
                        A_PLUS,
                        A,
                        A_MINUS,
                        B_PLUS,
                        B,
                        B_MINUS,
                        C_PLUS,
                        C,
                        C_MINUS,
                        D_PLUS,
                        D,
                        D_MINUS,
                        F,
                        WITHDRAWN,
                        SEMESTER,
                        YEAR,
                        IS_NEW
                    ) VALUES (${values.join(', ')});`;
                    insertStatements.push(insertStatement);
                })
                .on('end', () => {
                    resolve(); 
                })
                .on('error', err => {
                    reject(err);
                });
        });
    }

    // new code to read from new data folder
    /*
    fs.readdir('./new_data', async (err, files) => {
        if (err) {
            console.error('Error reading directory:', err); 
            return;
        }

        const csvFiles = files.filter(file => file.endsWith('.csv'));

        for (const file of csvFiles) {
            try {
                await processNewCSVFile(file);
                console.log(`File ${file} processed.`);
            } catch (error) {
                console.error(`Error processing ${file}:`, error);
            }
        }

        try {
            // put them into the database after all files have been processed
            newDataInsertStatements.forEach(statement => {
                db.run(statement);
            });
        } catch (error) {
            console.error('Error inserting into database:', error);
        }
    });

    async function processNewCSVFile(file) {
        // print the first 2 rows of the csv file
        let count = 0
        fs.createReadStream(`./new_data/${file}`)
            .pipe(csv())
            .on('data', row => {
                if (count < 5)
                console.log(row);
            })
            .on('end', () => {
                console.log('CSV file read');
            });

        return new Promise((resolve, reject) => {
            fs.createReadStream(`./new_data/${file}`)
                .pipe(csv())
                .on('data', row => {
                    const values = Object.values(row).map(value => {
                        if (typeof value === 'string') {
                            return `'${value.replace(/'/g, "''")}'`;
                        } else {
                            return value;
                        }
                    });

                    const insertStatement = `INSERT INTO newCourses (
                        SUBJECT_COURSE_SECTION,
                        COURSE_TITLE,
                        PRIMARY_INSTRUCTOR_NAME,
                        A,
                        B,
                        C,
                        D_F,
                        W,
                        SEMESTER,
                        YEAR,
                        Is_New_Data
                    ) VALUES (${values.join(', ')});`;
                    newDataInsertStatements.push(insertStatement);
                })
                .on('end', () => {
                    resolve(); 
                })
                .on('error', err => {
                    reject(err);
                });
        });
    }*/
}).catch(err => {
    console.error(err);
});

const getAllCourses = (req, res) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const searchQuery = req.query.q || '';
    const PAGESIZE = 9;

    const offset = (page - 1) * PAGESIZE;

    if (searchQuery) {
        const terms = searchQuery.toLowerCase().split(' ');

        const queryAttributes = [
            'SUBJECT_COURSE_SECTION',
            'COURSE_TITLE',
            'PRIMARY_INSTRUCTOR_NAME',
            'SECONDARY_INSTRUCTOR_NAME',
            'SEMESTER',
            'YEAR'
        ];

        let whereClause = '';
        terms.forEach(term => {
            if (whereClause !== '') {
                whereClause += ' AND ';
            }
            whereClause += '(' + queryAttributes.map(attr => `${attr} LIKE "%${term}%"`).join(' OR ') + ')';
        });
	
	/* we need some sort of loop or stop condition to know when to stop sending batches. instead of select *, we do select 9...then those as a batch, then do the next 9 etc. etc. until stop condition that way there's less downtime / lag for th euser */
        const query = `SELECT * FROM courses WHERE ${whereClause} LIMIT ${PAGESIZE} OFFSET ${offset}`;
        const result = db.exec(query);

        if (!result.length) {
            res.json({
                data: [],
                totalItems: 0
            });
            return;
        }

        // Count total items
        const countQuery = `SELECT COUNT(*) FROM courses WHERE ${whereClause}`;
        const allCourses = db.exec(countQuery);
        const totalItems = allCourses[0].values[0][0];

        res.json({
            data: result[0].values,
            totalItems
        });
    } else {
        const result = db.exec(`SELECT * FROM courses LIMIT ${PAGESIZE} OFFSET ${offset}`);
        if (!result.length) {
            res.json({
                data: [],
                totalItems: 0
            });
            return;
        }
        const allCourses = db.exec('SELECT COUNT(*) FROM courses');
        const totalItems = allCourses[0].values[0][0];

        res.json({
            data: result[0].values,
            totalItems
        });
    }
  } catch (error) {
    console.error("Error fetching courses", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getCourse = (req, res) => {
    try {
        const id = req.params.id;
        const result = db.exec(`SELECT * FROM courses WHERE id = ${id}`);
        const course = result[0].values[0];
        // determine if course is a new course or not and calculate class size accordingly
        let total = 0;
        for (let i = 5; i < 19; i++) {
            total += parseFloat(course[i]) || 0;
        }
        // logic to find aggregated courses since it's all done on initial page load anyways might as well just return it all in one json object
        const courseSubjectSection = course[1].split(":")[0]+':'+course[1].split(":")[1]
        const aggregatedCourses = db.exec(`SELECT * FROM courses WHERE SUBJECT_COURSE_SECTION LIKE "%${courseSubjectSection}%" AND SEMESTER = "${course[19]}" AND YEAR = "${course[20]}"`); // get a list of all courses with the same subject and section and semester and year
        if (aggregatedCourses[0].values.length <= 1) {
            // res.json([]);
            return res.json({course: result[0].values[0], classSize: total, aggregatedGrades: [], totalStudents: 0})
        }
        // iterate through aggregated Courses and create an array that holds the total number of each grade
        const aggregatedGrades = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        const newAggregatedGrades = [0,0,0,0,0]; // A, B, C, D_F, W
        let totalStudents = 0;
        if (course[21] == 0) {
            aggregatedCourses[0].values.forEach(course => {
                for (let i = 5; i < 19; i++) {
                    aggregatedGrades[i-5] += parseFloat(course[i])
                }
            });
            // get the total amount of students
            aggregatedGrades.forEach(grade => {
                totalStudents += grade;
            });
        } else { // new data
            aggregatedCourses[0].values.forEach(course => {
                newAggregatedGrades[0] += parseFloat(course[6])
                newAggregatedGrades[1] += parseFloat(course[9])
                newAggregatedGrades[2] += parseFloat(course[12])
                newAggregatedGrades[3] += parseFloat(course[15])
                newAggregatedGrades[4] += parseFloat(course[18])
            });
            // get the total amount of students
            newAggregatedGrades.forEach(grade => {
                totalStudents += grade;
            });
        }   
        return course[21] == 0 ? res.json({course: result[0].values[0], classSize: total, aggregatedGrades: aggregatedGrades, totalStudents: totalStudents}) : res.json({course: result[0].values[0], classSize: total, aggregatedGrades: newAggregatedGrades, totalStudents: totalStudents});
    } catch (error) {
        console.error("Error fetching course", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// eventually get rid of this one, repetative and useless
const getSimilarCourses = (req, res) => {
    try {
        const id = req.params.id;
        const result = db.exec(`SELECT * FROM courses WHERE id = ${id}`);
        const course = result[0].values[0];
        const courseSubjectSection = course[1].split(":")[0]+':'+course[1].split(":")[1]
        const similarCourses = db.exec(`SELECT * FROM courses WHERE SUBJECT_COURSE_SECTION LIKE "%${courseSubjectSection}%" AND id != ${id}`);
        if (similarCourses.length === 0) {
            res.json([]);
            return;
        }
        res.json(similarCourses[0].values);
    } catch (error) {
        console.error("Error fetching similar courses", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// check if admin successfully logged in
const checkAdmin = (req, res) => {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    try {
        let code = req.body.code
        if (code == ADMIN_PASSWORD) {
            res.json({success: true});
            return
        } res.json({success: false});
    } catch (error) {
        console.error("Error checking admin", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// const getAggregatedCourses = (req, res) => {
//     try {
//         const id = req.params.id;
//         const result = db.exec(`SELECT * FROM courses WHERE id = ${id}`);
//         const course = result[0].values[0];
//         const courseSubjectSection = course[1].split(":")[0]+':'+course[1].split(":")[1]
//         const aggregatedCourses = db.exec(`SELECT * FROM courses WHERE SUBJECT_COURSE_SECTION LIKE "%${courseSubjectSection}%" AND SEMESTER = "${course[18]}" AND YEAR = "${course[19]}"`); // get a list of all courses with the same subject and section and semester and year
//         if (aggregatedCourses[0].values.length <= 1) {
//             // res.json([]);
//             return null;
//         }
//         // iterate through aggregated Courses and create an array that holds the total number of each grade
//         const aggregatedGrades = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//         const newAggregatedGrades = [0,0,0,0,0]; // A, B, C, D_F, W
//         let totalStudents = 0;
//         if (course[20] == 0) {
//             aggregatedCourses[0].values.forEach(course => {
//                 for (let i = 4; i < 18; i++) {
//                     aggregatedGrades[i-4] += parseFloat(course[i])
//                 }
//             });
//             // get the total amount of students
//             aggregatedGrades.forEach(grade => {
//                 totalStudents += grade;
//             });
//             return {aggregatedGrades: aggregatedGrades, totalStudents: totalStudents}
//         } else { // new data
//             aggregatedCourses[0].values.forEach(course => {
//                 for (let i = 4; i < 9; i++) {
//                     aggregatedGrades[i-4] += parseFloat(course[i])
//                 }
//             });s
//             // get the total amount of students
//             newAggregatedGrades.forEach(grade => {
//                 totalStudents += grade;
//             });
//             return {aggregatedGrades: newAggregatedGrades, totalStudents: totalStudents}
//         }
//     } catch (error) {
//         console.error("Error fetching aggregated courses", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

module.exports = {getAllCourses, getCourse, getSimilarCourses, checkAdmin};
