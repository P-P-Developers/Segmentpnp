import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Spinner from 'react-bootstrap/Spinner';

const BasicDataTable = ({ tableData, TableColumns, tableoptions, rowStyle, isLoading }) => {
    // No Data Image
    const NoDataIndication = () => (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <img
                src='../../../../assets/images/norecordfound.png'
                alt="No Records Found"
                className='mx-auto'
            />
        </div>
    );

    const options = {
        sizePerPage: 10,
        hidePageListOnlyOnePage: false,
        ...tableoptions
    };

    return (
        <div className="table-container">
            {isLoading ? (
                // Show Loader
                <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                // Show Table when Data is Ready
                <div className="table-responsive">
                    <BootstrapTable
                        keyField="id"
                        data={tableData}
                        columns={TableColumns}
                        pagination={paginationFactory(options)}
                        noDataIndication={() => <NoDataIndication />}
                        headerClasses="bg-primary text-primary text-center header-class"
                        rowClasses={`text-center ${rowStyle}`}
                    />
                </div>
            )}
        </div>
    );
};

export default BasicDataTable;
