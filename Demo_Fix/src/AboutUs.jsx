import React from 'react';
import './AboutUs.css';

const Home = () => {
  return (
    <main className="new-block1" style={{marginTop:'70px'}}>
      <div className="new-item new-bg-white new-block new-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1">
      <p className="new-hero-text"> <br></br><br></br>Brand Protection: Deepfakes can be used to create false endorsements or damaging content featuring public figures and celebrities. </p>
        
      </div>
      <div className="new-item" data-desktop-seq-no="2" data-mobile-seq-no="4">
       <img src='/image-01.jpg' alt="Image" className="new-img-left new-animate" />
      </div>
      <div className="new-item new-bg-secondary new-text-white new-block new-block-wider new-block-pad new-block-left-2" data-desktop-seq-no="3" data-mobile-seq-no="5">
        <i className="fas fa-award fa-4x new-block-icon"></i>
        <p className='description'>Our mission is to provide advanced tools for detecting deepfakes, ensuring media integrity, and protecting users from misinformation</p>
        <header className="new-block-brand">
          <div className="new-bg-primary-dark new-text-white new-block-brand-inner">
            <i className="fas fa-braille fa-3x"></i>
            <h1 className="new-brand-name">Image Classification</h1>
          </div>
        </header>
        <div className="new-text-right">

        </div>
      </div>
      <div className="new-item" data-desktop-seq-no="4" data-mobile-seq-no="8">
        <img src='/image-02.jpg' alt="Image" className="new-img-left new-animate" />
      </div>
      <div className="new-item new-bg-white new-block new-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1">
        <p className="new-hero-text">To become the leading platform for deepfake detection and ensure the authenticity of digital media worldwide</p>
        <header className="new-block-brand">
          <div className="new-bg-primary-dark new-text-white new-block-brand-inner">
            <i className="fas fa-braille fa-3x"></i>
            <h1 className="new-brand-name">Object Detection</h1>
          </div>
        </header>
      </div><div className="new-item new-bg-white new-block new-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1">
        <p className="new-hero-text">Financial Security: In financial markets, deepfake videos of CEOs or politicians making false statements can influence stock prices and market decisions.
        </p>
        
      </div>
      <div className="new-item" data-desktop-seq-no="2" data-mobile-seq-no="4">
      <img src='/image-04.jpg' alt="Image" className="new-img-left new-animate" />
      </div>
     
      <div className="new-item new-bg-secondary new-text-white new-block new-block-wider new-block-pad new-block-left-2" data-desktop-seq-no="3" data-mobile-seq-no="5">
        <i className="fas fa-award fa-4x new-block-icon"></i>
        <p className='description' ><h3>Mission Statement:</h3>
To advance the field of photo recognition by delivering state-of-the-art detection and identification solutions that enhance security, improve user experiences, and provide valuable insights. Our mission is to create intelligent systems that accurately recognize and analyze images, fostering innovation and efficiency across various applications.
<h3>Vision Statement:</h3>
To be at the forefront of photo recognition technology, driving progress and setting benchmarks for accuracy and reliability. We aspire to transform the way images are used and understood, enabling a future where our solutions are seamlessly integrated into everyday life, enhancing security, personalization, and operational effectiveness across industries.</p>
        <div className="new-text-right">
        </div>
      </div>
      <div className="new-item new-bg-white new-block new-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1">
      <div className="new-item" data-desktop-seq-no="4" data-mobile-seq-no="8">
      <video width="300" height="300" controls>
    <source src="video1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
      </div>
      </div>
      <div className="new-item new-bg-white new-block new-block-left" data-desktop-seq-no="1" data-mobile-seq-no="1">
        <p className="new-hero-text">Legal Compliance: Companies must adhere to regulations regarding the use of AI and media.Deepfake detection ensures compliance with laws and avoids potential legal repercussions.
        </p>
        </div>
    </main>
  );
};

export default Home;
