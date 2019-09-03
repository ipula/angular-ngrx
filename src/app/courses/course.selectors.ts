import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./course.reducers";


export const selectCoursesState = createFeatureSelector<CourseState>('course');
export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState,
    coursesState => coursesState.entities[courseId]
);
