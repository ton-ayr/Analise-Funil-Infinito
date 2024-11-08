console.clear()
var searchFunnel = document.querySelectorAll('script')
var searchForm = document.querySelectorAll('form')
var findFunil = false
var findEmailForm = 0
var funnels = []
var problems = []
var warnings = []
var emails = []
var i = 0
let qtdProblems = 0
let qtdWarnings = 0

searchFunnel.forEach(element => { 
    if (element.textContent.indexOf('edz_loadscript') != -1){
        findFunil = true
        funnels[i] = element
        i++
    }
});


if(i > 1) warnings[0] = true
if (i == 0) {
    var funnel_key = null
    var field_email = null
    var funnel_level = null
}

if(findFunil === true) {
    console.log('%cScript de Funil Infinito localizado:', 'color: #bada55')
    funnels.forEach(element => {
        console.log('%c'+element.textContent, 'color: #00BFFF')})}
else   
    problems[0] = true

i = 0
searchForm.forEach(element => {
var inputs = element.querySelectorAll('input')
inputs.forEach(item => {
    var attribute = item.type
    var attribute2 = item.name
    attribute == 'email' ? (emails[i] = item, i++) : null
    if(emails.length == 0)
        (attribute2.indexOf('email') != -1 && attribute != 'email') || (attribute2.indexOf('e-mail') != -1 && attribute != 'email') ? (emails[i] = item, i++) : null});
});

searchForm.length > 1 ? warnings[1] = true : searchForm.length === 0 ? problems[1] = true : null
emails.length === 0 && searchForm.length !== 0  ? problems[2] = true : null
for(i = 0; i < emails.length; i++) if(emails[i].name == field_email){findEmailForm++}
if (problems[0] !== true)
    findEmailForm > 1 ? warnings[2] = true : findEmailForm === 0 && searchForm.length != 0 ? problems[3] = true : null

if(problems[3] === true){
    var newScript = `<script>\nvar funnel_key = '${funnel_key}';\nvar funnel_level = '${funnel_level}';\nvar field_email = '${emails[0].name}';\nvar edz_loadscript = document.createElement('script');\nedz_loadscript.src = 'https://eduzz.com/dev/js/ea.js?v=1.0';\ndocument.getElementsByTagName('head')[0].appendChild(edz_loadscript);\n</script>`
    /*Copiar novo Script para área de transferência*/
    const el = document.createElement('textarea');
    el.value = newScript;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

for(i = 0; i < 4; i++){if(problems[i] !== undefined) qtdProblems++}
for(i = 0; i < 3; i++){if(warnings[i] !== undefined) qtdWarnings++}

console.log("Quantidade de problemas: " + qtdProblems + "\nQuantidade de avisos: " + qtdWarnings)

if(qtdProblems + qtdWarnings != 0){
    if(problems[0] === true) console.log("%cProblema #00: Script do funil infinito não foi localizado.\nÉ necessário instalar o script.\nFAQ: https://ajuda.eduzz.com/?article=orbita-como-configurar-o-funil-infinito", 'color: #FF0000')
    if(problems[1] === true) console.log("%cProblema #01: Formulário de preenchimento não foi localizado.\nFunil Infinito só funciona para páginas de captura (Landing Page)\n\nVerifique se a página em questão se trata de uma página de captura ou então, se o formulário de preenchimento se encontra em outro redirecionamento da página", 'color: #FF0000')
    if(problems[2] === true) console.log(`%cProblema #02: Campo email dentro do formulario não foi localizado.\nO formulário existente não possui campos do tipo email\nO Funil Infinito só realiza rastreamentos por EMAIL`, 'color: #FF0000')
    if(problems[3] === true) {console.log(`%cProblema #03: O NOME do campo de email do formulário da página está diferente do nome definido no script do funil infinito.\n
Para solucionar, deve-se substituir o script do funil infinito atual da página para o script abaixo.\n\nObs.: O novo script já está copiado na sua área de transferência, basta colar em alguma lugar :)`,'color: #FF0000')
console.log("%c" + newScript, 'color: #FF8C00;')
}    
if(warnings[0] === true) console.log("%cAviso #00: Foi localizado mais de um script de funil infinito instalado na página. Será considerado apenas o último script instalado.\n\nO último script instalado é o último exibido acima e é o que está sendo analisado neste teste.", 'color: #FFD700;')
    if(warnings[1] === true) console.log("%cAviso #01: Foi localizado mais de um formulário que possui prenchimento de email na página.\n\nO Funil Infinto só visualizará o primeiro formulário que esteja com o mesmo nome do Funil.\n\nObs.: Nome do Funil fica localizado na váriavel field_email (https://prnt.sc/svcav3). Já o nome do campo de e-mail do formulário da página, fica localizado no atributo 'name' da tag input (https://prnt.sc/svcbz5)", 'color: #FFD700;')
    if(warnings[2] === true) console.log("%cAviso #02: Foram encontrados mais de um campo de email na página com nomes idênticos. Mesmo que seja uma duplicação de formulários, o Funil Infinto só visualizará o primeiro campo de email encontrado.\nCaso o preenchimento ocorra no segundo campo, o lead não entrará no fluxo do Funil Infinito.", 'color: #FFD700;')
}

if(qtdProblems === 0){
    console.log("%cNenhum problema grave foi localizado.\n\nCaso o funil não esteja ativo, preencha pelo menos uma vez o formulário e verifique se na edição do produto a opção do Funil está ativa (https://prnt.sc/svdbv2)\n\nObs.: Após o preenchimento do formulário, o funil deve ficar ativo em torno de 1 hora", 'color: #bada55;')
}