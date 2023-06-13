let presupuesto = 0;
let gastoTotal = 0;
let saldo = 0;
const presupuestoElement = document.getElementById("presupuesto");
const gastoElement = document.getElementById("gasto");
const saldoElement = document.getElementById("saldo");
const presupuestoForm = document.getElementById("presupuestoForm");
const presupuestoInput = document.getElementById("presupuestoInput");
const gastoForm = document.getElementById("gastoForm");
const nombreGastoInput = document.getElementById("nombreGasto");
const cantidadGastoInput = document.getElementById("cantidadGasto");
const gastosTableBody = document.getElementById("gastosTableBody");

// Evento de envío del formulario de presupuesto
presupuestoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cantidadPresupuesto = parseFloat(presupuestoInput.value);

  if (!isNaN(cantidadPresupuesto) && cantidadPresupuesto > 0) {
    presupuesto = cantidadPresupuesto;
    gastoTotal = 0;
    saldo = presupuesto;
    presupuestoElement.textContent = "$" + presupuesto.toFixed(0);
    gastoElement.textContent = "$" + gastoTotal.toFixed(0);
    saldoElement.textContent = "$" + saldo.toFixed(0);
    presupuestoInput.value = "";
  } else {
    alert("Ingrese una cantidad válida.");
  }
});

// Evento de envío del formulario de gasto
gastoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const nombreGasto = nombreGastoInput.value;
  const cantidadGasto = parseFloat(cantidadGastoInput.value);

  if (!isNaN(cantidadGasto) && cantidadGasto > 0 && cantidadGasto <= saldo) {
    // Crear nueva fila en la tabla de gastos
    const newRow = document.createElement("tr");
    newRow.innerHTML =
      "<td>" +
      nombreGasto +
      "</td><td>" +
      cantidadGasto.toFixed(0) +
      '</td><td><button class="btn btn-primary"><i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></button></td>';
    gastosTableBody.appendChild(newRow);

    // Actualizar el saldo en el DOM
    saldo -= cantidadGasto;
    presupuestoElement.textContent = "$" + presupuesto.toFixed(0);
    gastoTotal += cantidadGasto;
    gastoElement.textContent = "$" + gastoTotal.toFixed(0);
    saldoElement.textContent = "$" + saldo.toFixed(0);

    nombreGastoInput.value = "";
    cantidadGastoInput.value = "";
  } else {
    alert("Ingrese un gasto válido.");
  }
});

// Evento de clic en el botón de eliminar gasto
gastosTableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn")) {
    const fila = event.target.parentNode.parentNode;
    const cantidadGasto = parseFloat(fila.children[1].textContent);

    // Restar el gasto eliminado al saldo
    saldo += cantidadGasto;

    // Eliminar la fila de la tabla
    fila.remove();

    // Actualizar el saldo en el DOM
    saldoElement.textContent = "$" + saldo.toFixed(0);
  }
});
