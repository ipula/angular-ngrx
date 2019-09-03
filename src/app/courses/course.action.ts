import { Action } from "@ngrx/store";
import { Course } from "./model/course";

export enum CourseActionTypes {
    CoureseRequested = '[View Course Page] Course Requested',
    CourseLoaded = '[Courses API] Course Loaded'
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

export type CourseActions = CoureseRequested | CoureseLoaded;
