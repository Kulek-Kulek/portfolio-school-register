import React from 'react';
import { Link } from 'react-router-dom';

import StudentTopicList from './StudentTopicList';
import PaymentsList from './PaymentsList';
import Button from '../../../../Shared/Elements/Button/Button';
import StatAttendance from './StatAttendance';

import './StatGroup.css';

const StatGroup = props => {

    const topicsListButtonHandler = () => {
        const topicsList = document.querySelector('.statistics-report__topics-list');
        topicsList.classList.toggle('statistics-report__topics-list--acctive');
    }

    let topics = <h3>Brak danych</h3>;
    if (props.rawData && props.rawData.topics) {
        topics = props.rawData.topics.map(t => (
            <li key={t.id} className='statistics-report__data-item'>
                <div className='statistics-report__data-div'>
                    <span className='statistics-report__data-desc'>Data</span>
                    <span className='statistics-report__topic-date'>{new Date(t.lessonDate).toLocaleDateString().length < 10 ? '0' + new Date(t.lessonDate).toLocaleDateString() : new Date(t.lessonDate).toLocaleDateString()}
                    </span>
                </div>
                <div className='statistics-report__data-div'>
                    <span className='statistics-report__data-desc'>
                        Temat
                    </span>
                    <div className='statistics-report__topic-date'>
                        {t.topic}
                    </div>
                </div>
                <div className='statistics-report__data-div'>
                    <span className='statistics-report__data-desc'>Obecni</span>
                    <div className='statistics-report__topic-date'>
                        <StudentTopicList studentList={t.presentStudents} />
                    </div>
                </div>
                <div className='statistics-report__data-div'>
                    <span className='statistics-report__data-desc'>Nieobecni</span>
                    <div className='statistics-report__topic-date'>
                        <StudentTopicList studentList={t.absentStudents} />
                    </div>
                </div>
            </li>
        ));
    }

    let students = <h3>Brak danych</h3>;

    if (props.rawData && props.rawData.students) {
        students = props.rawData.students.map(s => (
            <li key={s.id} className='statistics-report__data-item'>
                <Link to={'/statistics/student/' + s.id} className='statistics-report__group-teacher-name'>
                    <span className='statistics-report__data-span'>{`${s.name} ${s.surname}`}
                    </span>
                </Link>
                <span className='statistics-report__data-heading-details'>{`tel. ${s.mobile}`}
                </span>
                <StatAttendance topicList={s.topics} studentId={s.id} />
                <PaymentsList financialRates={s.financialRates} invoices={s.invoices} />
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
                    <div className='statistics-report__report-name'>
                        <p className='statistics-report__report-heading'>Raport dla grupy <span className='statistics-report__report-group-name'>{props.rawData.name}</span></p>
                        <p className='statistics-report__group-teacher'>Lektor prowadzący:
                        {props.rawData.teacher && props.rawData.teacher[0] && <Link to={'/statistics/teacher/' + props.rawData.teacher[0].id} className='statistics-report__data-link statistics-report__data-link-teacher'>
                                <span className='statistics-report__group-teacher-name'>{`${props.rawData.teacher[0].name} ${props.rawData.teacher[0].surname}`}
                                </span>
                            </Link>}
                        </p>
                        <div className='statistics-report__report-sumup'>
                            <span>
                                {props.dateRangeFromTo ? "Od " + startDate + ' do ' + endDate : `Od początku roku do ${new Date().toLocaleDateString().length < 10 ? '0' + new Date().toLocaleDateString() : new Date().toLocaleDateString()}`}
                            </span>
                        </div>
                        <a href={process.env.REACT_APP_BACKEND_URL + 'statistics/download-report'} className='stat__download-report'>Pobierz .pdf</a>
                    </div>
                    <p className='statistics-report__ol-heading'>{`Lista słuchaczy - ${props.rawData.students && props.rawData.students.length}`}</p>
                    <ol className='statistics-report__ol statistics-report__students'>
                        {students}
                    </ol>
                    <div>
                        <p className='statistics-report__ol-heading'>{`Lista tematów - ${props.rawData.topics && props.rawData.topics.length}`}
                        </p>
                        <Button
                            btnText='Szczegóły'
                            classButton='statistics-report__details-btn statistics-report__topics-btn'
                            click={topicsListButtonHandler}
                        />
                    </div>
                    <ol className='statistics-report__ol statistics-report__topics-list'>
                        {topics}
                    </ol>
                </React.Fragment>
            }
        </div>
    );
}

export default StatGroup;