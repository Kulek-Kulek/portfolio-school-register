import React, { useState, useEffect } from 'react';

import LoadedTeacherGroupItem from './LoadedTeacherGroupItem';


import './LoadedTeacherGroups.css';


const LoadedTeacherGroups = props => {
    const [loadedData, setLoadedData] = useState();

    useEffect(() => {
        if (props.loadedGroups) {
            setLoadedData(props.loadedGroups);
        }
    }, [props.loadedGroups]);

    let attendance = [];
    let groups;

    if (loadedData && loadedData.length > 0) {
        groups = loadedData.map(group => (
            <LoadedTeacherGroupItem
                key={group.id}
                name={group.name}
                teacherData={group.teacher}
                lessonDayTime={group.lessonDayTime}
                studentData={group.students}
                courseLength={group.courseLength}
                lessonLength={group.lessonLength}
                groupLevel={group.groupLevel}
                certificateType={group.certificateType}
                topics={group.topics}
                id={group.id}
                groups={props.loadedGroups}
                courseBook={group.courseBook}
            />
        ));
        for (let key of props.loadedGroups) {
            attendance.push(key.students);
        }
    }

    const searchInputHandler = (e) => {
        let searchedData = [];
        if (e.target.value.length === 0) {
            searchedData = props.loadedGroups;
        } else {
            searchedData = props.loadedGroups.filter(data =>
                data.name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()));
        }
        setLoadedData(searchedData);
    }

    return (
        <div className='student__infotype-type student__infotype-type--active'>
            {!props.loading && <div className='info-type-panel__search-div student__infotype-type__search-div'>
                <i className="fas fa-search info-type-panel__search-i"></i>
                <input
                    className='info-type-panel__btn button info-type-panel__search'
                    type='text'
                    placeholder='Nazwa grupy'
                    onChange={searchInputHandler}
                />
            </div>}
            <ul className='teacher_groups-list'>
                {groups}
            </ul>
        </div>
    );
}

export default LoadedTeacherGroups;