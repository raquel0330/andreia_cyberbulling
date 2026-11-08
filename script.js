
/* =====================================
   DADOS DA PESQUISA
===================================== */

// Pergunta 1: experiências com cyberbullying
const experienceData = [22, 8, 2];

// Pergunta 2: opinião sobre a relação
// entre desinformação e cyberbullying
const opinionData = [32, 0, 0];

const labels = [
  "Sim",
  "Não",
  "Não tenho certeza"
];

const colors = [
  "#5E9FE8",
  "#9678E8",
  "#D4D9E9"
];


/* =====================================
   TOTAL DE PARTICIPANTES
===================================== */

const total = experienceData.reduce(
  (sum, value) => sum + value,
  0
);

document.getElementById("totalResponses").textContent = total;


/* =====================================
   CONFIGURAÇÕES GERAIS
===================================== */

Chart.defaults.font.family = "DM Sans";
Chart.defaults.color = "#77768B";

const commonTooltip = {
  backgroundColor: "#29283F",
  titleColor: "#FFFFFF",
  bodyColor: "#FFFFFF",
  padding: 12,
  cornerRadius: 9,
  displayColors: true
};


/* =====================================
   GRÁFICO 1 — PIZZA
===================================== */

const experienceChart = new Chart(
  document.getElementById("experienceChart"),
  {
    type: "pie",

    data: {
      labels: labels,

      datasets: [{
        data: experienceData,
        backgroundColor: colors,
        borderColor: "#FFFFFF",
        borderWidth: 4,
        hoverOffset: 10
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        },

        tooltip: {
          ...commonTooltip,

          callbacks: {
            label: function(context) {

              const value = context.raw;

              const sum = context.dataset.data.reduce(
                (a, b) => a + b,
                0
              );

              const percentage = sum
                ? ((value / sum) * 100).toFixed(1)
                : 0;

              return ` ${value} respostas (${percentage}%)`;

            }
          }
        }
      }
    }
  }
);


/* =====================================
   GRÁFICO 2 — BARRAS
===================================== */

const opinionChart = new Chart(
  document.getElementById("opinionChart"),
  {
    type: "bar",

    data: {
      labels: labels,

      datasets: [{
        label: "Participantes",
        data: opinionData,
        backgroundColor: colors,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 23
      }]
    },

    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        },

        tooltip: {
          ...commonTooltip,

          callbacks: {
            label: function(context) {
              return ` ${context.raw} participantes`;
            }
          }
        }
      },

      scales: {
        x: {
          beginAtZero: true,

          ticks: {
            precision: 0,
            color: "#858297"
          },

          grid: {
            color: "#EEEAF5"
          },

          border: {
            display: false
          }
        },

        y: {
          ticks: {
            color: "#5F5C75",

            font: {
              size: 11
            }
          },

          grid: {
            display: false
          },

          border: {
            display: false
          }
        }
      }
    }
  }
);


/* =====================================
   FILTRO GERAL DE VISUALIZAÇÃO
===================================== */

const viewFilter = document.getElementById("viewFilter");

const experiencePanel = document.getElementById("experiencePanel");

const opinionPanel = document.getElementById("opinionPanel");

viewFilter.addEventListener("change", function() {

  const selected = viewFilter.value;

  // Mostra ou esconde o primeiro gráfico
  experiencePanel.hidden = selected === "opinion";

  // Mostra ou esconde o segundo gráfico
  opinionPanel.hidden = selected === "experience";

});


/* =====================================
   FILTRO DE DADOS — GRÁFICO 1
   EXPERIÊNCIAS
===================================== */

const experienceFilter = document.getElementById("experienceFilter");

experienceFilter.addEventListener("change", function() {

  const selected = experienceFilter.value;

  if (selected === "highlight") {

    // Identifica a maior quantidade de respostas
    const maxValue = Math.max(...experienceData);

    // Destaca a resposta predominante
    experienceChart.data.datasets[0].backgroundColor =
      experienceData.map((value, index) => {

        return value === maxValue && value > 0
          ? colors[index]
          : "#E9EAF1";

      });

  } else {

    // Restaura as cores originais
    experienceChart.data.datasets[0].backgroundColor = [...colors];

  }

  experienceChart.update();

});


/* =====================================
   FILTRO DE DADOS — GRÁFICO 2
   OPINIÕES
===================================== */

const opinionFilter = document.getElementById("opinionFilter");

opinionFilter.addEventListener("change", function() {

  const selected = opinionFilter.value;

  if (selected === "highlight") {

    // Identifica a maior quantidade de respostas
    const maxValue = Math.max(...opinionData);

    // Destaca a resposta predominante
    opinionChart.data.datasets[0].backgroundColor =
      opinionData.map((value, index) => {

        return value === maxValue && value > 0
          ? colors[index]
          : "#E9EAF1";

      });

  } else {

    // Restaura as cores originais
    opinionChart.data.datasets[0].backgroundColor = [...colors];

  }

  opinionChart.update();

});


/* =====================================
   FIM DO DASHBOARD
===================================== */
