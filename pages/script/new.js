[
    "Bash", "C", "CSharp", "C++", "CSS", "Diff", "Go",
    "HTML", "XML", "JSON", "Java", "JavaScript",
    "Kotlin", "Less", "Lua", "Makefile", "Markdown",
    "Objective-C", "PHP", "Perl", "PlainText",
    "Python", "R", "Ruby", "Rust", "SCSS",
    "SQL", "ShellSession", "Swift", "TOML",
    "INI", "TypeScript", "VB.NET", "YAML"
].forEach(function(lang) {
    let option = document.createElement('option');
    option.innerText = lang;
    option.setAttribute('value', lang);
    document.getElementById('language').appendChild(option);
});
document.getElementById('language').value = 'PlainText';

async function newPaste(event) {
    event.preventDefault();
    let data = document.getElementById('dustbinData').value;
    let language = document.getElementById('language').value;
    if (data == '') return alert('No data to paste');
    let paste = await axios.post(
        '/api/new',
        {
            data: data,
            language: language,
        },
    );
    window.location.href = '/paste/' + paste.data.id;
}