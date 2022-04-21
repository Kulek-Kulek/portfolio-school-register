import React from 'react';

import InfoTypeItem from './InfoTypeItem';
import './InfoTypeSection.css';


const InfoTypeSection = props => {

    let infoTypeCards;
    if (props.loadedData && props.loadedData.length > 0) {
        infoTypeCards = props.loadedData.map(item => (
            <InfoTypeItem
                key={item.id}
                name={item.name}
                surname={item.surname}
                mobile={item.mobile}
                email={item.email}
                id={item.id}
                courseName={item.courseName}
                coursePrice={item.coursePrice}
                comments={item.comments}
                lessonType={item.lessonType}
                unavailable={item.unavailable}
                marketingRules={item.marketingRules}
                birthday={item.birthday}
                submissionDate={item.submissionDate}
                submissionTime={item.submissionTime}
            />
        ));
    } else {
        infoTypeCards = <h1 className='admin-main__general-info'>Nie masz nowych zamówień</h1>;
    }

    return (
        <React.Fragment>
            <section>
                <ul className='admin-main__list'>
                    {infoTypeCards}
                </ul>
            </section>
        </React.Fragment>
    );
}

export default InfoTypeSection;
