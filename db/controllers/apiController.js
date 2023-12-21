const initSqlJs = require('sql.js/dist/sql-wasm');
const fs = require('fs');
const csv = require('csv-parser');
let db;

initSqlJs().then(async SQL => {
    db = new SQL.Database();
    const initScript = await fs.promises.readFile('courses.sql');
    db.run(initScript.toString());

    const insertStatements = [];
    const promises = [];

    fs.readdir('./data', (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        const csvFiles = files.filter(file => file.endsWith('.csv'));

        csvFiles.forEach(file => {
            const promise = new Promise((resolve, reject) => {
                fs.createReadStream(`./data/${file}`)
                    .pipe(csv())
                    .on('data', row => {
                        const values = Object.values(row).map(value => {
                            if (typeof value === 'string') {
                                // Escape single quotes by replacing them with two single quotes
                                return `'${value.replace(/'/g, "''")}'`;
                            } else {
                                return value;
                            }
                        });

                        const insertStatement = `INSERT INTO courses (
                            SUBJECT_COURSE_SECTION,
                            COURSE_TITLE,
                            PRIMARY_INSTRUCTOR_NAME,
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
                            YEAR
                        ) VALUES (${values.join(', ')});`;
                        insertStatements.push(insertStatement);
                    })
                    .on('end', () => {
                        console.log(`File ${file} processed.`);
                        resolve(); // Resolve the promise when processing for this file is done
                    })
                    .on('error', err => {
                        reject(err); // Reject the promise if there's an error
                    });
            });

            promises.push(promise); // Store each promise in the array
        });

        // Wait for all promises to resolve before executing SQL statements
        Promise.all(promises)
            .then(() => {
                insertStatements.forEach(statement => {
                    db.run(statement);
                });

                // const result = db.exec('SELECT * FROM courses WHERE COURSE_TITLE LIKE "%Networks%"');
                // console.log(result[0].values);
                // Note to self, to query apostrophies add \' to the query
            })
            .catch(err => {
                console.error('Error processing files:', err);
            });
    });
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
        res.json(result[0].values[0]);
    } catch (error) {
        console.error("Error fetching course", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

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

module.exports = {getAllCourses, getCourse, getSimilarCourses}