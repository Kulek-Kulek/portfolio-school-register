import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StudentGroupInfo from './StudentGroupInfo';
import Topic from '../../SharedComponents/Topics';
import Grade from '../../SharedComponents/Grade';
import EndTermGrades from '../../SharedComponents/EndTermGrades';
import Button from '../../../Shared/Elements/Button/Button';
import DataAdminModal from '../../../Shared/Components/Modal/ErrorModal';
import zoom from '../../../images/logos/zoom-logo.png';
import manImg from '../../../images/man-face.jpg';
import womanImg from '../../../images/woman-face.jpg';
import { changeActiveStudentGroup } from './changeActiveStudentGroup';
import { AuthContext } from '../../../Shared/Context/auth-context';
import * as actions from '../../../store/actions/index';
import './StudentsLessons.css';


const StudentLessons = props => {

    const auth = useContext(AuthContext);

    const adminData = useSelector(state => state.adminData);

    const dispatch = useDispatch();

    const schoolYearSchedlue = adminData.appSettings[0].schoolYearSchedlue;

    const [buttonClicked, setButtonClicked] = useState();

    const [certIsReady, setCertIsReady] = useState(false);

    useEffect(() => {
        if (props.groups) {
            const groupChangeButton = document.querySelector('.student__group-nav-btn-initial');
            const activeGroupDeatails = [...document.querySelectorAll('.initial-active-group-details')];
            const groupTeacher = document.querySelector('.active-group');

            if (groupChangeButton) {
                groupChangeButton.classList.add('student__group-nav-btn--active');

            }
            if (groupTeacher) {
                groupTeacher.classList.add('student__single-course--active');
            }
            activeGroupDeatails.forEach(item => item.classList.add('student__group-info--active'));
        }

    }, [props.groups]);

    useEffect(() => {
        let initialId;
        if (props.groups && props.groups.length > 0) {
            initialId = props.groups[0].id;
            setButtonClicked(initialId);
        }


        if (props.certificateIsAvailable && props.certificateIsAvailable.group && props.certificateIsAvailable.group[0] && props.certificateIsAvailable.group[0].teacher) {

            const certTeacher = props.certificateIsAvailable.group[0].teacher.length > 0 && props.certificateIsAvailable.group[0].teacher[0].name + ' ' + props.certificateIsAvailable.group[0].teacher[0].surname;
            let certCertificateType = props.certificateIsAvailable.group[0].certificateType;
            let certGroupLevel = props.certificateIsAvailable.group[0].groupLevel;
            const certSchoolYear = props.certificateIsAvailable.group[0].schoolYear;
            const certCourseLength = props.certificateIsAvailable.group[0].courseLength;
            let certGrade = false;

            if (props.certificateIsAvailable && props.certificateIsAvailable.grade) {
                for (let g of props.certificateIsAvailable.grade) {
                    if (g.groupId === initialId) {
                        certGrade = true;
                    }
                }
            }

            if (certGroupLevel && certGroupLevel === 'false') {
                certGroupLevel = false;
            }
            if (certCertificateType && certCertificateType === 'false') {
                certCertificateType = false;
            }

            if (certTeacher && certCertificateType && certGroupLevel && certSchoolYear && certCourseLength && certGrade) {
                setCertIsReady(true);
            } else {
                setCertIsReady(false);
            }
        }
    }, [props.groups, props.certificateIsAvailable]);

    const sendMessageHandler = e => {
        e.preventDefault();
        dispatch(actions.sendEmailMessage(
            {
                name: props.studentName,
                surname: props.studentSurname,
                email: props.studentEmail
            },
            [{
                id: e.target.id,
                email: e.target.id,
                name: e.target.name
            }]));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.infoTypeChange('sendEmailMessage'));
        dispatch(actions.toggleModal('dataAdminModal'));
    }

    const changeStudentGroupHandler = e => {
        setButtonClicked(e.target.id);
        changeActiveStudentGroup(e);

        let certGrade = false;
        let certTeacher;
        let certCertificateType;
        let certGroupLevel;
        let certSchoolYear;
        let certCourseLength;

        if (props.certificateIsAvailable && props.certificateIsAvailable.grade) {
            for (let g of props.certificateIsAvailable.grade) {
                if (g.groupId === e.target.id) {
                    certGrade = true;
                }
            }
        }

        if (props.certificateIsAvailable && props.certificateIsAvailable.group) {
            for (let g of props.certificateIsAvailable.group) {
                if (g.id === e.target.id) {
                    certCourseLength = g.courseLength;
                    certGroupLevel = g.groupLevel;
                    certSchoolYear = g.schoolYear;
                    certCertificateType = g.certificateType;
                    certTeacher = g.teacher[0].name + ' ' + g.teacher[0].surname;
                }
            }
        }
        if (certGroupLevel && certGroupLevel === 'false') {
            certGroupLevel = false;
        }
        if (certCertificateType && certCertificateType === 'false') {
            certCertificateType = false;
        }
        if (certTeacher && certCertificateType && certGroupLevel && certSchoolYear && certCourseLength && certGrade) {
            setCertIsReady(true);
        } else {
            setCertIsReady(false);
        }
    }

    const toggleGradeListHandle = (e) => {
        const gradeList = document.getElementById(e.target.id + '-grade-list');
        gradeList.classList.toggle('group-details__list--active');
    }

    let studentGroupInfo;
    if (props.groups) {
        studentGroupInfo = props.groups.map((group, index) => (
            <StudentGroupInfo
                key={group.id}
                name={group.name}
                teacherData={group.teacher}
                lessonDayTime={group.lessonDayTime}
                studentData={group.students}
                courseLength={group.courseLength}
                lessonLength={group.lessonLength}
                topics={group.topics}
                attendance={props.topics}
                courseBook={group.courseBook}
                id={group.id}
                divClass={`active-group-infodetails ${group - + group.id} ${index === 0 && 'initial-active-group-details'}`}
            />
        ))
    }

    let topics;

    if (props.topics && props.topics.length > 1) {

        const groupTopics = props.topics.filter(t => t.group[0] === buttonClicked)

        if (groupTopics && groupTopics.length > 0) {
            groupTopics.sort((a, b) => {
                if (a.lessonDate > b.lessonDate) return -1;
                if (a.lessonDate < b.lessonDate) return 1;
                return 0;
            });
        }
        topics = groupTopics.map(topic => (
            <Topic
                key={topic.id}
                topic={topic.topic}
                lessonDate={topic.lessonDate}
                creationDate={topic.creationDate}
                presentStudents={topic.presentStudents}
                absentStudents={topic.absentStudents}
                homework={topic.homework}
                initialGrades={props.groups && props.groups[0] && props.groups[0].id}
                topicGroup={topic.group}
                showTopicOptions={false}
            />
        ));
    }



    let teachers;
    if (props.groups) {
        teachers = props.groups.map((g, index) => g.teacher.map(t => (
            <li
                key={t.id}
                className={`student__courses-teacher active-group ${'teacher-group-' + props.groups[index].id}`}>
                <div className='student__courses-teacher-data'>
                    <p>{t.name + ' ' + t.surname}</p>
                    <div className='student__profileImg-div group-details__student-img-div'>
                        <img
                            className={'student__profileImg-img'}
                            src={t.profileImage ? t.profileImage.location : (t.name && t.name.trim().slice(-1) === 'a' ? womanImg : manImg)} alt='teacher-img'
                        />
                    </div>
                </div>
                <Button
                    btnText='Wyślij wiadomość'
                    classButton='student__button-send-teacher-message'
                    id={t.email}
                    name={t.surname + ' ' + t.name}
                    click={sendMessageHandler}
                />
                <a className='student__courses-teacher zoom-link-wrapper' href={t.zoom.link} target="_blank" rel="noopener noreferrer">
                    <img className='student__teacher-zoom-link' src={zoom} alt='zoom-logo' />
                </a>
                <p className='zoom-details'>Meeting Id: {t.zoom.meetingId}</p>
                <p className='zoom-details'>Password: {t.zoom.password}</p>
            </li>)))
    }

    let loggedStudentGrades = [];
    if (props.grades && props.grades.length > 0) {
        const studentId = auth.userStatus === 'student' || auth.userStatus === 'Supervisor' ? auth.userId : adminData.studentId;

        const groupGrades = props.grades.filter(g => g.group[0] === buttonClicked);

        for (let grade of groupGrades) {
            for (let g of grade.grades) {
                if (g.studentId === studentId) {
                    loggedStudentGrades.push({
                        'name': g.name.value,
                        'grade': g.grade,
                        'id': grade.id,
                        'updatedGrade': g.updatedGrade,
                        'createdBy': g.createdBy,
                        'gradeDesc': g.gradeDesc,
                        'creationDate': grade.creationDate,
                        'teacher': grade.createdBy ? (grade.createdBy.name + ' ' + grade.createdBy.surname) : 'Administrator',
                        'groupId': grade.group
                    })
                }
            }
        }
    }

    let studentGroupNavClasses = ['student__group-nav', 'student__group-nav--active'];


    let studentGroups;
    if (props.groups) {
        studentGroups = props.groups.map(group => (
            <li
                key={group.id}
                className='student__group-nav-item'>
                <Button
                    btnText={group.name}
                    classButton='student__group-nav-btn student__group-nav-btn-initial'
                    id={group.id}
                    disabled={(buttonClicked === group.id) ? true : false}
                    click={changeStudentGroupHandler}
                />
            </li>
        ))
    }



    const secondTerm = [];
    if (loggedStudentGrades.length > 0) {
        for (let grade of loggedStudentGrades) {
            if (new Date(grade.creationDate) >= new Date(schoolYearSchedlue.firstTermEnd)) {
                secondTerm.push(grade);
            }
        }
    }


    let certStudentData;

    let certMessage = 'Ups, czegoś nam tutaj brakuje! Twój certyfikat jest prawie gotowy, ale do jego wystawienia potrzebujemy takich danych, jak: imię, nazwisko, miejsce urodzenia, data urodzenia. Wygląda na to, że jeszcze nie uzupełniłeś wszystkich informacji. Wejdź w zakładkę obok - "O Tobie" i kliknij "Aktualizuj". Potem tutaj wróć i pobierz swój certyfikat klikając w jego ikonę.';

    if (!certIsReady) {
        certMessage = 'Pobierz stąd swój certyfikat gdy tylko będzie on dostępny.';
    }

    if (props.certificateIsAvailable.name && props.certificateIsAvailable.surname && props.certificateIsAvailable.birthda && props.certificateIsAvailable.birthplace && certIsReady) {
        certMessage = 'Twój certyfikat jest gotowy. Możesz go pobrać klikając w niebieską ikonę obok.';
        certStudentData = true;
    }

    let allFinancialDocsPaid = true;

    // if (props.certificateIsAvailable && props.certificateIsAvailable.financialRates && props.certificateIsAvailable.invoices && certIsReady) {
    //     const allFinancialDocs = props.certificateIsAvailable.financialRates.concat(props.certificateIsAvailable.invoices);
    //     for (let doc of allFinancialDocs) {
    //         if (doc.invoiceStatus !== 'paid' || doc.documentStatus !== 'paid') {
    //             allFinancialDocsPaid = false;
    //         }
    //     }
    // }

    if (!allFinancialDocsPaid) {
        certMessage = 'Ups, coś tu zalega. Wygląda na to, że nie masz jeszcze opłaconych wszystkich zobowiązań finansowych. Ureguluj należoności, żeby móc pobrać swój certyfikat.';
    }


    let certDescClasses = ['student__certificate-desc'];
    if ((certIsReady && !allFinancialDocsPaid) || (certIsReady && !certStudentData)) {
        certDescClasses = ['student__certificate-desc', 'student__certificate-desc-warning']
    }

    return (
        <div className='student__infotype-type'>
            <DataAdminModal />
            <nav className={`student__group-nav ${props.groups && props.groups.length > 1 && studentGroupNavClasses.join(' ')}`}>
                <ul className='student__group-nav-list'>
                    {studentGroups}
                </ul>
            </nav>
            <section className='student__general-info-section'>
                <ul className='student__teacher-list'>
                    <span>Lektor prowadzący</span>
                    {teachers}
                </ul>
                {studentGroupInfo}
            </section>
            <section className='student__certificate'>
                <p className='student__grades-heading'>Twoje certyfikaty i świadectwa</p>
                <div className='student__certificate-div'>
                    <a href={process.env.REACT_APP_BACKEND_URL + 'certificates/' + auth.userId + '/' + buttonClicked} className={`${certStudentData && allFinancialDocsPaid ? 'student__certificates-a student__certificates-a--active' : 'student__certificates-a'}`}>
                        <i className="fas fa-file-alt"></i>
                    </a>
                    <p className={certDescClasses.join(' ')}>{certMessage}</p>
                </div>
            </section>
            <section className='student__grades-section'>
                <p className='student__grades-heading'>{auth.userStatus === 'student' ? 'Twoje oceny' : 'Oceny ucznia'}</p>
                <div className='group-details__term-div student__term-div'>
                    <p className='group-details__term-span student__term-span'>Oceny - semestr pierwszy
                        <Button
                            id='first-term'
                            classButton='group-details__term-details-btn'
                            btnText='Szczegóły'
                            click={toggleGradeListHandle}
                        />
                    </p>
                    <div id='first-term-grade-list'>
                        <Grade
                            grade={loggedStudentGrades.filter(grade => new Date(grade.creationDate) <= new Date(schoolYearSchedlue.firstTermEnd))}
                            status='student'
                            wrapDiv='student__grade'
                            studentGrade='student__student-grade'
                            initialGrades={props.groups && props.groups.length > 0 && props.groups[0].id}
                        />
                    </div>
                    {props.endTermGrades && props.endTermGrades.length > 0 && <div className='student__end-term-grades'>
                        <EndTermGrades endTermGrades={props.endTermGrades.filter(grade => grade.endTermGradeType.includes('pierwszy'))} />
                    </div>}
                </div>
                {secondTerm.length > 0 && <div className='group-details__term-div student__term-div'>
                    <p className='group-details__term-span student__term-span'>Oceny - semestr drugi
                        <Button
                            id='second-term'
                            classButton='group-details__term-details-btn'
                            btnText='Szczegóły'
                            click={toggleGradeListHandle}
                        />
                    </p>
                    <div id='second-term-grade-list'>
                        <Grade
                            grade={loggedStudentGrades.filter(grade => new Date(grade.creationDate) >= new Date(schoolYearSchedlue.firstTermEnd))}
                            status='student'
                            wrapDiv='student__grade'
                            studentGrade='student__student-grade'
                            initialGrades={props.groups && props.groups.length > 0 && props.groups[0].id}
                        />
                    </div>
                    {props.endTermGrades && props.endTermGrades.length > 0 && <div className='student__end-term-grades'>
                        <EndTermGrades endTermGrades={props.endTermGrades.filter(grade => !grade.endTermGradeType.includes('pierwszy'))} />
                    </div>}
                </div>}
            </section >
            <section className='student__lesson-section'>
                <p className='student__grades-heading'>Zrealizowane tematy</p>
                <ul className='student__topic-list'>
                    {topics}
                </ul>
            </section>
        </div>
    );
}

export default StudentLessons;