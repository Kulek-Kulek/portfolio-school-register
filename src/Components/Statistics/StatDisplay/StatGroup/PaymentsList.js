import React from 'react';


const PaymentsList = props => {

    let rates = 'Brak rat';
    let invoices = 'Brak faktur';

    if (props.financialRates && props.financialRates.length > 0) {
        rates = props.financialRates.map((r, index) => (
            <span key={r.id} className={r.documentStatus === 'overdue' ? 'finance__invoice-overdue statistics-report__doc-overdue' : ''}>
                {`${new Date(r.documentDeadline).toLocaleDateString().length < 10 ? '0' + new Date(r.documentDeadline).toLocaleDateString() : new Date(r.documentDeadline).toLocaleDateString() + ' (' + r.documentBalance + 'PLN)'}${props.financialRates.length === index + 1 ? '.' : ' | '} `}
            </span>
        ));
    }


    if (props.invoices && props.invoices.length > 0) {
        invoices = props.invoices.map((i, index) => (
            <span key={i.id} className={i.invoiceStatus === 'overdue' ? 'finance__invoice-overdue statistics-report__doc-overdue' : ''}>
                {`${new Date(i.invoiceDeadline).toLocaleDateString().length < 10 ? '0' + new Date(i.invoiceDeadline).toLocaleDateString() : new Date(i.invoiceDeadline).toLocaleDateString() + ' (' + i.invoiceBalance + 'PLN)'}${props.invoices.length === index + 1 ? '.' : ' | '} `}
            </span>
        ))
    }

    return (
        <React.Fragment>
            <div className='statistics-report__data-div'>
                <span className='statistics-report__data-desc'>Raty: </span>
                <div className='statistics-report__topic-date'>
                    {rates}
                </div>

            </div>
            <div className='statistics-report__data-div'>
                <span className='statistics-report__data-desc'>Faktury:</span>
                <div className='statistics-report__topic-date'>
                    {invoices}
                </div>
            </div>
        </React.Fragment>
    );
}

export default PaymentsList;