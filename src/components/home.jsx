import React from 'react';

function Home() {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px',
      minHeight: '100vh',
      background: '#ffffff'
    }}>
      <h1 style={{ 
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>CCS Performance Evaluation Survey</h1>
      
      <div style={{ 
        textAlign: 'left',
        maxWidth: '1000px',
        margin: '10px auto'
      }}>
        <p style={{ marginBottom: '20px' }}>Dear Students,</p>
        <p style={{ marginBottom: '20px' }}>We'd like to know how your college experience this year affected your well-being, growth, and success in the last semester.</p>
        <p style={{ marginBottom: '20px' }}><strong>Your perspective matters!</strong> Your honest answers will help us understand the needs and experiences of students like you, paving the way for a more enriching and meaningful school experience for everyone.</p>
        <p style={{ marginBottom: '20px' }}><strong>Consent of Data Subject to Collection and Processing of Personal Data</strong></p>
        <p style={{ marginBottom: '20px' }}>In connection with the collection of personal information, by answering this survey tool, it is expected that hereby give consent as a Data Subject under the Implementing Rules and Regulations of the Data Privacy Act of 2012, its amendments or equivalent succeeding laws, rules, and regulations in which the following data will be collected by the College of Computer Studies:</p>
        <p style={{ marginBottom: '20px' }}>a. Email Address</p>
        <p style={{ marginBottom: '20px' }}>b. Survey Responses</p>
        <p style={{ marginBottom: '20px' }}>Thank you for your participation.</p>
        <p>CCS Family</p>
      </div>
    </div>
  );
}

export default Home;