import fs from "fs";
import path from "path";
import xlsx from "node-xlsx";

import mutations from "../mutations";
import {
    RawWorkSheetType,
    ProcessedWorkSheetType,
    ProcessedWorkSheetCourseType,
    CourseType,
    Grades,
    GenericCourseType,
} from "../types";

const rawDataPath = path.join(
    process.cwd(),
    "src/db/seeds/data/raw-course-data",
);

function getWorkSheetSession(fileName: string) {
    const regex = /(Fall|Winter|Spring|Summer)(\d{4})/;
    const match = regex.exec(fileName);

    if (!match) {
        return "Season-Year";
    }

    return `${match[1]}-${match[2]}`;
}

function reformatSetData(data: Set<string>) {
    const reformatedData: { name: string }[] = [];
    for (const n of data) {
        reformatedData.push({ name: n });
    }
    return reformatedData;
}

async function parseRawData(workSheets: RawWorkSheetType[]) {
    const allCourses: { [key: string]: CourseType } = {};
    const allGenericCourses: { [key: string]: GenericCourseType } = {};

    const uniqueCoursesIDs = new Set<string>();

    const allSubjects = new Set<string>();
    const allSessions = new Set<string>();
    const allInstructors = new Set<string>();

    let gradeCategories: string[] = [];

    for (const workSheet of workSheets) {
        // number of columns in new types (without +- categories) is 8
        // number of columns in old types (with +- categories) is 17
        if (workSheet.data[0].length === 8) {
            gradeCategories = ["A", "B", "C", "D & F", "W"];
        } else {
            gradeCategories = [
                "A+",
                "A",
                "A-",
                "B+",
                "B",
                "B-",
                "C+",
                "C",
                "C-",
                "D+",
                "D",
                "D-",
                "F",
                "W",
            ];
        }

        const session = getWorkSheetSession(workSheet.name);

        const coursesRaw = workSheet.data.slice(1, workSheet.data.length);
        const nonEmptyCourses = coursesRaw.filter(
            (course) =>
                course.length !== 0 &&
                course.every((cell) => cell !== null) &&
                course.every((cell) => cell !== undefined),
        ) as ProcessedWorkSheetType;

        nonEmptyCourses.sort((a, b) => {
            const aInstructor = a[2].toLowerCase();
            const bInstructor = b[2].toLowerCase();

            const priority = (role: string) => {
                if (role.includes("primary instructor")) return 1;
                if (role.includes("course supervisor")) return 2;
                return 0;
            };

            return priority(aInstructor) - priority(bInstructor);
        });

        nonEmptyCourses.forEach((course: ProcessedWorkSheetCourseType) => {
            const uniqueCourseID = course[0] + "_" + session;

            const courseCodeSplit = course[0].split(":");
            const genericCourseCode =
                courseCodeSplit[0] + ":" + courseCodeSplit[1];
            const genericCourseID = genericCourseCode + "_" + session;

            if (!(uniqueCourseID in allCourses)) {
                const grades = gradeCategories.reduce((acc, value, index) => {
                    acc[value] = course[index + 3] as number;
                    return acc;
                }, {} as Grades);
                const subject = course[0].split(":")[0].trim();
                const courseLevel = parseInt(course[0].split(":")[1].trim());

                allCourses[uniqueCourseID] = {
                    uniqueID: uniqueCourseID,
                    courseCode: course[0],
                    courseTitle: course[1],
                    instructors: [],
                    session: session,
                    subject: subject,
                    courseLevel: courseLevel,
                    grades: grades,
                };

                allSubjects.add(subject);
                uniqueCoursesIDs.add(uniqueCourseID);
            }

            if (!(genericCourseID in allGenericCourses)) {
                allGenericCourses[genericCourseID] = {
                    uniqueID: genericCourseID,
                    includedCourseIDs: [],
                    courseCode: genericCourseCode,
                    courseTitle: course[1],
                    instructors: [],
                    session: session,
                    grades: {},
                };

                gradeCategories.forEach((category) => {
                    allGenericCourses[genericCourseID].grades[category] = 0;
                });
            }

            const instructor = course[2].split("-")[0].trim();

            if (!allCourses[uniqueCourseID].instructors.includes(instructor)) {
                allCourses[uniqueCourseID].instructors.push(instructor);
            }

            if (
                !allGenericCourses[genericCourseID].instructors.includes(
                    instructor,
                )
            ) {
                allGenericCourses[genericCourseID].instructors.push(instructor);
            }

            if (
                !allGenericCourses[genericCourseID].includedCourseIDs.includes(
                    uniqueCourseID,
                )
            ) {
                const courseGrades = gradeCategories.reduce(
                    (acc, value, index) => {
                        acc[value] = course[index + 3] as number;
                        return acc;
                    },
                    {} as Grades,
                );

                Object.keys(courseGrades).forEach((key) => {
                    allGenericCourses[genericCourseID].grades[key] +=
                        courseGrades[key];
                });
                allGenericCourses[genericCourseID].includedCourseIDs.push(
                    uniqueCourseID,
                );
            }

            allInstructors.add(instructor);
        });

        allSessions.add(session);
    }
    const genericCourses = Object.values(allGenericCourses);
    const courses = Object.values(allCourses);

    const subjects = reformatSetData(allSubjects);
    const sessions = reformatSetData(allSessions);
    const instructors = reformatSetData(allInstructors);

    const seasonOrder = {
        Fall: 0,
        Winter: 1,
        Spring: 2,
        Summer: 3,
    };

    subjects.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    sessions.sort((a, b) => {
        const [seasona, yeara] = a.name.split("-");
        const [seasonb, yearb] = b.name.split("-");

        if (!seasona || !yeara || !seasonb || !yearb) {
            return 0;
        }

        const yearComparison = Number(yeara) - Number(yearb);
        if (yearComparison !== 0) {
            return yearComparison;
        }

        if (!(seasona in seasonOrder) || !(seasonb in seasonOrder)) {
            return 0;
        }
        return (
            seasonOrder[seasona as keyof typeof seasonOrder] -
            seasonOrder[seasonb as keyof typeof seasonOrder]
        );
    });

    instructors.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    courses.sort((a, b) => {
        const courseCodeComparison = a.courseCode.localeCompare(b.courseCode);
        if (courseCodeComparison !== 0) {
            return courseCodeComparison;
        }

        const [seasona, yeara] = a.session.split("-");
        const [seasonb, yearb] = b.session.split("-");

        const yearComparison = Number(yeara) - Number(yearb);
        if (yearComparison !== 0) {
            return yearComparison;
        }

        if (!(seasona in seasonOrder) || !(seasonb in seasonOrder)) {
            return 0;
        }
        return (
            seasonOrder[seasona as keyof typeof seasonOrder] -
            seasonOrder[seasonb as keyof typeof seasonOrder]
        );
    });

    return { courses, genericCourses, subjects, sessions, instructors };
}

async function fetchRawData() {
    const files = await fs.promises.readdir(rawDataPath);
    const xlsxFiles = files.filter((file) => file.endsWith(".xlsx"));

    const allWorkSheetsFromFiles: RawWorkSheetType[] = [];

    for (const fileName of xlsxFiles) {
        const filePath = path.join(rawDataPath, fileName);
        const workSheetsFromFile = xlsx.parse(
            await fs.promises.readFile(filePath),
        );
        allWorkSheetsFromFiles.push(...workSheetsFromFile);
    }

    return allWorkSheetsFromFiles;
}

export default async function seedCoursesInformation() {
    const workSheets = await fetchRawData();
    const { courses, genericCourses, subjects, sessions, instructors } =
        await parseRawData(workSheets);
    try {
        console.log("data seeding beginning");
        await mutations.courses.insertCourses(courses);
        await mutations.courses.insertGenericCourses(genericCourses);
        await mutations.courses.insertSubjects(subjects);
        await mutations.courses.insertSessions(sessions);
        await mutations.courses.insertInstructors(instructors);
        console.log("data seeding complete");
    } catch {
        throw new Error("Error seeding course data");
    }
}
