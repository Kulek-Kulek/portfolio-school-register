import React from 'react';


import './EndTermGrades.css';


const EndTermGrades = props => {

    let endTermGrades = props.endTermGrades.sort((a, b) => {
        if (a.gradeCode > b.gradeCode) return 1;
        if (a.gradeCode < b.gradeCode) return -1;
        return 0;
    });


    const grades = endTermGrades.map(grade => (
        <div key={grade.id} className={`student__end-term-grade-div ${grade.endTermGradeType === 'Ocena końcowa' && 'student__course-grade'}`}>
            <p className='student__end-term-grade-desc'>{(grade.endTermGradeType === 'Ocena proponowana - pierwszy semestr' || grade.endTermGradeType === 'Ocena proponowana - drugi semestr') ? grade.endTermGradeType.substring(0, 17) : grade.endTermGradeType}</p>
            <span className='student__end-term-grade'>{grade.grade}</span>
        </div>
    ));

    return (
        grades
    );
}

export default EndTermGrades;