const getGlobalActivityStats = (viewFilterData, socialLinksData, activityFilterData, joinMyyClubClickDetailsFilterData) => {

    const viewTotal = viewFilterData.length;
    let clickTotal = joinMyyClubClickDetailsFilterData.length;

    for (let i = 0; i < socialLinksData.length; i++) {
        clickTotal += socialLinksData[i].result.length;
    }

    for (let i = 0; i < activityFilterData.length; i++) {
        clickTotal += activityFilterData[i].filteredList.length;
    }

    const ctr = Math.round((viewTotal / clickTotal) * 100) || 0;
    return { view: viewTotal, click: clickTotal, ctr: ctr };
}

export default getGlobalActivityStats;