
const rootUrl = "/";

// Auth
const authUrl = "auth";
const loginUrl = "login";

// For Exam
const examUrl = "exam";
const examListUrl = "list";
const examResultUrl = "result";
const examQuizUrl = "quiz";
const examStudentUrl = "student";


export class AppRoutes {

    // For Auth
    public static authUrl = authUrl;
    public static loginUrl = loginUrl;
    public static mainLoginUrl = rootUrl + authUrl + rootUrl + loginUrl;

    // For Exam
    public static examUrl = examUrl;
    public static examListUrl = examListUrl;
    public static mainExamListUrl = rootUrl + examUrl + rootUrl + examListUrl;
    public static examResultUrl = examResultUrl;
    public static mainExamResultUrl = rootUrl + examUrl + rootUrl + examResultUrl;
    public static examQuizUrl = examQuizUrl;
    public static mainExamQuizUrl = rootUrl + examUrl + rootUrl + examQuizUrl;
    public static examStudentUrl = examStudentUrl;
    public static mainExamStudentUrl = rootUrl + examUrl + rootUrl + examStudentUrl;
}