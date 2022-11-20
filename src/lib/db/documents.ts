// This is just a fake document repository/db. The `getDocumentAttributes()`
// query is for when we only want the minimal attribute information to pass
// to cerbos for an authorization check.
const documents = [
  {
    id: '1',
    title: 'Secret Admin Document',
    author: 'only-admins',
    blurb: "Congratulations! You've successfully accessed the admin only resource route.",
    icon: 'lock',
  },
  {
    id: '2',
    title: 'My Very Important Document',
    author: 'tbd', // we will actually fake this and replace this with the user's id
    blurb: "This document is available to the author and any user with the 'admin' role.",
    icon: 'unlock',
  },
  {
    id: '3',
    title: 'A Document',
    author: 'not-the-current-user',
    blurb: "This document is available to it's author and any user with the 'admin' role.",
    icon: 'lock',
  },
];

export const getDocuments = async () => {
  return documents;
};

export const getDocumentById = async (id: string) => {
  return documents.find((doc) => doc.id === id);
};

export const getDocumentAttributes = async () => {
  return documents.map((doc) => ({ id: doc.id, author: doc.author }));
};

export const getDocumentAttributesById = async (id: string) => {
  return (await getDocumentAttributes()).find((doc) => doc.id === id);
};
