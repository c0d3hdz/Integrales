function calcularIntegral() {
    const a = parseFloat(document.getElementById('a').value)
    const b = parseFloat(document.getElementById('b').value)
    const funcionStr = document.getElementById('funcion').value

    try {
        const f = new Function('x', `return ${funcionStr};`)

        const calcularIntegralDefinida = (inicio, fin) => {
            const n = 100000 // Número para manejar mejor los decimales usando parte de la Suma de Riemann

            const dx = (fin - inicio) / n
            let integral = 0
            for (let i = 0; i < n; i++) {
                const xi = inicio + i * dx
                integral += f(xi) * dx
            }
            return integral
        }

        let resultado = 0

        if (a < 0 && b > 0) {
            const integralA = calcularIntegralDefinida(a, 0)
            const integralB = calcularIntegralDefinida(0, b)
            resultado = Math.abs(integralA - integralB)
        } else {
            resultado = calcularIntegralDefinida(a, b)
        }
        document.getElementById('resultado').innerText = `Resultado aproximado: ${resultado.toFixed(1)}`
    } catch (error) {
        document.getElementById('resultado').innerText = 'Error en la función ingresada.'
        console.error(error)
    }
}
