const canvas = document.getElementById('grafico')
const ctx = canvas.getContext('2d')

function f(x) {
    return eval(document.getElementById('funcion').value)
}

function calcularIntegral() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const a = parseFloat(document.getElementById('a').value)
    const b = parseFloat(document.getElementById('b').value)
    const n = parseInt(document.getElementById('n').value)
    const dx = (b - a) / n

    let integral = 0
    for (let i = 0; i < n; i++) {
        const x0 = a + i * dx
        const x1 = x0 + dx
        integral += ((f(x0) + f(x1)) * dx) / 2
    }

    document.getElementById('resultado').innerHTML = `Resultado de la integral: ${integral.toFixed(4)} unidades cuadradas`

    dibujarGrafico(a, b, n)
}
//grafica
function dibujarGrafico(a, b, n) {
    const dx = (b - a) / n
    let maxY = -Infinity
    let minY = Infinity

    for (let x = a; x <= b; x += dx) {
        const y = f(x)
        if (y > maxY) maxY = y
        if (y < minY) minY = y
    }

    const escalaX = canvas.width / (b - a)
    const escalaY = canvas.height / (maxY - minY)

    ctx.beginPath()
    ctx.strokeStyle = '#000'

    const yCero = canvas.height + minY * escalaY
    ctx.moveTo(0, yCero)
    ctx.lineTo(canvas.width, yCero)

    const xCero = -a * escalaX
    ctx.moveTo(xCero, 0)
    ctx.lineTo(xCero, canvas.height)

    ctx.stroke()

    ctx.beginPath()
    ctx.fillStyle = 'rgba(0, 150, 255, 0.3)'
    ctx.moveTo(0, yCero)

    for (let i = 0; i <= n; i++) {
        const x = a + i * dx
        const y = f(x)

        const px = (x - a) * escalaX
        const py = canvas.height - (y - minY) * escalaY

        if (i === 0) ctx.lineTo(px, yCero)
        ctx.lineTo(px, py)
        if (i === n) ctx.lineTo(px, yCero)
    }

    ctx.closePath()
    ctx.fill()
    ctx.stroke()
}

calcularIntegral()
