import React from 'react';


const StatAttendance = props => {
    let presentDates = [];
    let absentDates = [];
    if (props.topicList) {
        for (let t of props.topicList) {
            for (let s of t.presentStudents) {
                if (s.id === props.studentId) {
                    presentDates.push(t.lessonDate);
                }
            }
        }
        for (let t of props.topicList) {
            for (let s of t.absentStudents) {
                if (s.id === props.studentId) {
                    absentDates.push(t.lessonDate);
                }
            }
        }
    }

    let presentStudentsDates;
    let absentStudentsDates;

    if (presentDates.length > 0) {
        presentStudentsDates = presentDates.map((d, index) => (
            <React.Fragment key={d}>{`${new Date(d).toLocaleDateString().length < 10 ? '0' + new Date(d).toLocaleDateString() : new Date(d).toLocaleDateString()}${presentDates.length === index + 1 ? '.' : ' | '}`}</React.Fragment>
        ))
    }
    if (absentDates.length > 0) {
        absentStudentsDates = absentDates.map((d, index) => (
            <React.Fragment key={d}>{`${new Date(d).toLocaleDateString().length < 10 ? '0' + new Date(d).toLocaleDateString() : new Date(d).toLocaleDateString()}${presentDates.length === index + 1 ? '.' : ' | '}`}</React.Fragment>
        ))
    }

    return (
        <React.Fragment>
            <div className='statistics-report__data-div'>
                <span className='statistics-report__data-desc'>{`Obecny (${presentDates.length})`}</span>
                <span className='statistics-report__topic-date'>
                    {presentStudentsDates}
                </span>

            </div>
            <div className='statistics-report__data-div'>
                <span className='statistics-report__data-desc'>{`Nieobecny (${absentDates.length})`}</span>
                <div className='statistics-report__topic-date'>
                    {absentStudentsDates}
                </div>
            </div>
        </React.Fragment>
    );
}

export default StatAttendance;