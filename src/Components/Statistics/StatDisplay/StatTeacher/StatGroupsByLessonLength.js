import React from 'react';


const StatGroupsByLessonLength = props => {
    let groups;
    if (props.groupsByLessonLength) {
        groups = props.groupsByLessonLength.map(g => (
            <li key={g.id} className='statistics-report__topic-date  statistics-report__lesson-by-length'>
                <p className={`statistics-report__data-desc ${g.isPast && 'statistics-report__data-desc-past'}`}>{g.name}
                    {g.isPast && <span className='statistics-report__span-past'>( Grupa historyczna )</span>}
                </p>
                <span>{`Zrealizowanych tematów: ${(g.topics.filter(topic => topic.createdBy === props.teacherId)).length}`}</span>
            </li>
        ));
    }

    return (
        <ol className='statistics-report__groups-list' id={'groups-by-lesson-length-' + props.id}>
            {groups}
        </ol>

    );
}

export default StatGroupsByLessonLength;