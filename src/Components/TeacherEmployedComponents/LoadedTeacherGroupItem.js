import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Card from '../../Shared/Components/Card/Card';
import Button from '../../Shared/Elements/Button/Button';
import { AuthContext } from '../../Shared/Context/auth-context';
import * as actions from '../../store/actions/index';

import './LoadedTeacherGroupItem.css';

const LoadedTeacherGroupItem = props => {

    const dispatch = useDispatch();
    const auth = useContext(AuthContext);

    const currentPath = useLocation().pathname;

    let groupMembers = [];
    if (props.studentData) {
        for (let key of props.studentData) {
            groupMembers.push(
                {
                    name: key.surname + " " + key.name,
                    studentId: key.id,
                    email: key.email,
                    id: key.id
                }
            )
        }
    }

    groupMembers = groupMembers.sort((a, b) => b.name && a.name.localeCompare(b.name));
    const createLessonButtonHandler = e => {
        dispatch(actions.loadData(groupMembers));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.idProvider(e.target.id, 'groupId', true));
        dispatch(actions.infoTypeChange('createLesson'));
        dispatch(actions.toggleModal('dataAdminModal'));
    }

    let groupLeader;
    if (props.teacherData) {
        groupLeader = props.teacherData.map(t => (
            <div className='admin-main__populated-data-div' key={t.id}>
                <h4 className='admin-main__populated-data'>{'Lektor: ' + t.name + ' ' + t.surname}</h4>
            </div>
        ));
    };


    const days = [];
    const timeFrom = [];
    const timeTo = [];
    for (let i of Object.values(props.lessonDayTime)) {
        for (let d of Object.keys(i)) {
            if (i[d] === true) {
                days.push(d);
            }
            if (d.includes('Od')) {
                timeFrom.push(i[d]);
            }
            if (d.includes('Do')) {
                timeTo.push(i[d]);
            }
        }
    }

    let timetable;

    timetable = days.map((day, index) => <p className='admin-main__populated-data' key={day + index}>{`${day} od ${timeFrom[index]} do ${timeTo[index]}`}</p>);

    let topics;
    if (props.topics) {
        topics = props.topics.sort((a, b) => {
            if (a.lessonDate > b.lessonDate) return 1;
            if (a.lessonDate < b.lessonDate) return -1;
            return 0;
        });
    }

    const last3TopicsArray = topics.slice(-3).reverse();

    const last3Topics = last3TopicsArray.map((t, index) => (
        <div key={t.topic + index} className='admin-main__last3topics-div'>
            <span className='admin-main__populated-data admin-main__last3topics-number'>{`${props.topics.length - index < 10 ? '0' + (props.topics.length - index) : props.topics.length - index}.`}</span>
            <span className='admin-main__populated-data admin-main__last3topics-topic'>{t.topic}
            </span>
            <span className='admin-main__last3topics-date'>{new Date(t.lessonDate).toLocaleDateString().length < 10 ? '0' + new Date(t.lessonDate).toLocaleDateString() : new Date(t.lessonDate).toLocaleDateString()}</span>
        </div>));



    const addGradeHandler = (e) => {
        dispatch(actions.loadData(groupMembers));
        dispatch(actions.infoTypeChange('createGrade'));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.idProvider(e.target.id, 'groupId', true));
        dispatch(actions.toggleModal('dataAdminModal'));
    }

    const sendEmailMessageHandler = () => {
        let recipants = [];
        if (groupMembers && groupMembers.length > 0) {
            for (let student of groupMembers) {
                recipants.push({
                    id: student.id,
                    name: student.name,
                    email: student.email,
                })
            }
        }

        dispatch(actions.sendEmailMessage(
            {
                name: auth.userStatus === 'teacher' ? props.teacherData[0].name : 'Sekretariat',
                surname: auth.userStatus === 'teacher' ? props.teacherData[0].surname : 'Szkoły',
                email: auth.userStatus === 'teacher' ? props.teacherData[0].email : auth.userEmail
            },
            recipants));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.infoTypeChange('sendEmailMessage'));
        dispatch(actions.toggleModal('dataAdminModal'));
    }

    let lessonsLeft = props.courseLength - props.topics.length + ' lekcji';

    if (props.courseLength - props.topics.length <= 0) lessonsLeft = 'Kurs ukończony';

    return (
        <li className="admin-main__item teacher_groups-li">
            <Card className="admin-main__content admin-main__content-loadedTeacher">
                <div className="admin-main__info-div">
                    <h2 className='admin-main__h2'>{`Grupa ${props.name}`}</h2>
                    {groupLeader}
                    {<p className='admin-main__populated-data'>{`Kurs: ${props.courseLength} godz / ${props.lessonLength} min. Pozostało: ${lessonsLeft}`}</p>}
                    <p className='admin-main__populated-data'>Dni i godziny zajęć:</p>
                    {timetable}
                    <p className='admin-main__populated-data'>{`Certyfikat:  ${props.certificateType ? props.certificateType : 'Brak danych'}`}</p>
                    <p className='admin-main__populated-data'>{`Poziom:  ${props.groupLevel ? props.groupLevel : 'Brak danych'}`}</p>
                    <p className='admin-main__populated-data'>{`Podręcznik:  ${props.courseBook ? props.courseBook : 'Brak danych'}`}</p>
                </div>
                <div className='admin-main__students-div admin-main__topics-div'>
                    <p className='admin-main__populated-data admin-main__students-heading admin-main__topics-heading'>Ostatnie tematy:</p>
                    {last3Topics}
                </div>
                <div className='admin-main__i-wrapper teacher__groups-button-wrapper'>
                    <Link to={currentPath + '/' + props.id} >
                        <i className="fas fa-sliders-h teacher__groups-see-details"></i>
                    </Link>
                    <i id={props.id} className="fas fa-edit teacher__create-grade" onClick={addGradeHandler}></i>
                    <i className="fas fa-envelope teacher__send-email" onClick={sendEmailMessageHandler}></i>
                    <Button
                        btnText='utwórz lekcję'
                        classButton='teacher__groups-button'
                        click={createLessonButtonHandler}
                        id={props.id}
                    />
                </div>
            </Card>
        </li>
    );
}

export default LoadedTeacherGroupItem;