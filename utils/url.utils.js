export const checkIfPathIncludesExt = (path) => {
    const regExp = new RegExp(/\.\w+$/);

    return regExp.test(path);
};
