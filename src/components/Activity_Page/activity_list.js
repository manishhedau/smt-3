import Activity from "./activity_link";

const ActivityList = (props) => {

    const {currentList, deleteLink} = props;

    return (
        <div className="activity-list">
            {
                currentList.map((link,index) => {
                    return <Activity key={index} deleteLink={deleteLink} tabindex={index} activityKey={index} title={link.title} url={link.link}/>
                })
            }
        </div>
    );
}

export default ActivityList;