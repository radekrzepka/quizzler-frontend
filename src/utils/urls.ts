const BASE_PATH = "/";

const REGISTER = "/auth/sign-up";
const LOGIN = "/auth/sign-in";

const DASHBOARD = "/dashboard";
const MY_PROFILE = "/my-profile";
const MY_LESSONS = "/my-lessons";
const SEARCH = "/search";

const LESSON = (lessonName: string, userId: string) =>
   `/lesson/${lessonName}/${userId}`;
const EDIT_LESSON = (lessonName: string, userId: string) =>
   `/lesson/${lessonName}/${userId}/edit`;

export const RESTRICTED_PATHS = [DASHBOARD, MY_PROFILE, MY_LESSONS];

export {
   BASE_PATH,
   REGISTER,
   LOGIN,
   DASHBOARD,
   MY_PROFILE,
   MY_LESSONS,
   SEARCH,
   LESSON,
   EDIT_LESSON,
};
