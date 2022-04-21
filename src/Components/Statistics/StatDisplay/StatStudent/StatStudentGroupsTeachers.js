import React from 'react';
import { Link } from 'react-router-dom';

const StatStudentGroupsTeachers = props => {
    let groupAndTeacher;
    if (props.groups && props.group.length > 0) {
        props.rawData.group.map(group => (
            groupAndTeacher = <React.Fragment key={group.id}>
                <div className='statistics-report__group-teacher'>Lektor prowadzący:
                    <Link to={'/statistics/teacher/' + group.teacher.id} className='statistics-report__data-link statistics-report__data-link-teacher'>
                        <span className='statistics-report__group-teacher-name'>{`${group.teacher[0].name} ${group.teacher.surname}`}
                        </span>
                    </Link>
                </div>
                <div className='statistics-report__group-teacher'>Grupa:
                    <Link to={'/statistics/group/' + group.id} className='statistics-report__data-link statistics-report__data-link-teacher'>
                        <span className='statistics-report__group-teacher-name'>{group.name}
                        </span>
                    </Link>
                </div>
            </React.Fragment>
        ));
    }
    return (
        groupAndTeacher
    );
}

export default StatStudentGroupsTeachers;