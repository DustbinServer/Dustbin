import { Pool, QueryResult } from 'pg';

async function getAllDocuments(): Promise<Array<any>> {
    const pool = new Pool({
        connectionString: process.env.databaseUrl,
    });
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS Documents(fileId varchar(100), createDate varchar(100), language varchar(20))');
        const result: QueryResult = await pool.query('SELECT * FROM Documents');
        pool.end();
        return result.rows;
    } catch (error: Error | any) {
        console.log(error.message);
        return [];
    }
}

export default getAllDocuments;