export const getFormattedFieldsFromFormData = (fields) => {
    const {
        date: [date],
        title: [title],
        amount: [amount],
    } = fields;

    return {
        date,
        title,
        amount,
    };
};

export const getFileNameFromFormData = (fields) => {
    const {
        date: [date],
        title: [title],
        amount: [amount],
    } = fields;

    return `${date}_${title}_${amount}`;
};
