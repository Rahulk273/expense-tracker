import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThoudandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";
    const [integerPart, fractionalPart] = num.toString().split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart !== undefined
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
    return data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
};

export const prepareIncomeBarChartData = (data = []) => {
    try {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return [];
        }

        const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });

        return sortedData.map((item) => {
            const date = new Date(item?.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'short' 
            });

            const amount = parseFloat(item?.amount) || 0;

            return {
                month: formattedDate,
                amount,
                source: item?.source || 'Unknown',
            };
        });
    } catch {
        return [];
    }
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData;
};
