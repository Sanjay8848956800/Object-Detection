import React, { useState, useRef, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import styles from './Home.module.css';
import userAxios from './Config/config';
import axios from 'axios';

const Home = () => {
  const userEmail = JSON.parse(localStorage.getItem('user'));
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [cocoPredictions, setCocoPredictions] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);
  const [mobileNetCount, setMobileNetCount] = useState(0); // State for MobileNet button click count
  const [cocoSsdCount, setCocoSsdCount] = useState(0); // State for Coco-SSD button click count
  const imageRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const fileURL = URL.createObjectURL(file);
        setSelectedFile(fileURL);
        setPredictions([]);
        setCocoPredictions([]);
        setUploadCount(uploadCount + 1);
      } catch (error) {
        console.error('Failed to create object URL:', error);
      }
    } else {
      console.error('No file selected or invalid file input');
    }
  };

  const handleDetectMobileNet = async () => {
    if (imageRef.current) {
      const model = await mobilenet.load();
      const predictions = await model.classify(imageRef.current);
      setPredictions(predictions);
      setMobileNetCount(mobileNetCount + 1); // Increment MobileNet count
    }
  };

  console.log(userEmail)

  const handleDetect = async (type) => {
    if (imageRef.current) {
      if(type==='cocossd'){

        const model = await cocoSsd.load();
        const predictions = await model.detect(imageRef.current);
        setCocoPredictions(predictions);
        setCocoSsdCount(cocoSsdCount + 1);
      }
      else{
        const model = await mobilenet.load();
        const predictions = await model.classify(imageRef.current);
        setPredictions(predictions);
        setMobileNetCount(mobileNetCount + 1);

      }
      console.log(userEmail[0].email)
      let response = await userAxios.post('/updateModelCount',{email:userEmail[0].email,type:type})
      console.log(response.data)
       // Increment Coco-SSD count
    }
  };

  useEffect(() => {
    if (uploadCount > 0) {
      sendCountToBackend('uploadCount', uploadCount);
    }
  }, [uploadCount]);

  useEffect(() => {
    if (mobileNetCount > 0) {
      sendCountToBackend('mobileNetCount', mobileNetCount);
    }
  }, [mobileNetCount]);

  useEffect(() => {
    if (cocoSsdCount > 0) {
      sendCountToBackend('cocoSsdCount', cocoSsdCount);
    }
  }, [cocoSsdCount]);

  const sendCountToBackend = async (type, count) => {
    try {
      await userAxios.post('/count', { type, count, email: userEmail[0].email });
      console.log(`${type} count sent successfully`);
    } catch (error) {
      console.error(`Error sending ${type} count:`, error);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.boxedHeading}>Image Classification and Detection</h1>
      <br></br><br></br>
      <input type="file" onChange={handleFileChange} className={styles.fileInput} />
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.uploadCard}>
            <button onClick={()=>handleDetect('mobileNet')} className={styles.submitButton}>Classify Image with MobileNet</button>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.detectCard}>
            <button onClick={()=>handleDetect('cocossd')} className={styles.submitButton}>Detect Objects with Coco-SSD</button>
          </div>
        </div>
      </div>
      {selectedFile && (
        <div className={styles.imageContainer}>
          <img ref={imageRef} src={selectedFile} alt="Uploaded" className={styles.uploadedImage} />
        </div>
      )}
      <div>
        {predictions.length > 0 && (
          <div className={styles.predictionsCard}>
            <h2>MobileNet Predictions:</h2>
            <ul className={styles.predictions}>
              {predictions.map((prediction, index) => (
                <li key={index} className={styles.predictionCard}>
                  {prediction.className}: {(prediction.probability * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        )}
        {cocoPredictions.length > 0 && (
          <div className={styles.predictionsCard}>
            <h2>Coco-SSD Predictions:</h2>
            <ul className={styles.predictions}>
              {cocoPredictions.map((prediction, index) => (
                <li key={index} className={styles.predictionCard}>
                  {prediction.class}: {Math.round(prediction.score * 100)}%
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* <div className={styles.uploadCountCard}>
          <p>Upload Button Clicked: {uploadCount} times</p>
          <p>Classify Image with MobileNet Button Clicked: {mobileNetCount} times</p>
          <p>Detect Objects with Coco-SSD Button Clicked: {cocoSsdCount} times</p>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
