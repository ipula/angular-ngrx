import { Course } from "./model/course";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CourseActions, CourseActionTypes } from "./course.action";

export interface CourseState extends EntityState<Course> {

    // coursesEntities: { [key: number]: Course };
    // coursesOrder: number[];
}

// export interface LessonsState {

//     lessonsEntities: { [key: number]: Course };
//     lessonsOrder: number[];
// }
export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CourseState = adapter.getInitialState();

export function coursesReducer(state = initialCoursesState, action: CourseActions): CourseState {

    switch (action.type) {

        case CourseActionTypes.CourseLoaded:

            return adapter.addOne(action.payload.course, state);

        default: {
            return state;
        }
    }
}
