import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import { useHistory  } from 'react-router-dom';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const history = useHistory ();

  const onClickFreeNumbers = async () => {
    try {
      history.push('/free_numbers');
    } catch (error) {
    } finally {
    }
  }


  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom c_main_tlt" data-reveal-delay="200">
              smsnft-instant sms <br /><span className="text-color-primary">startups</span>
            </h1>
            <div className='c_main_model'>
              <model-viewer 
                className="c_main_demo_viewer" 
                src={require('./../../assets/model/smsnft.glb')} 
                alt="MIke Row Soft Model" 
                auto-rotate camera-controls ar 
                ios-src={require('./../../assets/model/smsnft.glb')}>
              </model-viewer>
            </div>
            <div className="container-xs c_main_container">
              <div className="reveal-from-bottom" data-reveal-delay="200">
                <ButtonGroup>
                  <Button tag="a" color="primary" 
                    wideMobile className="c_main_btn"
                    onClick={() => onClickFreeNumbers()}>
                    free numbers
                    </Button>
                  <Button tag="a" color="dark" wideMobile className="c_main_btn">
                    paid nft plan
                    </Button>
                </ButtonGroup>
              </div>
              <p className="m-0 mb-32 reveal-from-bottom c_main_desc" data-reveal-delay="300">
                FREE UK MOBILE NUMBER'S THAT YOU CAN USE FOR <br />
                INSTANT SMS VERFICATION
              </p>
              
            </div>
          </div> 
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;