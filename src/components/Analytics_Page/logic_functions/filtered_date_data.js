const filteredDateData = (state, newData) => {

    console.log("Activity Link LIst : ", newData);
    let { startDate, endDate } = state[0];
    return newData.map(elem => {

        const temp = elem.click_details.filter(link => {
            const date = new Date(link.date).getTime();
            const startDatems = new Date(startDate).getTime();
            const endDatems = new Date(endDate).getTime();
            console.log(date, startDatems, endDatems);

            return (date >= startDatems) && (date <= endDatems);
        })

        return {
            title: elem.title,
            filteredList: temp
        };
    })
}

export default filteredDateData;