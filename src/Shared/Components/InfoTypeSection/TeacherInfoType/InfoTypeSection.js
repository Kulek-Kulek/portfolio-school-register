import React from 'react';

import InfoTypeItem from './InfoTypeItem';
import WarningModal from '../../Modal/WarningModal';



const InfoTypeSection = props => {

    let infoTypeCards;
    if (props.loadedData && props.loadedData.length > 0) {
        if (props.loadedData.length >= 2) {
            infoTypeCards = props.loadedData.sort((a, b) => b.surname && a.surname.localeCompare(b.surname));
        }
        infoTypeCards = props.loadedData.map((item, index) => (
            <InfoTypeItem
                key={item.id}
                name={item.name}
                surname={item.surname}
                mobile={item.mobile}
                email={item.email}
                zoomLink={item.zoom && item.zoom.link}
                zoomMeetinId={item.zoom && item.zoom.meetingId}
                zoomPassword={item.zoom && item.zoom.password}
                id={item.id}
                infoType={props.infoType}
                groupData={props.loadedData[index].group}
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
