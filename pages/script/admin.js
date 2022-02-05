document.getElementById('data').classList.add('hidden');
async function getAllDocuments(event) {
    event.preventDefault();
    if (document.getElementById('adminUsername') == '' || document.getElementById('adminPassword') == '') {
        return alert('Fill Username And Password !');
    }
    const documents = await axios.post('/api/admin', { username: document.getElementById('adminUsername').value, password: document.getElementById('adminPassword').value });
    if (documents.data.error) {
        return alert('Invalid Username Or Password');
    }
    documents.data.result.forEach((element) => {
        document.getElementById('documentsTable').innerHTML += `
<tr>
    <td class="border-2 p-1.5 border-slate-600 hover:underline hover:text-emerald-500"><a target="_blank" href="/paste/${element.fileid}">${element.fileid}</a></td>
    <td class="border-2 p-1.5 border-slate-600">${new Date(element.createdate).toLocaleString()}</td>
    <td class="border-2 p-1.5 border-slate-600">${element.language}</td>
</tr>`;
    document.getElementById('data').classList.remove('hidden');
    document.getElementById('controls').classList.add('hidden');
    });
}