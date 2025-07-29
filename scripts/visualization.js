// Modern visualization and animation script for new pages
// Uses Chart.js for advanced charts and Three.js for 3D image/animation

// --- 3D Image & Animation (Three.js) ---
function create3DScene(containerId) {
    // Load Three.js from CDN if not present
    if (!window.THREE) {
        const script = document.createElement('script')


        script.src = 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.min.js'
        script.onload = () => init3D(containerId)
        document.head.appendChild(script)
    } else {
        init3D(containerId)
    }

    function init3D(containerId) {
        const container = document.getElementById(containerId)
        if (!container) return
        const scene = new THREE.Scene()
        scene.background = new THREE.Color('#e52d27')
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth/container.offsetHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({antialias:true})
        renderer.setSize(container.offsetWidth, container.offsetHeight)
        container.appendChild(renderer.domElement)
        // Add a 3D rotating cube
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshStandardMaterial({color:'#b31217'})
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        // Lighting
        const light = new THREE.PointLight(0xffffff, 1)
        light.position.set(5,5,5)
        scene.add(light)
        camera.position.z = 3
        // Animation loop
        function animate() {
            requestAnimationFrame(animate)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            renderer.render(scene, camera)
        }
        animate()
    }
}

// --- Advanced Analysis Charts (Chart.js) ---
function createAnalysisChart(containerId, chartType, chartData, chartOptions={}) {
    // Load Chart.js from CDN if not present
    if (!window.Chart) {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
        script.onload = () => initChart(containerId, chartType, chartData, chartOptions)
        document.head.appendChild(script)
    } else {
        initChart(containerId, chartType, chartData, chartOptions)
    }

    function initChart(containerId, chartType, chartData, chartOptions) {
        const ctx = document.getElementById(containerId).getContext('2d')
        new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: Object.assign({
                plugins: {
                    legend: {display:true, labels:{color:'#b31217'}},
                    title: {display:true, text:'Analysis', color:'#e52d27'}
                },
                scales: {
                    x: {ticks:{color:'#b31217'}, grid:{color:'#e52d27'}},
                    y: {ticks:{color:'#b31217'}, grid:{color:'#e52d27'}}
                }
            }, chartOptions)
        })
    }
}

// Example usage (call these in your HTML pages):
// create3DScene('3d-container')
// createAnalysisChart('chart-container', 'line', {labels: [...], datasets: [...]})
