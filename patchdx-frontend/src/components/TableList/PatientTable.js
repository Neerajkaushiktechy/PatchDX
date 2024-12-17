import React from 'react';
import moment from "moment";

const PatientTable = ({ listData, handleClick, isShowActionLink, selectPatient, handlePatientInfo, handleQuestionnaire, selectedPatient }) => (
    <tbody>
        {listData && listData.data.map((patient, i) => (
            <tr key={i}>
                {!isShowActionLink && <td><input type='checkbox' name={i} onChange={(e) => selectPatient(patient._id, e)} checked={selectedPatient === `${i}`} /></td>}
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{moment(patient.dateOfBirth).format('MM-DD-YYYY')}</td>
                <td>{patient.email}</td>
                <td>{patient.phoneNumber}</td>
            </tr>
        ))}
    </tbody>
);

export default PatientTable;