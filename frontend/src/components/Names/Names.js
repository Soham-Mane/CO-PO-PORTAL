import React from 'react'
import styles from "./Names.module.css";
import {motion} from 'framer-motion';
import NumberCounter from 'number-counter';
import college from "../../images/college.png";
function Names() {
  const transition = {type: 'spring',duration: 3 }
  return (
    <>
    <div className={styles.container}>
        <div className={styles.main}>
            <ul>
                <li><a>Home </a></li>
                <li><a>Acadmics </a></li>
                <li><a>Administration </a></li>
                <li><a>Academics </a></li>
                <li><a> Departments</a></li>
                <li><a> Students Corner</a></li>
                <li><a> Greviance</a></li>
                <li><a> Cells</a></li>
                <li><a>Traning and Placement </a></li>
                <li><a> NIRF</a></li>
            </ul>
        </div>
    </div>
    <div className={styles.container2}>
      <div className={styles.left}>
      {/* <div className={styles.thebestad}>
        <motion.div  initial={{left: '238px'}}
        whileInView={{left: '8px'}}
        transition={transition}
        >
        </motion.div>
        <span>Measuring Academic Excellence Together</span>
    </div> */}
    <div className={styles.heroHeading}>
     <div>
<span className={styles.strokeTxt}>CO </span>
<span>PO</span>
     </div>
     <div>
     <span>ATTAINMENT</span>
        </div>
        <div>
        <span className={styles.headingtext}>Streamlining CO and PO Attainment Analysis to Enhance Academic Excellence at Our University</span>

        </div>
        </div>
        <div className={styles.figures}>
            <div>
                <span style={{fontWeight: 'bold'}}>  
                    <NumberCounter end={140} start={100} delay='3' preFix="+"></NumberCounter>
                </span>
                <span style={{color: 'black'}}>Faculties</span>
            </div>
            <div>
                <span style={{fontWeight: 'bold'}}>
                    <NumberCounter end={978} start={900} delay='3' preFix='+' />
                </span>
                <span style={{color: 'black'}}>Universities JOINED</span>
            </div>

            <div>
                <span style={{fontWeight: 'bold'}}><NumberCounter start={1} delay={3} end={50} preFix='+'  /></span>
                <span style={{color: 'black'}}>Institutions</span>
            </div>
        </div>
    </div>
    <div className={styles.right}>
    <img src={college} alt="" className={styles.college} />

    </div>
      </div>
   
    </>
  )
}

export default Names