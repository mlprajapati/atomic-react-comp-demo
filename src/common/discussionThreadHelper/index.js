import firebase from '../../database/firebasedb';

const getDbRef = collectionName => {
  const ref = firebase.firestore().collection(collectionName);
  return ref;
};

export const saveNewThread = threadDetails => {
  return getDbRef('discussionThreads')
    .doc(threadDetails.id)
    .set(threadDetails);
};

export const getAllDiscussionThreadsFromDb = () => {
  return getDbRef('discussionThreads').orderBy('createddate', 'desc');
};

export const saveDiscussionCategories = categories => {
  return getDbRef('discussionCategories')
    .doc('GKGJVHGCYDUYJ')
    .set(categories);
};

export const getAllDiscussionCategories = () => {
  return getDbRef('discussionCategories');
};

export const getThreadById = threadId => {
  return getDbRef('discussionThreads')
    .doc(threadId)
    .get();
};

export const saveComment = commentDetails => {
  return getDbRef('discussionComments')
    .doc(commentDetails.commentId)
    .set(commentDetails);
};

export const getAllCommentsByThreadId = threadId => {
  return getDbRef('discussionComments').where('threadId', '==', threadId);
};

export const getCommentById = commentId => {
  return getDbRef('discussionComments')
    .doc(commentId)
    .get();
};
