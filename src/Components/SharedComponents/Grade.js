import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../Shared/Elements/Button/Button';
import { AuthContext } from '../../Shared/Context/auth-context';
import * as actions from '../../store/actions/index';
import './Grade.css';

const Grade = props => {
    const dispatch = useDispatch();

    const auth = useContext(AuthContext);

    useEffect(() => {
        const grades = [...document.querySelectorAll('.group-details__student-grade')];
        if (auth.userStatus !== 'student') {
            grades.forEach(g => g.style.display = 'flex');
        }
    }, [auth.userStatus]);

    const updateGradeHandler = e => {
        const studentId = e.target.name;
        const gradeId = e.target.id;
        dispatch(actions.idProvider(gradeId, 'gradeId'));
        dispatch(actions.idProvider(studentId, 'studentId'));
        dispatch(actions.infoTypeChange('updateGrade'));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.toggleModal('dataAdminModal'));
    }

    let grades = <p className='group-details__student-grade'>Brak ocen</p>;
    if (props.grade && props.grade.length > 0) {
        grades = props.grade.map(g => (
            <div key={g.id + g.groupId}
                className={`group-details__student-grade  active-group-infodetails ${g.groupId ? 'group-' + g.groupId : 'group-' + props.initialGrades} ${props.wrapDiv} ${(g.groupId === props.initialGrades || g.groupId === undefined) && 'initial-active-group-details'}`}>
                <p className={`student-grade ${props.studentGrade}`}>
                    {g.name}
                </p>
                <p className={`student-grade ${props.studentGrade}`}>
                    {g.grade}<span>{g.updatedGrade && '/' + g.updatedGrade}</span>
                </p>
                <div className='student-garde-desc'>
                    <p>{`Wystawił: ${g.teacher || 'Administrator'}`}</p>
                    <p>{`Data: ${(new Date(g.creationDate).toLocaleDateString().length < 10 ? '0' + new Date(g.creationDate).toLocaleString() : new Date(g.creationDate).toLocaleString()) || 'Brak danych'}`}</p>
                    <p>{`Szczegóły: ${g.gradeDesc || 'Brak danych'}`}</p>
                </div>
                {props.status !== 'student' && <Button
                    classButton='group-details__updategrade-button'
                    btnText={g.grade ? 'Popraw' : 'Dodaj ocenę'}
                    click={updateGradeHandler}
                    id={g.id}
                    name={props.studentId}
                />}
            </div>
        ));
    }


    return (
        <React.Fragment>
            {grades}
        </React.Fragment>
    );
}

export default Grade;