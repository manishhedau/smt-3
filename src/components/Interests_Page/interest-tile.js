import {useState} from 'react';



const InterestTile = (props) => {

    const {interest,color} = props;

    const [selected, setSelected] = useState(false);
    
    const toggleSelection = () => {
        setSelected(!selected);
    }

    return (
        <h6 className="interests-tile" onClick = {toggleSelection} style={{color: selected ? "white" : color, border: `1px solid ${color}`, backgroundColor: selected ? color : "white"}} >{interest}</h6>
    );

}

export default InterestTile;