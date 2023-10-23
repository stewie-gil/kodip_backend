import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import styles from './postDatacss.module.css';

function PostData() {
    const [modalOpen, setmodalOpen] = useState(false);
    const [formData, setFormData] = useState({
        propertyType: '', 
        price: '',
        description: '', 
        propertyName : '',
        location: '', 
        amenities: '',
        contactInfo: '',
        imageUrls: '',
    })
   // const [Close, setClose] = useState(null);

const handleClick = () => {

  setmodalOpen(true);
};
const handleClose = () => {
    
    setmodalOpen(false);
};

const handleChange = (event) => {
   event.preventDefault(); 
setFormData({ ...formData,
    [event.target.name] : event.target.value
});
};


const handleSubmit = (event) => {
    event.preventDefault();
const {propertyType, price, description, propertyName,
location, amenities, contactInfo, imageUrls} = formData;

console.log('formData', formData);
console.log('property name', propertyName);

axios.post('/api/properties', formData)
.then (response=> {
    console.log('data submitted successfully', response.data);
})
.catch(error => {
console.log('Response from error:', error);
});

console.log("after submissoin");
setFormData({
    propertyType: '', 
    price: '',
    description: '', 
    propertyName : '',
    location: '', 
    amenities: '',
    contactInfo: '',
    imageUrls: '',
})


};




return (
<div>
<button className={styles.createlisting} onClick={handleClick}>Post</button>
<Modal isOpen={modalOpen} onRequestClose={handleClose}
className={styles.Modalpop}
>
<form className={styles.form}>
  <div>
    <label htmlFor="propertyType" className={styles.text}>Property Type: </label>
    <input type="text" id="propertyType" name="propertyType" required 
    onChange={handleChange} className={styles.inputfield}
    />
  </div>
  <div>
    <label htmlFor="price" className={styles.text}>Price: </label>
    <input type="number" id="price" name="price" required 
    onChange={handleChange} className={styles.inputfield}
    />
  </div>
  <div>
    <label htmlFor="description" className={styles.text}>Description: </label>
    <textarea id="description" name="description" onChange={handleChange}>
    </textarea>
  </div>
  <div>
    <label htmlFor="propertyName" className={styles.text}>Property Name: </label>
    <input type="text" id="propertyName" name="propertyName" onChange={handleChange}
    className={styles.inputfield} 
    />
  </div>
  <div>
    <label htmlFor="location" className={styles.text}>Location: </label>
    <input type="text" id="location" name="location" onChange={handleChange}
   className={styles.inputfield}
   />
  </div>
  <div>
    <label htmlFor="amenities" className={styles.text}>Amenities: </label>
    <input type="text" id="amenities" name="amenities" onChange={handleChange}
     className={styles.inputfield}
     />
  </div>
  <div>
    <label htmlFor="contactInfo" className={styles.text}>Contact Info: </label>
    <input type="text" id="contactInfo" name="contactInfo" onChange={handleChange}
    className={styles.inputfield}
    />
  </div>
  <div>
    <label htmlFor="imageUrls" className={styles.text}>Image URLs: </label>
    <input type="text" id="imageUrls" name="imageUrls" onChange={handleChange}
    className={styles.inputfield}
    />
  </div>
  <button type="submit" className={styles.submit} onClick={handleSubmit}>Submit</button>
</form>

    </Modal>
</div>
)
};

// on click pop a page asking for data to pass on to the database
// then use a POST method to send the data to the database

export default PostData;