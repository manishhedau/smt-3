import colors from './datasets/colors.json';
import { useSelector } from 'react-redux';
import ActivityLinkTile from './graphs/activity_link_tile';

import './styles/activity_link_list.css';

const ActivityLinkList = () => {

    const newData = useSelector(state => state.entities.activityLinks.map(elem => {
        
        return {
            title: elem.title,
            clicks: elem.click_details.length,
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.rEViQFqtfA7SFxmmAHw-3gHaKM%26pid%3DApi&f=1"
        }
    
    }))

    const finalData = newData.sort((a1,a2) => a1.clicks-a2.clicks).reverse();
    // console.log(finalData);
    
    return (

        <div id="activity-link-stats-list">
            {finalData.map((elem,ind) => {

                const presentLineColor = colors[ind].hexString;
                
                return (
                    <ActivityLinkTile id={`activity-${ind}`} linkKey={ind} presentLineColor={presentLineColor} ind={ind} elem={elem}/>
                );
            })}
        </div>
    );
}

export default ActivityLinkList;
