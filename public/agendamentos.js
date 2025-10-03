// ==========================================
// FUNÇÕES PARA VER AGENDAMENTOS E HISTÓRICO
// ==========================================

// Dados mock para agendamentos
const agendamentosData = [
  {
    id: 1,
    cliente_nome: 'João Silva',
    cliente_email: 'joao@cliente.com',
    barbeiro_nome: 'Carlos Mendes',
    barbeiro_id: 1,
    servico_nome: 'Corte + Barba',
    servico_preco: 45,
    data: '2025-10-03',
    horario: '14:00',
    status: 'confirmado',
    observacoes: 'Corte social, barba aparada',
    data_criacao: '2025-10-02T10:30:00'
  },
  {
    id: 2,
    cliente_nome: 'Maria Santos',
    cliente_email: 'maria@cliente.com',
    barbeiro_nome: 'Roberto Silva',
    barbeiro_id: 2,
    servico_nome: 'Corte Simples',
    servico_preco: 25,
    data: '2025-10-04',
    horario: '16:30',
    status: 'pendente',
    observacoes: '',
    data_criacao: '2025-10-02T14:15:00'
  },
  {
    id: 3,
    cliente_nome: 'Pedro Costa',
    cliente_email: 'pedro@cliente.com',
    barbeiro_nome: 'Carlos Mendes',
    barbeiro_id: 1,
    servico_nome: 'Barba Completa',
    servico_preco: 20,
    data: '2025-09-28',
    horario: '10:00',
    status: 'concluido',
    observacoes: 'Cliente regular',
    data_criacao: '2025-09-27T16:20:00'
  },
  {
    id: 4,
    cliente_nome: 'Ana Lima',
    cliente_email: 'ana@cliente.com',
    barbeiro_nome: 'André Costa',
    barbeiro_id: 3,
    servico_nome: 'Sobrancelha',
    servico_preco: 15,
    data: '2025-09-25',
    horario: '15:30',
    status: 'concluido',
    observacoes: 'Primeira vez',
    data_criacao: '2025-09-24T11:45:00'
  },
  {
    id: 5,
    cliente_nome: 'Carlos Oliveira',
    cliente_email: 'carlos@cliente.com',
    barbeiro_nome: 'Roberto Silva',
    barbeiro_id: 2,
    servico_nome: 'Corte + Barba',
    servico_preco: 45,
    data: '2025-09-20',
    horario: '09:00',
    status: 'cancelado',
    observacoes: 'Cliente cancelou por motivos pessoais',
    data_criacao: '2025-09-19T08:30:00'
  }
];

// Função para mostrar seção de agendamentos
function showSection(sectionName) {
  console.log('📱 Mostrando seção:', sectionName);
  
  // Esconder todas as seções de conteúdo
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Mostrar seção específica
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
    
    // Carregar dados específicos da seção
    if (sectionName === 'agendamentos-cliente') {
      loadAgendamentosCliente();
    } else if (sectionName === 'historico-cliente') {
      loadHistoricoCliente();
    }
    
    console.log('✅ Seção ativada:', sectionName);
  } else {
    console.error('❌ Seção não encontrada:', sectionName);
  }
}

// Função para carregar agendamentos do cliente
function loadAgendamentosCliente() {
  console.log('📅 Carregando agendamentos do cliente...');
  
  const container = document.getElementById('appointments-list');
  if (!container) {
    console.error('❌ Container de agendamentos não encontrado');
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
        <button class="btn btn--primary" onclick="showAgendamento()">
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
          <button class="btn btn--outline" onclick="editarAgendamento(${agendamento.id})">
            <i class="fas fa-edit"></i>
            Editar
          </button>
          <button class="btn btn--danger" onclick="cancelarAgendamento(${agendamento.id})">
            <i class="fas fa-times"></i>
            Cancelar
          </button>
        ` : `
          <button class="btn btn--outline" onclick="verDetalhesAgendamento(${agendamento.id})">
            <i class="fas fa-eye"></i>
            Ver Detalhes
          </button>
        `}
      </div>
    </div>
  `).join('');
  
  console.log('✅ Agendamentos carregados:', agendamentosFuturos.length);
}

// Função para carregar histórico do cliente
function loadHistoricoCliente() {
  console.log('📚 Carregando histórico do cliente...');
  
  const container = document.getElementById('historico-lista');
  if (!container) {
    console.error('❌ Container de histórico não encontrado');
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
          <button class="btn btn--outline" onclick="avaliarServico(${agendamento.id})">
            <i class="fas fa-star"></i>
            Avaliar
          </button>
          <button class="btn btn--primary" onclick="reagendarServico(${agendamento.id})">
            <i class="fas fa-redo"></i>
            Reagendar
          </button>
        ` : `
          <button class="btn btn--outline" onclick="verDetalhesAgendamento(${agendamento.id})">
            <i class="fas fa-eye"></i>
            Ver Detalhes
          </button>
        `}
      </div>
    </div>
  `).join('');
  
  console.log('✅ Histórico carregado:', historicoAgendamentos.length);
}

// Funções auxiliares
function formatarData(dataString) {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
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

// Funções de ação para agendamentos
function editarAgendamento(id) {
  console.log('✏️ Editando agendamento:', id);
  const agendamento = agendamentosData.find(a => a.id === id);
  if (agendamento) {
    alert(`Editando agendamento: ${agendamento.servico_nome} com ${agendamento.barbeiro_nome}`);
  }
}

function cancelarAgendamento(id) {
  console.log('❌ Cancelando agendamento:', id);
  if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
    const agendamento = agendamentosData.find(a => a.id === id);
    if (agendamento) {
      agendamento.status = 'cancelado';
      loadAgendamentosCliente(); // Recarregar lista
      showNotificationToast('Agendamento cancelado com sucesso!');
    }
  }
}

function verDetalhesAgendamento(id) {
  console.log('👁️ Vendo detalhes do agendamento:', id);
  const agendamento = agendamentosData.find(a => a.id === id);
  if (agendamento) {
    alert(`Detalhes do Agendamento:
    
Serviço: ${agendamento.servico_nome}
Barbeiro: ${agendamento.barbeiro_nome}
Data: ${formatarData(agendamento.data)}
Horário: ${agendamento.horario}
Preço: R$ ${agendamento.servico_preco.toFixed(2)}
Status: ${agendamento.status}
${agendamento.observacoes ? 'Observações: ' + agendamento.observacoes : ''}`);
  }
}

function avaliarServico(id) {
  console.log('⭐ Avaliando serviço:', id);
  const agendamento = agendamentosData.find(a => a.id === id);
  if (agendamento) {
    const avaliacao = prompt(`Avalie o serviço de ${agendamento.barbeiro_nome} (1-5 estrelas):`);
    if (avaliacao && avaliacao >= 1 && avaliacao <= 5) {
      showNotificationToast(`Obrigado pela avaliação de ${avaliacao} estrelas!`);
    }
  }
}

function reagendarServico(id) {
  console.log('🔄 Reagendando serviço:', id);
  const agendamento = agendamentosData.find(a => a.id === id);
  if (agendamento) {
    alert(`Reagendando ${agendamento.servico_nome} com ${agendamento.barbeiro_nome}`);
  }
}

function showNotificationToast(message) {
  // Criar toast notification simples
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Disponibilizar funções globalmente
window.showSection = showSection;
window.loadAgendamentosCliente = loadAgendamentosCliente;
window.loadHistoricoCliente = loadHistoricoCliente;
window.editarAgendamento = editarAgendamento;
window.cancelarAgendamento = cancelarAgendamento;
window.verDetalhesAgendamento = verDetalhesAgendamento;
window.avaliarServico = avaliarServico;
window.reagendarServico = reagendarServico;

console.log('✅ Funções de agendamentos e histórico carregadas!');
