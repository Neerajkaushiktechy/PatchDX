import React from 'react'
import moment from "moment"
import viewIcon from '../../assets/images/eye.svg'
import plusIcon from '../../assets/images/plus.svg'
import questionnaire from '../../assets/images/questionnaire.svg'

const TableList = ({ listData, handleClick, isShowActionLink, selectPatient, handlePatientInfo, handleQuestionnaire }) => (
    <tbody>
        {listData && listData.data.map((patient, i) => (
            <tr key={i}>
                {!isShowActionLink && <td><input type='checkbox' onChange={() => selectPatient(patient._id)} /></td>}
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.vendorOrders.length>0?moment(patient.vendorOrders[0].updatedAt).format('MM-DD-YYYY'):'-'}</td>
                <td>{moment(patient.dateOfBirth).format('MM-DD-YYYY')}</td>
                {isShowActionLink && <td>
                    {patient?.questionnaireResponses?.length > 0 ?
                        <a className="flex items-center" onClick={() => handleClick(patient._id)}>
                            <img src={questionnaire} alt="patchDX" className="mr-3" />
                            View Responses
                        </a> : '-'}
                </td>}
                <td>
                    {isShowActionLink && <div className="flex">
                        {patient?.questionnaireResponses?.length > 0 ? <a onClick={() => handlePatientInfo(patient._id)}>
                            <img src={viewIcon} alt="patchDX" className="mr-5"></img>
                        </a> : <a>
                            <img src={viewIcon} alt="patchDX" className="mr-5 disabled-button"></img>
                        </a>}
                        {isShowActionLink && patient?.questionnaireResponses?.length > 0 ? <a>
                            <img src={plusIcon} className='disabled-button' alt="patchDX"></img>
                        </a> : <a onClick={() => handleQuestionnaire(patient)}>
                            <img src={plusIcon} alt="patchDX"></img>
                        </a>}
                    </div>}
                </td>

            </tr>
        ))}
    </tbody>
);

export default TableList;