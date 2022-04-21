import React from 'react';

import InfoTypeItem from './InfoTypeItem';
import WarningModal from '../../Modal/WarningModal';


const InfoTypeSection = props => {
    let infoTypeCards;
    if (props.loadedData && props.loadedData.length > 0) {
        if (props.loadedData.length > 1) {
            infoTypeCards = props.loadedData.sort((a, b) => b.name && a.name.localeCompare(b.name));
        }

        infoTypeCards = props.loadedData.map((item, index) => (
            <InfoTypeItem
                key={item.id}
                name={item.name}
                id={item.id}
                infoType={props.infoType}
                studentData={props.loadedData[index].students}
                teacherData={props.loadedData[index].teacher}
                courseLength={item.courseLength}
                lessonLength={item.lessonLength}
                topics={item.topics}
                lessonDayTime={item.lessonDayTime}
                groupLevel={item.groupLevel}
                certificateType={item.certificateType}
                courseBook={item.courseBook}
                schoolYear={item.schoolYear}
                courseName={item.courseName}
            />
        ));
    } else {
        infoTypeCards = <h1 className='admin-main__general-info'>Brak danych</h1>;
    }

    return (
        <React.Fragment>
            <section>
                <WarningModal class='error-modal error-modal-active' />
                <ul className='admin-main__list'>
                    {infoTypeCards}
                </ul>
            </section>
        </React.Fragment>
    );
}

export default InfoTypeSection;
