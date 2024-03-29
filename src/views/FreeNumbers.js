import React from 'react';
import classNames from 'classnames';
import { useEffect, useState } from "react"
import { getAllFreeNumbers, getAllCallHistory } from "../api/api"
import { CContainer, CRow, CCol } from '@coreui/bootstrap-react';
import 'bootstrap/dist/css/bootstrap.min.css'

import loaderSVG from "../assets/images/svg-loaders/spinning-circles.svg"

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

  const [isLoading, setIsLoading] = useState(true)
  const [freeNumbers, setFreeNumbers] = useState([])
  const [callHistories, setCallHistories] = useState([])

  const getAllFreeNumbersFunc = async () => {
    try {
      const result = await getAllFreeNumbers();
      console.log(result);
      setFreeNumbers(result);
      getAllCallHistoryFunc(result);
    } catch (error) {
      /*
      if (error.data) {
        console.log(error.data.message || error.data);
      } else {
        console.log(error.message);
      }
      */
     setIsLoading(false)
    } finally {
    }
  };

  const getAllCallHistoryFunc = async (numbers) => {
    try {
      let proms = numbers.map( async (item, i) => {
        const sim_number = item.SimNumber;
        const call_history = await getAllCallHistory(sim_number.replace("+", ""));
        
        const val = {
          SimNumber : sim_number,
          callHistory: call_history
        }
        return val;
      });
      let call_histories  = await Promise.all(proms);
      
     setCallHistories(call_histories);

     setIsLoading(false)
    } catch (error) {
      /*
      if (error.data) {
        console.log(error.data.message || error.data);
      } else {
        console.log(error.message);
      }
      */
    } finally {
    }
  };

  useEffect(() => {
    getAllFreeNumbersFunc();  
  }, []);

  const onClickRefresh = () => {
    window.location.reload(false);
  }
  

  return (
    <React.Fragment>
      {
        isLoading && isLoading == true? <div className="loading_dv">
          <img src={loaderSVG} />
        </div>:""
      }
      <section className={outerClasses}>
        <div className="c_refresh_dv"><div onClick={onClickRefresh}>REFRESH</div></div>
        {
          callHistories.length !== 0 && callHistories.map((item, i) => {
            let SimNumber = item.SimNumber;
            SimNumber = SimNumber.replace("+", "");
            let callHistory = item.callHistory;
            return <CContainer className='c_fp_first_cc' key={i}>
              <CRow>
                <CCol md="3" className='c_fp_phonenum_list_cc'>
                  <model-viewer 
                    className="c_main_demo_viewer" 
                    src={require('./../assets/model/smsnft.glb')} 
                    alt="MIke Row Soft Model" 
                    auto-rotate camera-controls ar 
                    ios-src={require('./../assets/model/smsnft.glb')}>
                  </model-viewer>
                  <div className='c_fp_freephone_dv'>              
                    <div className='c_fp_freephone_tlt_dv'>{item.SimNumber}</div>
                  </div>
                </CCol>
                <CCol md="9" className='c_fp_second_cc'>
                  <div className='c_fp_second_tlt' data-reveal-delay="200">Latest Incomming Texts</div>
                  <CContainer className='c_fp_second_cc_content' data-reveal-delay="300">
                    <CRow className='c_md_up_show'>
                      <CCol md="1">No</CCol>
                      <CCol md="2">From</CCol>                
                      <CCol md="6">Text</CCol>
                      <CCol md="3">Datetime</CCol>
                    </CRow>
                    {                    
                      callHistory.map((item, ii) => {
                        return <CRow key={ii}>
                          <CCol md="1"><span className='c_md_ud_show'>No: </span>{i + 1}</CCol>
                          <CCol md="2"><span className='c_md_ud_show'>From: </span>{item.From}</CCol>
                          <CCol md="6"><span className='c_md_ud_show'>Text: </span>{item.Body}</CCol>
                          <CCol md="3"><span className='c_md_ud_show'>Datetime: </span>{item.DateTime}</CCol>
                        </CRow>
                      })
                    }
                  </CContainer>
                </CCol>
              </CRow>
            </CContainer>
          })
        }
      </section>
    </React.Fragment>
  );
}

export default FreeNumbers;