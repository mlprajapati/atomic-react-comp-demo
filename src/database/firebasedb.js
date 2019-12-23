import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDOXwguyo5cpB_8sInXPGUihs1t4xhrVqc',
  authDomain: 'sony-myproducts.firebaseapp.com',
  databaseURL: 'https://sony-myproducts.firebaseio.com',
  projectId: 'sony-myproducts',
  storageBucket: 'sony-myproducts.appspot.com',
  messagingSenderId: '863373097977',
  appId: '1:863373097977:web:435ceebb16566bd7'
};
firebase.initializeApp(config);
firebase.firestore().enablePersistence();

export default firebase;
