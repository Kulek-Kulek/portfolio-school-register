import React from 'react';

import RodoItem from '../RodoItem/rodoItem';
import './rodo.css';

const Rodo = props => {

    let rodoItems;
    if (props && props.rodoList) {
        rodoItems = props.rodoList.map(rodo => (
            <RodoItem
                key={rodo.id}
                rodoName={rodo.rodoName}
                rodoText={rodo.rodoText}
                id={rodo.id}
                studentId={props.studentId}
                signed={rodo.students.filter(r => r.studentId === props.studentId)}
            />
        ));
    }


    return (
        <div className='student__rodo-list'>
            {rodoItems}
        </div>
    );
}

export default Rodo;