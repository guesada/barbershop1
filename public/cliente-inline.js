// Funcionalidades inline para o cliente
console.log('🚀 Carregando funcionalidades inline do cliente...');

// Dados de exemplo para agendamentos
const agendamentosExemplo = [
    {
        id: 1,
        servico_nome: 'Corte + Barba',
        barbeiro_nome: 'Carlos Mendes',
        data: '2025-10-03',
        horario: '14:00',
        status: 'confirmado',
        servico_preco: 45,
        observacoes: 'Corte social, barba aparada'
    },
    {
        id: 2,
        servico_nome: 'Corte Simples',
        barbeiro_nome: 'Roberto Silva',
        data: '2025-10-04',
        horario: '16:30',
        status: 'pendente',
        servico_preco: 25,
        observacoes: ''
    }
];

const historicoExemplo = [
    {
        id: 3,
        servico_nome: 'Barba Completa',
        barbeiro_nome: 'Carlos Mendes',
        data: '2025-09-28',
        horario: '10:00',
        status: 'concluido',
        servico_preco: 20,
        observacoes: 'Cliente regular',
        data_criacao: '2025-09-27T16:20:00'
    },
    {
        id: 4,
        servico_nome: 'Sobrancelha',
        barbeiro_nome: 'André Costa',
        data: '2025-09-25',
        horario: '15:30',
        status: 'concluido',
        servico_preco: 15,
        observacoes: 'Primeira vez',
        data_criacao: '2025-09-24T11:45:00'
    }
];

// Função para mostrar seções
function showSection(sectionName) {
    console.log('📱 Mostrando seção:', sectionName);
    
    // Remover active de todas as seções
    document.querySelectorAll('.client-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover active de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ativar seção
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Ativar botão correspondente
        const buttons = document.querySelectorAll('.nav-btn');
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(sectionName)) {
                btn.classList.add('active');
            }
        });
        
        // Carregar dados específicos
        if (sectionName === 'agendamentos') {
            carregarAgendamentos();
        } else if (sectionName === 'historico') {
            carregarHistorico();
        }
        
        console.log('✅ Seção ativada:', sectionName);
    }
}

// Função para carregar agendamentos
function carregarAgendamentos() {
    console.log('📅 Carregando agendamentos...');
    
    const container = document.getElementById('appointments-list');
    if (!container) {
        console.error('❌ Container não encontrado');
        return;
    }
    
    if (agendamentosExemplo.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 10px; border: 2px dashed #ddd;">
                <i class="fas fa-calendar-times" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666;">Nenhum agendamento encontrado</h3>
                <p style="color: #999;">Você não possui agendamentos futuros.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = agendamentosExemplo.map(agendamento => `
        <div style="background: white; border-radius: 15px; padding: 20px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-left: 4px solid #d4af37;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0;">
                <div>
                    <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #333; margin-bottom: 5px;">
                        <i class="fas fa-calendar" style="color: #d4af37;"></i>
                        <span>${formatarDataSimples(agendamento.data)}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; color: #666;">
                        <i class="fas fa-clock"></i>
                        <span>${agendamento.horario}</span>
                    </div>
                </div>
                <div style="padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; ${getStatusStyle(agendamento.status)}">
                    <i class="fas fa-${getStatusIcon(agendamento.status)}"></i>
                    ${agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="margin-bottom: 15px;">
                    <h3 style="margin: 0 0 5px 0; color: #333; font-size: 1.2rem;">${agendamento.servico_nome}</h3>
                    <p style="color: #d4af37; font-weight: bold; font-size: 1.1rem; margin: 0;">R$ ${agendamento.servico_preco.toFixed(2)}</p>
                </div>
                
                <div style="display: flex; align-items: center; gap: 8px; color: #666; margin-bottom: 10px;">
                    <i class="fas fa-user" style="color: #d4af37;"></i>
                    <span>${agendamento.barbeiro_nome}</span>
                </div>
                
                ${agendamento.observacoes ? `
                    <div style="display: flex; align-items: flex-start; gap: 8px; color: #666; font-style: italic; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                        <i class="fas fa-sticky-note" style="color: #6c757d; margin-top: 2px;"></i>
                        <span>${agendamento.observacoes}</span>
                    </div>
                ` : ''}
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${agendamento.status === 'pendente' ? `
                    <button onclick="editarAgendamento(${agendamento.id})" style="padding: 8px 16px; font-size: 0.9rem; border-radius: 8px; border: 2px solid #d4af37; background: transparent; color: #d4af37; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button onclick="cancelarAgendamento(${agendamento.id})" style="padding: 8px 16px; font-size: 0.9rem; border-radius: 8px; border: none; background: #dc3545; color: white; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                ` : `
                    <button onclick="verDetalhes(${agendamento.id})" style="padding: 8px 16px; font-size: 0.9rem; border-radius: 8px; border: 2px solid #d4af37; background: transparent; color: #d4af37; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-eye"></i> Ver Detalhes
                    </button>
                `}
            </div>
        </div>
    `).join('');
    
    console.log('✅ Agendamentos carregados');
}

// Função para carregar histórico
function carregarHistorico() {
    console.log('📚 Carregando histórico...');
    
    const container = document.getElementById('historico-lista');
    if (!container) {
        console.error('❌ Container de histórico não encontrado');
        return;
    }
    
    if (historicoExemplo.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 10px; border: 2px dashed #ddd;">
                <i class="fas fa-history" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666;">Nenhum histórico encontrado</h3>
                <p style="color: #999;">Você ainda não possui histórico de agendamentos.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = historicoExemplo.map(agendamento => `
        <div style="background: white; border-radius: 15px; padding: 20px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-left: 4px solid #6c757d;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0;">
                <div>
                    <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #333;">
                        <i class="fas fa-calendar" style="color: #d4af37;"></i>
                        <span>${formatarDataSimples(agendamento.data)} às ${agendamento.horario}</span>
                    </div>
                </div>
                <div style="padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; ${getStatusStyle(agendamento.status)}">
                    <i class="fas fa-${getStatusIcon(agendamento.status)}"></i>
                    ${agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="margin-bottom: 15px;">
                    <h3 style="margin: 0 0 5px 0; color: #333; font-size: 1.2rem;">${agendamento.servico_nome}</h3>
                    <p style="color: #d4af37; font-weight: bold; font-size: 1.1rem; margin: 0;">R$ ${agendamento.servico_preco.toFixed(2)}</p>
                </div>
                
                <div style="display: flex; align-items: center; gap: 8px; color: #666; margin-bottom: 10px;">
                    <i class="fas fa-scissors" style="color: #d4af37;"></i>
                    <span>Atendido por ${agendamento.barbeiro_nome}</span>
                </div>
                
                ${agendamento.observacoes ? `
                    <div style="display: flex; align-items: flex-start; gap: 8px; color: #666; font-style: italic; margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                        <i class="fas fa-sticky-note" style="color: #6c757d; margin-top: 2px;"></i>
                        <span>${agendamento.observacoes}</span>
                    </div>
                ` : ''}
                
                <div style="display: flex; align-items: center; gap: 8px; color: #999; font-size: 0.85rem;">
                    <i class="fas fa-clock"></i>
                    <small>Agendado em ${formatarDataHora(agendamento.data_criacao)}</small>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${agendamento.status === 'concluido' ? `
                    <button onclick="avaliarServico(${agendamento.id})" style="padding: 8px 16px; font-size: 0.9rem; border-radius: 8px; border: 2px solid #d4af37; background: transparent; color: #d4af37; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-star"></i> Avaliar
                    </button>
                    <button onclick="reagendarServico(${agendamento.id})" style="padding: 8px 16px; font-size: 0.9rem; border-radius: 8px; border: none; background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); color: #1a1a1a; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-redo"></i> Reagendar
                    </button>
                ` : `
                    <button onclick="verDetalhes(${agendamento.id})" style="padding: 8px 16px; font-size: 0.9rem; border-radius: 8px; border: 2px solid #d4af37; background: transparent; color: #d4af37; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-eye"></i> Ver Detalhes
                    </button>
                `}
            </div>
        </div>
    `).join('');
    
    console.log('✅ Histórico carregado');
}

// Funções auxiliares
function formatarDataSimples(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
}

function formatarDataHora(dataString) {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getStatusIcon(status) {
    const icons = {
        'pendente': 'clock',
        'confirmado': 'check-circle',
        'concluido': 'check-double',
        'cancelado': 'times-circle'
    };
    return icons[status] || 'question-circle';
}

function getStatusStyle(status) {
    const styles = {
        'pendente': 'background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;',
        'confirmado': 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;',
        'concluido': 'background: #e2e3e5; color: #383d41; border: 1px solid #d6d8db;',
        'cancelado': 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
    };
    return styles[status] || '';
}

// Funções de ação
function editarAgendamento(id) {
    alert(`Editando agendamento ID: ${id}`);
}

function cancelarAgendamento(id) {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
        alert(`Agendamento ${id} cancelado com sucesso!`);
        carregarAgendamentos();
    }
}

function verDetalhes(id) {
    const agendamento = [...agendamentosExemplo, ...historicoExemplo].find(a => a.id === id);
    if (agendamento) {
        alert(`Detalhes do Agendamento:
        
Serviço: ${agendamento.servico_nome}
Barbeiro: ${agendamento.barbeiro_nome}
Data: ${formatarDataSimples(agendamento.data)}
Horário: ${agendamento.horario}
Preço: R$ ${agendamento.servico_preco.toFixed(2)}
Status: ${agendamento.status}`);
    }
}

function avaliarServico(id) {
    const avaliacao = prompt('Avalie o serviço (1-5 estrelas):');
    if (avaliacao && avaliacao >= 1 && avaliacao <= 5) {
        alert(`Obrigado pela avaliação de ${avaliacao} estrelas!`);
    }
}

function reagendarServico(id) {
    alert(`Reagendando serviço ID: ${id}`);
}

// Disponibilizar funções globalmente
window.showSection = showSection;
window.carregarAgendamentos = carregarAgendamentos;
window.carregarHistorico = carregarHistorico;
window.editarAgendamento = editarAgendamento;
window.cancelarAgendamento = cancelarAgendamento;
window.verDetalhes = verDetalhes;
window.avaliarServico = avaliarServico;
window.reagendarServico = reagendarServico;

console.log('✅ Funcionalidades inline do cliente carregadas!');
