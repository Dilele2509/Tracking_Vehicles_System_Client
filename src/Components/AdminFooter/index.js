import './AdminFooter.css'

import { Link } from 'react-router-dom';

function AdminFooter() {
   return (
      <>
         <div className='div-footer'>
            <div className="copyright">
               <div className="row">
                  <p className="text-center text-gray-700 text-sm mt-4 mb-4" style={{width: '100%'}}>Copyright © 2024 - owned by HALEE. All Rights Reserved</p>
                  {/* <div className="col-md-12">

                  </div> */}
               </div>
            </div>
         </div>
      </>
   );
}

export default AdminFooter;