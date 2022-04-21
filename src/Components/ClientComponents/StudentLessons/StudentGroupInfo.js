import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import { AuthContext } from '../../../Shared/Context/auth-context';
import './StudentGroupInfo.css'


const StudentGroupInfo = props => {

    const auth = useContext(AuthContext);
    const adminData = useSelector(state => state.adminData);

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

    timetable = days.map((day, index) => <li className='student__group-timetable' key={day + index}>{`${day} od ${timeFrom[index]} do ${timeTo[index]}`}</li>);

    let attendance = [];
    if (props.attendance) {
        const studentId = auth.userStatus === 'student' || auth.userStatus === 'Supervisor' ? auth.userId : adminData.studentId;

        for (let topic of props.attendance) {
            for (let group of topic.group) {
                if (group === props.id) {
                    for (let present of topic.presentStudents) {
                        if (present === studentId) {
                            attendance.push(present)
                        }
                    }
                }
            }
        }
    }



    let lessonsLeft = props.courseLength - props.topics.length + ' lekcji';

    if (props.courseLength - props.topics.length <= 0) lessonsLeft = 'Kurs ukończony';

    return (
        <React.Fragment>
            <div className={`student__group-info student__group-timetable ${'group-' + props.id} ${props.divClass}`}>
                <p className='student__group-list'>{`Twoja grupa: ${props.name}`}</p>
                <p className='student__group-list'>Terminy zajęć:{timetable}</p>
                <p className='student__group-list'>{`Podręcznik:  ${props.courseBook ? props.courseBook : 'Brak danych'}`}</p>
            </div>
            <div className={`student__group-info student__group-details ${'group-' + props.id} ${props.divClass}`}>
                <p className='student__group-list'>{`Liczba godzin w kursie: ${props.courseLength} spotkań po ${props.lessonLength} minut.`}</p>
                <p className='student__group-list'>{`Do końca pozostało: ${lessonsLeft}`}</p>
                <p className='student__group-list'>{`Twoja frekwencja: ${props.topics.length > 0 ? ((attendance.length / props.topics.length) * 100).toFixed(2) : 0}%`}</p>
            </div>
            <div className={`student__course-progress-div student__course-progress-bar ${'group-' + props.id} ${props.divClass}`}>
                <label className='student__group-list student__progress-label' htmlFor="courseProgress">Zrealizowano {`${((props.topics && props.topics.length > 0 && props.topics.length / props.courseLength) * 100).toFixed(2)}% kursu`}</label>
                <progress className='student__course-progress' id="courseProgress" max="100" value={`${(props.topics.length / props.courseLength) * 100}`}></progress>
            </div>
        </React.Fragment >
    );
}

export default StudentGroupInfo;