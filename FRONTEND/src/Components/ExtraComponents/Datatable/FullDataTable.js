/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Spinner from 'react-bootstrap/Spinner';

const FullDataTable = ({ tableData, TableColumns, tableoptions, selectRow, keyField, pagination1, rowStyle, isLoading }) => {
    // No Data Image
    const NoDataIndication = () => (
        <>
            <img
                src='../../../../assets/images/norecordfound.png'
                alt="No Record Found"
                className='mx-auto d-flex'
            />
        </>
    );

    // Default table options with overrides
    const options = {
        sizePerPage: 10,
        hidePageListOnlyOnePage: true,
        ...tableoptions
    };

    return (
        <div>
            {isLoading ? (
                // Show loader while data is loading
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                // Render table when data is ready
                <BootstrapTable
                    keyField={keyField || "id"}
                    data={tableData}
                    columns={TableColumns}
                    pagination={!pagination1 ? paginationFactory(options) : ""}
                    selectRow={selectRow}
                    noDataIndication={() => <NoDataIndication />}
                    headerClasses="bg-primary text-primary text-center header-class"
                    rowClasses="text-center"
                    rowStyle={rowStyle}
                />
            )}
        </div>
    );
};

export default FullDataTable;
