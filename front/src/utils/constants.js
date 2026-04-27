const LESSON_TYPES = {
    LECTURE: 'lecture',
    PRACTICE: 'practice',
    SEMINAR: 'seminar',
    SELFSTUDY: 'self-study'
}
const LESSON_TYPE_VALUES = [
    'lecture', 'practice',
    'seminar', 'self-Study'
];


const TRIMESTER_TYPES = {
    AUTUMN: 'autumn',
    SPRING: 'spring',
    SUMMER: 'summer'
};
const TRIMESTER_TYPE_VALUES = ['autumn', 'spring', 'summer'];


const USER_ROLES = {
    TEACHER: 'teacher',
    STUDENT: 'student',
};

const USER_ROLE_VALUES = ['teacher', 'student'];
const DEFAULT_USER_ROLE = 'student';


const MIN_VALID_YEAR = 1;
const MAX_VALID_YEAR = 4;

const YEARS = {
    1: '1',
    2: '2',
    3: '3',
    4: '4'
};

const YERS_VALUES = ['1', '2', '3', '4'];


module.exports = {
    LESSON_TYPES,
    LESSON_TYPE_VALUES,
    TRIMESTER_TYPES,
    TRIMESTER_TYPE_VALUES,
    MIN_VALID_YEAR,
    MAX_VALID_YEAR,
    USER_ROLES,
    USER_ROLE_VALUES,
    DEFAULT_USER_ROLE,
    YEARS,
    YERS_VALUES
};