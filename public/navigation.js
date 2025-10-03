// Sistema de Navegação - Elite Barber Shop

// Função para selecionar tipo de usuário
function selectUserType(userType) {
    if (userType === 'cliente') {
        showScreen('login-cliente');
    } else if (userType === 'barbeiro') {
        showScreen('login-barbeiro');
    }
}

// Função para voltar à tela inicial
function goBack() {
    window.location.href = '/';
}

// Verificar se usuário já está logado e redirecionar
function checkExistingAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && user.role) {
        if (user.role === 'cliente') {
            window.location.href = '/cliente.html';
        } else if (user.role === 'barbeiro') {
            window.location.href = '/barbeiro.html';
        }
    }
}

// Função de login
async function handleLogin(userType, email, password) {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Verificar se o tipo de usuário corresponde
            if (data.user.role !== userType) {
                alert('Tipo de usuário incorreto. Verifique se você está acessando a área correta.');
                return false;
            }
            
            // Salvar dados do usuário
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirecionar para a tela apropriada
            if (userType === 'cliente') {
                window.location.href = '/cliente.html';
            } else if (userType === 'barbeiro') {
                window.location.href = '/barbeiro.html';
            }
            
            return true;
        } else {
            alert('Erro no login: ' + data.message);
            return false;
        }
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro de conexão. Tente novamente.');
        return false;
    }
}

// Função de registro
async function handleRegister(userData) {
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            return true;
        } else {
            alert('Erro no cadastro: ' + data.message);
            return false;
        }
    } catch (error) {
        console.error('Erro no cadastro:', error);
        alert('Erro de conexão. Tente novamente.');
        return false;
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Se estiver na página inicial, verificar se já tem usuário logado
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        checkExistingAuth();
    }
    
    // Configurar formulários de login se existirem
    const loginClienteForm = document.getElementById('login-cliente-form');
    if (loginClienteForm) {
        loginClienteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const email = formData.get('email');
            const password = formData.get('password');
            
            await handleLogin('cliente', email, password);
        });
    }
    
    const loginBarbeiroForm = document.getElementById('login-barbeiro-form');
    if (loginBarbeiroForm) {
        loginBarbeiroForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const email = formData.get('email');
            const password = formData.get('password');
            
            await handleLogin('barbeiro', email, password);
        });
    }
    
    // Configurar formulários de registro se existirem
    const registerClienteForm = document.getElementById('register-cliente-form');
    if (registerClienteForm) {
        registerClienteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            const userData = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                phone: formData.get('phone'),
                role: 'cliente'
            };
            
            const success = await handleRegister(userData);
            if (success) {
                // Voltar para tela de login
                showScreen('login-cliente');
            }
        });
    }
    
    const registerBarbeiroForm = document.getElementById('register-barbeiro-form');
    if (registerBarbeiroForm) {
        registerBarbeiroForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            const userData = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                phone: formData.get('phone'),
                specialties: formData.get('specialties'),
                role: 'barbeiro'
            };
            
            const success = await handleRegister(userData);
            if (success) {
                // Voltar para tela de login
                showScreen('login-barbeiro');
            }
        });
    }
});

// Função para mostrar telas (se ainda usar o sistema de telas)
function showScreen(screenId) {
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar tela específica
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Função para ir para registro
function goToRegister(userType) {
    if (userType === 'cliente') {
        showScreen('register-cliente');
    } else if (userType === 'barbeiro') {
        showScreen('register-barbeiro');
    }
}

// Função para mostrar registro (compatibilidade)
function showRegister(userType) {
    goToRegister(userType);
}

// Função para ir para login
function goToLogin(userType) {
    if (userType === 'cliente') {
        showScreen('login-cliente');
    } else if (userType === 'barbeiro') {
        showScreen('login-barbeiro');
    }
}

// Função para mostrar login (compatibilidade)
function showLogin(userType) {
    goToLogin(userType);
}

// Funções auxiliares para termos e privacidade
function showTerms() {
    alert('Termos de Uso:\n\nEste é um sistema de agendamento para barbearias. Ao usar este sistema, você concorda em fornecer informações precisas e usar o serviço de forma responsável.');
}

function showPrivacy() {
    alert('Política de Privacidade:\n\nSeus dados pessoais são protegidos e utilizados apenas para o funcionamento do sistema de agendamento. Não compartilhamos suas informações com terceiros.');
}
