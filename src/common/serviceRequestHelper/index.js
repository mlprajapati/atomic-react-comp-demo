import firebase from '../../database/firebasedb';

export const getAllServiceRequest = (items, result = []) => {
  items.forEach(element => {
    if (!element.children) {
      result.push(element);
    } else {
      result = getAllServiceRequest(element.children, result);
    }
  });
  return result;
};

export const getServiceRequestById = (items, id, result = []) => {
  items.forEach(element => {
    if (!element.children) {
      if (element.id === id) {
        result.push(element);
      }
    } else {
      result = getServiceRequestById(element.children, id, result);
    }
  });
  return result;
};

export const getPendingServiceRequest = (items, result = []) => {
  items.forEach(element => {
    if (!element.children) {
      if (element.currentstatus === 'pending') {
        result.push(element);
      }
    } else {
      result = getPendingServiceRequest(element.children, result);
    }
  });
  return result;
};

export const getCloseServiceRequest = (items, days, result = []) => {
  items.forEach(element => {
    if (!element.children) {
      if (element.currentstatus === 'closed') {
        result.push(element);
      }
    } else {
      result = getCloseServiceRequest(element.children, days, result);
    }
  });
  return result;
};

const getDbRef = collectionName => {
  const ref = firebase.firestore().collection(collectionName);
  return ref;
};

export const saveServiceRequest = requestDetails => {
  return getDbRef('serviceRequests')
    .doc(requestDetails.id)
    .set(requestDetails);
};

export const getAllServiceRequestFromDb = userId => {
  return getDbRef('serviceRequests')
    .orderBy('createddate', 'desc')
    .where('userId', '==', userId);
};
