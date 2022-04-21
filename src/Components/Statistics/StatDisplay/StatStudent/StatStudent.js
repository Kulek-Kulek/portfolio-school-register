import React from 'react';
import { Link } from 'react-router-dom';

import StatStudentTopics from './StatStudentTopics';
import PaymentsList from '../StatGroup/PaymentsList';
import Button from '../../../../Shared/Elements/Button/Button';
import './StatStudent.css';

const StatStudent = props => {

    const topicsListButtonHandler = e => {
        const topicsList = document.getElementById('student-topics-list-' + e.target.id);
        topicsList.classList.toggle('statistics-report__topics-list--acctive');
    }

    const financeListButtonHandler = e => {
        const topicsList = document.getElementById('student' + e.target.id);
        topicsList.classList.toggle('statistics-report__topics-list--acctive');
    }

    let groupAndTeacher;
    if (props.rawData && props.rawData.group && props.rawData.group.length > 0) {
        groupAndTeacher = props.rawData.group.map(g => (
            <div key={g.id} className='statistics-report__group-teacher-div'>
                <span className='statistics-report__data-desc'>Grupa:
                    <Link to={'/statistics/group/' + g.id} className='statistics-report__group-teacher-name statistics-report__topic-date-margin'>{g.name}
                    </Link>
                </span>
                <span className='statistics-report__data-desc'>Lektor prowadzący:
                        <Link to={'/statistics/teacher/' + g.teacher[0].id} className='statistics-report__group-teacher-name statistics-report__topic-date-margin'>{`${g.teacher[0].name} ${g.teacher[0].surname}`}
                    </Link>
                </span>
                <div className='statistics-report__report-sumup'>
                    <span>Liczba godzin: {`${g.topics.length} / ${g.lessonLength} minut.`}</span>
                </div>
                <div>
                    <p className='statistics-report__ol-heading'>{`Lista tematów - ${props.rawData.topics && props.rawData.topics.length}`}

                    </p>
                    <Button
                        btnText='Szczegóły'
                        classButton='statistics-report__details-btn statistics-report__topics-btn'
                        id={'byGroup-' + g.id}
                        click={topicsListButtonHandler}
                    />
                </div>

                <ol className='statistics-report__ol statistics-report__ol-none-border statistics-report__topics-list' id={'student-topics-list-byGroup-' + g.id}>
                    <StatStudentTopics topics={g.topics} studentId={props.rawData.id} />
                </ol>
            </div>
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
                        <span className='statistics-report__range-dates'>
                            {props.dateRangeFromTo ? "Od " + startDate + ' do ' + endDate : `Od początku roku do ${new Date().toLocaleDateString().length < 10 ? '0' + new Date().toLocaleDateString() : new Date().toLocaleDateString()}`}
                        </span>
                        <p className='statistics-report__report-heading'>
                            Raport ucznia
                            <span className='statistics-report__report-group-name'>
                                {`${props.rawData.name} ${props.rawData.surname}`}
                            </span>
                        </p>
                        <p className='statistics-report__data-desc'>Email:
                            <span className='statistics-report__topic-date      statistics-report__topic-date-margin'>
                                {props.rawData.email || 'Brak danych'}
                            </span>
                        </p>
                        <p className='statistics-report__data-desc'>Telefon:
                            <span className='statistics-report__topic-date statistics-report__topic-date-margin'>
                                {props.rawData.mobile || 'Brak danych'}
                            </span>
                        </p>
                        <p className='statistics-report__data-desc'>Ulica:
                            <span className='statistics-report__topic-date statistics-report__topic-date-margin'>
                                {props.rawData.address ? (props.rawData.address.street || '') + ' ' + (props.rawData.address.placeNumber || '') : 'Brak danych'}
                            </span>
                        </p>
                        <p className='statistics-report__data-desc'>Miejscowość:
                            <span className='statistics-report__topic-date statistics-report__topic-date-margin'>
                                {props.rawData.address ? (props.rawData.address.zipcode || '') + ' ' + (props.rawData.address.city || '') : 'Brak danych'}
                            </span>
                        </p>
                        {groupAndTeacher}
                        <div>
                            <p className='statistics-report__ol-heading'>Rozliczenia finansowe
                        <i className="fas fa-piggy-bank statistics-report__piggy-bank"></i>
                            </p>
                            <Button
                                btnText='Szczegóły'
                                classButton='statistics-report__details-btn statistics-report__topics-btn'
                                id={'-finance-report' + props.rawData.id}
                                click={financeListButtonHandler}
                            />
                        </div>
                        <div className='statistics-report__data-desc statistics-report__topics-list' id={'student-finance-report' + props.rawData.id}>
                            <PaymentsList financialRates={props.rawData.financialRates} invoices={props.rawData.invoices} />
                        </div>
                    </div>
                </React.Fragment>
            }
        </div>
    );
}

export default StatStudent;