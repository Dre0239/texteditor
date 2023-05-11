import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    await tx.objectStore('jate').add({ content });
    await tx.done;
    console.log('Content added to database:', content);
  } catch (error) {
    console.error('Error adding content to database:', error);
  }
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const cursor = await tx.objectStore('jate').openCursor();
    const content = [];
    while (cursor) {
      content.push(cursor.value.content);
      cursor.continue();
    }
    await tx.done;
    console.log('Content retrieved from database:', content);
    return content;
  } catch (error) {
    console.error('Error retrieving content from database:', error);
    return [];
  }
};


initdb();
