import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import StudentTopicList from '../StatGroup/StudentTopicList';
import StatGroupsByLessonLength from './StatGroupsByLessonLength';
import Button from '../../../../Shared/Elements/Button/Button';
import { AuthContext } from '../../../../Shared/Context/auth-context';
import './StatTeacher.css';

const StatTeacher = props => {

    const auth = useContext(AuthContext);

    const groupsByLessonLengthButtonHandler = (e) => {
        const groupList = document.getElementById('groups-by-lesson-length-' + e.target.id);
        groupList.classList.toggle('statistics-report__groups-list--active');
    }

    const topicsByGroupsButtonHandler = (e) => {
        const topicList = document.getElementById('group-' + e.target.id);
        topicList.classList.toggle('report-dispaly-none--active');
    }

    let typeOfGroup;
    const lessonLengthTypes = [];
    const groupsByLessonLength = [];
    const totalNumberOfTopicsByLessonLength = [];
    let currentAndPastTeacherGroups = [];

    if (props.rawData && (props.rawData.group || props.rawData.pastGroup)) {
        const pastTeacherGroups = props.rawData.pastGroup ? props.rawData.pastGroup : [];
        if (pastTeacherGroups.length > 0) {
            for (let pastGroup of pastTeacherGroups) {
                pastGroup.isPast = true;
            }
        }

        currentAndPastTeacherGroups = props.rawData.group.concat(pastTeacherGroups);

        for (let group of currentAndPastTeacherGroups) {
            if (lessonLengthTypes.length === 0) {
                lessonLengthTypes.push(group.lessonLength);
            }
            let index = lessonLengthTypes.indexOf(group.lessonLength);
            if (lessonLengthTypes.length > 0 && index === -1) {
                lessonLengthTypes.push(group.lessonLength);
            }
        }

        for (let type of lessonLengthTypes) {
            let groupType = [];
            for (let group of currentAndPastTeacherGroups) {
                if (group.lessonLength === type) {
                    groupType.push(group);
                }
            }
            groupsByLessonLength.push(groupType);
        }
    }

    for (let groupsLength of groupsByLessonLength) {
        let topics = [];
        for (let groups of groupsLength) {
            const teacherTopics = groups.topics.filter(teacherTopic => teacherTopic.createdBy === props.rawData.id);
            topics.push(teacherTopics.length);
        }
        totalNumberOfTopicsByLessonLength.push(topics.reduce((p, c) => {
            return p + c
        }));
    }

    let totalNumberOf45MinuteLessons = [];
    for (let index in lessonLengthTypes) {
        totalNumberOf45MinuteLessons.push(lessonLengthTypes[index] * totalNumberOfTopicsByLessonLength[index] / 45);
    }
    let teacherWorkingHours;
    if (totalNumberOf45MinuteLessons.length > 0) {
        teacherWorkingHours = totalNumberOf45MinuteLessons.reduce((p, c) => {
            return p + c
        });
    }

    typeOfGroup = lessonLengthTypes.map((type, index) => (
        <div key={type} className='statistics-report__data-desc statistics-report__teacher-groups-by-length'>
            <p className='statistics-report__data-span'>
                {`Grupy ${type} minutowe - ${groupsByLessonLength[index].length}`}
                <Button
                    btnText='Szczegóły'
                    classButton='statistics-report__details-btn statistics-report__data-btn-float'
                    id={type}
                    click={groupsByLessonLengthButtonHandler}
                />
            </p>
            <span>{`Zrealizowanych tematów: ${totalNumberOfTopicsByLessonLength[index]}`}</span>
            <StatGroupsByLessonLength
                groupsByLessonLength={groupsByLessonLength[index]}
                id={type}
                teacherId={props.rawData.id}
            />
        </div>
    ));

    let groups = <h3>Brak danych</h3>;

    if (props.rawData && props.rawData.group) {
        groups = currentAndPastTeacherGroups.map(g => (
            <li key={g.id} className='statistics-report__data-item'>
                {auth.userStatus === 'HeadTeacher' ? <Link to={'/statistics/group/' + g.id} className={`statistics-report__data-link ${g.isPast && 'statistics-report__data-desc-past'}`}>
                    <span className='statistics-report__data-span'>{`${g.name}`}
                        {g.isPast && <span className='statistics-report__span-past'>( Grupa historyczna )</span>}
                    </span>
                </Link> :
                    <span className={`statistics-report__data-span ${g.isPast && 'statistics-report__data-desc-past'}`}>{`${g.name}`}
                        {g.isPast && <span className='statistics-report__span-past'>( Grupa historyczna )</span>}
                    </span>
                }
                <Button
                    btnText='Szczegóły'
                    classButton='statistics-report__details-btn statistics-report__data-btn-float'
                    id={g.id}
                    click={topicsByGroupsButtonHandler}
                />
                <div className='statistics-report__data-div statistics-report__data-div-column'>
                    <span className='statistics-report__data-desc'>{`Długość lekcji: ${g.lessonLength} minut`}
                    </span>
                    <span className='statistics-report__data-desc'>{`Uczniowie (${g.students.length})`}</span>
                    <div className='statistics-report__topic-date'>
                        <StudentTopicList studentList={g.students} />
                    </div>
                </div>
                <div className='statistics-report__data-div statistics-report__data-div-block'>
                    <span className='statistics-report__data-desc'>{`Zrealizowane godziny - ${(g.topics.filter(topic => topic.createdBy === props.rawData.id)).length}`}</span>
                    <div className='statistics-report__topic-date report-dispaly-none' id={'group-' + g.id}>
                        <StudentTopicList topicList={g.topics.filter(topic => topic.createdBy === props.rawData.id)} />
                    </div>
                </div>
            </li>
        ));
    }


    let startDate;
    let endDate;
    if (props.dateRangeFromTo) {
        startDate = new Date(props.dateRangeFromTo.startDate).toLocaleDateString().length < 10 ? '0' + new Date(props.dateRangeFromTo.startDate).toLocaleDateString() : new Date(props.dateRangeFromTo.startDate).toLocaleDateString();
        endDate = new Date(props.dateRangeFromTo.endDate).toLocaleDateString().length < 10 ? '0' + new Date(props.dateRangeFromTo.endDate).toLocaleDateString() : new Date(props.dateRangeFromTo.endDate).toLocaleDateString();
    }

    return (
        <div className='statistics-report'>
            {props.rawData &&
                <React.Fragment>
                    <div className='statistics-report__report-sumup'>
                        <span className='stat-repoert__date-range'>
                            {props.dateRangeFromTo ? "Od " + startDate + ' do ' + endDate : `Od początku roku do ${new Date().toLocaleDateString().length < 10 ? '0' + new Date().toLocaleDateString() : new Date().toLocaleDateString()}`}
                        </span>
                        {/* <a href={process.env.REACT_APP_BACKEND_URL + 'download-pdf-report'} className='stat__download-report'>
                            Pobierz .pdf
                        </a> */}
                    </div>
                    <div className='statistics-report__report-name'>
                        <div className='statistics-report__report-heading'>
                            <p>Podsumowanie pracy lektora </p>
                            <p className='statistics-report__report-group-name'>
                                {`${props.rawData.name} ${props.rawData.surname}`}
                            </p>
                        </div>
                        <span className='statistics-report__total-hours'>
                            {`Wszystkie godziny w ujęciu 45 minutowym - ${teacherWorkingHours ? teacherWorkingHours.toFixed(2) : 'Brak danych'}`}
                        </span>
                        <div>
                            {typeOfGroup}
                        </div>
                    </div>
                    <p className='statistics-report__ol-heading'>Lista prowadzonych grup - {`${props.rawData.group && props.rawData.group.length}`}</p>
                    <ol className='statistics-report__ol statistics-report__students'>
                        {groups}
                    </ol>
                </React.Fragment>
            }
        </div>
    );
}

export default StatTeacher;