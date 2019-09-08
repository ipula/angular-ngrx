import { Action } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

export enum CourseActionTypes {
    CoureseRequested = '[View Course Page] Course Requested',
    CourseLoaded = '[Courses API] Course Loaded',
    AllCoursesRequested = '[Courses Home Page] All Courses Requested',
    AllCourseLoaded = '[Courses API] All Courses Loaded',

    CourseSaved = '[Edit Course Dialog] Course Saved'
}

export class CoureseRequested implements Action {
    readonly type = CourseActionTypes.CoureseRequested;

    constructor(public payload: { courseId: number }) {

    }

}

export class CoureseLoaded implements Action {
    readonly type = CourseActionTypes.CourseLoaded;

    constructor(public payload: { course: Course }) {

    }

}

export class AllCoursesRequested implements Action {
    readonly type = CourseActionTypes.AllCoursesRequested;
}

export class AllCoursesLoaded implements Action {
    readonly type = CourseActionTypes.AllCourseLoaded;

    constructor(public payload: { course: Course[] }) {

    }

}
export class CourseSaved implements Action {
    readonly type = CourseActionTypes.CourseSaved;

    constructor(public payload: { course: Update<Course> }) {

    }

}


export type CourseActions = CoureseRequested | CoureseLoaded | AllCoursesRequested | AllCoursesLoaded | CourseSaved;
