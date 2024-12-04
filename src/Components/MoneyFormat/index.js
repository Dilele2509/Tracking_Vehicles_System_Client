import React from 'react';

export default function MoneyFormat(props) {
    const { value, isShowing } = props;

    const format = (data) => {
        const formattedValue = new Intl.NumberFormat('vi-VN').format(data); // Format the number
        return isShowing ? `${formattedValue}` : '******';
    };

    return (
        <>{format(value)}</>
    );
}
