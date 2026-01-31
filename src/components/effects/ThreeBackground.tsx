'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mountRef.current) return

        // --- Variables ---
        let scene: THREE.Scene
        let camera: THREE.PerspectiveCamera
        let renderer: THREE.WebGLRenderer
        let particles: THREE.Points
        let gridRunners: GridRunner[] = []

        // Interaction State
        let mouseX = 0
        let mouseY = 0
        let scrollY = 0
        let targetScrollY = 0
        let scrollSpeed = 0
        let lastScrollTime = 0
        let animationFrameId: number

        // --- Classes ---

        class GridRunner {
            scene: THREE.Scene
            yLevel: number
            gridSize: number
            baseSpeed: number
            speed: number
            maxPathLength: number
            line: THREE.Line
            pathHistory: THREE.Vector3[]
            currentPos: THREE.Vector3 = new THREE.Vector3()
            targetPos: THREE.Vector3 = new THREE.Vector3()
            isMoving: boolean = false

            constructor(scene: THREE.Scene, yLevel: number, gridSize: number, startZ: number) {
                this.scene = scene
                this.yLevel = yLevel + 0.15
                this.gridSize = gridSize
                this.baseSpeed = 3.0
                this.speed = this.baseSpeed

                this.maxPathLength = 20
                const geometry = new THREE.BufferGeometry()

                const positions = new Float32Array(this.maxPathLength * 3)
                const colors = new Float32Array(this.maxPathLength * 3)

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

                const material = new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    vertexColors: true,
                    transparent: true,
                    opacity: 1.0,
                    linewidth: 1,
                    blending: THREE.AdditiveBlending
                })

                this.line = new THREE.Line(geometry, material)
                this.line.frustumCulled = false
                this.scene.add(this.line)

                this.pathHistory = []
                this.respawn(startZ)
            }

            respawn(forceZ?: number) {
                const startX = Math.floor((Math.random() - 0.5) * 20) * this.gridSize
                const z = forceZ !== undefined ? forceZ : 100

                this.currentPos = new THREE.Vector3(startX, this.yLevel, z)
                this.targetPos = this.currentPos.clone()
                this.isMoving = false

                this.pathHistory = []
                for (let i = 0; i < this.maxPathLength; i++) {
                    this.pathHistory.push(this.currentPos.clone())
                }

                this.pickNextTarget()
            }

            update(extraSpeed: number = 0) {
                if (!this.isMoving) {
                    this.pickNextTarget()
                }

                let currentSpeed = this.speed + extraSpeed

                const direction = new THREE.Vector3().subVectors(this.targetPos, this.currentPos)
                const dist = direction.length()

                if (dist < currentSpeed) {
                    this.currentPos.copy(this.targetPos)
                    this.isMoving = false

                    if (this.currentPos.z < camera.position.z - 500) {
                        this.respawn(camera.position.z + 200)
                    }
                    if (this.currentPos.z > camera.position.z + 500) {
                        this.respawn(camera.position.z - 500)
                    }
                } else {
                    direction.normalize().multiplyScalar(currentSpeed)
                    this.currentPos.add(direction)
                    this.isMoving = true
                }

                this.pathHistory.unshift(this.currentPos.clone())
                if (this.pathHistory.length > this.maxPathLength) {
                    this.pathHistory.pop()
                }

                this.updateGeometry()
            }

            updateGeometry() {
                const positions = this.line.geometry.attributes.position.array as Float32Array
                const colors = this.line.geometry.attributes.color.array as Float32Array
                const pathLen = this.pathHistory.length

                for (let i = 0; i < this.maxPathLength; i++) {
                    if (i < pathLen) {
                        const p = this.pathHistory[i]
                        positions[i * 3] = p.x
                        positions[i * 3 + 1] = p.y
                        positions[i * 3 + 2] = p.z

                        const alpha = Math.max(0, 1.0 - (i / this.maxPathLength))
                        colors[i * 3] = 0.0 * alpha
                        colors[i * 3 + 1] = 0.784 * alpha
                        colors[i * 3 + 2] = 1.0 * alpha
                    } else {
                        // Fill remaining buffer with last point or current pos to avoid artifacts
                        const p = this.pathHistory[pathLen - 1] || this.currentPos
                        positions[i * 3] = p.x
                        positions[i * 3 + 1] = p.y
                        positions[i * 3 + 2] = p.z
                        colors[i * 3] = 0; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 0;
                    }
                }
                this.line.geometry.attributes.position.needsUpdate = true
                this.line.geometry.attributes.color.needsUpdate = true
            }

            pickNextTarget() {
                const directions = []
                // Forward bias
                directions.push(new THREE.Vector3(0, 0, -this.gridSize))
                directions.push(new THREE.Vector3(0, 0, -this.gridSize))
                // Sideways
                directions.push(new THREE.Vector3(this.gridSize, 0, 0))
                directions.push(new THREE.Vector3(-this.gridSize, 0, 0))

                const nextDir = directions[Math.floor(Math.random() * directions.length)]

                // Clone currentPos to avoid modifying it directly before assignment
                this.targetPos.copy(this.currentPos).add(nextDir)

                if (Math.abs(this.targetPos.x) > 500) {
                    this.targetPos.x = this.currentPos.x
                    this.targetPos.z -= this.gridSize
                }
                this.isMoving = true
            }
        }

        // --- Functions ---

        const createParticles = () => {
            const geometry = new THREE.BufferGeometry()
            const vertices = []
            const colors = []

            for (let i = 0; i < 1500; i++) {
                const x = (Math.random() - 0.5) * 600
                const y = (Math.random() - 0.5) * 400
                const z = (Math.random() - 0.5) * 1000
                vertices.push(x, y, z)

                const color = new THREE.Color()
                color.setHSL(Math.random() * 0.1, 1.0, 0.5)
                colors.push(color.r, color.g, color.b)
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

            const material = new THREE.PointsMaterial({
                size: 0.5,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            })

            particles = new THREE.Points(geometry, material)
            scene.add(particles)
        }

        const createGrid = () => {
            const gridHelper = new THREE.GridHelper(5000, 100, 0xff4500, 0xff4500)
            if (gridHelper.material instanceof THREE.Material) {
                gridHelper.material.transparent = true
                gridHelper.material.opacity = 0.15
            }
            gridHelper.position.y = -30
            scene.add(gridHelper)
        }

        const onWindowResize = () => {
            if (!camera || !renderer) return
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        const onMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1
        }

        const onScroll = () => {
            targetScrollY = window.scrollY
            const now = Date.now()
            const dt = now - lastScrollTime
            if (dt > 0) {
                scrollSpeed = (targetScrollY - scrollY) / dt
            }
            lastScrollTime = now
        }

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate)

            scrollY += (targetScrollY - scrollY) * 0.1

            if (particles) {
                particles.rotation.y += 0.005
            }

            gridRunners.forEach(runner => runner.update())

            const camScrollZ = scrollY * 0.05
            camera.position.z = 50 - camScrollZ

            camera.position.x += (mouseX * 10 - camera.position.x) * 0.05
            camera.position.y += (-mouseY * 2 + 10 - camera.position.y) * 0.05

            camera.lookAt(0, 0, camera.position.z - 100)

            renderer.render(scene, camera)

            scrollSpeed *= 0.95
            if (Math.abs(scrollSpeed) < 0.01) scrollSpeed = 0
        }

        const init = () => {
            // Scene
            scene = new THREE.Scene()
            scene.fog = new THREE.FogExp2(0x000000, 0.0025)

            // Camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
            camera.position.z = 50
            camera.position.y = 10

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setPixelRatio(window.devicePixelRatio)
            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement)
            }

            // Grid
            createGrid()

            // Particles
            createParticles()

            // Grid Runners
            const runnerCount = 20
            for (let i = 0; i < runnerCount; i++) {
                const startZ = -100 - Math.random() * 500
                gridRunners.push(new GridRunner(scene, -30, 50, startZ))
            }

            // Listeners
            window.addEventListener('resize', onWindowResize)
            window.addEventListener('scroll', onScroll)
            document.addEventListener('mousemove', onMouseMove)

            // Start Loop
            lastScrollTime = Date.now()
            animate()
        }

        init()

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', onWindowResize)
            window.removeEventListener('scroll', onScroll)
            document.removeEventListener('mousemove', onMouseMove)

            if (renderer) {
                renderer.dispose()
                if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                    mountRef.current.removeChild(renderer.domElement)
                }
            }
        }
    }, []) // Empty dependency array = run once on mount

    return (
        <div
            ref={mountRef}
            id="canvas-container"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 1,
                pointerEvents: 'none' // Important to let clicks pass through
            }}
        />
    )
}
