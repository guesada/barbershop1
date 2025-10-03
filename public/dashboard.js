// Funções para o Dashboard do Cliente
console.log("🚀 Carregando dashboard.js...");

// Dados de exemplo
const agendamentos = [
    {id: 1, servico: "Corte + Barba", barbeiro: "Carlos Mendes", data: "2025-10-03", horario: "14:00", status: "confirmado", preco: 45},
    {id: 2, servico: "Corte Simples", barbeiro: "Roberto Silva", data: "2025-10-04", horario: "16:30", status: "pendente", preco: 25}
];

const historico = [
    {id: 3, servico: "Barba Completa", barbeiro: "Carlos Mendes", data: "2025-09-28", horario: "10:00", status: "concluido", preco: 20},
    {id: 4, servico: "Sobrancelha", barbeiro: "André Costa", data: "2025-09-25", horario: "15:30", status: "concluido", preco: 15}
];

function showDashboardSection(section) {
    console.log("Mostrando seção do dashboard:", section);
    document.querySelectorAll(".content-section").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(section);
    if (target) {
        target.classList.add("active");
        if (section === "agendamentos-cliente") loadAgendamentosCliente();
        if (section === "historico-cliente") loadHistoricoCliente();
        // Limpar artefatos visuais apenas dentro da seção alvo
        cleanupArtifacts(target);
    } else {
        // Se não encontrar, volta para o home do cliente
        document.getElementById("home-cliente").classList.add("active");
    }
}

function loadAgendamentosCliente() {
    const container = document.getElementById("agendamentos-lista");
    if (!container) return;
    container.innerHTML = agendamentos.map(a => `
        <div class="appointment-card theme-card">
            <h4>${a.servico}</h4>
            <p><i class="fas fa-user"></i> <strong>Barbeiro:</strong> ${a.barbeiro}</p>
            <p><i class="fas fa-calendar"></i> <strong>Data:</strong> ${a.data} às ${a.horario}</p>
            <p class="status status-${a.status}"><i class="fas fa-info-circle"></i> <strong>Status:</strong> ${a.status}</p>
        </div>
    `).join("");
    // Sanitizar possíveis artefatos no container
    cleanupArtifacts(container);
}

function loadHistoricoCliente() {
    const container = document.getElementById("historico-lista");
    if (!container) return;
    container.innerHTML = historico.map(h => `
        <div class="history-card theme-card">
            <h4>${h.servico}</h4>
            <p><i class="fas fa-user-tie"></i> <strong>Barbeiro:</strong> ${h.barbeiro}</p>
            <p><i class="fas fa-calendar-alt"></i> <strong>Data:</strong> ${h.data} às ${h.horario}</p>
            <p class="status status-${h.status}"><i class="fas fa-check-circle"></i> <strong>Status:</strong> ${h.status}</p>
        </div>
    `).join("");
    // Sanitizar possíveis artefatos no container
    cleanupArtifacts(container);
}

// Funções de ação
function showAgendamento() {
  // Abrir modal de agendamento como no comportamento original
  const modal = document.getElementById('modal-agendamento');
  if (!modal) { console.warn('Modal de agendamento não encontrado'); return; }
  modal.classList.remove('hidden');

  // Preencher selects com dados básicos
  const selectBarbeiro = document.getElementById('select-barbeiro');
  const selectServico = document.getElementById('select-servico');
  const inputData = document.getElementById('input-data');
  const selectHorario = document.getElementById('select-horario');

  try {
    const barbeiros = [
      { id: 1, nome: 'Carlos Mendes' },
      { id: 2, nome: 'Roberto Silva' }
    ];
    const servicos = [
      { id: 1, nome: 'Corte + Barba', preco: 45 },
      { id: 2, nome: 'Corte Simples', preco: 25 }
    ];
    const horarios = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'];

    if (selectBarbeiro) {
      selectBarbeiro.innerHTML = '<option value="">Selecione um barbeiro</option>' +
        barbeiros.map(b => `<option value="${b.id}">${b.nome}</option>`).join('');
    }
    if (selectServico) {
      selectServico.innerHTML = '<option value="">Selecione um serviço</option>' +
        servicos.map(s => `<option value="${s.id}">${s.nome} - R$ ${s.preco}</option>`).join('');
    }
    if (inputData) {
      inputData.min = new Date().toISOString().split('T')[0];
    }
    if (selectHorario) {
      selectHorario.innerHTML = '<option value="">Selecione um horário</option>' +
        horarios.map(h => `<option value="${h}">${h}</option>`).join('');
    }
  } catch (e) {
    console.warn('Falha ao preparar modal de agendamento', e);
  }
}

function agendarComBarbeiro(id) {
  // Abre o modal já com barbeiro selecionado
  showAgendamento();
  const selectBarbeiro = document.getElementById('select-barbeiro');
  if (selectBarbeiro) {
    selectBarbeiro.value = String(id);
  }
}

// Sobrescreve a função global se necessário, ou usa um nome diferente
window.showDashboardSection = showDashboardSection;

console.log("✅ dashboard.js carregado!");

// Forçar tema escuro por padrão no dashboard
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('dark-theme');
  cleanupArtifacts(document.body);
});

// Remove nós de texto com artefatos como "`n", "'n" ou apenas "n" em uma raiz específica
function cleanupArtifacts(rootEl) {
  try {
    const root = rootEl || document.body;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const toClean = [];
    while (walker.nextNode()) {
      const t = walker.currentNode;
      if (!t) continue;
      const v = (t.nodeValue || '').trim();
      if (v === 'n' || v === 'N' || /^[`'´’]?n$/i.test(v)) {
        toClean.push(t);
      }
    }
    toClean.forEach(node => node.nodeValue = '');
  } catch (e) {
    console.warn('cleanupArtifacts error', e);
  }
}
