import React from 'react';

import './RodoStudentsList.css';

const RodoStudentsList = props => {

    let students = <p className='settings__rodo-students'>Żaden uczeń nie wyraził jeszcze zgody na to rodo.</p>;
    if (props.students && props.students.length > 0) {
        students = props.students.map(student => (
            <li key={student.id} className='settings__rodo-student'>
                <p className='settings__rodo-student-data'>{student.name + ' ' + student.surname}</p>
                <p className='settings__rodo-student-data'>{'tel: ' + student.mobile}</p>
                <p className='settings__rodo-student-data'>{'email: ' + student.email}</p>
                <p className='settings__rodo-student-data'>Data zgody: {new Date(student.agreedOn).toLocaleDateString().length < 10 ? '0' + new Date(student.agreedOn).toLocaleDateString() : new Date(student.agreedOn).toLocaleDateString()}</p>
                <p className='settings__rodo-student-data'>Status zgody: <span className='settings__rodo-status'>{`${student.rodoStatus === 'accepted' ? 'Aktualna' : 'Wycofana'}`}</span></p>
            </li>
        ))
    }


    return (
        students
    );
}

export default RodoStudentsList;