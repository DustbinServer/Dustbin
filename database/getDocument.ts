import { Pool, QueryResult } from 'pg';

async function getDocument(fileId: string): Promise<any | null> {
    const pool: Pool = new Pool({
        connectionString: process.env.databaseUrl,
    });
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS Documents (fileId varchar(100), createDate varchar(100), language varchar(20))');
        const result: QueryResult = await pool.query(
            'SELECT * FROM Documents WHERE fileId = $1',
            [fileId]
        );
        pool.end();
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (error: Error | any) {
        console.log(error.message);
        return null;
    }
}

export default getDocument;