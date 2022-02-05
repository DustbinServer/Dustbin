import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { join } from 'path';
import fs from 'fs';
import api from './api';

const app = Fastify({ logger: false, });
interface DustbinDocument {
    data?: any;
    id: string;
    language: string;
}


app.get('/tailwind.css', async (_request: FastifyRequest, reply: FastifyReply) => {
    fs.readFile(join(__dirname, '..', 'pages', 'tailwind.css'), (_err: Error | null, fileBuffer: Buffer) => {
        reply.type('text/css').send(fileBuffer);
    })
});
app.get('/favicon.png', async (_request: FastifyRequest, reply: FastifyReply) => {
    fs.readFile(join(__dirname, '..', 'pages', 'favicon.png'), (_err: Error | null, fileBuffer: Buffer) => {
        reply.type('image/x-png').send(fileBuffer);
    })
});
app.get('/script/new.js', async (_request: FastifyRequest, reply: FastifyReply) => {
    fs.readFile(join(__dirname, '..', 'pages', 'script', 'new.js'), (_err: Error | null, fileBuffer: Buffer) => {
        reply.type('application/javascript').send(fileBuffer);
    })
});
app.get('/script/admin.js', async (_request: FastifyRequest, reply: FastifyReply) => {
    fs.readFile(join(__dirname, '..', 'pages', 'script', 'admin.js'), (_err: Error | null, fileBuffer: Buffer) => {
        reply.type('application/javascript').send(fileBuffer);
    })
});

app.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
    fs.readFile(join(__dirname, '..', 'pages', 'index.html'), (_err: Error | null, fileBuffer: Buffer) => {
        reply.type('text/html').send(fileBuffer);
    })
});

app.get('/new', async (_request: FastifyRequest, reply: FastifyReply) => {
    fs.readFile(join(__dirname, '..', 'pages', 'new.html'), (_err: Error | null, fileBuffer: Buffer) => {
        reply.type('text/html').send(fileBuffer);
    })
});

app.get('/admin', async (_request: FastifyRequest, reply: FastifyReply) => {
    fs.readFile(join(__dirname, '..', 'pages', 'admin.html'), (_err: Error | null, fileBuffer: Buffer) => {
        reply.type('text/html').send(fileBuffer);
    })
});

app.get('/paste/*', async (request: FastifyRequest, reply: FastifyReply) => {
    let params: any = request.params;
    var fileId: string = params['*']
    if (fileId == '') {
        return reply.redirect('/new');
    }
    const result: DustbinDocument | null = await api.getDocument(fileId);
    if (!result) return reply.send({ error: 'DOCUMENT_NOT_FOUND' });
    fs.readFile(join(__dirname, '..', 'pages', 'paste.html'), (_err: Error | null, fileBuffer: Buffer) => {
        reply.type('text/html').send(
            Buffer.from(fileBuffer.toString('utf8').replace('{{ %data% }}', result.data).replace('{{ %language% }}', result.language.toLowerCase()))
        );
    })
});

// -------------------
// ------ API's ------
// -------------------
app.post('/api/new', async (request: FastifyRequest, reply: FastifyReply) => {
    let body: any = request.body;
    let data: string = body.data;
    let language: string = body.language;
    if (data == '') return { error: 'DATA_IS_EMPTY' };
    if (language == '') return { error: 'DATA_IS_EMPTY' };
    if (![
        "Bash", "C", "CSharp", "C++", "CSS", "Diff", "Go",
        "HTML", "XML", "JSON", "Java", "JavaScript",
        "Kotlin", "Less", "Lua", "Makefile", "Markdown",
        "Objective-C", "PHP", "Perl", "PlainText",
        "Python", "R", "Ruby", "Rust", "SCSS",
        "SQL", "ShellSession", "Swift", "TOML",
        "INI", "TypeScript", "VB.NET", "YAML"
    ].includes(language)) return { error: 'LANGUAGE_NOT_SUPPORTED' };
    api.newDocument(data, language).then((result: DustbinDocument) => {
        reply.send({ error: null, id: result.id, language: result.language });
    });
});
app.post('/api/get', async (request: FastifyRequest, reply: FastifyReply) => {
    let body: any = request.body;
    let fileId: string = body.fileId;
    api.getDocument(fileId).then((result: DustbinDocument | null) => {
        if (!result) return reply.send({ error: 'DOCUMENT_NOT_FOUND' });
        reply.send({ error: null, id: result.id, language: result.language, data: result.data.toString('utf8') });
    });
});
app.post('/api/admin', async (request: FastifyRequest, reply: FastifyReply) => {
    let body: any = request.body;
    let username: string = body.username;
    let password: string = body.password;
    if (username != process.env.dustbinUsername || password != process.env.dustbinPassword) {
        return reply.send({ error: 'INVALID_AUTH' });
    }
    api.getAllDocuments().then((result: Array<any>) => {
        return reply.send({result: result, error: null});
    });
});


// Run the server !
const startServer = async () => {
    try {
      await app.listen(process.env.PORT || 1134, '0.0.0.0');
      console.log(`[ Info ] Dustbin Init On http://localhost:${process.env.PORT || 1134}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
};
startServer();