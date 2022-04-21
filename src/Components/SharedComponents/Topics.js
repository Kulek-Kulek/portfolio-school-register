import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '../../Shared/Context/auth-context';
import * as actions from '../../store/actions/index';
import './Topics.css';



const Topics = props => {
    const path = useLocation().pathname;

    const dispatch = useDispatch();

    const adminData = useSelector(state => state.adminData);

    const auth = useContext(AuthContext);


    useEffect(() => {
        const topics = [...document.querySelectorAll('.student__topic')];
        if (auth.userStatus !== 'student' && auth.userStatus !== 'HeadTeacher') {
            topics.forEach(t => t.style.display = 'flex');
        }
    }, [auth.userStatus]);


    const date = new Date(props.lessonDate).toLocaleDateString();
    let lessonDate = 0;
    if (date.length < 10) {
        lessonDate += date
    } else {
        lessonDate = date
    }

    let presentAbsent;
    const studentId = auth.userStatus === 'student' || auth.userStatus === 'Supervisor' ? auth.userId : adminData.studentId;
    for (let id of props.presentStudents || []) {
        if (id === studentId) {
            presentAbsent = <i className="fas fa-check student__attendance-present"></i>
        }
    }
    for (let id of props.absentStudents || []) {
        if (id === studentId) {
            presentAbsent = <i className="fas fa-times student__attendance-absent"></i>
        }
    }

    let presentStudents;
    if (props.presentStudents) {
        presentStudents = props.presentStudents.map((student, index) => (
            <li key={student + index} className='student__li-present'>{student.name + ' ' + student.surname}</li>
        ))
    }
    let absentStudents;
    if (props.absentStudents) {
        absentStudents = props.absentStudents.map(student => (
            <li key={student.id + student} className='student__li-absent'>{student.name + ' ' + student.surname}</li>
        ))
    }

    let groupMembers = [];
    if (props.studentData) {
        for (let key of props.studentData) {
            groupMembers.push(
                {
                    name: key.name + " " + key.surname,
                    studentId: key.id,
                    email: key.email
                }
            )
        }
    }

    const updateTopicHandler = e => {
        const currentTopic = {
            topic: props.topic,
            homework: props.homework,
            lessonDate: props.lessonDate.slice(0, 10)
        }
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.loadData(groupMembers));
        dispatch(actions.updatedData(currentTopic));
        dispatch(actions.toggleModal('dataAdminModal'));
        dispatch(actions.infoTypeChange('updateCreateLesson'));
        dispatch(actions.idProvider(props.id, 'topicId', true));
    }

    const deleteTopicHandler = e => {
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.toggleModal('warningModal'));
        dispatch(actions.loadWarningModalPayload(
            {
                id: e.target.id,
                path: 'topics/' + e.target.id,
                type: 'topics',
                elementName: 'Usuń temat'
            }
        ));
    }

    return (
        <li className={`student__topic active-group-infodetails ${props.topicClass} ${props.topicGroup ? 'group-' + props.topicGroup : 'group-' + props.initialGrades} ${props.wrapDiv} ${(props.topicGroup === props.initialGrades || props.topicGroup === undefined) && 'initial-active-group-details'}`}>
            {auth.userStatus !== 'student' && props.showTopicOptions && <i onClick={updateTopicHandler} className="fas fa-pen topic__i-pen"></i>}
            <p className='student__paragraph-name'>Data lekcji: <span className='student__paragraph-desc'>{lessonDate}</span></p>
            <p className='student__paragraph-name'>Temat zajęć: <span className='student__paragraph-desc'>{props.topic}</span></p>
            {presentAbsent && <p className='student__paragraph-name'>Obecność: <span className='student__paragraph-desc'>{presentAbsent}</span></p>}
            <p className='student__paragraph-name'>Praca domowa: <span className='student__paragraph-desc'>{props.homework}</span></p>
            {(auth.userStatus === 'teacher' || (auth.userStatus === 'HeadTeacher' && path.includes('teacher'))) && <ol className={`student__attendance-list ${(auth.userStatus === 'student' || auth.userStatus === 'Supervisor') && 'student__attendance-list-invisible'}`}>Obecni:
                {presentStudents}
            </ol>}
            {(auth.userStatus === 'teacher' || (auth.userStatus === 'HeadTeacher' && path.includes('teacher'))) && <ol className={`student__attendance-list ${(auth.userStatus === 'student' || auth.userStatus === 'Supervisor') && 'student__attendance-list-invisible'}`}>Nieobecni:
                {absentStudents}
            </ol>}
            {(auth.userStatus === 'HeadTeacher' || auth.userStatus === 'teacher') && props.showTopicOptions && <i onClick={deleteTopicHandler} id={props.id} className="fas fa-trash-alt topic__i-trash"></i>}
        </li>
    );
}

export default Topics;