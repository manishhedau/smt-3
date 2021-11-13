const calcLifetimeStats = (socialLinkList = [], profile_link, activityLinkList = []) => {

    // const data = dataset.activities;
    let totalView = profile_link?.view_details?.length;
    let totalClick = 0;

    // for (let click = 0; click < data.length; click++) {
    //     total_views += data[click].views;
    //     total_clicks += data[click].clicks;
    // }

    for (let i = 0; i < socialLinkList.length; i++) {
        totalClick += socialLinkList[i]?.click_details?.length;
    }

    for (let i = 0; i < activityLinkList.length; i++) {
        totalClick += activityLinkList[i]?.click_details?.length;
    }

    let averageCtr = Math.round((totalView / totalClick) * 100);

    const lifeTimeStates = { views: totalView, clicks: totalClick, averageCtr }

    return lifeTimeStates;
}

export default calcLifetimeStats;