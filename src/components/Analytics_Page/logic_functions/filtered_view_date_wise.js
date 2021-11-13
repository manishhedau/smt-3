

function dateCompare(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const isDateSame = date1.getDate() === date2.getDate();
    const isMonthSame = date1.getMonth() === date2.getMonth();
    const isYearSame = date1.getFullYear() === date2.getFullYear();
    if (isDateSame && isMonthSame && isYearSame)
        return true;
    return false;
}


const filteredViewDate = (state, viewDetails = []) => {
    let { startDate, endDate } = state[0];

    startDate = new Date(startDate);
    endDate = new Date(endDate);


    const diff = endDate.getDate() - startDate.getDate();


    const temp = [];

    const currDate = new Date(startDate);
    for (let i = 0; i <= diff; i++) {
        let viewCount = 0;
        for (let j = 0; j < viewDetails.length; j++) {
            const viewDate = new Date(viewDetails[j].date);
            if (dateCompare(currDate, viewDate))
                viewCount++;
        }
        temp.push(viewCount);
        currDate.setDate(currDate.getDate() + 1);
    }


    return temp;
}

export default filteredViewDate;