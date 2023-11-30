const BASE_PATH = "/";

const REGISTER = "/auth/sign-up";
const LOGIN = "/auth/sign-in";

const DASHBOARD = "/dashboard";
const SEARCH = (query: string) => `/search?query=${query}`;

const MY_PROFILE = "/my-profile";
const PROFILE = (username: string) => `/profile/${username}`;

const MY_LESSONS = "/my-lessons";
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
   PROFILE,
   MY_LESSONS,
   SEARCH,
   LESSON,
   EDIT_LESSON,
};
