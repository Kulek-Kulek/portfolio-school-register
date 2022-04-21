import React from 'react';


const RodoAgreed = props => {
    let status = <span className='single-rodo__status single-rodo__status-disapproved'>Brak zgody</span>
    if (props.signed && props.signed.length > 0) {
        status = props.signed.map(r => (
            <p key={r.id} className='single-rodo__status'>
                <span>{r.rodoStatus === 'accepted' ? 'Zgoda' : 'Wycofano'}</span>
                <span>{new Date(r.agreedOn).toLocaleDateString().length < 10 ? '0' + new Date(r.agreedOn).toLocaleDateString() : new Date(r.agreedOn).toLocaleDateString()}</span>
            </p>
        ))
    }

    return status;
}

export default RodoAgreed;