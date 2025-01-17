export interface RawWorkSheetType {
    name: string;
    data: (string | number | null | undefined)[][];
}

type NewProcessedWorkSheetCourseType = [
    string,
    string,
    string,
    number,
    number,
    number,
    number,
    number,
];

type OldProcessedWorkSheetCourseType = [
    string,
    string,
    string,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
];

export type ProcessedWorkSheetCourseType =
    | NewProcessedWorkSheetCourseType
    | OldProcessedWorkSheetCourseType;

export type ProcessedWorkSheetType = ProcessedWorkSheetCourseType[];

export interface Grades {
    [key: string]: number;
}

export interface CourseType {
    uniqueID: string;
    courseCode: string;
    courseTitle: string;
    instructors: string[];
    session: string;
    subject: string;
    courseLevel: number;
    grades: Grades;
}

export interface GenericCourseType {
    uniqueID: string;
    includedCourseIDs: string[];
    courseCode: string;
    courseTitle: string;
    instructors: string[];
    session: string;
    grades: Grades;
}

export interface SingleNameType {
    name: string;
}
