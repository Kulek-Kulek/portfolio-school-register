import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../Shared/Elements/Button/Button';
import Spinner from '../../Shared/Elements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../Shared/Components/Modal/ErrorModal';
import WarningModal from '../../Shared/Components/Modal/WarningModal';
import Topics from '../SharedComponents/Topics';
import Grade from '../SharedComponents/Grade';
import EndTermGrades from '../SharedComponents/EndTermGrades';
import DataAdminModal from '../../Shared/Components/Modal/DataAdminModal';
import manImg from '../../images/man-face.jpg';
import womanImg from '../../images/woman-face.jpg';

import { useHttpClient } from '../../Shared/Hooks/http-hook';
import * as actions from '../../store/actions/index';

import './SingleGroupDetails.css';


const SingleGroupDetails = props => {

    const groupId = useParams().groupId;
    const userId = useParams().userId;
    const history = useHistory();
    const dispatch = useDispatch();
    const schoolYearSchedlue = useSelector(state => state.adminData.appSettings[0].schoolYearSchedlue);

    const endTermGradesUpdated = useSelector(state => state.adminData.loadData);

    const loadedGroupTopics = useSelector(state => state.adminData.loadedData);

    const [loadedData, setLoadedData] = useState();
    const [loadedTopics, setLoadedTopics] = useState([]);
    const [errorModalActive, setErrorModalActive] = useState(false);
    const { loading, sendRequest, error, clearError } = useHttpClient();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `groups/group/${groupId}`);
                setLoadedData(responseData.group);
                dispatch(actions.loadedData(responseData.group.topics));
            } catch (err) {
                dispatch(actions.toggleBackdrop(true));
                setErrorModalActive(true);
            }
        }
        fetchData();
    }, [sendRequest, groupId, dispatch]);


    useEffect(() => {
        if (Object.keys(endTermGradesUpdated).length > 0 && endTermGradesUpdated.constructor === Object) {
            setLoadedData(endTermGradesUpdated);
        }
    }, [endTermGradesUpdated]);



    useEffect(() => {
        setLoadedTopics(loadedGroupTopics);
    }, [loadedGroupTopics]);

    // useEffect(() => {
    //     dispatch(actions.loading(loading));
    // }, [dispatch, loading]);


    const termEndBtnHandler = e => {
        let options = ['Ocena proponowana - pierwszy semestr', 'Ocena za pierwszy semestr', 'Ocena końcowa'];
        let studentId = e.target.id.split('_').pop();
        if (e.target.id.includes('second-term-grade')) {
            options = ['Ocena proponowana - drugi semestr', 'Ocena za drugi semestr', 'Ocena końcowa'];
        }
        dispatch(actions.loadData(options));
        dispatch(actions.infoTypeChange('createTermEndGrade'));
        dispatch(actions.toggleBackdrop(true));
        dispatch(actions.idProvider(studentId, 'studentId'));
        dispatch(actions.idProvider(groupId, 'groupId', true));
        dispatch(actions.toggleModal('dataAdminModal'));
        window.scrollTo(0, 50);
    }


    let singleStudentGrades = []
    if (loadedData && loadedData.students) {
        for (let student of loadedData.students) {
            singleStudentGrades.push({
                id: student.id,
                name: student.name,
                surname: student.surname,
                location: student.profileImage && student.profileImage.location,
                grades: [],
                endTermGrades: student.endTermGrades
            })
            for (let grade of student.grades) {
                for (let g of grade.grades) {
                    for (let teacher of loadedData.teacher) {
                        if (g.studentId === student.id && g.createdBy === teacher) {
                            for (let sg of singleStudentGrades) {
                                if (sg.id === g.studentId) {
                                    sg.grades.push({
                                        'name': g.name.value,
                                        'grade': g.grade,
                                        'id': grade.id,
                                        'updatedGrade': g.updatedGrade,
                                        'gradeDesc': g.gradeDesc,
                                        'creationDate': grade.creationDate,
                                        'teacher': grade.createdBy && (grade.createdBy.name + ' ' + grade.createdBy.surname),
                                        'term': new Date(grade.creationDate) >= new Date(schoolYearSchedlue.firstTermEnd) ? 'first' : 'second'
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }



    const secondTerm = [];
    if (singleStudentGrades.length > 0) {
        for (let student of singleStudentGrades) {
            for (let grade of student.grades) {
                if (new Date(grade.creationDate) >= new Date(schoolYearSchedlue.firstTermEnd)) {
                    secondTerm.push(grade);
                }
            }
        }
    }



    let firstTermStudents;
    if (singleStudentGrades) {
        firstTermStudents = singleStudentGrades.map((student, index) => (
            <li key={student.id} className='group-details__single-student'>
                <div className='group-details__student-name'>
                    <div className='group-details__student-wrap'>
                        <p>
                            <span className='group-details__student-number'>{index + 1 + '. '}
                            </span>
                            {student.name + ' ' + student.surname}
                        </p>
                        <div className='student__profileImg-div group-details__student-img-div'>
                            <img src={student.location ? student.location : (student.name && student.name.trim().slice(-1) === 'a' ? womanImg : manImg)} alt='student-img' className={'student__profileImg-img'} />
                        </div>
                    </div>
                    <div className='group-details__term-grades-div'>
                        <Grade
                            grade={student.grades.filter(grade => new Date(grade.creationDate) <= new Date(schoolYearSchedlue.firstTermEnd))}
                            studentId={student.id} />
                    </div>
                    {student.endTermGrades
                        && student.endTermGrades.filter(grade => grade.endTermGradeType.includes('pierwszy')).length > 0 && <div className='student__end-term-grades'>
                            <EndTermGrades endTermGrades={student.endTermGrades.filter(grade => grade.endTermGradeType.includes('pierwszy') && grade.groupId === groupId)} />
                        </div>}
                    <Button
                        classButton='group-details__term-end-btn'
                        btnText='Ocena proponowana/semestralna'
                        id={'first-term-grade_' + student.id}
                        click={termEndBtnHandler}
                    />
                </div>
            </li >
        ));
    }

    let secondTermStudents;
    if (singleStudentGrades) {
        secondTermStudents = singleStudentGrades.map((student, index) => (
            <li key={student.id} className='group-details__single-student'>
                <div className='group-details__student-name'>
                    <div className='group-details__student-wrap'>
                        <p>
                            <span className='group-details__student-number'>{index + 1 + '. '}
                            </span>
                            {student.name + ' ' + student.surname}
                        </p>
                        <div className='student__profileImg-div group-details__student-img-div'>
                            <img src={student.location ? student.location : (student.name && student.name.trim().slice(-1) === 'a' ? womanImg : manImg)} alt='student-img' className={'student__profileImg-img'} />
                        </div>
                    </div>
                    <div className='group-details__term-grades-div'>
                        <Grade
                            grade={student.grades.filter(grade => new Date(grade.creationDate) >= new Date(schoolYearSchedlue.firstTermEnd))}
                            studentId={student.id} />
                    </div>
                    <div className='student__end-term-grades'>
                        <EndTermGrades endTermGrades={student.endTermGrades.filter(grade => !grade.endTermGradeType.includes('pierwszy') && grade.groupId === groupId)} />
                    </div>
                    <Button
                        classButton='group-details__term-end-btn'
                        btnText='Ocena proponowana/semestralna/końcowa'
                        click={termEndBtnHandler}
                        id={'second-term-grade_' + student.id}
                    />
                </div>
            </li >
        ));
    }

    let topics;
    if (loadedTopics) {
        if (loadedTopics.length > 1) {
            topics = loadedTopics.sort((a, b) => {
                if (a.lessonDate > b.lessonDate) return -1;
                if (a.lessonDate < b.lessonDate) return 1;
                return 0;
            });
        }

        if (loadedTopics && loadedTopics.length > 0) {
            topics = loadedTopics.map(topic => (
                <Topics
                    key={topic.id}
                    id={topic.id}
                    topic={topic.topic}
                    lessonDate={topic.lessonDate}
                    creationDate={topic.creationDate}
                    absentStudents={topic.absentStudents}
                    presentStudents={topic.presentStudents}
                    homework={topic.homework}
                    topicClass='group-details__topic-li'
                    studentData={loadedData.students}
                    groupId={loadedData.id}
                    showTopicOptions={true}
                />
            ))
        }
    }

    const errorModalCancelHandler = () => {
        setErrorModalActive(false);
        clearError();
        dispatch(actions.toggleBackdrop(false));
        history.goBack();
    }

    const backtogroupsButtonHandler = () => {
        history.goBack();
        dispatch(actions.loadedData(null));
        dispatch(actions.loadedData(null));
        dispatch(actions.idProvider(userId, 'teacherId'));
    }

    const toggleGradeListHandle = (e) => {
        const gradeList = document.getElementById(e.target.id + '-grade-list');
        gradeList.classList.toggle('group-details__list--active');
    }


    return (
        <React.Fragment>
            <Button
                btnText='Powrót'
                classButton='group-details__backtogroups-button'
                click={backtogroupsButtonHandler}
            />
            <div className='group-details'>
                <DataAdminModal />
                <WarningModal />
                {loading ? <Spinner /> : (
                    errorModalActive ? <ErrorModal
                        class='error-modal--active'
                        errorMessage={error}
                        errorHeaderMessage='Ups. Coś poszło nie tak.'
                        btnText='Zamknij'
                        click={errorModalCancelHandler} /> :
                        <React.Fragment>
                            <h2 className='group-details__gropu-name'>
                                Grupa <span className='group-details__group-name-span'>
                                    {loadedData && loadedData.name}
                                </span>
                            </h2>
                            <h3 className='group-details__heading-students'>Uczniowie i oceny</h3>
                            <div className='group-details__term-div'>
                                <p className='group-details__term-span'>Oceny - semestr pierwszy
                                    <Button
                                        id='first-term'
                                        classButton='group-details__term-details-btn'
                                        btnText='Szczegóły'
                                        click={toggleGradeListHandle}
                                    />
                                </p>
                                <ul className={`group-details__list ${secondTerm.length > 0 && 'group-details__list--active'}`} id='first-term-grade-list'>
                                    {firstTermStudents}
                                </ul>
                            </div>
                            {secondTerm.length > 0 && <div className='group-details__term-div'>
                                <p className='group-details__term-span'>Oceny - semestr drugi
                                    <Button
                                        id='second-term'
                                        classButton='group-details__term-details-btn'
                                        btnText='Szczegóły'
                                        click={toggleGradeListHandle}
                                    />
                                </p>
                                <ul className='group-details__list' id='second-term-grade-list'>
                                    {secondTermStudents}
                                </ul>
                            </div>}
                            <ul className='student__topic-list group-details__topic-list'>
                                <span className='group-details__heading-span'>Zrealizowane tematy
                                </span>
                                {topics}
                            </ul>
                        </React.Fragment>
                )}
            </div>
        </React.Fragment>
    );
}

export default SingleGroupDetails;