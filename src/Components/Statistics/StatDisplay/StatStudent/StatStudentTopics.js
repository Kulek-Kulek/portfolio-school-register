import React from 'react';

import StudentTopicList from '../StatGroup/StudentTopicList';

const StatStudentTopics = props => {
    let topics = <h3>Brak tematów w tej grupie.</h3>;
    if (props.topics && props.topics.length > 0) {
        topics = props.topics.map(t => (
            <li key={t.id} className='statistics-report__data-item'>
                <div className='statistics-report__data-div'>
                    <span className='statistics-report__data-desc'>Data</span>
                    <span className='statistics-report__topic-date'>{new Date(t.lessonDate).toLocaleDateString().length < 10 ? '0' + new Date(t.lessonDate).toLocaleDateString() : new Date(t.lessonDate).toLocaleDateString()}
                    </span>
                </div>
                <div className='statistics-report__data-div'>
                    <span className='statistics-report__data-desc'>
                        Temat
                    </span>
                    <div className='statistics-report__topic-date'>
                        {t.topic}
                    </div>
                </div>
                <div className='statistics-report__data-div'>
                    <span className='statistics-report__data-desc'>Obecność</span>
                    <div className='statistics-report__topic-date'>
                        <StudentTopicList presentStudents={t.presentStudents} absentStudents={t.absentStudents} studentId={props.studentId} />
                    </div>
                </div>
            </li>
        ));
    }


    return (topics);
}

export default StatStudentTopics;