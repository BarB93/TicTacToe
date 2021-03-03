import React from 'react';
import up_arrow from "../../images/up-arrow.png";
import down_arrow from "../../images/down-arrow.png";

const Filter = (props) => {
    const img = !props.isReverseHistoryList ?
        <img className='img_filter' src={up_arrow} alt="Ходы по возрастания" title="Ходы по возрастания"/>
        : <img className='img_filter' src={down_arrow} alt="Ходы по убыванию" title="Ходы по убыванию"/>
    return (
        <div className='list_filter'>
            Фильтр: {<button onClick={props.onClik} className='btn_filter'>{img}</button>}
        </div>
    )
}

export default Filter