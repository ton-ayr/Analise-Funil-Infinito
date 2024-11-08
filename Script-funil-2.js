console.clear();

const COLORS = {
    success: '#bada55',
    warning: '#FFD700',
    error: '#FF0000',
    info: '#00BFFF'
};

let funnels = [];
let problems = [];
let warnings = [];
let emails = [];

let qtdProblems = 0;
let qtdWarnings = 0;

// Função auxiliar para log de mensagens
function logMessage(type, message) {
    console.log(`%c${message}`, `color: ${COLORS[type]}`);
}

// Função para buscar scripts de funil
function findFunnelScripts() {
    document.querySelectorAll('script').forEach(element => {
        if (element.textContent.includes('edz_loadscript')) {
            funnels.push(element);
        }
    });

    if (funnels.length > 1) warnings.push('Foi localizado mais de um script de funil infinito.');
    if (funnels.length === 0) problems.push('Script do funil infinito não foi localizado.');
}

// Função para buscar formulários e campos de e-mail
function findEmailFields() {
    document.querySelectorAll('form').forEach(form => {
        const emailInputs = Array.from(form.querySelectorAll('input'))
            .filter(input => input.type === 'email' || input.name.toLowerCase().includes('email'));

        emails.push(...emailInputs);

        if (emailInputs.length === 0) {
            problems.push('Campo email dentro do formulário não foi localizado.');
        } else if (emails.length > 1) {
            warnings.push('Mais de um formulário que possui preenchimento de email foi localizado.');
        }
    });
}

// Função para verificar configurações do funil
function checkFunnelSetup() {
    if (funnels.length > 0) {
        logMessage('success', 'Script de Funil Infinito localizado:');
        funnels.forEach(funnel => logMessage('info', funnel.textContent));
    }

    if (problems.length === 0 && emails.length > 0) {
        const funnelKey = 'funnel_key_example';
        const funnelLevel = 'funnel_level_example';
        const emailFieldName = emails[0].name;

        const newScript = `
            <script>
            var funnel_key = '${funnelKey}';
            var funnel_level = '${funnelLevel}';
            var field_email = '${emailFieldName}';
            var edz_loadscript = document.createElement('script');
            edz_loadscript.src = 'https://eduzz.com/dev/js/ea.js?v=1.0';
            document.getElementsByTagName('head')[0].appendChild(edz_loadscript);
            </script>`;

        navigator.clipboard.writeText(newScript);
        logMessage('info', 'Novo script copiado para a área de transferência.');
    }
}

// Função para exibir resultados finais
function displayResults() {
    qtdProblems = problems.length;
    qtdWarnings = warnings.length;

    console.log(`Quantidade de problemas: ${qtdProblems}\nQuantidade de avisos: ${qtdWarnings}`);

    problems.forEach((problem, index) => logMessage('error', `Problema #${index.toString().padStart(2, '0')}: ${problem}`));
    warnings.forEach((warning, index) => logMessage('warning', `Aviso #${index.toString().padStart(2, '0')}: ${warning}`));

    if (qtdProblems === 0) {
        logMessage('success', "Nenhum problema grave foi localizado.\nVerifique se a opção do Funil está ativa após preencher o formulário.");
    }
}

// Executando as funções
findFunnelScripts();
findEmailFields();
checkFunnelSetup();
displayResults();
