import React from 'react'

function home() {
  
    return (
      <div >
        <h1 style={{ display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30vh' ,
            fontSize: '36px',
            fontWeight: 'bold' }}>CCS Performance Evaluation Survey</h1>
        
          <div style={{ 
              fontSize: '18px', 
              color: '#333', 
              lineHeight: '1.3',
              textAlign: 'left'}}>

                  <p style={{ marginBottom: '30px' }}>Dear Students, </p>
                  <p style={{ marginBottom: '30px' }}> We'd like to know how your college experience this year affected your well-being, growth and success in the last semester.</p>
                  <p style={{ marginBottom: '30px' }}> <strong class="font-bold text-gray-800 dark:text-white">Your perspective matters!</strong> Your honest answers will help us understand the needs and experiences of students like you, paving the way for a more enriching and meaningful school experience for everyone.</p>
                  <p style={{ marginBottom: '30px' }}> <strong class="font-bold text-gray-800 dark:text-white">Consent of Data Subject to Collection and Processing of Personal Data</strong></p>
                  <p style={{ marginBottom: '30px' }}> In connection with the collection of personal information, by answering this survey tool, it is expected that hereby give consent as a Data Subject under the Implementing Rules and Regulations of the Data Privacy Act of 2012, its amendments or equivalent succeeding laws, rules, and regulations in which the following data will be collected by the Colle of Computer Studies:</p>
                  <p> a. Email Address</p>
                  <p style={{ marginBottom: '30px' }}> b. Survey Responses</p>
                  <p style={{ marginBottom: '30px' }}> Thank you for your participation.</p>
                  <p> CCS Family</p>

          </div>
      </div>
      
    );
}

export default home