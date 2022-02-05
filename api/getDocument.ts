import database from '../database';
import { Dropbox, DropboxResponse, files } from 'dropbox';

interface DustbinDocument {
    id: string;
    language: string;
    data?: string;
}

async function getDocument(fileId: string): Promise<DustbinDocument | null> {
    let fileInfo = await database.getDocument(fileId);
    if (!fileInfo) return null;
    const dropBox = new Dropbox({
        accessToken: process.env.dropboxAccessToken,
        clientId: process.env.dropboxClientId,
        clientSecret: process.env.dropboxClientSecret,
    });
    let file: DropboxResponse<files.FileMetadata> = await dropBox.filesDownload({
        path: `/${fileId}`,
    });
    if (file.status !== 200) return null;
    return {
        id: fileId,
        // @ts-ignore
        data: file.result.fileBinary,
        // @ts-ignore
        language: fileInfo.language,
    };
}

export default getDocument;