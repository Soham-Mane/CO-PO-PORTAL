// import React from 'react';
// import styles from './Modal.module.css';

// function Modal({ onClose, children }) {
//   return (
//     <div className={styles.modalBackdrop} onClick={onClose}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <button className={styles.closeButton} onClick={onClose}>Close</button>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default Modal;


import React from 'react';
import styles from './Modal.module.css';

function Modal({ onClose, children }) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
