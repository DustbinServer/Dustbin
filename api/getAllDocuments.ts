import database from '../database';

async function getAllDocuments(): Promise<Array<any>> {
    let files = await database.getAllDocuments();
    return files;
}

export default getAllDocuments;