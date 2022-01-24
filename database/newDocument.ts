import { Pool, QueryResult } from 'pg';

async function newDocument(fileId: string, language: string) {
    const pool = new Pool({
        connectionString: process.env.databaseUrl,
    });
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS Documents (fileId varchar(100), createDate varchar(100), language varchar(20))');
        const result: QueryResult = await pool.query(
            'INSERT INTO Documents (fileId, createDate, language) VALUES($1, $2, $3)',
            [fileId, new Date().toISOString(), language]
        );
        pool.end();
    } catch (error: Error | any) {
        console.log(error.message);
        pool.end();
    }
}

export default newDocument;