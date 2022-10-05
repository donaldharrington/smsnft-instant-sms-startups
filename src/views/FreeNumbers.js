import React from 'react';
import classNames from 'classnames';
import { useEffect, useState } from "react"
import { getAllFreeNumbers, getAllCallHistory } from "../api/api"
import { CContainer, CRow, CCol } from '@coreui/bootstrap-react';
import 'bootstrap/dist/css/bootstrap.min.css'

const FreeNumbers = (
  topOuterDivider,
  bottomOuterDivider,
  hasBgColor,
  invertColor,
  ...props
) => {

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color'
  );

  const [freeNumbers, setFreeNumbers] = useState([])
  const [callHistory, setCallHistory] = useState([])

  const getAllFreeNumbersFunc = async () => {
    try {
      const result = await getAllFreeNumbers();
      setFreeNumbers(result);
      console.log(result);
    } catch (error) {
      if (error.data) {
        console.log(error.data.message || error.data);
      } else {
        console.log(error.message);
      }
    } finally {
    }
  };

  const getAllCallHistoryFunc = async () => {
    try {
      const result = await getAllCallHistory();
      setCallHistory(result);
      console.log(result);
    } catch (error) {
      if (error.data) {
        console.log(error.data.message || error.data);
      } else {
        console.log(error.message);
      }
    } finally {
    }
  };

  useEffect(() => {
    getAllFreeNumbersFunc();
    getAllCallHistoryFunc();
  }, []);

  return (
    <section className={outerClasses}>
      <CContainer className='c_fp_first_cc'>
        <CRow>
          <CCol sm="3" className='c_fp_phonenum_list_cc'>
            <model-viewer 
              className="c_main_demo_viewer" 
              src={require('./../assets/model/smsnft.glb')} 
              alt="MIke Row Soft Model" 
              auto-rotate camera-controls ar 
              ios-src={require('./../assets/model/smsnft.glb')}>
            </model-viewer>
            <div className='c_fp_freephone_dv'>              
              <div className='c_fp_freephone_tlt_dv'>Free Number</div>
              {
                freeNumbers.map((item, i) => {
                  return <div key={i}>{item.SimNumber}</div>
                })
              }
            </div>
          </CCol>
          <CCol sm="9" className='c_fp_second_cc'>
            <div className='c_fp_second_tlt' data-reveal-delay="200">Latest Incomming Texts</div>
            <CContainer className='c_fp_second_cc_content' data-reveal-delay="300">
              <CRow>
                <CCol sm="1">No</CCol>
                <CCol sm="2">From</CCol>                
                <CCol sm="6">Text</CCol>
                <CCol sm="3">Datetime</CCol>
              </CRow>
              {
                callHistory.map((item, i) => {
                  return <CRow>
                    <CCol sm="1">{i + 1}</CCol>
                    <CCol sm="2">{item.From}</CCol>
                    <CCol sm="6">{item.Body}</CCol>
                    <CCol sm="3">{item.DateTime}</CCol>
                  </CRow>
                })
              }
            </CContainer>
          </CCol>
        </CRow>
      </CContainer>
    </section>
  );
}

export default FreeNumbers;