import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './StudentTopicList.css';

const StudentTopicList = props => {

    let studentList;
    if (props.studentList) {
        studentList = props.studentList.map((s, index) => (
            <React.Fragment key={uuidv4()}>{`${s.name} ${s.surname}${props.studentList.length === index + 1 ? '.' : ' | '} `}</React.Fragment>
        ));
    }

    let topicList;
    if (props.topicList) {
        studentList = props.topicList.map((t, index) => (
            <div className='statistics__topic-list' key={uuidv4()}>
                <p className='statistics__topic-index'>{index < 9 ? '0' + (index + 1 + '.') : index + 1 + '.'}
                    <span className='statistics__topic-details'>{t.topic}</span>
                    <span>
                        {`Data: ${new Date(t.lessonDate).toLocaleDateString().length < 10 ? '0' + new Date(t.lessonDate).toLocaleDateString() : new Date(t.lessonDate).toLocaleDateString()}`}
                    </span>
                </p>
            </div>
        ));
    }

    let studentIsPresent;
    let studentIsAbsent;

    if (props.presentStudents && props.absentStudents && props.studentId) {
        for (let present of props.presentStudents) {
            if (present === props.studentId) {
                studentIsPresent = true;
            }
        }
        for (let absent of props.absentStudents) {
            if (absent === props.studentId) {
                studentIsAbsent = true;
            }
        }
    }

    return (
        <React.Fragment>
            {studentList && studentList}
            {topicList && topicList}
            {studentIsPresent &&
                <div className='statistics__topic-list'>
                    <i className="fas fa-check student__attendance-present"></i>
                </div>}
            {studentIsAbsent &&
                <div className='statistics__topic-list'>
                    <i className="fas fa-times student__attendance-absent"></i>
                </div>}
        </React.Fragment>

    );
}

export default StudentTopicList;