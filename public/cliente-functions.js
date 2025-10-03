// Funções específicas para a tela do cliente

// Sobrescrever a função showSection para o cliente
function showSection(sectionName) {
    console.log('📱 Mostrando seção do cliente:', sectionName);
    
    // Remover active de todas as seções
    document.querySelectorAll('.client-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover active de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ativar seção e botão
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Encontrar e ativar o botão correspondente
        const buttons = document.querySelectorAll('.nav-btn');
        buttons.forEach(btn => {
            if (btn.onclick && btn.onclick.toString().includes(`'${sectionName}'`)) {
                btn.classList.add('active');
            }
        });
        
        // Carregar dados específicos da seção
        if (sectionName === 'agendamentos') {
            loadAgendamentosCliente();
        } else if (sectionName === 'historico') {
            loadHistoricoCliente();
        }
        
        console.log('✅ Seção do cliente ativada:', sectionName);
    } else {
        console.error('❌ Seção não encontrada:', sectionName);
    }
}

// Função para carregar agendamentos específica do cliente
function loadAgendamentosCliente() {
    console.log('📅 Carregando agendamentos do cliente...');
    
    const container = document.getElementById('appointments-list');
    if (!container) {
        console.error('❌ Container de agendamentos não encontrado');
        return;
    }
    
    // Usar os dados do agendamentos.js
    if (typeof agendamentosData === 'undefined') {
        console.error('❌ Dados de agendamentos não carregados');
        return;
    }
    
    // Filtrar agendamentos futuros e pendentes
    const hoje = new Date();
    const agendamentosFuturos = agendamentosData.filter(agendamento => {
        const dataAgendamento = new Date(agendamento.data);
        return dataAgendamento >= hoje && agendamento.status !== 'cancelado';
    });
    
    if (agendamentosFuturos.length === 0) {
        container.innerHTML = `
            <div class="no-appointments">
                <i class="fas fa-calendar-times"></i>
                <h3>Nenhum agendamento encontrado</h3>
                <p>Você não possui agendamentos futuros.</p>
                <button class="btn btn-primary" onclick="showSection('agendar')">
                    <i class="fas fa-plus"></i>
                    Fazer Novo Agendamento
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = agendamentosFuturos.map(agendamento => `
        <div class="appointment-card" data-id="${agendamento.id}">
            <div class="appointment-header">
                <div class="appointment-date">
                    <i class="fas fa-calendar"></i>
                    <span>${formatarData(agendamento.data)}</span>
                </div>
                <div class="appointment-time">
                    <i class="fas fa-clock"></i>
                    <span>${agendamento.horario}</span>
                </div>
                <div class="appointment-status status-${agendamento.status}">
                    <i class="fas fa-${getStatusIcon(agendamento.status)}"></i>
                    ${agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                </div>
            </div>
            
            <div class="appointment-body">
                <div class="appointment-service">
                    <h3>${agendamento.servico_nome}</h3>
                    <p class="service-price">R$ ${agendamento.servico_preco.toFixed(2)}</p>
                </div>
                
                <div class="appointment-barber">
                    <i class="fas fa-user"></i>
                    <span>${agendamento.barbeiro_nome}</span>
                </div>
                
                ${agendamento.observacoes ? `
                    <div class="appointment-notes">
                        <i class="fas fa-sticky-note"></i>
                        <span>${agendamento.observacoes}</span>
                    </div>
                ` : ''}
            </div>
            
            <div class="appointment-actions">
                ${agendamento.status === 'pendente' ? `
                    <button class="btn btn-outline" onclick="editarAgendamento(${agendamento.id})">
                        <i class="fas fa-edit"></i>
                        Editar
                    </button>
                    <button class="btn btn-danger" onclick="cancelarAgendamento(${agendamento.id})">
                        <i class="fas fa-times"></i>
                        Cancelar
                    </button>
                ` : `
                    <button class="btn btn-outline" onclick="verDetalhesAgendamento(${agendamento.id})">
                        <i class="fas fa-eye"></i>
                        Ver Detalhes
                    </button>
                `}
            </div>
        </div>
    `).join('');
    
    console.log('✅ Agendamentos do cliente carregados:', agendamentosFuturos.length);
}

// Função para carregar histórico específica do cliente
function loadHistoricoCliente() {
    console.log('📚 Carregando histórico do cliente...');
    
    const container = document.getElementById('historico-lista');
    if (!container) {
        console.error('❌ Container de histórico não encontrado');
        return;
    }
    
    // Usar os dados do agendamentos.js
    if (typeof agendamentosData === 'undefined') {
        console.error('❌ Dados de agendamentos não carregados');
        return;
    }
    
    // Filtrar agendamentos passados (concluídos ou cancelados)
    const hoje = new Date();
    const historicoAgendamentos = agendamentosData.filter(agendamento => {
        const dataAgendamento = new Date(agendamento.data);
        return dataAgendamento < hoje || agendamento.status === 'concluido' || agendamento.status === 'cancelado';
    });
    
    // Ordenar por data decrescente (mais recente primeiro)
    historicoAgendamentos.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    if (historicoAgendamentos.length === 0) {
        container.innerHTML = `
            <div class="no-history">
                <i class="fas fa-history"></i>
                <h3>Nenhum histórico encontrado</h3>
                <p>Você ainda não possui histórico de agendamentos.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = historicoAgendamentos.map(agendamento => `
        <div class="history-card" data-id="${agendamento.id}">
            <div class="history-header">
                <div class="history-date">
                    <i class="fas fa-calendar"></i>
                    <span>${formatarData(agendamento.data)} às ${agendamento.horario}</span>
                </div>
                <div class="history-status status-${agendamento.status}">
                    <i class="fas fa-${getStatusIcon(agendamento.status)}"></i>
                    ${agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
                </div>
            </div>
            
            <div class="history-body">
                <div class="history-service">
                    <h3>${agendamento.servico_nome}</h3>
                    <p class="service-price">R$ ${agendamento.servico_preco.toFixed(2)}</p>
                </div>
                
                <div class="history-barber">
                    <i class="fas fa-scissors"></i>
                    <span>Atendido por ${agendamento.barbeiro_nome}</span>
                </div>
                
                ${agendamento.observacoes ? `
                    <div class="history-notes">
                        <i class="fas fa-sticky-note"></i>
                        <span>${agendamento.observacoes}</span>
                    </div>
                ` : ''}
                
                <div class="history-created">
                    <i class="fas fa-clock"></i>
                    <small>Agendado em ${formatarDataHora(agendamento.data_criacao)}</small>
                </div>
            </div>
            
            <div class="history-actions">
                ${agendamento.status === 'concluido' ? `
                    <button class="btn btn-outline" onclick="avaliarServico(${agendamento.id})">
                        <i class="fas fa-star"></i>
                        Avaliar
                    </button>
                    <button class="btn btn-primary" onclick="reagendarServico(${agendamento.id})">
                        <i class="fas fa-redo"></i>
                        Reagendar
                    </button>
                ` : `
                    <button class="btn btn-outline" onclick="verDetalhesAgendamento(${agendamento.id})">
                        <i class="fas fa-eye"></i>
                        Ver Detalhes
                    </button>
                `}
            </div>
        </div>
    `).join('');
    
    console.log('✅ Histórico do cliente carregado:', historicoAgendamentos.length);
}

// Disponibilizar funções globalmente para o cliente
window.showSection = showSection;
window.loadAgendamentosCliente = loadAgendamentosCliente;
window.loadHistoricoCliente = loadHistoricoCliente;

console.log('✅ Funções específicas do cliente carregadas!');
