import React from 'react'
import moment from "moment"

const PatchTableList = ({ listData, handleEnterPatchResult, handleSummaryLetter, isSummary }) => (
    <tbody>
        {listData && listData?.data?.map((patient, i) => (
            <tr key={i}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.email}</td>
                <td>{patient.phoneNumber}</td>
                <td>{moment(patient.dateOfBirth).format('MM-DD-YYYY')}</td>
                {!isSummary && <td>
                    {patient?.vendorOrders.length > 0 ? <button onClick={() => handleEnterPatchResult(patient._id)} className="border border-primary rounded-md text-base font-medium px-[10px] py-1 text-primary bg-white">Enter Results</button>
                        : <button onClick={() => handleEnterPatchResult(patient._id)} className="border border-primary rounded-md text-base font-medium px-[10px] py-1 text-primary bg-white disabled-button" disabled>Enter Results</button>}
                </td>}
                {isSummary && <td>
                    <button onClick={() => handleSummaryLetter(patient._id)} className="border border-primary rounded-md text-base font-medium px-[10px] py-1 text-primary bg-white">Generate Summary</button>
                </td>}

            </tr>
        ))}
    </tbody>
);

export default PatchTableList;