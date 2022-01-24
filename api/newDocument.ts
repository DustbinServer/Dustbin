import uniqid from 'uniqid';
import database from '../database';
import { Dropbox } from 'dropbox';

interface DustbinDocument {
    id: string;
    language: string;
}

async function newDocument(data: string, language: string): Promise<DustbinDocument> {
    let fileId: string = uniqid();
    await database.newDocument(fileId, language);
    const dropBox = new Dropbox({
        accessToken: process.env.dropboxAccessToken,
        clientId: process.env.dropboxClientId,
        clientSecret: process.env.dropboxClientSecret,
    });
    await dropBox.filesUpload({
        path: `/${fileId}`,
        contents: Buffer.from(data),
    });
    return {
        id: fileId,
        language: language,
    };
}

export default newDocument;